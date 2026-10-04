import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import FooterSection from "@/components/FooterSection";
import CustomSectionsRenderer from "@/components/CustomSectionsRenderer";
import ParticlesBackground from "@/components/ParticlesBackground";
import { PortfolioProvider, usePortfolio } from "@/context/PortfolioContext";
import AdminAccessButton from "@/components/admin/AdminAccessButton";
import AdminControlModal from "@/components/admin/AdminControlModal";

function PortfolioContent() {
  const { portfolio, isEditMode } = usePortfolio();
  const visibility = portfolio.visibility || {
    hero: true,
    about: true,
    services: true,
    projects: true,
    footer: true,
  };

  return (
    <div className="min-h-screen bg-background relative">
      <ParticlesBackground />
      <Navbar />

      {(visibility.hero !== false || isEditMode) && <HeroSection />}
      {(visibility.about !== false || isEditMode) && <AboutSection />}
      {(visibility.services !== false || isEditMode) && <ServicesSection />}
      {(visibility.projects !== false || isEditMode) && <ProjectsSection />}

      {/* Dynamic User Custom Sections */}
      <CustomSectionsRenderer />

      {(visibility.footer !== false || isEditMode) && <FooterSection />}

      {/* Customization controls for portfolio owner */}
      <AdminAccessButton />
      <AdminControlModal />
    </div>
  );
}

function App() {
  return (
    <PortfolioProvider>
      <PortfolioContent />
    </PortfolioProvider>
  );
}

export default App;
