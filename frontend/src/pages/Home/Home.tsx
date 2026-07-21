import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import FeaturesSection from "./FeaturesSection";
import HeroSection from "./HeroSection";

const Home = () => {
  return (
    <>
      <Navbar />

      <HeroSection/>
      
      <FeaturesSection />

      <Footer />
    </>
  );
};

export default Home;
