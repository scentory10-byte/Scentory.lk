import React, { useEffect, useRef } from 'react';

export default function ScentParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Dynamic Scent Mist Droplets & Sparkles
    const particles = [];
    const count = 55;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.6,
        color: Math.random() > 0.4 ? 'rgba(212, 175, 55, ' : 'rgba(252, 246, 186, ',
        alpha: Math.random() * 0.45 + 0.1,
        speedY: -(Math.random() * 0.45 + 0.15),
        speedX: (Math.random() - 0.5) * 0.25,
        pulse: Math.random() * Math.PI,
        pulseSpeed: 0.015 + Math.random() * 0.02
      });
    }

    // Floating Golden Aura Glow Orbs
    const glowOrbs = [
      { x: width * 0.2, y: height * 0.3, radius: 240, vx: 0.15, vy: 0.12, color: 'rgba(212, 175, 55, 0.04)' },
      { x: width * 0.8, y: height * 0.6, radius: 280, vx: -0.12, vy: -0.18, color: 'rgba(197, 138, 24, 0.035)' },
      { x: width * 0.5, y: height * 0.85, radius: 220, vx: 0.1, vy: -0.1, color: 'rgba(252, 246, 186, 0.03)' }
    ];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Render Floating Ambient Orbs
      glowOrbs.forEach(orb => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < 50 || orb.x > width - 50) orb.vx *= -1;
        if (orb.y < 50 || orb.y > height - 50) orb.vy *= -1;

        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Render Rising Scent Mist Particles
      particles.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.pulse += p.pulseSpeed;

        if (p.y < -15) {
          p.y = height + 15;
          p.x = Math.random() * width;
        }
        if (p.x < -15) p.x = width + 15;
        if (p.x > width + 15) p.x = -15;

        const currentAlpha = p.alpha + Math.sin(p.pulse) * 0.18;
        const boundedAlpha = Math.max(0.04, Math.min(0.65, currentAlpha));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + boundedAlpha + ')';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#d4af37';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
}
