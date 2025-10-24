"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { TiLocationArrow } from "react-icons/ti";
import { useWindowScroll } from "react-use";
import { Button } from "./Button";

const navItems = ["Nexus", "Vault", "Products", "About", "Contact"];

const NavBar = () => {
  const navContainerRef = React.useRef<HTMLDivElement>(null);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const [isAudioPlaying, setIsAudioPlaying] = React.useState<boolean>(false);
  const [isIndicatorActive, setIsIndicatorActive] =
    React.useState<boolean>(false);
  const [lastScrollY, setLastScrollY] = React.useState<number>(0);
  const [isNavVisible, setIsNavVisible] = React.useState<boolean>(true);

  const toggleAudioIndicator = () => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsAudioPlaying(!isAudioPlaying);
      setIsIndicatorActive(!isIndicatorActive);
    }
  };

  const { y: scrollY } = useWindowScroll();

  React.useEffect(() => {
    const nav = navContainerRef.current;
    if (!nav) return;
    if (scrollY === 0) {
      setIsNavVisible(true);
      nav.classList.remove("floating-nav");
    } else if (scrollY > lastScrollY && scrollY > 100) {
      // Scrolling down
      nav.style.transform = "translateY(-150%)";
      setIsNavVisible(false);
      nav.classList.add("floating-nav");
    } else {
      // Scrolling up
      nav.style.transform = "translateY(0)";
      setIsNavVisible(true);
      nav.classList.add("floating-nav");
    }
    setLastScrollY(scrollY);
  }, [scrollY]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <Image
              src="/img/logo.png"
              alt="Logo"
              width={100}
              height={100}
              className="w-10"
            />
            <Button
              id="product-button"
              title="Product"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>
          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item) => (
                <Link
                  className="nav-hover-btn"
                  key={item}
                  href={`#${item.toLowerCase()}`}
                >
                  {item}
                </Link>
              ))}
            </div>
            <button
              className={`ml-10 flex items-center space-x-0.5 cursor-pointer rounded-full bg-blue-50 p-2 hover:bg-blue-100 transition-colors duration-300 ${
                isIndicatorActive ? "!bg-black" : ""
              }`}
              onClick={toggleAudioIndicator}
            >
              <audio
                ref={audioRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />
              {[1, 2, 3, 4].map((bar, i) => (
                <div
                  key={bar}
                  className={`indicator-line ${
                    isIndicatorActive ? "active" : ""
                  }`}
                  style={{
                    animationDelay: `${Number(bar) * 0.1}s`,
                  }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
