/**
 * Formula Testing & Validation
 * 
 * Tests all CRM formulas for edge cases and accuracy
 */

// Test cases for Investment Analysis formulas
const testInvestmentAnalysis = () => {
    const tests = [];
    
    // Test 1: Zero purchase price
    tests.push({
        name: "Zero purchase price",
        input: { purchasePrice: 0 },
        expected: { shouldReturn: true, metrics: null }
    });
    
    // Test 2: Zero interest rate
    tests.push({
        name: "Zero interest rate",
        input: {
            purchasePrice: 100000,
            downPaymentPercent: 20,
            interestRate: 0,
            loanTerm: 30,
            monthlyRent: 1000
        },
        expected: { monthlyPI: 222.22 } // loanAmount / numPayments
    });
    
    // Test 3: Zero loan amount (100% down)
    tests.push({
        name: "100% down payment",
        input: {
            purchasePrice: 100000,
            downPaymentPercent: 100,
            interestRate: 7,
            loanTerm: 30,
            monthlyRent: 1000
        },
        expected: { monthlyPI: 0, loanAmount: 0 }
    });
    
    // Test 4: Zero monthly rent
    tests.push({
        name: "Zero monthly rent",
        input: {
            purchasePrice: 100000,
            downPaymentPercent: 20,
            interestRate: 7,
            loanTerm: 30,
            monthlyRent: 0
        },
        expected: { monthlyCashFlow: "negative", capRate: "negative" }
    });
    
    // Test 5: Negative values
    tests.push({
        name: "Negative purchase price",
        input: { purchasePrice: -100000 },
        expected: { shouldHandle: "gracefully" }
    });
    
    // Test 6: Very high vacancy rate (>100%)
    tests.push({
        name: "Vacancy rate > 100%",
        input: {
            purchasePrice: 100000,
            monthlyRent: 1000,
            vacancyRate: 150
        },
        expected: { effectiveRent: "should be capped or handled" }
    });
    
    // Test 7: Division by zero in DSCR
    tests.push({
        name: "Zero monthly PI for DSCR",
        input: {
            purchasePrice: 100000,
            downPaymentPercent: 100,
            monthlyRent: 1000
        },
        expected: { dscr: 0 } // Should handle gracefully
    });
    
    return tests;
};

// Test cases for Expense Tracker formulas
const testExpenseTracker = () => {
    const tests = [];
    
    // Test 1: NaN handling
    tests.push({
        name: "Empty string inputs (NaN)",
        input: {
            grossIncome: "",
            rentalIncome: "",
            vehicle1: ""
        },
        expected: { shouldUseZero: true }
    });
    
    // Test 2: Negative income
    tests.push({
        name: "Negative income values",
        input: {
            grossIncome: -5000,
            rentalIncome: 10000
        },
        expected: { totalIncome: 5000 } // Should sum correctly
    });
    
    // Test 3: Zero total income
    tests.push({
        name: "Zero total income",
        input: {
            grossIncome: 0,
            rentalIncome: 0,
            totalExpenses: 5000
        },
        expected: { effectiveRate: 0, netIncome: -5000 }
    });
    
    // Test 4: Very high expenses (> income)
    tests.push({
        name: "Expenses exceed income",
        input: {
            grossIncome: 10000,
            totalExpenses: 15000
        },
        expected: { netIncome: -5000, selfEmploymentTax: 0 }
    });
    
    return tests;
};

// Test cases for Investment Property Calculator
const testPropertyCalculator = () => {
    const tests = [];
    
    // Test 1: Empty string handling
    tests.push({
        name: "Empty string inputs",
        input: {
            purchasePrice: "",
            monthlyRent: ""
        },
        expected: { shouldAlert: true }
    });
    
    // Test 2: Zero property tax/insurance
    tests.push({
        name: "Zero annual expenses",
        input: {
            purchasePrice: 100000,
            monthlyRent: 1000,
            propertyTax: 0,
            insurance: 0
        },
        expected: { monthlyTax: 0, monthlyInsurance: 0 }
    });
    
    // Test 3: Vacancy rate > 100%
    tests.push({
        name: "Vacancy rate > 100%",
        input: {
            purchasePrice: 100000,
            monthlyRent: 1000,
            vacancyRate: 150
        },
        expected: { effectiveRent: "should handle" }
    });
    
    return tests;
};

export { testInvestmentAnalysis, testExpenseTracker, testPropertyCalculator };

