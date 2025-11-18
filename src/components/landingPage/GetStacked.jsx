import React from "react";
import { Link } from "react-router-dom";

const GetStacked = () => {
  return (
    <div className="container flex flex-col gap-4">
      <div>
        <h2 className="heading-2">Ready to Get Stacked?</h2>
        <p className="sub-heading">
          Ready to transform your real estate business with our comprehensive
          platform? Choose the plan that fits your needs and start closing more
          deals today.
        </p>
      </div>
      <Link to="/pricing" className="cta-button mx-auto">
        SEE PLANS NOW
      </Link>
    </div>
  );
};

export default GetStacked;
