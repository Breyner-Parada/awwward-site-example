"use client";
import { About } from "@/components/About";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import Story from "@/components/Story";
import { useEffect } from "react";

const page = () => {
  {
    useEffect(() => {
      // open the modal once on mount
      const wrapper = document.getElementById("zentry-modal");
      const content = document.getElementById("zentry-modal-content");
      // small timeout to allow initial render + transition
      const t = setTimeout(() => {
        wrapper?.classList.remove("opacity-0", "pointer-events-none");
        content?.classList.remove("translate-y-4");
      }, 250);
      return () => clearTimeout(t);
    }, []);
  }

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <div>
        <div
          id="zentry-modal"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-40 flex items-center justify-center transition-opacity duration-300 opacity-0 pointer-events-none"
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => {
              const wrapper = document.getElementById("zentry-modal");
              const content = document.getElementById("zentry-modal-content");
              wrapper?.classList.add("opacity-0", "pointer-events-none");
              content?.classList.add("translate-y-4");
            }}
            aria-hidden="true"
          />

          <div
            id="zentry-modal-content"
            className="relative bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-lg mx-4 p-6 transform transition-transform duration-300 translate-y-4"
          >
            <h3 className="text-lg font-semibold mb-2">Info</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              This is a Zentry clone page with some changes and it was developed thanks
              to JSMastery
            </p>
            <div className="mt-4 text-right">
              <button
                onClick={() => {
                  const wrapper = document.getElementById("zentry-modal");
                  const content = document.getElementById(
                    "zentry-modal-content"
                  );
                  wrapper?.classList.add("opacity-0", "pointer-events-none");
                  content?.classList.add("translate-y-4");
                }}
                className="cursor-pointer inline-flex items-center px-3 py-2 bg-gray-100 hover:bg-violet-500 hover:text-blue-50 text-sm rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <Hero />
      <About />
      <Features />
      <Story />
      <Contact />
      <Footer />
    </main>
  );
};

export default page;
