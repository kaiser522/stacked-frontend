import { useEffect, useMemo, useState } from "react";

export default function ClosingProcessChecklist() {
  // ---------- Data ----------
  const OWNER_OPTIONS = [
    "",
    "Agent",
    "Buyer",
    "Lender",
    "Title",
    "Buyer/Agent",
    "Buyer/Lender",
    "Lender/Agent",
    "Lender/Buyer",
    "Title/Agent",
    "All",
  ];

  const TASKS = [
    {
      id: "contract",
      text: "Deliver signed contract to lender and title; open escrow.",
      owner: "Agent",
    },
    { id: "emd", text: "Deposit earnest money.", owner: "Buyer" },
    {
      id: "scheduleInspections",
      text: "Schedule inspections; provide access.",
      owner: "Buyer/Agent",
    },
    {
      id: "inspectReview",
      text: "Review inspection report; negotiate repairs or credits.",
      owner: "Buyer/Agent",
    },
    {
      id: "insuranceBinder",
      text: "Choose homeowner's insurance; send binder to lender.",
      owner: "Buyer",
    },
    { id: "orderAppraisal", text: "Lender orders appraisal.", owner: "Lender" },
    {
      id: "uwDocs",
      text: "Provide lender any requested documents for underwriting.",
      owner: "Buyer",
    },
    {
      id: "titleSearch",
      text: "Order title search; clear liens/issues if any.",
      owner: "Title",
    },
    {
      id: "hoaDocs",
      text: "Confirm HOA/condo docs delivered and reviewed (if applicable).",
      owner: "Agent/Buyer",
    },
    {
      id: "rateLock",
      text: "Lock interest rate (if not already).",
      owner: "Buyer/Lender",
    },
    {
      id: "receiveAppraisal",
      text: "Receive appraisal; address value gap if needed.",
      owner: "Lender/Agent",
    },
    {
      id: "finalApproval",
      text: "Obtain final loan approval (clear conditions).",
      owner: "Lender/Buyer",
    },
    {
      id: "reviewCD",
      text: "Review Closing Disclosure (CD) at least 3 business days before close.",
      owner: "Buyer/Lender",
    },
    {
      id: "fundsWire",
      text: "Arrange certified funds/wire; verify instructions by phone.",
      owner: "Buyer",
    },
    {
      id: "finalWalk",
      text: "Schedule final walk-through.",
      owner: "Agent/Buyer",
    },
    {
      id: "utilities",
      text: "Transfer/activate utilities for move-in.",
      owner: "Buyer",
    },
    {
      id: "bringIDs",
      text: "Bring IDs and any required docs to closing.",
      owner: "Buyer",
    },
    { id: "signDocs", text: "Sign closing documents.", owner: "All" },
    {
      id: "recordingKeys",
      text: "Funding & recording confirmed; keys/possession per contract.",
      owner: "Title/Agent",
    },
  ];

  const DOCS = [
    "Closing Disclosure (CD)",
    "Loan Note and Deed of Trust/Mortgage",
    "Escrow/Impound disclosures",
    "Title Commitment and Owner's Title Policy",
    "Wire instructions from title company",
    "Government-issued ID(s)",
    "Homeowner's insurance binder",
    "Final walk-through form",
    "Bill of sale / personal property addendum (if applicable)",
  ];

  const CONTACT_ROLES = [
    { key: "agent", label: "Agent" },
    { key: "lender", label: "Lender" },
    { key: "title", label: "Title/Escrow" },
    { key: "buyer", label: "Buyer" },
    { key: "sellerAgent", label: "Seller's Agent" },
  ];

  // ---------- Local Storage Keys ----------
  const LS_TASKS = "closingChecklist:tasks";
  const LS_DOCS = "closingChecklist:docs";
  const LS_CONTACTS = "closingChecklist:contacts";

  // ---------- State ----------
  const [taskState, setTaskState] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_TASKS);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const [docChecks, setDocChecks] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_DOCS);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const [contacts, setContacts] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_CONTACTS);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  // ---------- Effects ----------
  useEffect(() => {
    try {
      localStorage.setItem(LS_TASKS, JSON.stringify(taskState));
    } catch {}
  }, [taskState]);

  useEffect(() => {
    try {
      localStorage.setItem(LS_DOCS, JSON.stringify(docChecks));
    } catch {}
  }, [docChecks]);

  useEffect(() => {
    try {
      localStorage.setItem(LS_CONTACTS, JSON.stringify(contacts));
    } catch {}
  }, [contacts]);

  // ---------- Derived ----------
  const completedTasks = useMemo(
    () => TASKS.filter((t) => taskState[t.id]?.checked).length,
    [taskState]
  );
  const progressPct = Math.round((completedTasks / TASKS.length) * 100);

  // ---------- Helpers ----------
  const setTaskField = (id, field, value) =>
    setTaskState((s) => ({ ...s, [id]: { ...(s[id] || {}), [field]: value } }));

  const setContactField = (roleKey, field, value) =>
    setContacts((c) => ({
      ...c,
      [roleKey]: { ...(c[roleKey] || {}), [field]: value },
    }));

  // ---------- UI ----------
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-sky-800 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Header */}
        <header className="text-center mb-12 sm:mb-16 p-8 sm:p-12 bg-white/10 border border-white/20 rounded-2xl backdrop-blur">
          <div className="w-16 h-16 mx-auto mb-6 rounded-lg bg-orange-500 grid place-items-center text-2xl font-bold">
            🏠
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Closing Process Checklist
          </h1>
          <div className="inline-block mt-5 px-6 py-2 rounded-full bg-emerald-400 text-slate-800 font-semibold">
            Checklist
          </div>
          <p className="mt-4 text-sky-200 max-w-2xl mx-auto">
            Step-by-step checklist for managing the closing process from
            contract to keys, ensuring nothing is missed.
          </p>
          <div className="inline-block mt-4 px-5 py-2 rounded-full bg-white/10 font-semibold">
            Contract to keys
          </div>
        </header>

        {/* How to Use */}
        <section className="mb-8">
          <div className="rounded-2xl border-2 border-orange-500 bg-orange-500/20 p-6">
            <h3 className="text-orange-400 text-2xl font-semibold mb-2">
              📝 How to Use This Checklist
            </h3>
            <p>
              Check off each task and note who owns it (Buyer, Agent, Lender,
              Title) and the due date.
            </p>
            <div className="mt-5 text-center font-bold text-lg rounded-2xl p-5 bg-gradient-to-r from-orange-500 to-orange-600">
              🚨 Wire Safety: Always verify wire instructions by calling a known
              number for the title company. Do not rely on email alone.
            </div>
          </div>
        </section>

        {/* Progress */}
        <section className="mb-8 p-8 bg-white/10 rounded-2xl border border-white/20">
          <h2 className="text-3xl font-bold text-emerald-300 mb-4">
            Your Closing Progress
          </h2>
          <div className="bg-black/30 rounded-lg p-1">
            <div
              className="h-5 sm:h-6 rounded-md bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center text-slate-900 font-bold text-xs sm:text-sm transition-all"
              style={{ width: `${progressPct}%` }}
              id="progressBar"
            >
              {progressPct}% Complete
            </div>
          </div>
          <p className="text-center mt-3 text-sky-200">
            Track your progress through the closing process
          </p>
        </section>

        {/* Checklist */}
        <section className="mb-8 p-8 bg-white/10 rounded-2xl border border-white/20">
          <h2 className="text-3xl font-bold text-emerald-300">
            Contract-to-Close Checklist
          </h2>
          <p className="text-sky-100 mb-5">
            Complete these tasks to ensure a smooth closing process:
          </p>

          <div className="rounded-xl border-2 border-emerald-400 bg-emerald-400/20 p-6">
            <h3 className="text-emerald-300 text-2xl font-semibold mb-4">
              📋 Essential Tasks
            </h3>

            <div className="space-y-3">
              {TASKS.map((t) => {
                const state = taskState[t.id] || {};
                return (
                  <div
                    key={t.id}
                    className={[
                      "grid items-center gap-3 rounded-lg p-4 transition-transform bg-white/10",
                      state.checked
                        ? "bg-emerald-400/30 border-l-4 border-emerald-400 translate-x-1"
                        : "",
                    ].join(" ")}
                    style={{
                      gridTemplateColumns: "auto 1fr 140px 200px",
                    }}
                  >
                    <input
                      type="checkbox"
                      className="scale-150 cursor-pointer accent-emerald-400"
                      checked={!!state.checked}
                      onChange={(e) =>
                        setTaskField(t.id, "checked", e.target.checked)
                      }
                    />

                    <div className="text-sky-50 text-base">
                      <strong>{t.text}</strong>
                    </div>

                    <select
                      className="rounded-md border border-white/30 bg-white/20 px-3 py-2 text-white text-sm"
                      value={state.owner ?? t.owner ?? ""}
                      onChange={(e) =>
                        setTaskField(t.id, "owner", e.target.value)
                      }
                    >
                      {OWNER_OPTIONS.map((o) => (
                        <option
                          key={o}
                          value={o}
                          className="bg-slate-800 text-white"
                        >
                          {o || "Owner"}
                        </option>
                      ))}
                    </select>

                    <input
                      type="text"
                      placeholder="Due date / Notes"
                      className="w-full rounded-md border border-white/30 bg-white/10 px-3 py-2 text-white text-sm placeholder-white/60"
                      value={state.notes || ""}
                      onChange={(e) =>
                        setTaskField(t.id, "notes", e.target.value)
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Documents */}
        <section className="mb-8 p-8 bg-white/10 rounded-2xl border border-white/20">
          <h2 className="text-3xl font-bold text-emerald-300 mb-1">
            Common Closing Documents
          </h2>
          <p className="text-sky-100 mb-5">
            Track which documents you've received or reviewed:
          </p>

          <div className="rounded-2xl border-2 border-yellow-400 bg-yellow-400/10 p-6">
            <h3 className="text-yellow-300 text-2xl font-semibold mb-4">
              📄 Document Checklist
            </h3>

            <div className="space-y-2">
              {DOCS.map((d, idx) => (
                <label
                  key={idx}
                  className={[
                    "flex items-center gap-3 rounded-lg p-4 cursor-pointer transition-transform bg-white/10",
                    docChecks[idx]
                      ? "bg-yellow-300/30 border-l-4 border-yellow-300 translate-x-1"
                      : "",
                  ].join(" ")}
                >
                  <input
                    type="checkbox"
                    className="scale-150 cursor-pointer accent-yellow-300"
                    checked={!!docChecks[idx]}
                    onChange={(e) =>
                      setDocChecks((s) => ({ ...s, [idx]: e.target.checked }))
                    }
                  />
                  <div className="flex-1 text-sky-50 font-semibold">{d}</div>
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* Contacts */}
        <section className="mb-8 p-8 bg-white/10 rounded-2xl border border-white/20">
          <h2 className="text-3xl font-bold text-emerald-300">Key Contacts</h2>
          <p className="text-sky-100 mb-5">
            Keep all important contact information in one place:
          </p>

          <div className="rounded-2xl border-2 border-orange-500 bg-orange-500/20 p-6">
            <h3 className="text-orange-400 text-2xl font-semibold mb-4">
              📞 Contact Information
            </h3>

            {/* Header */}
            <div
              className="grid gap-3 bg-white/10 rounded-lg p-3 font-bold text-orange-400 text-center"
              style={{ gridTemplateColumns: "120px 1fr 1fr 1fr 1fr" }}
            >
              <div>Role</div>
              <div>Name</div>
              <div>Company</div>
              <div>Phone</div>
              <div>Email</div>
            </div>

            {/* Rows */}
            <div className="mt-3 space-y-3">
              {CONTACT_ROLES.map((r) => {
                const v = contacts[r.key] || {};
                return (
                  <div
                    key={r.key}
                    className="grid gap-3 bg-white/10 rounded-lg p-3 items-center"
                    style={{ gridTemplateColumns: "120px 1fr 1fr 1fr 1fr" }}
                  >
                    <div className="font-bold text-orange-300">{r.label}</div>
                    <input
                      type="text"
                      className="rounded-md border border-white/20 bg-white/10 px-3 py-2 text-white text-sm placeholder-white/60"
                      placeholder={`${r.label} name`}
                      value={v.name || ""}
                      onChange={(e) =>
                        setContactField(r.key, "name", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      className="rounded-md border border-white/20 bg-white/10 px-3 py-2 text-white text-sm placeholder-white/60"
                      placeholder="Company"
                      value={v.company || ""}
                      onChange={(e) =>
                        setContactField(r.key, "company", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      className="rounded-md border border-white/20 bg-white/10 px-3 py-2 text-white text-sm placeholder-white/60"
                      placeholder="Phone number"
                      value={v.phone || ""}
                      onChange={(e) =>
                        setContactField(r.key, "phone", e.target.value)
                      }
                    />
                    <input
                      type="email"
                      className="rounded-md border border-white/20 bg-white/10 px-3 py-2 text-white text-sm placeholder-white/60"
                      placeholder="Email address"
                      value={v.email || ""}
                      onChange={(e) =>
                        setContactField(r.key, "email", e.target.value)
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Success */}
        <section className="mb-10">
          <div className="text-center font-bold text-lg rounded-2xl p-6 bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-900">
            Stay on track = Smooth closing + Keys on time! 🔑
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center p-8 bg-white/10 rounded-2xl border border-white/20">
          <p className="text-sky-200">
            Stacked • Real Estate CRM • Transaction Mastery Series
          </p>
        </footer>
      </div>

      {/* Responsive tweaks */}
      <style>{`
        @media (max-width: 900px) {
          .grid[style*="auto 1fr 140px 200px"] {
            grid-template-columns: auto 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
