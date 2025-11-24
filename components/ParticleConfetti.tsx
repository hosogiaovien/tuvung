import React, { useEffect, useState } from 'react';

export const ParticleConfetti: React.FC = () => {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, color: string, speedX: number, speedY: number}>>([]);

  useEffect(() => {
    const colors = ['#34d399', '#60a5fa', '#f472b6', '#fbbf24', '#a78bfa'];
    const newParticles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: 50, // Start center percent
      y: 50,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedX: (Math.random() - 0.5) * 15,
      speedY: (Math.random() - 0.5) * 15
    }));
    setParticles(newParticles);

    const timer = setTimeout(() => {
      setParticles([]);
    }, 1000); // Cleanup

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: p.color,
            left: `${p.x}%`,
            top: `${p.y}%`,
            animation: `particle-explode 0.8s ease-out forwards`,
            '--tx': `${p.speedX * 200}px`, // Using CSS variables for random translation
            '--ty': `${p.speedY * 200}px`
          } as React.CSSProperties}
        />
      ))}
      <style>{`
        @keyframes particle-explode {
          0% { opacity: 1; transform: translate(0, 0) scale(1); }
          100% { opacity: 0; transform: translate(var(--tx), var(--ty)) scale(0); }
        }
      `}</style>
    </div>
  );
};