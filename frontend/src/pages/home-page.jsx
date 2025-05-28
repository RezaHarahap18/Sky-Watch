import React from "react";
import FeaturesSection from "../components/feature";
import InformationSection from "../components/information";
import ArimaSection from "../components/method";
import Footer from "../components/footer";
import HeroSection from "../components/hero";
import AboutSection from "../components/about";
import "../styles/style.css";

const SkyWatch = () => {
  return (
    <div className="bg-light">
      {/* Hero Section */}
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <InformationSection />
      <ArimaSection />
      <Footer />
    </div>
  );
};

export default SkyWatch;
