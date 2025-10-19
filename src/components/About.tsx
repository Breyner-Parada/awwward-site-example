"use client";
import React from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "./AnimatedTitle";
gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  useGSAP(
    () => {
      // GSAP animations can be added here if needed
      const clipAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: "#clip",
          start: "center center",
          end: "+=800 center",
          scrub: 0.5,
          pin: true,
          pinSpacing: true,
        },
      });
      clipAnimation.to(".mask-clip-path", {
        width: "100vw",
        height: "100vh",
        ease: "power1.inOut",
        duration: 1,
      });
    },
    { dependencies: [] }
  );

  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <h2 className="font-general text-sm uppercase md:text-[10px]">
          Welcome to Zentry
        </h2>
        <AnimatedTitle
          title="Discover the w<b>o</b>rld's <br /> largest shared adventure in g<b>a</b>mi<b>n</b>g."
          containerClass="mt-5 !text-black text-center"
        />
        <div className="about-subtext">
          <p>The Game of Games begins-your life, now an epic</p>
          <p className="text-gray-500">
            Zentry unites every player from countless games and experiences into
            one
          </p>
        </div>
      </div>
      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          <Image
            src="/img/about.webp"
            alt="About Zentry"
            fill
            className="absolute left-0 top-0 size-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
};
