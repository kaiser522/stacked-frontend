function LandingPageFour() {
  const cards = [
    {
      title: "Build Your Stack",
      description:
        "Select your profession and choose the modules that match your workflow and business needs. Our platform adapts to your unique business model, whether you're an agent, wholesaler, probate specialist, or house flipper.",
    },
    {
      title: "Import Your Data",
      description:
        "Easily migrate your existing leads and deals or start fresh with our intuitive interfaces. No technical expertise required - we'll help you transfer your valuable business data seamlessly.",
    },
    {
      title: "Scale Your Business",
      description:
        "Use powerful analytics and automated follow-ups to close more deals while doing less work. Our system helps you identify your most profitable lead sources and optimize your business processes for maximum growth.",
    },
  ];

  return (
    <div className="bg-[#1E2A38] sm:py-12 px-4 text-white mb-[20px]">
      <h2 className="heading-2">How It Works</h2>

      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        {cards.map((card, idx) => (
          <div key={idx} className="flex items-start gap-4">
            {/* Number Circle */}
            <div className="flex-shrink-0   w-15 h-15 flex items-center justify-center rounded-full border-2 border-none bg-[#3DCCC7] text-stone-700 font-bold text-2xl mt-2">
              {idx + 1}
            </div>

            {/* Card */}
            <div className="bg-[#2D3A48] m-4 rounded-2xl p-6 shadow-md transition duration-300 hover:bg-[#324250] hover:shadow-xl w-full">
              <h3 className="text-2xl p-2 text-white font-semibold mb-1">
                {card.title}
              </h3>
              <p className="text-md p-2 text-white">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LandingPageFour;
