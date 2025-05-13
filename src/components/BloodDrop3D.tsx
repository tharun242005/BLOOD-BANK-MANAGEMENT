
import { useEffect, useRef } from "react";

export function BloodDrop3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Enhanced CSS animation for a futuristic look
    containerRef.current.className = "relative w-full h-full";
    
    // Create main drop
    const drop = document.createElement("div");
    drop.className = "absolute w-32 h-32 bg-gradient-to-b from-bloodRed-400 to-bloodRed-700 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg";
    
    // Add internal glow
    const innerGlow = document.createElement("div");
    innerGlow.className = "absolute w-24 h-24 bg-gradient-to-tr from-bloodRed-300 to-transparent rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-70";
    drop.appendChild(innerGlow);
    
    // Create pulsing effects - multiple layers for a more futuristic look
    const pulse1 = document.createElement("div");
    pulse1.className = "absolute w-40 h-40 rounded-full bg-bloodRed-400 opacity-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse";
    
    const pulse2 = document.createElement("div");
    pulse2.className = "absolute w-48 h-48 rounded-full bg-bloodRed-300 opacity-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" 
    + " animation-delay-300";
    
    const pulse3 = document.createElement("div");
    pulse3.className = "absolute w-56 h-56 rounded-full bg-bloodRed-200 opacity-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" 
    + " animation-delay-600";

    // Create particle effects for more futuristic look
    for (let i = 0; i < 5; i++) {
      const particle = document.createElement("div");
      const size = 4 + Math.random() * 6; // Random size between 4px and 10px
      const angle = Math.random() * Math.PI * 2; // Random angle
      const distance = 16 + Math.random() * 16; // Random distance from center
      
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      
      particle.className = `absolute bg-bloodRed-300 rounded-full animate-pulse`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `calc(50% + ${x}px)`;
      particle.style.top = `calc(50% + ${y}px)`;
      particle.style.animationDuration = `${1.5 + Math.random() * 2}s`; // Random duration
      
      drop.appendChild(particle);
    }
    
    // Add reflection highlight for a glossy effect
    const highlight = document.createElement("div");
    highlight.className = "absolute w-12 h-12 bg-white opacity-30 rounded-full top-[35%] left-[35%] blur-sm";
    drop.appendChild(highlight);
    
    // Append all elements to the container
    containerRef.current.appendChild(pulse3);
    containerRef.current.appendChild(pulse2);
    containerRef.current.appendChild(pulse1);
    containerRef.current.appendChild(drop);
    
    // Add some rotation animation
    const rotateAnimation = () => {
      let rotation = 0;
      setInterval(() => {
        rotation += 0.2;
        if (drop) {
          drop.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
        }
      }, 50);
    };
    
    rotateAnimation();
    
    // Add CSS to head for animation delay
    const style = document.createElement('style');
    style.textContent = `
      .animation-delay-300 {
        animation-delay: 0.3s;
      }
      .animation-delay-600 {
        animation-delay: 0.6s;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      if (style.parentNode) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="w-64 h-64 mx-auto">
      {/* 3D blood drop will be rendered here */}
    </div>
  );
}
