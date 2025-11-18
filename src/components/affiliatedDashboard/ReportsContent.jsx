import { Download } from "lucide-react";

function ReportsContent({ referrals, payouts, handleExport }) {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-6 text-[var(--primary-color)]">Download Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#324250] p-6 rounded">
            <h3 className="text-lg font-medium mb-4">Referral Activity Report</h3>
            <p className="text-slate-300 mb-4">Download a detailed report of all your referral activity, including pending and completed commissions.</p>
            <div className="flex items-center gap-4">
              <select className="bg-[#2A3A48] text-white p-2 rounded border border-slate-500 focus:outline-none focus:border-[var(--primary-color)]">
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>Last 6 months</option>
                <option>All time</option>
              </select>
              <button onClick={() => handleExport(referrals, 'referral-activity-report.csv')} className="flex items-center gap-2 bg-[var(--primary-color)] hover:bg-teal-300 text-white py-2 px-4 rounded transition-colors">
                <Download size={18} />
                Download CSV
              </button>
            </div>
          </div>
          <div className="bg-[#324250] p-6 rounded">
            <h3 className="text-lg font-medium mb-4">Payout History Report</h3>
            <p className="text-slate-300 mb-4">Download a complete history of all your affiliate payouts, including payment methods and statuses.</p>
            <div className="flex items-center gap-4">
              <select className="bg-[#2A3A48] text-white p-2 rounded border border-slate-500 focus:outline-none focus:border-[var(--primary-color)]">
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>Last 6 months</option>
                <option>All time</option>
              </select>
              <button onClick={() => handleExport(payouts, 'payout-history-report.csv')} className="flex items-center gap-2 bg-[var(--primary-color)]  hover:bg-teal-300 text-white py-2 px-4 rounded transition-colors">
                <Download size={18} />
                Download CSV
              </button>
            </div>
          </div>
          <div className="bg-[#324250] p-6 rounded">
            <h3 className="text-lg font-medium mb-4">Performance Analytics</h3>
            <p className="text-slate-300 mb-4">Download comprehensive analytics about your affiliate performance, including conversion rates and trends.</p>
            <div className="flex items-center gap-4">
              <select className="bg-[#2A3A48] text-white p-2 rounded border border-slate-500 focus:outline-none focus:border-[var(--primary-color)]">
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>Last 6 months</option>
                <option>All time</option>
              </select>
              <button className="flex items-center gap-2 bg-[var(--primary-color)] hover:bg-teal-300 text-white py-2 px-4 rounded transition-colors">
                <Download size={18} />
                Download CSV
              </button>
            </div>
          </div>
          <div className="bg-[#324250] p-6 rounded">
            <h3 className="text-lg font-medium mb-4">Tax Documentation</h3>
            <p className="text-slate-300 mb-4">Download tax related documents for your affiliate earnings.</p>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>2024 Tax Year Form</span>
                <button className="flex items-center gap-2 text-[var(--primary-color)] hover:text-teal-300">
                  <Download size={18} />
                  Download PDF
                </button>
              </div>
              <div className="flex justify-between items-center">
                <span>2023 Tax Year Form</span>
                <button className="flex items-center gap-2 text-[var(--primary-color)] hover:text-teal-300">
                  <Download size={18} />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default ReportsContent