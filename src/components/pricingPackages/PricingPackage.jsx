import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PlanCard from "../../components/pricingPackages/PlanCard";
import PricingModal from "../../components/pricingPackages/PricingModal";
import Header from "../../components/Header";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage"
import IntercomChat from "../../components/IntercomChat";
import {
  useGetPlansByCategoryQuery,
  useGetAddonsByCategoryQuery
} from "../../store/apis/plans.api";
import {
  setTransformedPlans,
  setTransformedAddons
} from "../../store/slices/plans.slice";
import {
  transformPlansArray,
  transformAddonsArray,
  getCategoryTitle
} from "../../utils/dataTranasformer";

const PricingPackage = ({ type }) => {
  const [billingType, setBillingType] = useState("monthly");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get cached transformed data from Redux store
  const { transformedPlans, transformedAddons } = useSelector(state => state.plans);

  // API queries
  const {
    data: plansApiData,
    isLoading: plansLoading,
    error: plansError,
    refetch: refetchPlans
  } = useGetPlansByCategoryQuery(type, {
    skip: !type,
  });

  const {
    data: addonsApiData,
    isLoading: addonsLoading,
    error: addonsError,
    refetch: refetchAddons
  } = useGetAddonsByCategoryQuery(type, {
    skip: !type,
  });

  // Transform and cache data when API data changes
  useEffect(() => {
    if (plansApiData?.data) {
      const transformed = transformPlansArray(plansApiData.data);
      dispatch(setTransformedPlans({ category: type, plans: transformed }));
    }
  }, [plansApiData, type, dispatch]);

  useEffect(() => {
    if (addonsApiData?.data) {
      const transformed = transformAddonsArray(addonsApiData.data);
      dispatch(setTransformedAddons({ category: type, addons: transformed }));
    }
  }, [addonsApiData, type, dispatch]);


  const addOns = transformedAddons[type] || [];
  const title = getCategoryTitle(type);

  const cards = transformedPlans[type] || [];


  const handlePlanClick = (card) => {
    setSelectedPlan(card);
  };

  const handleAddOnToggle = (key) => {
    setSelectedAddOns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const getUpdatedPrice = () => {
    if (!selectedPlan) return "$0";

    const basePrice = selectedPlan.rate[billingType].price

    const addOnTotal = Object.entries(selectedAddOns)
      .filter(([, checked]) => checked)
      .reduce((sum, [key]) => {
        const addon = addOns.find((a) => a.key === key);
        const price = parseInt(String(addon?.price)?.replace(/\D/g, "") || 0);
        return sum + price;
      }, 0);

    return `$${basePrice + addOnTotal}`;
  };

  const navigateToSummary = () => {
    navigate("/pricing-summary");
  };

  const handleRetry = () => {
    refetchPlans();
    refetchAddons();
  };

  // Loading state
  if (plansLoading || addonsLoading) {
    return (
      <div className="min-h-screen bg-[#1E2A38] p-6 text-white">
        <Header buttonText="Back" navigateTo={() => navigate(-1)} />
        <div className="flex justify-center items-center min-h-[50vh]">
          <LoadingSpinner />
        </div>
        <IntercomChat enableFin={false} />
      </div>
    );
  }

  // Error state
  if (plansError || addonsError) {
    return (
      <div className="min-h-screen bg-[#1E2A38] p-6 text-white">
        <Header buttonText="Back" navigateTo={() => navigate(-1)} />
        <div className="flex justify-center items-center min-h-[50vh]">
          <ErrorMessage
            message="Failed to load pricing data"
            onRetry={handleRetry}
          />
        </div>
        <IntercomChat enableFin={false} />
      </div>
    );
  }

  // No data state
  if (!cards.length) {
    return (
      <div className="min-h-screen bg-[#1E2A38] p-6 text-white">
        <Header buttonText="Back" navigateTo={() => navigate(-1)} />
        <div className="text-white text-center text-3xl mb-6">
          {`Choose your ${title} plan`}
        </div>
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="text-center">
            <p className="text-gray-400 mb-4">No plans available for this category</p>
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:opacity-80"
            >
              Retry
            </button>
          </div>
        </div>
        <IntercomChat enableFin={false} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1E2A38] p-6 text-white">
      <Header buttonText="Back" navigateTo={() => navigate(-1)} />
      <div className="text-white text-center text-3xl mb-6">
        {`Choose your ${title} plan`}
      </div>

      <div className="flex justify-center mt-6">
        <div
          className="relative w-36 h-10 bg-gray-700 rounded-full flex items-center cursor-pointer px-1"
          onClick={() =>
            setBillingType(billingType === "monthly" ? "yearly" : "monthly")
          }
        >
          <div
            className={`absolute w-16 h-8 bg-[var(--primary-color)] rounded-full transition-transform duration-300 ease-in-out ${billingType === "yearly" ? "translate-x-[80px]" : "translate-x-0"
              }`}
          ></div>
          <div className="z-10 flex justify-between w-full px-3 text-sm font-medium text-white">
            <span
              className={
                billingType === "monthly"
                  ? "text-black font-semibold"
                  : "text-gray-300"
              }
            >
              Mon
            </span>
            <span
              className={
                billingType === "yearly"
                  ? "text-black font-semibold"
                  : "text-gray-300"
              }
            >
              Year
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl pt-10 pb-10 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((plan, index) => (
          <PlanCard
            key={plan.key || index}
            card={plan}
            billingType={billingType}
            onClick={handlePlanClick}
          />
        ))}
      </div>

      {selectedPlan && (
        <PricingModal
          type={type}
          selectedCard={selectedPlan}
          billingType={billingType}
          selectedAddOns={selectedAddOns}
          addOns={addOns}
          onAddOnToggle={handleAddOnToggle}
          getUpdatedPrice={getUpdatedPrice}
          onClose={() => setSelectedPlan(null)}
          navigateToSummary={navigateToSummary}
        />
      )}
      
      <IntercomChat enableFin={false} />
    </div>
  );
};

export default PricingPackage;