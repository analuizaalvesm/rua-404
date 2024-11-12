import React, { useEffect, useRef, ReactNode } from "react";
import logoWhite from "../../../assets/images/orelhudo_white.png";

interface InfiniteMarqueeProps {
  children: ReactNode;
  speed?: number;
  direction?: "left" | "right";
  className?: string;
}

const InfiniteMarquee: React.FC<InfiniteMarqueeProps> = ({
  children,
  speed = 50,
  direction = "left",
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;

    if (!container || !content) return;

    const clone = content.cloneNode(true) as HTMLDivElement;
    container.appendChild(clone);

    let animationFrameId: number;
    let currentPosition = 0;

    const animate = () => {
      if (!container || !content) return;

      const speedFactor = speed / 100;
      currentPosition += direction === "left" ? -speedFactor : speedFactor;

      if (
        direction === "left" &&
        Math.abs(currentPosition) >= content.offsetWidth
      ) {
        currentPosition = 0;
      } else if (
        direction === "right" &&
        currentPosition >= content.offsetWidth
      ) {
        currentPosition = -content.offsetWidth;
      }

      container.style.transform = `translateX(${currentPosition}px)`;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [direction, speed]);

  return (
    <div className={`w-full overflow-hidden bg-black ${className}`}>
      <div
        className="inline-flex items-center whitespace-nowrap"
        ref={containerRef}
        style={{ willChange: "transform" }}
      >
        <div ref={contentRef} className="inline-flex items-center">
          {children}
        </div>
      </div>
    </div>
  );
};

interface MarqueeItemProps {
  text: string;
  className?: string;
}

const MarqueeItem: React.FC<MarqueeItemProps> = ({ text, className = "" }) => (
  <div className="flex items-center mx-3">
    <div className="w-14 h-14 flex-shrink-0 mr-4">
      <img
        src={logoWhite}
        alt="Logo"
        className="w-full h-full object-contain"
      />
    </div>
    <div className="flex-1 min-w-0">
      <span className={`block whitespace-nowrap ${className}`}>{text}</span>
    </div>
  </div>
);

const MarqueeDemo = () => {
  const items: Array<{ text: string; className?: string }> = [
    {
      text: "RUA 4.0.4",
      className: "text-2xl mt-1 font-orbitron-bold text-white",
    },
    {
      text: "RUA 4.0.4",
      className: "text-2xl mt-1  font-orbitron-bold text-white",
    },
    {
      text: "RUA 4.0.4",
      className: "text-2xl mt-1  font-orbitron-bold text-white",
    },
    {
      text: "RUA 4.0.4",
      className: "text-2xl mt-1  font-orbitron-bold text-white",
    },
    {
      text: "RUA 4.0.4",
      className: "text-2xl mt-1  font-orbitron-bold text-white",
    },
  ];

  return (
    <div className="mx-auto">
      <InfiniteMarquee speed={60}>
        <div className="flex items-center">
          {items.map((item, index) => (
            <MarqueeItem
              key={index}
              text={item.text}
              className={item.className}
            />
          ))}
        </div>
      </InfiniteMarquee>
    </div>
  );
};

export default MarqueeDemo;
