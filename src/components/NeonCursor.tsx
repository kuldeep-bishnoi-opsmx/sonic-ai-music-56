
import { useEffect, useState } from 'react';

interface CursorTrail {
  x: number;
  y: number;
  id: number;
}

export const NeonCursor = () => {
  const [trails, setTrails] = useState<CursorTrail[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let trailId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      
      // Add new trail point
      const newTrail: CursorTrail = {
        x: e.clientX,
        y: e.clientY,
        id: trailId++
      };

      setTrails(prev => {
        const newTrails = [newTrail, ...prev.slice(0, 8)]; // Reduced trail points for better performance
        return newTrails;
      });
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setTrails([]);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Trail points - only the trail, no main cursor element */}
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="fixed pointer-events-none z-[9998] rounded-full"
          style={{
            left: trail.x - 4,
            top: trail.y - 4,
            width: Math.max(3, 8 - index * 0.6),
            height: Math.max(3, 8 - index * 0.6),
            backgroundColor: `hsl(270 100% 70% / ${Math.max(0.1, 0.7 - index * 0.08)})`,
            boxShadow: `0 0 ${Math.max(6, 16 - index * 1.5)}px hsl(270 100% 70% / ${Math.max(0.1, 0.4 - index * 0.04)})`,
            transition: 'all 0.1s ease-out',
            transform: `scale(${Math.max(0.3, 1 - index * 0.1)})`,
          }}
        />
      ))}
    </>
  );
};
