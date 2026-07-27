"use client";

import { useEffect, useRef } from "react";

const VERTEX_SHADER = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

// Layered sine waves + hash shimmer in the brand palette (ink → lagoon → citrus glints).
const FRAGMENT_SHADER = `
precision mediump float;
uniform float u_time;
uniform vec2 u_res;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float t = u_time * 0.18;

  // Rolling water surface
  float wave = 0.0;
  wave += sin(uv.x * 6.0 + t * 2.2 + sin(uv.y * 4.0 + t) * 0.8) * 0.5;
  wave += sin(uv.x * 11.0 - t * 1.6 + uv.y * 5.0) * 0.25;
  wave += noise(uv * 5.0 + vec2(t * 0.7, -t * 0.4)) * 0.6;
  wave *= 0.5 + uv.y * 0.5;

  vec3 ink = vec3(0.027, 0.090, 0.110);
  vec3 lagoon = vec3(0.059, 0.361, 0.400);
  vec3 bright = vec3(0.102, 0.541, 0.588);
  vec3 citrus = vec3(0.776, 0.851, 0.306);

  vec3 color = mix(ink, lagoon, smoothstep(0.0, 1.1, uv.y + wave * 0.25));
  color = mix(color, bright, smoothstep(0.55, 1.0, uv.y) * (0.4 + wave * 0.3));

  // Caustic-style shimmer
  float sparkle = noise(uv * vec2(40.0, 26.0) + vec2(t * 3.0, -t * 2.0));
  sparkle = pow(smoothstep(0.72, 1.0, sparkle), 3.0);
  color += citrus * sparkle * (0.12 + 0.3 * uv.y);

  // Soft moving light bands
  float band = sin(uv.y * 14.0 - t * 3.0 + wave * 2.0);
  color += bright * smoothstep(0.85, 1.0, band) * 0.08;

  // Vignette for text legibility
  float vignette = smoothstep(0.0, 0.55, uv.y) * 0.5 + 0.5;
  color *= mix(1.0, 0.55, 1.0 - vignette);

  gl_FragColor = vec4(color, 1.0);
}
`;

export function OceanCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false });
    if (!gl) return;

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return null;
      return shader;
    };

    const vertex = compile(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragment = compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vertex || !fragment) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "u_time");
    const uRes = gl.getUniformLocation(program, "u_res");

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let visible = true;
    const start = performance.now();

    const render = () => {
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduced && visible) raf = requestAnimationFrame(render);
    };

    // Only animate while on screen.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(render);
    });
    io.observe(canvas);

    render();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      io.disconnect();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
