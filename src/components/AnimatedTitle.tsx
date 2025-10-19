import gsap from "gsap";
import React, { useEffect } from "react";

interface AnimatedTitleProps {
  title?: string;
  containerClass?: string;
}

const AnimatedTitle = ({ title, containerClass }: AnimatedTitleProps) => {

  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
     const context = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "100 bottom",
          end: "center bottom",
          toggleActions: "play none none reverse",
        },
      });
      titleAnimation.to('.animated-word', {
        opacity: 1,
        transform: "translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg)",
        stagger: 0.02,
        ease: "power2.inOut",
      })
     }, containerRef);

    return () => context.revert();
  }, []);

  return (
    <div
      className={`animated-title ${containerClass}`}
      ref={containerRef}
    >
      {title?.split("<br />").map((part, index) => (
        <div
          key={index}
          className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
        >
          {part.split(" ").map((word, wordIndex) => (
            <span key={wordIndex} className="animated-word" dangerouslySetInnerHTML={{ __html: word }} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimatedTitle;
