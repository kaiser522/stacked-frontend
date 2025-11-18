import React from "react";
import Header from "../components/Header";
import PrivacyData from "../components/privacyPolicyTerms/PrivacyData";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  return (
    <div style={{ backgroundColor: "#1E2A38" }} className="min-h-screen">
      <Header />
      <PrivacyData />
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
