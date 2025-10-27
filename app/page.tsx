"use client";

import { useState } from "react";
import { CalculationConfig } from "./config/calculations";

export default function Home() {
  const [headcount, setHeadcount] = useState<string>("");
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const count = parseInt(headcount);

    if (isNaN(count) || count <= 0) {
      alert("Please enter a valid headcount number");
      return;
    }

    const metrics = CalculationConfig.calculations.calculateROIMetrics(count);
    setResults(metrics);
    setShowResults(true);
  };

  const handleReset = () => {
    setHeadcount("");
    setShowResults(false);
    setResults(null);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en-US").format(value);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Back Button */}
      <div className="w-full px-6 py-6 md:px-8 md:py-8">
        <a
          href="https://tqima.com"
          className="inline-flex items-center gap-2 text-text-dark hover:text-primary transition-colors duration-300"
        >
          <i className="fas fa-arrow-left text-sm"></i>
          <span className="font-medium text-sm">Back to TQ IMA</span>
        </a>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-6 md:px-8">
        <div className="w-full max-w-3xl">
          {/* Header */}
          <div className="text-center mb-12 md:mb-6">
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 tracking-tight">
              Agentic Launchpad
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-text-dark mb-4">
              Savings Calculator
            </h2>
            <p className="text-lg flex items-center justify-center md:text-xl text-text-light max-w-2xl mx-auto leading-relaxed text-center">
              Calculate your potential savings with ServiceNow Now Assist
            </p>
          </div>

          {/* Calculator Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
            {!showResults ? (
              /* Input Form */
              <form onSubmit={handleCalculate} className="p-12 md:p-8 bg-primary lg:p-8">
                <div className="mb-4">
                  <label
                    htmlFor="headcount"
                    className="block text-xl font-semibold text-white text-primary mb-4"
                  >
                    <i className="fas fa-users mr-3  text-white"></i>
                    Function Headcount
                  </label>
                  <input
                    type="number"
                    id="headcount"
                    value={headcount}
                    onChange={(e) => setHeadcount(e.target.value)}
                    placeholder="Enter number of employees"
                    className="w-full  px-6 py-5 text-sm md:text-lg border-2 border-gray-300 rounded-2xl focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 focus:outline-none transition-all text-white duration-300 placeholder:text-gray-400"
                    min="1"
                    required
                  />
                  <p className="mt-3 text-sm text-text-light">
                    Enter the total number of employees in your GBS function
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full cursor-pointer bg-accent hover:bg-opacity-90 text-white font-semibold py-5 px-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.01] shadow-lg hover:shadow-xl text-lg"
                >
                  <i className="fas  fa-calculator mr-3"></i>
                  Calculate Savings
                </button>

                {/* Info Cards */}
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="bg-background-light rounded-2xl p-6 border border-gray-200">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-accent bg-opacity-10 rounded-xl flex items-center justify-center">
                        <i className="fas fa-chart-line text-white text-lg"></i>
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary text-base mb-2">
                          20% Productivity Gain
                        </h3>
                        <p className="text-sm text-text-light leading-relaxed">
                          Based on ServiceNow AI agent deployment data
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-background-light rounded-2xl p-6 border border-gray-200">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-accent bg-opacity-10 rounded-xl flex items-center justify-center">
                        <i className="fas fa-robot text-white text-lg"></i>
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary text-base mb-2">
                          Agentic Workflows
                        </h3>
                        <p className="text-sm text-text-light leading-relaxed">
                          Automated ticket triage, knowledge generation & more
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              /* Results Display */
              <div className="p-6 md:p-6 lg:p-6">
                {/* Results Header */}
                <div className="text-center mb-12">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-accent rounded-full mb-6 shadow-lg">
                    <i className="fas fa-check text-white text-3xl"></i>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-primary mb-3">
                    Your Projected Savings
                  </h3>
                  <p className="text-lg text-text-light">
                    For {formatNumber(results.headcount)} employees
                  </p>
                </div>

                {/* Annual Savings - Hero */}
                <div className="bg-gradient-to-br from-primary to-primary/90 rounded-3xl p-10 md:p-12 mb-8 text-center shadow-xl">
                  <p className="text-white opacity-90 text-sm font-semibold mb-3 tracking-wider uppercase">
                    Annual Savings
                  </p>
                  <p className="text-white text-5xl md:text-7xl font-bold mb-4 tracking-tight">
                    {formatCurrency(results.annualSavings)}
                  </p>
                  <p className="text-white opacity-90 text-lg">
                    {formatCurrency(results.monthlySavings)} per month
                  </p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <div className="bg-background-light rounded-2xl p-8 border border-gray-200">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-accent bg-opacity-10 rounded-xl flex items-center justify-center">
                        <i className="fas fa-clock text-white text-xl"></i>
                      </div>
                      <h4 className="font-semibold text-primary text-lg">
                        Hours Saved
                      </h4>
                    </div>
                    <p className="text-4xl font-bold text-primary mb-2">
                      {formatNumber(results.totalHoursPerYear)}
                    </p>
                    <p className="text-sm text-text-light">hours per year</p>
                  </div>

                  <div className="bg-background-light rounded-2xl p-8 border border-gray-200">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-accent bg-opacity-10 rounded-xl flex items-center justify-center">
                        <i className="fas fa-user-clock text-white text-xl"></i>
                      </div>
                      <h4 className="font-semibold text-primary text-lg">
                        Per Employee
                      </h4>
                    </div>
                    <p className="text-4xl font-bold text-primary mb-2">
                      {formatNumber(results.hoursPerEmployeePerYear)}
                    </p>
                    <p className="text-sm text-text-light">
                      hours per year per employee
                    </p>
                  </div>

                  <div className="bg-background-light rounded-2xl p-8 border border-gray-200">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-accent bg-opacity-10 rounded-xl flex items-center justify-center">
                        <i className="fas fa-percentage text-white text-xl"></i>
                      </div>
                      <h4 className="font-semibold text-primary text-lg">
                        Productivity
                      </h4>
                    </div>
                    <p className="text-4xl font-bold text-primary mb-2">
                      {results.productivityGainPercentage}%
                    </p>
                    <p className="text-sm text-text-light">
                      improvement on automatable tasks
                    </p>
                  </div>

                  <div className="bg-background-light rounded-2xl p-8 border border-gray-200">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-accent bg-opacity-10 rounded-xl flex items-center justify-center">
                        <i className="fas fa-dollar-sign text-white text-xl"></i>
                      </div>
                      <h4 className="font-semibold text-primary text-lg">
                        Daily Savings
                      </h4>
                    </div>
                    <p className="text-4xl font-bold text-primary mb-2">
                      {formatCurrency(results.dailySavings)}
                    </p>
                    <p className="text-sm text-text-light">
                      average per working day
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <button
                    onClick={handleReset}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-primary font-semibold py-5 px-8 rounded-2xl transition-all duration-300 text-lg border border-gray-200"
                  >
                    <i className="fas fa-redo mr-3"></i>
                    Calculate Again
                  </button>

                  <button
                    onClick={() => {
                      window.location.href = `mailto:support@tqima.com?subject=Agentic Launchpad Inquiry&body=I'm interested in learning more about TQ IMA's Agentic Launchpad.%0D%0A%0D%0AProjected savings for ${results.headcount} employees: ${formatCurrency(results.annualSavings)}/year`;
                    }}
                    className="w-full bg-accent hover:bg-opacity-90 text-white font-semibold py-5 px-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.01] shadow-lg hover:shadow-xl text-lg"
                  >
                    <i className="fas fa-envelope mr-3"></i>
                    Contact Us
                  </button>
                </div>

                {/* Disclaimer */}
                <div className="mt-8 p-6 bg-background-light rounded-2xl border border-gray-200">
                  <p className="text-sm text-text-light text-center leading-relaxed">
                    <i className="fas fa-info-circle mr-2"></i>
                    Estimates based on typical GBS operations. Actual results
                    may vary based on your specific use case, implementation,
                    and organizational factors.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer Info */}

        </div>
      </div>
    </div>
  );
}
