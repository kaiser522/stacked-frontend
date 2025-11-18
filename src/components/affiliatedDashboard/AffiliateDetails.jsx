import { FaCheckCircle } from "react-icons/fa";

export default function AffiliateDetails() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Top Two Cards in Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Commission Plan */}
        <section className="bg-[var(--lighter-dark)] ring-transparent hover:bg-[#324250] hover:ring-[var(--primary-color)] ring-1 p-6 rounded-xl shadow-md">
          <h2 className="text-xl text-center text-[var(--primary-color)] font-semibold mb-4">
            Affiliate Commission Plan
          </h2>
          <ul className="list-disc space-y-3 text-gray-300 pl-6 text-sm">
            <li className="flex items-start gap-2">
              <FaCheckCircle className="mt-1 text-[var(--primary-color)] shrink-0" />
              <span>
                <strong className="text-white">Commission Structure:</strong>
                &nbsp;Affiliates earn{" "}
                <strong className="text-white">
                  30% commission in Month 1
                </strong>
                , and{" "}
                <strong className="text-white">
                  10% commission for Months 2-12
                </strong>
                . Commissions cap at 12 paid months per referred customer (no commissions after month 12).
              </span>
            </li>

            <li className="flex items-start gap-2">
              <FaCheckCircle className="mt-1 text-[var(--primary-color)] shrink-0" />
              <span>
                <strong className="text-white">Payout Threshold:</strong>
                &nbsp;Minimum{" "}
                <strong className="text-white">$150</strong> in approved commissions required to receive a payout for that month. Sub-minimum amounts roll forward to the next month.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <FaCheckCircle className="mt-1 text-[var(--primary-color)] shrink-0" />
              <span>
                <strong className="text-white">Payout Schedule:</strong>
                &nbsp;Net-14 hold — eligibility begins 14 days after each charge. Payouts are processed by the <strong className="text-white">15th</strong> of each month.
              </span>
            </li>

            {/* <li className="flex items-start gap-2">
              <FaCheckCircle className="mt-1 text-[var(--primary-color)] shrink-0" />
              <span>
                <strong className="text-white">Add-ons:</strong>&nbsp;Affiliates
                also earn 20% commission on any add-ons purchased with the
                initial sale.
              </span>
            </li> */}

            {/* <li className="flex items-start">
              <FaCheckCircle className="mr-2 mt-1 text-[var(--primary-color)]" />
              <strong className="text-white">
                No commissions on renewals or recurring months after the first.
              </strong>
            </li> */}
          </ul>
        </section>

        {/* Payout Policy */}
        <section className="bg-[var(--lighter-dark)] ring-transparent hover:bg-[#324250] hover:ring-[var(--primary-color)] ring-1 p-6 rounded-xl shadow-md">
          <h2 className="text-xl text-center text-[var(--primary-color)] font-semibold mb-4">
            Affiliate Payout & Performance Policy
          </h2>
          <ul className="list-disc space-y-3 text-gray-300 pl-6 text-sm">
            {/* <li className="flex items-start gap-2">
              <FaCheckCircle className="mt-1 text-[var(--primary-color)] shrink-0" />
              <span>
                To receive monthly commission payouts, affiliates must earn a
                minimum of&nbsp;
                <strong className="text-white">
                  $150 in commissions each month
                </strong>
                . Commissions reset monthly, and payouts are only made if this
                threshold is met.
              </span>
            </li> */}

            {/* <li className="flex items-start gap-2">
              <FaCheckCircle className="mt-1 text-[var(--primary-color)] shrink-0" />
              <span>
                To maintain active affiliate status, you must meet or exceed
                this payout minimum for&nbsp;
                <strong className="text-white">3 consecutive months</strong>.
                Failure to do so may lead to termination.
              </span>
            </li> */}

            <li className="flex items-start gap-2">
              <FaCheckCircle className="mt-1 text-[var(--primary-color)] shrink-0" />
              <div>
                <p>
                  <strong className="text-white">
                    Activity Target Requirement:
                  </strong>
                  &nbsp;Refer <strong className="text-white">2+ new paid customers</strong> each calendar month.
                </p>
                <div className="mt-2 space-y-2">
                  <div className="bg-green-900/30 border-l-4 border-green-500 p-2 rounded">
                    <p className="text-gray-300 text-xs leading-tight">
                      <strong className="text-green-400">1st Miss:</strong> No penalty. Automated heads-up sent.
                    </p>
                  </div>
                  <div className="bg-yellow-900/30 border-l-4 border-yellow-500 p-2 rounded">
                    <p className="text-gray-300 text-xs leading-tight">
                      <strong className="text-yellow-400">2nd Consecutive Miss:</strong> Recurring commissions pause for the next month. No back-pay. Resumes once you hit ≥2 in any later month.
                    </p>
                  </div>
                  <div className="bg-red-900/30 border-l-4 border-red-500 p-2 rounded">
                    <p className="text-gray-300 text-xs leading-tight">
                      <strong className="text-red-400">3rd Consecutive Miss:</strong> Recurring commissions end permanently starting next month. Account subject to termination. Month-1 bounties already cleared still pay.
                    </p>
                  </div>
                </div>
              </div>
            </li>
            {/* <li className="flex items-start">
              <FaCheckCircle className="mr-2 mt-1 text-[var(--primary-color)]" />
              Commissions reset monthly.
            </li> */}
          </ul>
        </section>
      </div>

      {/* Third Card Below */}
      <section className="bg-[var(--lighter-dark)] ring-transparent hover:bg-[#324250] hover:ring-[var(--primary-color)] ring-1 p-6 rounded-xl shadow-md">
        <h2 className="text-xl text-center text-[var(--primary-color)] font-semibold mb-6">
          Customer Referral Discount Plan
        </h2>
        <ul className="space-y-3 text-gray-300 pl-1 text-sm">
          <li className="flex items-start">
            <FaCheckCircle className="mr-2 mt-1 text-[var(--primary-color)]" />
            <span>
              <strong className="text-white">Discount:</strong>&nbsp; New
              customers using an affiliate's referral code get{" "}
              <strong className="text-white">15% off monthly.</strong>
            </span>
          </li>
          <li className="flex items-start">
            <FaCheckCircle className="mr-2 mt-1 text-[var(--primary-color)]" />
            <span>
              <strong className="text-white">Auto-renew:</strong> The client
              will continue to get{" "}
              <strong className="text-white">15% off</strong> of the product
              each month in use.
            </span>
          </li>
        </ul>
      </section>
    </div>
  );
}
