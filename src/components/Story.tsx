"use client";
import React from "react";
import AnimatedTitle from "./AnimatedTitle";

const Story = () => {
  const imgRef = React.useRef<HTMLImageElement>(null);

  const rafRef = React.useRef<number | null>(null);
  const targetRef = React.useRef({ rotateX: 0, rotateY: 0, scale: 1 });
  const currentRef = React.useRef({ rotateX: 0, rotateY: 0, scale: 1 });

  const applyTransform = () => {
    if (!imgRef.current) return;
    const { rotateX, rotateY, scale } = currentRef.current;
    imgRef.current.style.transform = `scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    imgRef.current.style.transition = "transform 0.05s linear";
  };

  const updateLoop = () => {
    const lerp = 1.5; // interpolation factor
    const t = targetRef.current;
    const c = currentRef.current;

    c.rotateX += (t.rotateX - c.rotateX) * lerp;
    c.rotateY += (t.rotateY - c.rotateY) * lerp;
    c.scale += (t.scale - c.scale) * lerp;

    applyTransform();

    // stop the loop when values are essentially at target to avoid busy loops
    const closeEnough =
      Math.abs(t.rotateX - c.rotateX) < 0.01 &&
      Math.abs(t.rotateY - c.rotateY) < 0.01 &&
      Math.abs(t.scale - c.scale) < 0.001;

    if (!closeEnough) {
      rafRef.current = requestAnimationFrame(updateLoop);
    } else {
      // if reached target and target is neutral, clear RAF id
      if (t.rotateX === 0 && t.rotateY === 0 && t.scale === 1) {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      } else {
        // keep small updates in case of subtle movement
        rafRef.current = requestAnimationFrame(updateLoop);
      }
    }
  };

  const handleMouseLeave = () => {
    // set target back to neutral and ensure the loop runs to animate back
    targetRef.current = { rotateX: 0, rotateY: 0, scale: 1 };
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(updateLoop);
    }
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (y / (rect.height / 2)) * 10;
    const rotateY = (x / (rect.width / 2)) * -10;

    // update target values; the RAF loop will smoothly interpolate current -> target
    targetRef.current.rotateX = rotateX;
    targetRef.current.rotateY = rotateY;
    targetRef.current.scale = 1.05;

    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(updateLoop);
    }
  };

  return (
    <section id="story" className="min-h-dvh w-screen bg-black text-blue-50">
      <div className="flex size-full flex-col items-center py-10 pb-24">
        <p className="font-general text-sm uppercase md:text-[10px]">
          The story unfolds in a vibrant metaverse, where users can explore,
          create, and connect like never before.
        </p>
        <div className="relative size-full">
          <AnimatedTitle
            title="the greatest story ever told<br /> is yours to create"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />
          <div className="story-img-container">
            <div className="story-img-mask">
              <div className="story-img-content">
                <img
                  onMouseEnter={handleMouseEnter}
                  onMouseMove={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  src="/img/entrance.webp"
                  alt="entrance"
                  className="object-contain"
                  ref={imgRef}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end">
          <div className="flex h-full w-fit flex-col items-center md:items-start">
            <p className="font-general text-sm uppercase md:text-[10px]">
              Discover the entrance to a world of endless possibilities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
