import React, { useMemo, useState } from "react";

const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

const parseNumber = (value) => {
    const parsed = parseFloat(value);
    return Number.isFinite(parsed) ? parsed : 0;
};

const Toggle = ({ checked, onChange }) => (
    <label className="relative inline-flex h-7 w-14 cursor-pointer items-center">
        <input
            type="checkbox"
            className="sr-only peer"
            checked={checked}
            onChange={(event) => onChange(event.target.checked)}
        />
        <span className="absolute inset-0 rounded-full bg-slate-600 transition peer-checked:bg-emerald-500" />
        <span className="absolute left-1 h-5 w-5 rounded-full bg-white transition peer-checked:translate-x-7" />
    </label>
);

export default function CommissionCalculator() {
    const [inputs, setInputs] = useState({
        salePrice: "750000",
        commissionRate: "3",
        brokerageSplit: "20",
        teamEnabled: false,
        teamSplit: "30",
        referralEnabled: false,
        referralFee: "25",
        dealCount: "3",
        avgSalePrice: "750000",
    });

    const handleNumberChange = (field) => (event) => {
        setInputs((prev) => ({ ...prev, [field]: event.target.value }));
    };

    const handleToggleChange = (field) => (value) => {
        setInputs((prev) => ({ ...prev, [field]: value }));
    };

    const calculations = useMemo(() => {
        const salePrice = parseNumber(inputs.salePrice);
        const commissionRate = parseNumber(inputs.commissionRate);
        const brokerageSplit = parseNumber(inputs.brokerageSplit);
        const teamSplit = parseNumber(inputs.teamSplit);
        const referralFee = parseNumber(inputs.referralFee);

        const grossCommission = salePrice * (commissionRate / 100);
        const brokerageAmount = grossCommission * (brokerageSplit / 100);
        const afterBrokerage = grossCommission - brokerageAmount;

        const teamAmount = inputs.teamEnabled ? afterBrokerage * (teamSplit / 100) : 0;
        const afterTeam = afterBrokerage - teamAmount;

        const referralAmount = inputs.referralEnabled ? afterTeam * (referralFee / 100) : 0;
        const netCommission = afterTeam - referralAmount;

        const effectiveRate = salePrice > 0 ? (netCommission / salePrice) * 100 : 0;

        return {
            salePrice,
            grossCommission,
            brokerageAmount,
            teamAmount,
            referralAmount,
            netCommission,
            effectiveRate,
        };
    }, [inputs]);

    const forecast = useMemo(() => {
        const dealCount = parseNumber(inputs.dealCount);
        const avgSalePrice = parseNumber(inputs.avgSalePrice);
        const commissionRate = parseNumber(inputs.commissionRate);
        const brokerageSplit = parseNumber(inputs.brokerageSplit);
        const teamSplit = parseNumber(inputs.teamSplit);
        const referralFee = parseNumber(inputs.referralFee);

        const grossCommission = avgSalePrice * (commissionRate / 100);
        const brokerageAmount = grossCommission * (brokerageSplit / 100);
        const afterBrokerage = grossCommission - brokerageAmount;

        const teamAmount = inputs.teamEnabled ? afterBrokerage * (teamSplit / 100) : 0;
        const afterTeam = afterBrokerage - teamAmount;

        const referralAmount = inputs.referralEnabled ? afterTeam * (referralFee / 100) : 0;
        const avgNetCommission = afterTeam - referralAmount;

        const monthlyForecast = avgNetCommission * dealCount;
        const quarterlyForecast = monthlyForecast * 3;
        const annualForecast = monthlyForecast * 12;
        const annualDeals = dealCount * 12;

        return {
            monthlyForecast,
            quarterlyForecast,
            annualForecast,
            annualDeals,
        };
    }, [inputs]);

    const loadScenario = (configuration) => {
        setInputs((prev) => ({
            ...prev,
            salePrice: String(configuration.salePrice),
            commissionRate: String(configuration.commissionRate),
            brokerageSplit: String(configuration.brokerageSplit),
            teamEnabled: configuration.teamEnabled,
            referralEnabled: configuration.referralEnabled,
        }));
    };

    const handleExport = () => {
        const message = `Commission Forecast Saved!

Monthly: ${currencyFormatter.format(forecast.monthlyForecast)}
Annual: ${currencyFormatter.format(forecast.annualForecast)}

Based on ${inputs.dealCount} deals per month`;
        // eslint-disable-next-line no-alert
        alert(message);
    };

    const sectionDisabledClass = "opacity-50 pointer-events-none";

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <div className="mx-auto max-w-5xl px-5 py-10">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold mb-2">Advanced Commission Calculator</h1>
                    <p className="text-slate-400">
                        Manage complex commissions with split, referral, and net commission forecasts
                    </p>
                </header>

                <div className="grid gap-6 lg:grid-cols-2">
                    <div className="space-y-6">
                        <section className="rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
                            <h2 className="text-xl font-semibold mb-4">Transaction Details</h2>

                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Sale Price
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-slate-400">$</span>
                                    <input
                                        type="number"
                                        value={inputs.salePrice}
                                        onChange={handleNumberChange("salePrice")}
                                        className="w-full rounded-lg border border-slate-700 bg-slate-800 pl-8 pr-3 py-2 font-medium text-slate-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/60"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Commission Rate (%)
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={inputs.commissionRate}
                                    onChange={handleNumberChange("commissionRate")}
                                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 font-medium text-slate-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/60"
                                />
                            </div>

                            <div className="mt-6 border-t border-slate-800 pt-4">
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-slate-200">Gross Commission</span>
                                    <span className="text-xl font-bold text-cyan-400">
                                        {currencyFormatter.format(calculations.grossCommission)}
                                    </span>
                                </div>
                            </div>
                        </section>

                        <section className="rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
                            <h2 className="text-xl font-semibold mb-4">Brokerage Split</h2>

                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Brokerage Split (%)
                                </label>
                                <input
                                    type="number"
                                    step="1"
                                    value={inputs.brokerageSplit}
                                    onChange={handleNumberChange("brokerageSplit")}
                                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 font-medium text-slate-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/60"
                                />
                            </div>

                            <div className="flex items-center justify-between rounded-lg bg-slate-700 px-4 py-3 text-sm">
                                <span>Brokerage keeps</span>
                                <span className="font-semibold text-rose-400">
                                    -{currencyFormatter.format(calculations.brokerageAmount)}
                                </span>
                            </div>
                        </section>

                        <section className="rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-xl font-semibold">Team Split</h2>
                                <Toggle
                                    checked={inputs.teamEnabled}
                                    onChange={handleToggleChange("teamEnabled")}
                                />
                            </div>

                            <div className={inputs.teamEnabled ? "" : sectionDisabledClass}>
                                <div className="mb-4">
                                    <label className="mb-2 block text-sm font-medium text-slate-300">
                                        Team Lead Split (%)
                                    </label>
                                    <input
                                        type="number"
                                        step="1"
                                        value={inputs.teamSplit}
                                        onChange={handleNumberChange("teamSplit")}
                                        disabled={!inputs.teamEnabled}
                                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 font-medium text-slate-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/60 disabled:cursor-not-allowed disabled:border-slate-700 disabled:bg-slate-900 disabled:text-slate-500"
                                    />
                                </div>

                                <div className="flex items-center justify-between rounded-lg bg-slate-700 px-4 py-3 text-sm">
                                    <span>Team lead keeps</span>
                                    <span className="font-semibold text-rose-400">
                                        -{currencyFormatter.format(calculations.teamAmount)}
                                    </span>
                                </div>
                            </div>
                        </section>

                        <section className="rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-xl font-semibold">Referral Fee</h2>
                                <Toggle
                                    checked={inputs.referralEnabled}
                                    onChange={handleToggleChange("referralEnabled")}
                                />
                            </div>

                            <div className={inputs.referralEnabled ? "" : sectionDisabledClass}>
                                <div className="mb-4">
                                    <label className="mb-2 block text-sm font-medium text-slate-300">
                                        Referral Fee (%)
                                    </label>
                                    <input
                                        type="number"
                                        step="1"
                                        value={inputs.referralFee}
                                        onChange={handleNumberChange("referralFee")}
                                        disabled={!inputs.referralEnabled}
                                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 font-medium text-slate-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/60 disabled:cursor-not-allowed disabled:border-slate-700 disabled:bg-slate-900 disabled:text-slate-500"
                                    />
                                </div>

                                <div className="flex items-center justify-between rounded-lg bg-slate-700 px-4 py-3 text-sm">
                                    <span>Referral partner keeps</span>
                                    <span className="font-semibold text-rose-400">
                                        -{currencyFormatter.format(calculations.referralAmount)}
                                    </span>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="space-y-6">
                        <section className="rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
                            <h2 className="text-xl font-semibold mb-4">Your Commission</h2>

                            <div className="mb-4 rounded-xl border-2 border-cyan-400/60 bg-slate-800 p-5 text-center shadow-inner">
                                <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
                                    Your Net Commission
                                </p>
                                <p className="mt-2 text-4xl font-bold text-cyan-400">
                                    {currencyFormatter.format(calculations.netCommission)}
                                </p>
                            </div>

                            <div className="rounded-xl border border-slate-700 bg-slate-800 p-5 text-center">
                                <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
                                    Commission Rate on Sale
                                </p>
                                <p className="mt-2 text-3xl font-bold text-slate-100">
                                    {numberFormatter.format(calculations.effectiveRate)}%
                                </p>
                            </div>
                        </section>

                        <section className="rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
                            <h2 className="text-xl font-semibold mb-4">Commission Breakdown</h2>

                            <div className="divide-y divide-slate-800 text-sm">
                                <div className="flex items-center justify-between py-3">
                                    <span className="text-slate-300">Gross Commission:</span>
                                    <span className="font-medium text-slate-100">
                                        {currencyFormatter.format(calculations.grossCommission)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between py-3">
                                    <span className="text-slate-300">
                                        Brokerage Split ({inputs.brokerageSplit}%):
                                    </span>
                                    <span className="font-medium text-rose-400">
                                        -{currencyFormatter.format(calculations.brokerageAmount)}
                                    </span>
                                </div>
                                {inputs.teamEnabled && (
                                    <div className="flex items-center justify-between py-3">
                                        <span className="text-slate-300">
                                            Team Lead Split ({inputs.teamSplit}%):
                                        </span>
                                        <span className="font-medium text-rose-400">
                                            -{currencyFormatter.format(calculations.teamAmount)}
                                        </span>
                                    </div>
                                )}
                                {inputs.referralEnabled && (
                                    <div className="flex items-center justify-between py-3">
                                        <span className="text-slate-300">
                                            Referral Fee ({inputs.referralFee}%):
                                        </span>
                                        <span className="font-medium text-rose-400">
                                            -{currencyFormatter.format(calculations.referralAmount)}
                                        </span>
                                    </div>
                                )}
                                <div className="flex items-center justify-between py-4">
                                    <span className="font-semibold text-slate-100">
                                        Your Net Commission:
                                    </span>
                                    <span className="text-lg font-bold text-cyan-400">
                                        {currencyFormatter.format(calculations.netCommission)}
                                    </span>
                                </div>
                            </div>
                        </section>

                        <section className="rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
                            <h2 className="text-xl font-semibold mb-4">Commission Forecasting</h2>

                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Expected Deals This Month
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    value={inputs.dealCount}
                                    onChange={handleNumberChange("dealCount")}
                                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 font-medium text-slate-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/60"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Average Sale Price
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-slate-400">$</span>
                                    <input
                                        type="number"
                                        value={inputs.avgSalePrice}
                                        onChange={handleNumberChange("avgSalePrice")}
                                        className="w-full rounded-lg border border-slate-700 bg-slate-800 pl-8 pr-3 py-2 font-medium text-slate-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/60"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="rounded-xl border border-slate-700 bg-slate-800 p-5">
                                    <div className="mb-2 flex items-center justify-between text-sm">
                                        <span className="text-slate-400">Monthly Forecast</span>
                                        <span className="text-2xl font-bold text-cyan-400">
                                            {currencyFormatter.format(forecast.monthlyForecast)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm text-slate-400">
                                        <span>Quarterly Forecast</span>
                                        <span className="font-semibold text-slate-200">
                                            {currencyFormatter.format(forecast.quarterlyForecast)}
                                        </span>
                                    </div>
                                </div>

                                <div className="rounded-xl border border-slate-700 bg-slate-800 p-5">
                                    <div className="mb-2 flex items-center justify-between text-sm">
                                        <span className="text-slate-400">Annual Forecast</span>
                                        <span className="text-2xl font-bold text-emerald-400">
                                            {currencyFormatter.format(forecast.annualForecast)}
                                        </span>
                                    </div>
                                    <div className="mt-2 text-xs text-slate-500">
                                        Based on <span className="font-semibold text-slate-300">{forecast.annualDeals}</span>{" "}
                                        deals per year
                                    </div>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleExport}
                                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-700 px-4 py-2 font-medium text-white transition hover:bg-slate-600"
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Save Forecast
                            </button>
                        </section>

                        <section className="rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
                            <h2 className="text-xl font-semibold mb-4">Quick Scenarios</h2>
                            <p className="mb-4 text-sm text-slate-400">
                                Compare different deal structures
                            </p>

                            <div className="space-y-2">
                                <button
                                    type="button"
                                    onClick={() =>
                                        loadScenario({
                                            salePrice: 500000,
                                            commissionRate: 3,
                                            brokerageSplit: 20,
                                            teamEnabled: false,
                                            referralEnabled: false,
                                        })
                                    }
                                    className="flex w-full items-center justify-between rounded-lg bg-slate-700 px-4 py-3 text-left text-sm font-medium text-white transition hover:bg-slate-600"
                                >
                                    <span>$500K Sale, Standard Split</span>
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        loadScenario({
                                            salePrice: 1000000,
                                            commissionRate: 2.5,
                                            brokerageSplit: 15,
                                            teamEnabled: false,
                                            referralEnabled: false,
                                        })
                                    }
                                    className="flex w-full items-center justify-between rounded-lg bg-slate-700 px-4 py-3 text-left text-sm font-medium text-white transition hover:bg-slate-600"
                                >
                                    <span>$1M Sale, Low Split</span>
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        loadScenario({
                                            salePrice: 750000,
                                            commissionRate: 3,
                                            brokerageSplit: 20,
                                            teamEnabled: true,
                                            referralEnabled: false,
                                        })
                                    }
                                    className="flex w-full items-center justify-between rounded-lg bg-slate-700 px-4 py-3 text-left text-sm font-medium text-white transition hover:bg-slate-600"
                                >
                                    <span>$750K Sale, Team Split</span>
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        loadScenario({
                                            salePrice: 600000,
                                            commissionRate: 3,
                                            brokerageSplit: 20,
                                            teamEnabled: false,
                                            referralEnabled: true,
                                        })
                                    }
                                    className="flex w-full items-center justify-between rounded-lg bg-slate-700 px-4 py-3 text-left text-sm font-medium text-white transition hover:bg-slate-600"
                                >
                                    <span>$600K Sale, Referral</span>
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

