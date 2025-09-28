import AboutUs from "@/components/AboutUs";
import BasicInfo from "@/components/BasicInfo";
import Catalogue from "@/components/Catalogue";
import ContactSection from "@/components/ContactSeection";
import Footer from "@/components/Footer";
import PestResearch from "@/components/PestResearch";
import  ProductListingSection  from "@/components/ProductListingSection";
import TaglineSection from "@/components/TaglineSection";
import React, { useRef } from "react";

const LandingPage = () => {
  const aboutUsRef = useRef(null);
  return (
    <div className=" w-full overflow-x-hidden ">


      {/* Tagline */}
      <TaglineSection scrollTargetRef={aboutUsRef} />

      {/* About us */}
      <div ref={aboutUsRef}>
        <AboutUs  />
      </div>

      {/* Basic Info */}
      <BasicInfo  />

      {/* Prdouct Display */}
      <ProductListingSection />

      {/* Catalogue  */}
      <Catalogue  />

      {/* Pest Management  */}
      <PestResearch  />

      {/* Contact */}
      <ContactSection />

      {/* Footer */}
      <Footer />
      
    </div>
  );
};

export default LandingPage;
