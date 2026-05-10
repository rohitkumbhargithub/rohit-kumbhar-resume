import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import FooterSection from "@/components/FooterSection";
import ParticlesBackground from "@/components/ParticlesBackground";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rohit Kumbhar — Full Stack Developer Portfolio" },
      { name: "description", content: "Portfolio of Rohit Kumbhar, a passionate Full Stack Developer specializing in MERN stack and modern web technologies." },
      { property: "og:title", content: "Rohit Kumbhar — Full Stack Developer" },
      { property: "og:description", content: "Explore projects and skills of Rohit Kumbhar, a Full Stack Engineer." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <ParticlesBackground />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <FooterSection />
    </>
  );
}
