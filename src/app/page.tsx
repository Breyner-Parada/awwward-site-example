import { About } from "@/components/About";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import Story from "@/components/Story";
import { Modal } from "@/components/Modal";

const page = () => {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Modal />
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
