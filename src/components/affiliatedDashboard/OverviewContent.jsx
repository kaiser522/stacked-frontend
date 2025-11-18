    function OverviewContent({ referrals }) {
      return (
        <div>
          <h2 className="text-xl font-semibold mb-6 text-[var(--primary-color)]">Dashboard Overview</h2>
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4 text-white">Recent Activity</h3>
            <div className="space-y-4">
              {referrals.slice(0, 3).map(ref => (
                <div key={ref.id} className="bg-[#324250] p-4 rounded flex justify-between items-center">
                  <div>
                    <p className="font-medium">{ref.name}</p>
                    <p className="text-sm text-slate-300">Subscribed to {ref.plan} on {new Date(ref.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${ref.commission}</p>
                    <p className={`text-sm ${ref.status === 'Pending' ? 'text-yellow-400' : 'text-green-400'}`}>{ref.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-[#324250] p-4 rounded">
              <h3 className="text-lg font-medium mb-2">Conversion Rate</h3>
              <p className="text-2xl font-bold text-[var(--primary-color)]">32%</p>
              <p className="text-sm text-slate-300">+5% from last month</p>
            </div>
            <div className="bg-[#324250] p-4 rounded">
              <h3 className="text-lg font-medium mb-2">Average Commission</h3>
              <p className="text-2xl font-bold text-[var(--primary-color)]">$83</p>
              <p className="text-sm text-slate-300">Based on last 30 days</p>
            </div>
          </div>
          <div className="bg-[#324250] p-4 rounded mb-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">Next Payout</h3>
                <p className="text-sm text-slate-300">Estimated for May 1, 2025</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-[var(--primary-color)]">$105</p>
                <p className="text-sm text-slate-300">Pending commissions</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    export default OverviewContent