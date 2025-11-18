import { Download, ChevronDown, ChevronUp, AlertCircle } from "lucide-react";
import { useState } from "react";

function PayoutsTable({ payouts, handleExport }) {
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "descending",
  });
  const [expandedPayout, setExpandedPayout] = useState(null);

  // Minimum monthly threshold for payout eligibility (matches AffiliateDetails commission plan)
  const MINIMUM_THRESHOLD = 150;

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedPayouts = [...payouts].sort((a, b) => {
    if (!sortConfig.key) return 0;

    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const togglePayoutDetails = (id) => {
    setExpandedPayout(expandedPayout === id ? null : id);
  };

  // Check if payout is eligible based on threshold
  const isEligiblePayout = (amount) => {
    return amount >= MINIMUM_THRESHOLD;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-[var(--primary-color)]">
          Your Payouts
        </h2>
        <button
          onClick={() => handleExport()}
          className="bg-[var(--primary-color)] hover:bg-teal-300 text-white py-2 px-4 rounded transition-colors flex items-center gap-2"
        >
          <Download size={18} />
          Export
        </button>
      </div>

      <div className="bg-slate-800 p-4 mb-6 rounded-lg text-slate-300 border-l-4 border-[var(--primary-color)] flex items-start">
        <AlertCircle
          className="mr-2 text-[var(--primary-color)] mt-1 flex-shrink-0"
          size={20}
        />
        <div>
          <p className="font-bold text-[var(--primary-color)]">
            Payment Threshold Information
          </p>
          <p className="font-light">
            Affiliates must generate at least $150 in commissions monthly to be
            eligible for payouts. Commissions do not roll over—if the $150
            minimum is not met in a given month, no payout will be issued for
            that period.{" "}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-[#324250]">
            <tr>
              <th
                className="p-4 cursor-pointer"
                onClick={() => handleSort("date")}
              >
                <div className="flex items-center gap-1">
                  Date
                  {sortConfig.key === "date" &&
                    (sortConfig.direction === "ascending" ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    ))}
                </div>
              </th>
              <th
                className="p-4 cursor-pointer"
                onClick={() => handleSort("amount")}
              >
                <div className="flex items-center gap-1">
                  Amount
                  {sortConfig.key === "amount" &&
                    (sortConfig.direction === "ascending" ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    ))}
                </div>
              </th>
              <th
                className="p-4 cursor-pointer"
                onClick={() => handleSort("status")}
              >
                <div className="flex items-center gap-1">
                  Status
                  {sortConfig.key === "status" &&
                    (sortConfig.direction === "ascending" ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    ))}
                </div>
              </th>
              <th className="p-4">Eligibility</th>
              <th className="p-4">Details</th>
            </tr>
          </thead>
          <tbody>
            {sortedPayouts.map((payout) => (
              <>
                <tr
                  key={payout.id}
                  className="border-b border-slate-700 hover:bg-[#324250]"
                >
                  <td className="p-4">
                    {new Date(payout.date).toLocaleDateString()}
                  </td>
                  <td className="p-4">${payout.amount}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        isEligiblePayout(payout.amount)
                          ? payout.status === "Pending"
                            ? "bg-yellow-900 text-yellow-300"
                            : "bg-green-900 text-green-300"
                          : "bg-red-900 text-red-300"
                      }`}
                    >
                      {isEligiblePayout(payout.amount)
                        ? payout.status
                        : "Ineligible"}
                    </span>
                  </td>
                  <td className="p-4">
                    {isEligiblePayout(payout.amount) ? (
                      <span className="text-green-300">Meets threshold</span>
                    ) : (
                      <span className="text-red-300">Below threshold</span>
                    )}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => togglePayoutDetails(payout.id)}
                      className="text-[var(--primary-color)] hover:text-teal-300"
                    >
                      {expandedPayout === payout.id ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </button>
                  </td>
                </tr>
                {expandedPayout === payout.id && (
                  <tr className="bg-slate-900">
                    <td colSpan="5" className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="font-medium">Payment ID</p>
                          <p>{payout.id}</p>
                        </div>
                        <div>
                          <p className="font-medium">Payment Method</p>
                          <p>Bank Transfer</p>
                          <p>Account: {payout.accountNumber}</p>
                        </div>
                        <div>
                          <p className="font-medium">Payment Details</p>
                          <p>Amount: ${payout.amount}</p>
                          <p>
                            Status:{" "}
                            {isEligiblePayout(payout.amount)
                              ? payout.status
                              : "Ineligible - Below minimum threshold"}
                          </p>
                          <p>
                            {!isEligiblePayout(payout.amount) &&
                              `Threshold Not Met: Amount will roll over (${
                                MINIMUM_THRESHOLD - payout.amount
                              } more needed)`}
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PayoutsTable;
