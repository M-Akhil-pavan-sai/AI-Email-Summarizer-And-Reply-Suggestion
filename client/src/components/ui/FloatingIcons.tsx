
import React, { useEffect, useState } from 'react';
import { Mail, MailPlus, MailCheck, MailOpen, Send, Mails } from 'lucide-react';

// Icon position and animation state
interface IconState {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  rotation: number;
  speed: number;
  component: React.ReactNode;
}

const FloatingIcons: React.FC = () => {
  const [icons, setIcons] = useState<IconState[]>([]);
  const iconComponents = [
    <Mail />,
    <MailPlus />,
    <MailCheck />,
    <MailOpen />,
    <Send />,
    <Mails />
  ];

  // Initialize icons on component mount
  useEffect(() => {
    const newIcons: IconState[] = [];
    const iconCount = Math.max(15, Math.floor(window.innerWidth / 100));
    
    for (let i = 0; i < iconCount; i++) {
      newIcons.push({
        id: i,
        x: Math.random() * 100, // Random horizontal position (0-100%)
        y: Math.random() * 100, // Random vertical position (0-100%)
        size: Math.random() * 20 + 10, // Random size between 10-30px
        opacity: Math.random() * 0.3 + 0.1, // Random opacity between 0.1-0.4
        rotation: Math.random() * 360, // Random rotation 0-360 degrees
        speed: Math.random() * 0.2 + 0.1, // Random speed
        component: iconComponents[Math.floor(Math.random() * iconComponents.length)]
      });
    }
    
    setIcons(newIcons);
  }, []);

  // Animate icons
  useEffect(() => {
    const interval = setInterval(() => {
      setIcons(prevIcons => 
        prevIcons.map(icon => {
          // Move icon up and wrap around when reaches top
          let newY = icon.y - icon.speed;
          if (newY < -10) {
            newY = 110; // Reset to below the bottom
            return {
              ...icon,
              y: newY,
              x: Math.random() * 100, // New random x position
              rotation: Math.random() * 360, // New random rotation
              component: iconComponents[Math.floor(Math.random() * iconComponents.length)]
            };
          }
          
          return {
            ...icon,
            y: newY,
            rotation: icon.rotation + 0.2 // Slowly rotate
          };
        })
      );
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
      {icons.map(icon => (
        <div
          key={icon.id}
          className="absolute"
          style={{
            left: `${icon.x}%`,
            top: `${icon.y}%`,
            opacity: icon.opacity,
            transform: `rotate(${icon.rotation}deg)`,
            color: 'var(--email-primary)',
            width: `${icon.size}px`,
            height: `${icon.size}px`,
            transition: 'transform 0.5s ease'
          }}
        >
          {icon.component}
        </div>
      ))}
    </div>
  );
};

export default FloatingIcons;