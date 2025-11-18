import {
  FaHome,
  FaDollarSign,
  FaUsers,
  FaChalkboard,
  FaParagraph,
  FaChartLine,
  FaDoorClosed,
} from "react-icons/fa";

function LandingPageThree() {
  const cards = [
    {
      icon: <FaChalkboard size={32} style={{ color: "#3DCCC7" }} />,
      title: "Lead Dashboard",
      description:
        "Track leads from initial contact to closing with an intuitive, customizable dashboard. Monitor lead status, set follow-up reminders, and never miss an opportunity again.",
    },
    {
      icon: <FaChartLine size={32} style={{ color: "#3DCCC7" }} />,
      title: "Deal Analyzer",
      description:
        "Evaluate potential deals with built-in calculators tailored to your exit strategies. Run comps, estimate repair costs, and calculate potential profits in minutes, not hours.",
    },
    {
      icon: <FaDoorClosed size={32} style={{ color: "#3DCCC7" }} />,
      title: "Templates for Your Niche",
      description:
        "Access resources designed for different workflows, including scripts and contract templates. Customize them to your business needs and save hours of preparation time.",
    },
  ];

  return (
    <div className="bg-[#1E2A38] py-12 px-4 text-white">
      <h2 className="heading-2">Features</h2>

      <div className="flex flex-col items-center">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className={`w-full max-w-6xl bg-[#2D3A48] p-6 border-b border-[#324250] group transition duration-300 hover:bg-[#324250] flex items-start space-x-4 ${
              idx === 0 ? "rounded-t-xl" : ""
            } ${idx === cards.length - 1 ? "rounded-b-xl border-b-0" : ""}`}
          >
            {/* Icon */}
            <div className="mt-1 p-4 group-hover:scale-110 transition-transform duration-300">
              {card.icon}
            </div>

            {/* Text Content */}
            <div>
              <h3 className="text-2xl p-4 font-semibold mb-1">{card.title}</h3>
              <p className="text-md p-4 text-gray-300">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LandingPageThree;
