function LandingPagetwo() {
  const cards = [
    {
      title: "Agents",
      description:
        "Specialized tools to manage client relationships, track listings, and close more deals with less effort.",
    },
    {
      title: "Wholesalers",
      description:
        "Find motivated sellers, manage your buyer's list, and analyze deals with precision before assigning contracts.",
    },
    {
      title: "Probate",
      description:
        "Streamlined workflows for managing probate leads, communicating with heirs, and navigating complex probate transactions.",
    },
    {
      title: "Flippers",
      description:
        "Track renovation costs, manage contractors, and analyze potential profits with specialized rehab calculators.",
    },
  ];

  return (
    <div className="bg-[#1E2A38] py-12 px-4 text-white">
      <h2 className="heading-2">Who It's For</h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="group bg-[#FFFFFF] rounded-2xl p-6 shadow-md transform transition duration-300 hover:scale-105 hover:bg-[#EEEEEE] hover:shadow-xl"
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 transition-all duration-300 group-hover:rotate-3 group-hover:scale-110">
                {card.icon}
              </div>
              <h3 className="text-3xl text-gray-600 font-semibold mb-2">
                {card.title}
              </h3>
              <p className="text-md p-4 text-gray-600 text-center">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LandingPagetwo;
