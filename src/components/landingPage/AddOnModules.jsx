import React from "react";
import { addOns } from "../../constants/pricingPlans";
import { FaRegCheckCircle } from "react-icons/fa";

const AddOnCard = ({ addOn }) => {
  return (
    <div className="bg-[var(--lighter-dark)] p-[20px] rounded-[10px] flex-1 min-w-[200px] transition-all duration-200 ease-in hover:scale-105">
      <h5 className="heading-5 text-[var(--primary-color)]">{addOn?.title}</h5>
      <ul className="list-none p-0">
        {addOn?.features?.map((feature) => (
          <li className="text-[15px] text-white  flex items-center justify-baseline gap-2 pb-2 pt-2" key={feature}>
            <span><FaRegCheckCircle className="text-[var(--primary-color)] rounded-full" /></span>
           <span> {feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const AddOnModules = () => {
  return (
    <div className="container mt-[50px]">
      <h4 className="heading-4 text-[var(--white)]">Powerful Add-On Modules</h4>
      <p className="sub-heading">
        Enhance your stack with specialized tools designed for your specific
        real estate niche:
      </p>

      {/* cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[20px] max-w-[4000px] w-full mx-auto">
        {addOns?.map((addOn, index) => (
          <AddOnCard key={index} addOn={addOn} />
        ))}
      </div>
    </div>
  );
};

export default AddOnModules;
