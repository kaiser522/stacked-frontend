export default function TransactionTimeline() {
  const timeline = [
    {
      marker: "0",
      day: "Day 0–1: Contract Execution",
      title: "Offer Accepted - Start the Clock",
      critical: true,
      tasks: [
        "Execute contract and all addenda",
        "Deliver to all parties and agents",
        "Schedule inspection ASAP",
        "Open title/escrow file",
        "Submit loan application (if not pre-approved)",
      ],
      who: "Listing & buyer's agents coordinate all parties",
    },
    {
      marker: "3",
      day: "Day 2–3: Due Diligence Setup",
      title: "Get All Moving Parts in Motion",
      critical: false,
      tasks: [
        "Schedule appraisal",
        "Order HOA documents (if applicable)",
        "Coordinate survey (if required)",
        "Submit loan documents to lender",
        "Prepare appraisal packet",
      ],
      who: "Buyer's agent leads, seller's agent supports",
    },
    {
      marker: "7",
      day: "Day 4–7: Inspection Period",
      title: "Complete Property Inspection",
      critical: true,
      tasks: [
        "Professional inspection completed",
        "Review inspection report",
        "Negotiate repairs/credits if needed",
        "Execute inspection addendum",
        "Remove inspection contingency",
      ],
      who: "Buyer arranges, both agents negotiate resolution",
    },
    {
      marker: "10",
      day: "Day 8–12: Appraisal & Documentation",
      title: "Appraisal Completed & Loan Processing",
      critical: false,
      tasks: [
        "Appraisal inspection occurs",
        "Submit additional loan documents",
        "Review preliminary title commitment",
        "Address any title issues",
        "Continue loan underwriting process",
      ],
      who: "Lender coordinates appraisal, agents monitor progress",
    },
    {
      marker: "15",
      day: "Day 13–18: Appraisal Results & Loan Progress",
      title: "Receive Appraisal & Continue Underwriting",
      critical: false,
      tasks: [
        "Appraisal report received",
        "Address any valuation issues",
        "Submit final loan documents",
        "Complete loan underwriting",
        "Prepare for loan approval",
      ],
      who: "Lender manages process, agents handle any negotiations",
    },
    {
      marker: "22",
      day: "Day 19–25: Loan Approval & Final Prep",
      title: "Clear to Close & Closing Preparation",
      critical: true,
      tasks: [
        'Receive "Clear to Close" from lender',
        "Schedule final walkthrough",
        "Complete any required repairs",
        "Prepare closing documents",
        "Coordinate closing logistics",
      ],
      who: "Title company prepares docs, agents coordinate parties",
    },
    {
      marker: "27",
      day: "Day 26–28: Final Walkthrough & Document Review",
      title: "Final Walkthrough & Closing Document Review",
      critical: false,
      tasks: [
        "Conduct final walkthrough",
        "Review closing disclosure",
        "Address any final issues",
        "Confirm funds for closing",
        "Final coordination with all parties",
      ],
      who: "Buyer's agent leads walkthrough, all parties review docs",
    },
    {
      marker: "30",
      day: "Day 30: Closing Day",
      title: "Sign Documents & Transfer Ownership",
      critical: true,
      tasks: [
        "Sign closing documents",
        "Transfer funds",
        "Record deed",
        "Hand over keys",
        "Celebrate successful closing!",
      ],
      who: "Title company conducts closing, agents attend with clients",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-sky-800 text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Header */}
        <header className="text-center mb-12 sm:mb-16 p-8 sm:p-12 bg-white/10 border border-white/20 rounded-2xl backdrop-blur">
          <div className="w-16 h-16 mx-auto mb-6 rounded-lg bg-orange-500 grid place-items-center text-2xl font-bold">
            📄
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Transaction Timeline (Offer → Close)
          </h1>
          <div className="inline-block mt-5 px-6 py-2 rounded-full bg-emerald-400 text-slate-800 font-semibold">
            Timeline
          </div>
          <p className="mt-4 text-sky-200 max-w-xl mx-auto">
            Milestones, documents, and who-does-what-when so clients stay calm
            and closings stay boring (in a good way).
          </p>
          <div className="inline-block mt-4 px-5 py-2 rounded-full bg-white/10 font-semibold">
            12 min read
          </div>
        </header>

        {/* Success factors */}
        <section className="mb-10 p-8 bg-white/10 rounded-2xl border border-white/20">
          <div className="text-center font-bold text-lg rounded-2xl p-6 bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-900">
            98% of transactions close on time when agents follow this timeline
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="rounded-2xl border-2 border-emerald-400 p-6 bg-white/10">
              <h3 className="text-emerald-400 text-xl font-semibold mb-3">
                🎯 Timeline Success Factors:
              </h3>
              <ul className="list-disc list-inside text-sky-100 space-y-2">
                <li>Clear milestone communication to all parties</li>
                <li>Proactive document collection</li>
                <li>Regular status updates</li>
                <li>Early identification of potential issues</li>
                <li>Backup plans for common delays</li>
              </ul>
            </div>

            <div className="rounded-2xl border-2 border-emerald-400 p-6 bg-white/10">
              <h3 className="text-emerald-400 text-xl font-semibold mb-3">
                ⚠️ Common Delay Causes:
              </h3>
              <ul className="list-disc list-inside text-sky-100 space-y-2">
                <li>Missing appraisal documentation</li>
                <li>Incomplete loan file</li>
                <li>Last-minute inspection issues</li>
                <li>Title/survey problems</li>
                <li>Final walkthrough surprises</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-10 p-8 bg-white/10 rounded-2xl border border-white/20">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            30-Day Transaction Timeline
          </h2>
          <p className="text-sky-100">
            Critical milestones and tasks from accepted offer to closing:
          </p>

          <div className="relative mt-8">
            {/* vertical line */}
            <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-1 rounded bg-gradient-to-b from-emerald-400 to-orange-500" />

            <div className="space-y-10">
              {timeline.map((item, idx) => (
                <div key={idx} className="relative pl-16 sm:pl-20">
                  {/* marker */}
                  <div
                    className={[
                      "absolute left-2 sm:left-3 top-1 w-10 h-10 rounded-full grid place-items-center text-sm font-bold z-10",
                      item.critical ? "bg-orange-500" : "bg-emerald-400",
                    ].join(" ")}
                  >
                    {item.marker}
                  </div>

                  {/* card */}
                  <div
                    className={[
                      "rounded-xl p-6 border-l-4 bg-white/10",
                      item.critical
                        ? "border-orange-500"
                        : "border-emerald-400",
                    ].join(" ")}
                  >
                    <div
                      className={[
                        "font-bold text-base mb-1",
                        item.critical ? "text-orange-400" : "text-emerald-400",
                      ].join(" ")}
                    >
                      {item.day}
                    </div>
                    <div className="text-xl font-semibold text-sky-50 mb-2">
                      {item.title}
                    </div>
                    <ul className="text-sky-200 space-y-1 list-none pl-0">
                      {item.tasks.map((t, i) => (
                        <li key={i} className="relative pl-4">
                          <span className="absolute left-0 text-yellow-300 font-bold">
                            •
                          </span>
                          {t}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 text-slate-900 bg-yellow-400/20 rounded-md px-3 py-2 text-sm">
                      <strong className="text-yellow-300">Who:</strong>{" "}
                      {item.who}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Critical dates */}
        <section className="mb-10 p-8 bg-white/10 rounded-2xl border border-white/20">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            Critical Dates Quick Reference
          </h2>
          <p className="text-sky-100">Key deadlines that can't be missed:</p>

          <div className="mt-4 rounded-2xl border-2 border-yellow-400 p-6 bg-yellow-400/10">
            <h3 className="text-yellow-300 text-xl font-semibold mb-4">
              ⚡ Non-Negotiable Deadlines
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                ["Day 7", "Inspection Contingency Removal"],
                ["Day 21", "Financing Contingency Removal"],
                ["Day 30", "Closing Date"],
              ].map(([d, l]) => (
                <div
                  key={d}
                  className="text-center rounded-lg p-4 bg-orange-500/20"
                >
                  <div className="text-orange-400 font-bold text-lg">{d}</div>
                  <div className="text-sky-100 text-sm">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-2xl border-2 border-emerald-400 p-6 bg-emerald-400/10">
            <h3 className="text-emerald-300 text-xl font-semibold mb-2">
              📅 Client Communication Schedule
            </h3>
            <ul className="list-disc list-inside text-sky-100 space-y-2">
              <li>
                <strong>Weekly:</strong> Send status updates to all parties
              </li>
              <li>
                <strong>Pre-deadline:</strong> 48-hour reminders for major
                milestones
              </li>
              <li>
                <strong>Issues arise:</strong> Immediate communication with
                solutions
              </li>
              <li>
                <strong>Clear to close:</strong> Coordinate final walkthrough
                and closing logistics
              </li>
            </ul>
          </div>
        </section>

        {/* Emergency playbook */}
        <section className="mb-10 p-8 bg-white/10 rounded-2xl border border-white/20">
          <h2 className="text-3xl font-bold text-emerald-300 mb-2">
            When Things Go Sideways
          </h2>
          <p className="text-sky-100">
            Common issues and immediate response strategies:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="rounded-2xl p-6 bg-orange-500/10">
              <h3 className="text-orange-400 text-xl font-semibold mb-2">
                🚨 Low Appraisal
              </h3>
              <ul className="list-disc list-inside text-sky-100 text-sm space-y-1">
                <li>Request appraisal review with additional comps</li>
                <li>Negotiate price reduction with seller</li>
                <li>Buyer increases down payment</li>
                <li>Split the difference</li>
                <li>Cancel contract if no resolution</li>
              </ul>
            </div>

            <div className="rounded-2xl p-6 bg-yellow-400/10">
              <h3 className="text-yellow-300 text-xl font-semibold mb-2">
                ⚠️ Loan Delays
              </h3>
              <ul className="list-disc list-inside text-sky-100 text-sm space-y-1">
                <li>Request extension from seller immediately</li>
                <li>Provide detailed timeline from lender</li>
                <li>Consider backup financing options</li>
                <li>Keep all parties informed daily</li>
                <li>Prepare contingency plans</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border-2 border-yellow-400 p-5 bg-yellow-400/10">
            <p className="text-yellow-300 font-bold mb-1">💡 Pro Tip:</p>
            <p className="text-sky-100">
              Always communicate delays to all parties immediately with specific
              timelines and solutions. Transparency prevents bigger problems
              later.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center p-8 bg-white/10 rounded-2xl border border-white/20">
          <p className="text-sky-200">
            Stacked • Real Estate CRM • Transaction Mastery Series
          </p>
        </footer>
      </div>
    </div>
  );
}
