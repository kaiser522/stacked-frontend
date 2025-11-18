import React from "react";
import { pricingPlans } from "../../constants/pricingPlans";
import { Link } from "react-router-dom";

const PricingCard = ({ plan }) => {
  return (
    <div
      className={`pricing-card ${
        plan?.highlight ? "pricing-card-highlight" : ""
      }`}
    >
      <h3 className="heading-3 text-[var(--primary-color)]">
        {plan?.title}
      </h3>
      <div className="text-[36px] sm:text-[48px] mb-[10px] sm:mb-[20px] text-[var(--white)]">
        {plan?.price}
      </div>

      <ul className="list-none mb-[30px] text-[var(--white)]">
        {plan?.features?.map((feature) => (
          <li key={feature} className="py-[10px] border-b border-b-[rgba(255,255,255,0.1)]">
            {feature}
          </li>
        ))}
      </ul>
      {/* Need to add this later : link */}
      <Link className="cta-button" to={"/pricing"}>
        See Plans
      </Link>
    </div>
  );
};

const PricingPlan = () => {
  return (
    <div className="container">
      <h2 className="heading-2">Flexible Pricing Plans</h2>
      {/* description */}
      <div className="sub-heading">
        <p className="text-md">
          Choose the perfect stack for your real estate business. Each
          professional category (Agents, Wholesalers, Probate Specialists, and
          Flippers) has customized plans to fit your specific needs.
        </p>
      </div>

      {/* Pricing cards */}
      <div className="flex flex-wrap gap-[40px] sm:gap-[30px] justify-center mt-20 px-3 sm:px-0">
        {pricingPlans?.map((plan) => (
          <PricingCard key={plan?.title} plan={plan} />
        ))}
      </div>
    </div>
  );
};

export default PricingPlan;
