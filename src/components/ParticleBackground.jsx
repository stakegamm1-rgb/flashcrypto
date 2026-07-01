import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    let coins = [];
    const particleCount = 40;
    const connectionDistance = 110;
    const mouse = { x: null, y: null, radius: 180 };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    handleResize();

    // 2D/3D Particles
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 2 + 1;
        const hue = Math.random() > 0.5 ? 180 : 130; 
        this.color = `hsla(${hue}, 100%, 65%, ${Math.random() * 0.3 + 0.25})`;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around boundaries
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        // Mouse interaction (warp away slightly)
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            // Push away gently
            this.x -= (dx / dist) * force * 1.5;
            this.y -= (dy / dist) * force * 1.5;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // 3D Floating Crypto Wireframe Coins
    class WireframeCoin {
      constructor(symbol, labelColor, x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.scale = Math.random() * 20 + 35; // 3D scale radius
        this.symbol = symbol;
        this.labelColor = labelColor;
        this.angleX = Math.random() * Math.PI;
        this.angleY = Math.random() * Math.PI;
        this.rotSpeedX = (Math.random() - 0.5) * 0.015;
        this.rotSpeedY = (Math.random() - 0.5) * 0.015;
        
        // Define vertices of double-ring coin in 3D
        this.vertices = [];
        const ringSegments = 10;
        const height = 0.25; // thickness in 3D

        // Top ring vertices (z = -height)
        for (let i = 0; i < ringSegments; i++) {
          const rad = (i / ringSegments) * Math.PI * 2;
          this.vertices.push({ x: Math.cos(rad), y: Math.sin(rad), z: -height });
        }
        // Bottom ring vertices (z = height)
        for (let i = 0; i < ringSegments; i++) {
          const rad = (i / ringSegments) * Math.PI * 2;
          this.vertices.push({ x: Math.cos(rad), y: Math.sin(rad), z: height });
        }
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap boundaries
        if (this.x < -100) this.x = canvas.width + 100;
        if (this.x > canvas.width + 100) this.x = -100;
        if (this.y < -100) this.y = canvas.height + 100;
        if (this.y > canvas.height + 100) this.y = -100;

        // Rotate
        this.angleX += this.rotSpeedX;
        this.angleY += this.rotSpeedY;

        // React to mouse warp
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.hypot(dx, dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 1.0;
            this.y -= (dy / dist) * force * 1.0;
          }
        }
      }

      project3D(vert) {
        // Rotate around Y
        let x1 = vert.x * Math.cos(this.angleY) - vert.z * Math.sin(this.angleY);
        let z1 = vert.x * Math.sin(this.angleY) + vert.z * Math.cos(this.angleY);

        // Rotate around X
        let y2 = vert.y * Math.cos(this.angleX) - z1 * Math.sin(this.angleX);
        let z2 = vert.y * Math.sin(this.angleX) + z1 * Math.cos(this.angleX);

        // Perspective
        const cameraDist = 3;
        const depthFactor = cameraDist / (cameraDist + z2);

        return {
          x: this.x + x1 * this.scale * depthFactor,
          y: this.y + y2 * this.scale * depthFactor,
          depth: z2
        };
      }

      draw() {
        const projected = this.vertices.map(v => this.project3D(v));
        const half = projected.length / 2;

        ctx.strokeStyle = this.labelColor;
        ctx.lineWidth = 0.9;

        // Draw top ring
        ctx.beginPath();
        for (let i = 0; i < half; i++) {
          const p = projected[i];
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.closePath();
        ctx.stroke();

        // Draw bottom ring
        ctx.beginPath();
        for (let i = half; i < projected.length; i++) {
          const p = projected[i];
          if (i === half) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.closePath();
        ctx.stroke();

        // Draw connections
        ctx.beginPath();
        for (let i = 0; i < half; i++) {
          const p1 = projected[i];
          const p2 = projected[i + half];
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
        }
        ctx.stroke();

        // Draw Neon symbol inside the rotating center
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${Math.round(this.scale * 0.45)}px Outfit, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.symbol, this.x, this.y);
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Initialize rotating crypto coins (positioned in quadrant spaces)
    coins.push(new WireframeCoin('₿', 'rgba(0, 240, 255, 0.4)', window.innerWidth * 0.15, window.innerHeight * 0.3));
    coins.push(new WireframeCoin('₮', 'rgba(57, 255, 20, 0.4)', window.innerWidth * 0.85, window.innerHeight * 0.25));
    coins.push(new WireframeCoin('Ξ', 'rgba(0, 240, 255, 0.4)', window.innerWidth * 0.2, window.innerHeight * 0.75));
    coins.push(new WireframeCoin('₿', 'rgba(57, 255, 20, 0.4)', window.innerWidth * 0.8, window.innerHeight * 0.7));

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // Draw connection lines between particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);

          if (dist < connectionDistance) {
            const opacity = (1 - dist / connectionDistance) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${opacity})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // Update and draw floating crypto coins
      coins.forEach((c) => {
        c.update();
        c.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1,
        opacity: 0.85,
      }}
    />
  );
}
