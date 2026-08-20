import React, { useEffect, useRef } from 'react';

export const ThreeDBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse tracking for 3D parallax
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      isHovered: false
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isHovered = true;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // 3D Particles Definition
    const numParticles = 75;
    const fov = 400; // Field of view for 3D perspective

    interface Particle3D {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      radius: number;
      color: string;
    }

    const colors = ['#6366f1', '#818cf8', '#38bdf8', '#a855f7', '#06b6d4'];
    const particles: Particle3D[] = [];

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        z: (Math.random() - 0.5) * 600,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        vz: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    // 3D Rotating Polyhedron Core Vertices (Icosahedron / Cyber Orb)
    const polyVertices: [number, number, number][] = [];
    const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
    const scale = 140;

    const baseNodes: [number, number, number][] = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
    ];

    baseNodes.forEach(([x, y, z]) => {
      polyVertices.push([x * scale, y * scale, z * scale]);
    });

    // Outer orbital rings vertices
    const ring1: [number, number, number][] = [];
    const ring2: [number, number, number][] = [];
    const ringNodes = 36;
    for (let i = 0; i < ringNodes; i++) {
      const angle = (i / ringNodes) * Math.PI * 2;
      ring1.push([Math.cos(angle) * 220, Math.sin(angle) * 220, 0]);
      ring2.push([0, Math.cos(angle) * 260, Math.sin(angle) * 260]);
    }

    let angleX = 0;
    let angleY = 0;
    let angleZ = 0;

    // 3D Rotation helper
    const rotate3D = (x: number, y: number, z: number, ax: number, ay: number, az: number): [number, number, number] => {
      // Rotate around X
      let y1 = y * Math.cos(ax) - z * Math.sin(ax);
      let z1 = y * Math.sin(ax) + z * Math.cos(ax);
      let x1 = x;

      // Rotate around Y
      let x2 = x1 * Math.cos(ay) + z1 * Math.sin(ay);
      let z2 = -x1 * Math.sin(ay) + z1 * Math.cos(ay);
      let y2 = y1;

      // Rotate around Z
      let x3 = x2 * Math.cos(az) - y2 * Math.sin(az);
      let y3 = x2 * Math.sin(az) + y2 * Math.cos(az);
      let z3 = z2;

      return [x3, y3, z3];
    };

    // Main 3D Render Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const mouseParallaxX = (mouse.x - width / 2) * 0.0006;
      const mouseParallaxY = (mouse.y - height / 2) * 0.0006;

      angleX += 0.003 + mouseParallaxY * 0.1;
      angleY += 0.004 + mouseParallaxX * 0.1;
      angleZ += 0.002;

      const centerX = width / 2;
      const centerY = height * 0.38; // Centered near the DISHA AI title

      // 🌌 1. Draw 3D Rotating Polyhedron Core
      const projectedPoly = polyVertices.map(([x, y, z]) => {
        const [rx, ry, rz] = rotate3D(x, y, z, angleX, angleY, angleZ);
        const p = fov / (fov + rz + 300);
        return {
          x: centerX + rx * p,
          y: centerY + ry * p,
          z: rz,
          p: p
        };
      });

      // Draw Polyhedron Wireframe Edges
      ctx.lineWidth = 1;
      for (let i = 0; i < projectedPoly.length; i++) {
        for (let j = i + 1; j < projectedPoly.length; j++) {
          const dx = polyVertices[i][0] - polyVertices[j][0];
          const dy = polyVertices[i][1] - polyVertices[j][1];
          const dz = polyVertices[i][2] - polyVertices[j][2];
          const dist3D = Math.sqrt(dx * dx + dy * dy + dz * dz);

          // Connect adjacent vertices in icosahedron
          if (dist3D < scale * 2.1) {
            const p1 = projectedPoly[i];
            const p2 = projectedPoly[j];
            const avgZ = (p1.z + p2.z) / 2;
            const alpha = Math.max(0.04, Math.min(0.35, (avgZ + scale) / (scale * 2.5)));

            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw Polyhedron Vertices Glowing Nodes
      projectedPoly.forEach(pt => {
        const alpha = Math.max(0.1, (pt.z + scale) / (scale * 2));
        ctx.fillStyle = `rgba(168, 85, 247, ${alpha})`;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, Math.max(1, 3 * pt.p), 0, Math.PI * 2);
        ctx.fill();

        // Subtle glow aura
        ctx.fillStyle = `rgba(99, 102, 241, ${alpha * 0.3})`;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, Math.max(2, 6 * pt.p), 0, Math.PI * 2);
        ctx.fill();
      });

      // 💫 2. Draw 3D Orbital Rings
      const drawRing = (ring: [number, number, number][], ax: number, ay: number, az: number, strokeStyle: string) => {
        ctx.strokeStyle = strokeStyle;
        ctx.beginPath();
        ring.forEach(([x, y, z], idx) => {
          const [rx, ry, rz] = rotate3D(x, y, z, ax, ay, az);
          const p = fov / (fov + rz + 300);
          const px = centerX + rx * p;
          const py = centerY + ry * p;
          if (idx === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.closePath();
        ctx.stroke();
      };

      drawRing(ring1, angleX * 0.7, angleY * 0.9, angleZ, 'rgba(56, 189, 248, 0.15)');
      drawRing(ring2, -angleX * 0.8, -angleY * 0.6, angleZ * 1.2, 'rgba(168, 85, 247, 0.12)');

      // ✨ 3. Draw 3D Floating Particle Constellation
      const projectedParticles: { x: number; y: number; z: number; p: number; radius: number; color: string }[] = [];

      particles.forEach(p => {
        // Move particle in 3D space
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Wrap around boundaries
        if (p.x < -width) p.x = width;
        if (p.x > width) p.x = -width;
        if (p.y < -height) p.y = height;
        if (p.y > height) p.y = -height;
        if (p.z < -300) p.z = 300;
        if (p.z > 300) p.z = -300;

        // Apply mouse 3D tilt
        const [rx, ry, rz] = rotate3D(p.x, p.y, p.z, mouseParallaxY * 0.5, mouseParallaxX * 0.5, 0);
        const perspective = fov / (fov + rz + 350);

        const screenX = width / 2 + rx * perspective;
        const screenY = height / 2 + ry * perspective;

        projectedParticles.push({
          x: screenX,
          y: screenY,
          z: rz,
          p: perspective,
          radius: p.radius * perspective,
          color: p.color
        });
      });

      // Draw constellation connector lines between close particles
      for (let i = 0; i < projectedParticles.length; i++) {
        for (let j = i + 1; j < projectedParticles.length; j++) {
          const p1 = projectedParticles[i];
          const p2 = projectedParticles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.18 * ((p1.p + p2.p) / 2);
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      projectedParticles.forEach(pt => {
        const alpha = Math.max(0.15, Math.min(0.85, (pt.z + 300) / 600));
        ctx.fillStyle = pt.color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, Math.max(0.8, pt.radius), 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.95 }}
    />
  );
};
