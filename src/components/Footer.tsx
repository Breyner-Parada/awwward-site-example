import React from "react";
import Link from "next/link";
import { FaDiscord, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export const Footer = () => {
  const socialLinks = [
    { name: "Facebook", url: "https://facebook.com", icon: <FaFacebook /> },
    { name: "Twitter", url: "https://twitter.com", icon: <FaTwitter /> },
    { name: "Instagram", url: "https://instagram.com", icon: <FaInstagram /> },
    { name: "Discord", url: "https://discord.com", icon: <FaDiscord /> },
  ];

  return (
    <footer className="w-screen bg-violet-300 py-4 text-black">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="font-general text-sm md:text-left">
          &copy; 2024 Nova. All rights reserved.
        </p>
        <div className="flex gap-4 justify-center md:justify-start">
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm hover:underline hover:text-blue-50 hover:scale-105 transition-transform"
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};
