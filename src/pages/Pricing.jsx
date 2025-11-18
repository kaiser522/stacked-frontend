import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // Step 1
import { FaHammer, FaHome } from "react-icons/fa";
import { FaSackDollar, FaSheetPlastic } from "react-icons/fa6";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Pricing() {
  const [selectedCard, setSelectedCard] = useState(null);
  const cardRefs = useRef([]);
  const navigate = useNavigate(); // Step 2

  const cards = [
    {
      icon: <FaHome size={32} style={{ color: "#1ec8c8" }} />,
      title: "Real Estate Agents",
      description: "Specialized tools for Real Estate Agents.",
      path: "/real-estate", // Step 3
    },
    {
      icon: <FaSackDollar size={32} style={{ color: "#1ec8c8" }} />,
      title: "Wholesalers",
      description: "Specialized tools for Wholesalers.",
      path: "/wholesalers",
    },
    {
      icon: <FaSheetPlastic size={32} style={{ color: "#1ec8c8" }} />,
      title: "Probate Specialists",
      description: "Specialized tools for Probate Specialists.",
      path: "/probate",
    },
    {
      icon: <FaHammer size={32} style={{ color: "#1ec8c8" }} />,
      title: "Home Flippers",
      description: "Specialized tools for Home flippers.",
      path: "/home-flippers",
    },
  ];

  // Click outside to deselect
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRefs.current.every((ref) => ref && !ref.contains(event.target))) {
        setSelectedCard(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div style={{ backgroundColor: "#1E2A38" }} className="min-h-screen">
      <Header buttonText="Home" navigateTo="/" />
      <h2 className="text-white text-6xl font-bold text-center pt-5 pb-5">
        Build Your Custom Stack
      </h2>
      <p className="text-center text-stone-300 text-2xl">
        Tailored to your real estate business needs
      </p>

      {/* Steps */}
      <div className="flex justify-around items-center pt-10">
        {["Select Role", "Choose Base Plan", "Add Modules"].map((step, i) => (
          <div
            key={i}
            className="flex items-center text-[var(--primary-color)] font-bold text-xl"
          >
            <span className="w-10 h-10 bg-[var(--primary-color)] text-white flex justify-center items-center rounded-full text-2xl mr-2 font-bold">
              {i + 1}
            </span>{" "}
            {step}
          </div>
        ))}
      </div>

      <h2 className="text-white text-center text-4xl font-bold pt-15">
        What type of real estate professional are you?
      </h2>

      {/* Cards */}
      <div className="max-w-6xl pt-10 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => (
          <div
            key={idx}
            ref={(el) => (cardRefs.current[idx] = el)}
            onClick={() => {
              setSelectedCard(idx);
              navigate(card.path); // Step 4
            }}
            className={`group cursor-pointer bg-[#2D3A48] rounded-2xl p-6 shadow-md transform transition duration-300 hover:scale-105 hover:bg-[#324250] hover:ring-2 hover:ring-[var(--primary-color)] hover:shadow-xl ${selectedCard === idx ? "ring-2 ring-[var(--primary-color)]" : ""
              }`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 transition-all duration-300 group-hover:rotate-3 group-hover:scale-110">
                {card.icon}
              </div>
              <h3 className="text-xl text-white font-semibold mb-2">
                {card.title}
              </h3>
              <p className="text-ms p-4 text-gray-300 text-center">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
}

export default Pricing;
