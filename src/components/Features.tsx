"use client";
import React from "react";
import { TiLocationArrow } from "react-icons/ti";

interface BentoCardProps {
  src: string;
  title: React.ReactNode;
  description: string;
  isComingSoon?: boolean;
}

const BentoCardTilt: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const [transformStyle, setTransformStyle] = React.useState("");

  const itemRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = itemRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 12;
    const rotateY = ((x - centerX) / centerX) * -12;
    setTransformStyle(
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05) perspective(1000px)`
    );
  };
  const handleMouseLeave = () => {
    setTransformStyle("rotateX(0deg) rotateY(0deg) scale(1)");
  };

  return (
    <div
      className={`bento-tilt_1 ${className}`}
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

const BentoCard: React.FC<BentoCardProps> = ({ src, title, description }) => {
  return (
    <div className="relative size-full">
      <video
        src={src}
        autoPlay
        loop
        muted
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="max-w-sm pt-2 font-circular-web text-sm opacity-70">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section className="bg-black pb-52">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <p className="font-circular-web text-lg text-blue-50">
            Into the Metaverse Layer
          </p>
          <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
            Immerse in a metaverse where digital and physical realities
            converge. Explore, create, and connect through cutting-edge
            immersive experiences.
          </p>
        </div>
        <BentoCardTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
          <BentoCard
            src="videos/feature-1.mp4"
            title={
              <>
                radia<b>n</b>t
              </>
            }
            description="Dive into a metaverse where digital and physical realities converge, offering seamless integration for an unparalleled immersive experience."
            isComingSoon
          />
        </BentoCardTilt>
        <div className="grid h-[135vh] grid-cols-2 grid-rows-3 gap-7">
          <BentoCardTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
            <BentoCard
              src="videos/feature-2.mp4"
              title={
                <>
                  co<b>n</b>nect
                </>
              }
              description="Forge meaningful connections in a dynamic metaverse, where social interactions transcend boundaries and foster a vibrant community."
            />
          </BentoCardTilt>
          <BentoCardTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
            <BentoCard
              src="videos/feature-3.mp4"
              title={
                <>
                  cre<b>a</b>te
                </>
              }
              description="Unleash your creativity in a boundless metaverse, where innovative tools empower you to design, build, and share unique digital experiences."
            />
          </BentoCardTilt>
          <BentoCardTilt className="bento-tilt_1 row-span-1 me-14 md:col-span-1 md:me-0">
            <BentoCard
              src="videos/feature-4.mp4"
              title={
                <>
                  expl<b>o</b>re
                </>
              }
              description="Embark on a journey of discovery in a vast metaverse, where hidden gems and immersive experiences await your exploration."
            />
          </BentoCardTilt>
          <BentoCardTilt className="bento-tilt_2">
            <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
              <h1 className="bento-title special-font max-w-64">
                m<b>o</b>re coming soon!!
              </h1>
              <TiLocationArrow
                size={48}
                className="text-blue-50 opacity-70 m-8 scale-[4] self-end"
              />
            </div>
          </BentoCardTilt>
          <BentoCardTilt className="bento-tilt_2">
            <video
              src="videos/feature-5.mp4"
              autoPlay
              loop
              muted
              className="size-full object-cover object-center"
            />
          </BentoCardTilt>
        </div>
      </div>
    </section>
  );
};

export default Features;
