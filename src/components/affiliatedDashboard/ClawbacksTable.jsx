 function ClawbacksTable({ clawbacks, searchTerm, handleExport }) {
      const filteredClawbacks = clawbacks.filter(clawback => 
        clawback.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clawback.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clawback.plan.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return (
        <div>
          <div className="flex justify-between items-center mb-6 ]">
            <h2 className="text-xl font-semibold text-[var(--primary-color)]">Clawbacks</h2>
          </div>
          <p className="mb-4 text-slate-300">These are commissions that were revoked due to subscription refunds or cancellations within the refund period.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#324250]">
                <tr>
                  <th className="p-4">Date</th>
                  <th className="p-4">Referral Name</th>
                  <th className="p-4">Plan</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Reason</th>
                </tr>
              </thead>
              <tbody>
                {filteredClawbacks.map(clawback => (
                  <tr key={clawback.id} className="border-b border-slate-700 hover:bg-[#324250]">
                    <td className="p-4">{new Date(clawback.date).toLocaleDateString()}</td>
                    <td className="p-4">{clawback.name}</td>
                    <td className="p-4">{clawback.plan}</td>
                    <td className="p-4">${clawback.amount}</td>
                    <td className="p-4">{clawback.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    export default ClawbacksTable