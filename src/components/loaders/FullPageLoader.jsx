import React from "react";
import "./loader.css"

const FullPageLoader = () => {
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-[var(--dark-bg)]">
      <div className="full-page-loader"></div>
    </div>
  );
};

export default FullPageLoader;
