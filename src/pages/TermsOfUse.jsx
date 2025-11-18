import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TermsOfUseData from "../components/privacyPolicyTerms/TermsOfUseData";

const PrivacyPolicy = () => {
  return (
    <div style={{ backgroundColor: "#1E2A38" }} className="min-h-screen">
      <Header />
      <TermsOfUseData />
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
