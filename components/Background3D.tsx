
import React, { useEffect, useState } from 'react';

const Background3D: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-15] overflow-hidden">
      <div 
        className="absolute w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px]"
        style={{
          transform: `translate3d(${mousePos.x * 1.5}px, ${mousePos.y * 1.5}px, 0)`,
          top: '10%',
          left: '5%',
          transition: 'transform 0.2s ease-out'
        }}
      />
      <div 
        className="absolute w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px]"
        style={{
          transform: `translate3d(${-mousePos.x * 2}px, ${-mousePos.y * 2}px, 0)`,
          bottom: '10%',
          right: '5%',
          transition: 'transform 0.2s ease-out'
        }}
      />
    </div>
  );
};

export default Background3D;
