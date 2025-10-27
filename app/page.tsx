"use client";

import { useState } from "react";
import { CalculationConfig } from "./config/calculations";

export default function Home() {
  // Form state - Tier 1 (Basic)
  const [headcount, setHeadcount] = useState<string>("");
  const [monthlyTicketVolume, setMonthlyTicketVolume] = useState<string>("");
  const [currentAutomationRate, setCurrentAutomationRate] = useState<string>("");
  const [avgHandleTimeMinutes, setAvgHandleTimeMinutes] = useState<string>("");
  const [avgCostPerEmployee, setAvgCostPerEmployee] = useState<string>("");
  const [industry, setIndustry] = useState<string>("other");

  // Form state - Tier 2 (Advanced)
  const [firstContactResolutionRate, setFirstContactResolutionRate] = useState<string>("");
  const [avgResolutionTimeHours, setAvgResolutionTimeHours] = useState<string>("");
  const [monthlyEscalationVolume, setMonthlyEscalationVolume] = useState<string>("");
  const [errorReworkRate, setErrorReworkRate] = useState<string>("");

  // UI state
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const count = parseInt(headcount);

    if (isNaN(count) || count <= 0) {
      alert("Please enter a valid headcount number");
      return;
    }

    // Build inputs object
    const inputs: any = {
      headcount: count,
      industry,
    };

    // Add optional Tier 1 fields
    if (monthlyTicketVolume) inputs.monthlyTicketVolume = parseInt(monthlyTicketVolume);
    if (currentAutomationRate) inputs.currentAutomationRate = parseFloat(currentAutomationRate);
    if (avgHandleTimeMinutes) inputs.avgHandleTimeMinutes = parseFloat(avgHandleTimeMinutes);
    if (avgCostPerEmployee) inputs.avgCostPerEmployee = parseFloat(avgCostPerEmployee);

    // Add optional Tier 2 fields (if advanced mode is enabled)
    if (showAdvanced) {
      if (firstContactResolutionRate) inputs.firstContactResolutionRate = parseFloat(firstContactResolutionRate);
      if (avgResolutionTimeHours) inputs.avgResolutionTimeHours = parseFloat(avgResolutionTimeHours);
      if (monthlyEscalationVolume) inputs.monthlyEscalationVolume = parseInt(monthlyEscalationVolume);
      if (errorReworkRate) inputs.errorReworkRate = parseFloat(errorReworkRate);
    }

    const metrics = CalculationConfig.calculations.calculateROIMetrics(inputs);
    setResults(metrics);
    setShowResults(true);
  };

  const handleReset = () => {
    // Reset all fields
    setHeadcount("");
    setMonthlyTicketVolume("");
    setCurrentAutomationRate("");
    setAvgHandleTimeMinutes("");
    setAvgCostPerEmployee("");
    setIndustry("other");
    setFirstContactResolutionRate("");
    setAvgResolutionTimeHours("");
    setMonthlyEscalationVolume("");
    setErrorReworkRate("");
    setShowAdvanced(false);
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
      <div className="flex-1 flex items-center justify-center px-2 py-6 md:px-8">
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
              <form onSubmit={handleCalculate} className="p-8 md:p-10 lg:p-12 bg-primary">
                {/* Tier 1 Fields - Basic Inputs */}
                <div className="space-y-6 mb-8">
                  {/* Headcount */}
                  <div>
                    <label
                      htmlFor="headcount"
                      className="block text-lg font-semibold text-white mb-3"
                    >
                      <i className="fas fa-users mr-2 text-accent"></i>
                      Function Headcount *
                    </label>
                    <input
                      type="number"
                      id="headcount"
                      value={headcount}
                      onChange={(e) => setHeadcount(e.target.value)}
                      placeholder="e.g., 500"
                      className="w-full px-5 py-4 text-base text-white border-2 border-gray-300 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 focus:outline-none transition-all duration-300 placeholder:text-gray-400"
                      min="1"
                      required
                    />
                    <p className="mt-2 text-sm text-gray-300">
                      Total number of employees in your GBS function
                    </p>
                  </div>

                  {/* Industry */}
                  <div>
                    <label
                      htmlFor="industry"
                      className="block text-lg font-semibold text-white mb-3"
                    >
                      <i className="fas fa-building mr-2 text-accent"></i>
                      Industry *
                    </label>
                    <select
                      id="industry"
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full px-5 text-white py-4 text-base border-2 border-gray-300 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 focus:outline-none transition-all duration-300"
                      required
                    >
                      <option value="other">General / Other</option>
                      <option value="financial-services">Financial Services</option>
                      <option value="technology">Technology</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="retail">Retail</option>
                    </select>
                    <p className="mt-2 text-sm text-gray-300">
                      Industry impacts average costs and automation potential
                    </p>
                  </div>

                  {/* Monthly Ticket Volume */}
                  <div>
                    <label
                      htmlFor="monthlyTicketVolume"
                      className="block text-lg font-semibold text-white mb-3"
                    >
                      <i className="fas fa-ticket-alt mr-2 text-accent"></i>
                      Monthly Ticket/Case Volume
                    </label>
                    <input
                      type="number"
                      id="monthlyTicketVolume"
                      value={monthlyTicketVolume}
                      onChange={(e) => setMonthlyTicketVolume(e.target.value)}
                      placeholder="e.g., 5000"
                      className="w-full text-white px-5 py-4 text-base border-2 border-gray-300 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 focus:outline-none transition-all duration-300 placeholder:text-gray-400"
                      min="0"
                    />
                    <p className="mt-2 text-sm text-gray-300">
                      Average number of tickets/cases processed per month
                    </p>
                  </div>

                  {/* Current Automation Rate */}
                  <div>
                    <label
                      htmlFor="currentAutomationRate"
                      className="block text-lg font-semibold text-white mb-3"
                    >
                      <i className="fas fa-cogs mr-2 text-accent"></i>
                      Current Automation Rate (%)
                    </label>
                    <input
                      type="number"
                      id="currentAutomationRate"
                      value={currentAutomationRate}
                      onChange={(e) => setCurrentAutomationRate(e.target.value)}
                      placeholder="e.g., 15"
                      className="w-full text-white px-5 py-4 text-base border-2 border-gray-300 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 focus:outline-none transition-all duration-300 placeholder:text-gray-400"
                      min="0"
                      max="100"
                      step="0.1"
                    />
                    <p className="mt-2 text-sm text-gray-300">
                      Percentage of work currently automated (0-100%)
                    </p>
                  </div>

                  {/* Average Handle Time */}
                  <div>
                    <label
                      htmlFor="avgHandleTimeMinutes"
                      className="block text-lg font-semibold text-white mb-3"
                    >
                      <i className="fas fa-clock mr-2 text-accent"></i>
                      Average Handle Time (minutes) 
                    </label>
                    <input
                      type="number"
                      id="avgHandleTimeMinutes"
                      value={avgHandleTimeMinutes}
                      onChange={(e) => setAvgHandleTimeMinutes(e.target.value)}
                      placeholder="e.g., 30"
                      className="w-full text-white px-5 py-4 text-base border-2 border-gray-300 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 focus:outline-none transition-all duration-300 placeholder:text-gray-400"
                      min="0"
                      step="0.5"
                    />
                    <p className="mt-2 text-sm text-gray-300">
                      Average time to handle each ticket/case
                    </p>
                  </div>

                  {/* Average Cost Per Employee */}
                  <div>
                    <label
                      htmlFor="avgCostPerEmployee"
                      className="block text-lg font-semibold text-white mb-3"
                    >
                      <i className="fas fa-dollar-sign mr-2 text-accent"></i>
                      Annual Cost Per Employee (USD)
                    </label>
                    <input
                      type="number"
                      id="avgCostPerEmployee"
                      value={avgCostPerEmployee}
                      onChange={(e) => setAvgCostPerEmployee(e.target.value)}
                      placeholder="e.g., 75000"
                      className="w-full text-white px-5 py-4 text-base border-2 border-gray-300 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 focus:outline-none transition-all duration-300 placeholder:text-gray-400"
                      min="0"
                      step="1000"
                    />
                    <p className="mt-2 text-sm text-gray-300">
                      Average annual salary (leave blank to use industry average)
                    </p>
                  </div>
                </div>

                {/* Advanced Options Toggle */}
                <div className="mb-8">
                  <button
                    type="button"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gray-100 hover:bg-gray-200 text-primary font-semibold rounded-xl transition-all duration-300 border-2 border-gray-200"
                  >
                    <i className={`fas fa-chevron-${showAdvanced ? 'up' : 'down'}`}></i>
                    <span>{showAdvanced ? 'Hide' : 'Show'} Advanced Options</span>
                    <span className="text-sm font-normal text-text-light">
                      (Quality & Efficiency Metrics)
                    </span>
                  </button>
                </div>

                {/* Tier 2 Fields - Advanced Inputs */}
                {showAdvanced && (
                  <div className="space-y-6 mb-8 p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
                    <h3 className="text-xl font-bold text-primary mb-4">
                      <i className="fas fa-chart-line mr-2 text-accent"></i>
                      Quality & Efficiency Metrics
                    </h3>

                    {/* First Contact Resolution Rate */}
                    <div>
                      <label
                        htmlFor="firstContactResolutionRate"
                        className="block text-base font-semibold text-primary mb-3"
                      >
                        <i className="fas fa-check-circle mr-2 text-accent"></i>
                        First Contact Resolution Rate (%)
                      </label>
                      <input
                        type="number"
                        id="firstContactResolutionRate"
                        value={firstContactResolutionRate}
                        onChange={(e) => setFirstContactResolutionRate(e.target.value)}
                        placeholder="e.g., 65"
                        className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 focus:outline-none transition-all duration-300 placeholder:text-gray-400 bg-white"
                        min="0"
                        max="100"
                        step="0.1"
                      />
                      <p className="mt-2 text-sm text-text-light">
                        Percentage of issues resolved on first contact
                      </p>
                    </div>

                    {/* Average Resolution Time */}
                    <div>
                      <label
                        htmlFor="avgResolutionTimeHours"
                        className="block text-base font-semibold text-primary mb-3"
                      >
                        <i className="fas fa-hourglass-half mr-2 text-accent"></i>
                        Average Resolution Time (hours)
                      </label>
                      <input
                        type="number"
                        id="avgResolutionTimeHours"
                        value={avgResolutionTimeHours}
                        onChange={(e) => setAvgResolutionTimeHours(e.target.value)}
                        placeholder="e.g., 4"
                        className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 focus:outline-none transition-all duration-300 placeholder:text-gray-400 bg-white"
                        min="0"
                        step="0.1"
                      />
                      <p className="mt-2 text-sm text-text-light">
                        Average time to fully resolve a ticket/case
                      </p>
                    </div>

                    {/* Monthly Escalation Volume */}
                    <div>
                      <label
                        htmlFor="monthlyEscalationVolume"
                        className="block text-base font-semibold text-primary mb-3"
                      >
                        <i className="fas fa-level-up-alt mr-2 text-accent"></i>
                        Monthly Escalation Volume
                      </label>
                      <input
                        type="number"
                        id="monthlyEscalationVolume"
                        value={monthlyEscalationVolume}
                        onChange={(e) => setMonthlyEscalationVolume(e.target.value)}
                        placeholder="e.g., 500"
                        className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 focus:outline-none transition-all duration-300 placeholder:text-gray-400 bg-white"
                        min="0"
                      />
                      <p className="mt-2 text-sm text-text-light">
                        Number of tickets escalated to higher-tier support monthly
                      </p>
                    </div>

                    {/* Error/Rework Rate */}
                    <div>
                      <label
                        htmlFor="errorReworkRate"
                        className="block text-base font-semibold text-primary mb-3"
                      >
                        <i className="fas fa-exclamation-triangle mr-2 text-accent"></i>
                        Error/Rework Rate (%)
                      </label>
                      <input
                        type="number"
                        id="errorReworkRate"
                        value={errorReworkRate}
                        onChange={(e) => setErrorReworkRate(e.target.value)}
                        placeholder="e.g., 8"
                        className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-20 focus:outline-none transition-all duration-300 placeholder:text-gray-400 bg-white"
                        min="0"
                        max="100"
                        step="0.1"
                      />
                      <p className="mt-2 text-sm text-text-light">
                        Percentage of work requiring correction or rework
                      </p>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full cursor-pointer bg-accent hover:bg-opacity-90 text-white font-bold py-5 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.01] shadow-lg hover:shadow-xl text-lg"
                >
                  <i className="fas fa-calculator mr-3"></i>
                  Calculate Your Savings
                </button>

                {/* Info Footer */}
                <p className="mt-6 text-sm text-text-light text-center">
                  <i className="fas fa-info-circle mr-2"></i>
                  * Required fields. Optional fields help improve accuracy.
                </p>
              </form>
            ) : (
              /* Results Display */
              <div className="p-8 md:p-10 lg:p-12">
                {/* Results Header */}
                <div className="text-center mb-10">
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

                {/* Total Annual Savings - Hero */}
                <div className="bg-gradient-to-br from-primary to-primary/90 rounded-3xl p-10 md:p-12 mb-8 text-center shadow-xl">
                  <p className="text-white opacity-90 text-sm font-semibold mb-3 tracking-wider uppercase">
                    Total Annual Savings
                  </p>
                  <p className="text-white text-5xl md:text-7xl font-bold mb-4 tracking-tight">
                    {formatCurrency(results.totalAnnualSavings || results.annualSavings)}
                  </p>
                  <p className="text-white opacity-90 text-lg">
                    {formatCurrency(results.totalMonthlySavings || results.monthlySavings)} per month
                  </p>
                  <p className="text-white opacity-75 text-sm mt-3">
                    {formatCurrency(results.totalDailySavings || results.dailySavings)} per working day
                  </p>
                </div>

                {/* Savings Breakdown (if advanced metrics provided) */}
                {(results.qualityImprovementSavings > 0 || results.escalationReductionSavings > 0 || results.errorReductionSavings > 0) && (
                  <div className="mb-8 p-6 bg-gray-50 rounded-2xl border-2 border-gray-200">
                    <h4 className="text-xl font-bold text-primary mb-4">
                      <i className="fas fa-chart-pie mr-2 text-accent"></i>
                      Savings Breakdown
                    </h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                          <i className="fas fa-clock text-accent"></i>
                          <span className="font-medium text-primary">Base Productivity Savings</span>
                        </div>
                        <span className="font-bold text-primary text-lg">{formatCurrency(results.annualSavings)}</span>
                      </div>
                      {results.qualityImprovementSavings > 0 && (
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <div className="flex items-center gap-3">
                            <i className="fas fa-check-circle text-accent"></i>
                            <span className="font-medium text-primary">Quality Improvement Savings</span>
                          </div>
                          <span className="font-bold text-primary text-lg">{formatCurrency(results.qualityImprovementSavings)}</span>
                        </div>
                      )}
                      {results.escalationReductionSavings > 0 && (
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <div className="flex items-center gap-3">
                            <i className="fas fa-level-down-alt text-accent"></i>
                            <span className="font-medium text-primary">Escalation Reduction Savings</span>
                          </div>
                          <span className="font-bold text-primary text-lg">{formatCurrency(results.escalationReductionSavings)}</span>
                        </div>
                      )}
                      {results.errorReductionSavings > 0 && (
                        <div className="flex justify-between items-center py-3">
                          <div className="flex items-center gap-3">
                            <i className="fas fa-shield-alt text-accent"></i>
                            <span className="font-medium text-primary">Error Reduction Savings</span>
                          </div>
                          <span className="font-bold text-primary text-lg">{formatCurrency(results.errorReductionSavings)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Automation Improvement */}
                {results.automationGain && results.automationGain > 0 && (
                  <div className="mb-8 bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-6 border-2 border-accent/20">
                    <h4 className="text-xl font-bold text-primary mb-4">
                      <i className="fas fa-robot mr-2 text-accent"></i>
                      Automation Improvement
                    </h4>
                    <div className="flex items-center justify-between">
                      <div className="text-center flex-1">
                        <p className="text-sm text-text-light mb-2">Current</p>
                        <p className="text-xl md:text-3xl font-bold text-primary">{results.currentAutomationRate}%</p>
                      </div>
                      <div className="flex-shrink-0 mx-8">
                        <i className="fas fa-arrow-right text-accent text-2xl"></i>
                      </div>
                      <div className="text-center flex-1">
                        <p className="text-sm text-text-light mb-2">Projected</p>
                        <p className="text-xl md:text-3xl font-bold text-accent">{results.projectedAutomationRate}%</p>
                      </div>
                      <div className="flex-shrink-0 ml-8 text-center">
                        <p className="text-sm text-text-light mb-2">Gain</p>
                        <p className="text-xl md:text-3xl font-bold text-green-600">+{results.automationGain}%</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <div className="bg-background-light rounded-2xl p-6 border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex-shrink-0 w-12 h-12 bg-accent bg-opacity-10 rounded-xl flex items-center justify-center">
                        <i className="fas fa-clock text-white text-xl"></i>
                      </div>
                      <h4 className="font-semibold text-primary text-base">
                        Total Hours Saved
                      </h4>
                    </div>
                    <p className="text-3xl font-bold text-primary mb-1">
                      {formatNumber(results.totalHoursPerYear)}
                    </p>
                    <p className="text-sm text-text-light">hours per year</p>
                  </div>

                  <div className="bg-background-light rounded-2xl p-6 border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex-shrink-0 w-12 h-12 bg-accent bg-opacity-10 rounded-xl flex items-center justify-center">
                        <i className="fas fa-user-clock text-white text-xl"></i>
                      </div>
                      <h4 className="font-semibold text-primary text-base">
                        Per Employee
                      </h4>
                    </div>
                    <p className="text-3xl font-bold text-primary mb-1">
                      {formatNumber(results.hoursPerEmployeePerYear)}
                    </p>
                    <p className="text-sm text-text-light">
                      hours per year per employee
                    </p>
                  </div>

                  <div className="bg-background-light rounded-2xl p-6 border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex-shrink-0 w-12 h-12 bg-accent bg-opacity-10 rounded-xl flex items-center justify-center">
                        <i className="fas fa-percentage text-white text-xl"></i>
                      </div>
                      <h4 className="font-semibold text-primary text-base">
                        Productivity Gain
                      </h4>
                    </div>
                    <p className="text-3xl font-bold text-primary mb-1">
                      {results.productivityGainPercentage}%
                    </p>
                    <p className="text-sm text-text-light">
                      improvement on automatable tasks
                    </p>
                  </div>

                  {results.annualTicketVolume && (
                    <div className="bg-background-light rounded-2xl p-6 border border-gray-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex-shrink-0 w-12 h-12 bg-accent bg-opacity-10 rounded-xl flex items-center justify-center">
                          <i className="fas fa-ticket-alt text-white text-xl"></i>
                        </div>
                        <h4 className="font-semibold text-primary text-base">
                          Annual Tickets
                        </h4>
                      </div>
                      <p className="text-3xl font-bold text-primary mb-1">
                        {formatNumber(results.annualTicketVolume)}
                      </p>
                      <p className="text-sm text-text-light">
                        tickets processed annually
                      </p>
                    </div>
                  )}
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
                      const totalSavings = results.totalAnnualSavings || results.annualSavings;
                      const emailBody = `I'm interested in learning more about TQ IMA's Agentic Launchpad.%0D%0A%0D%0AProjected Savings:%0D%0A- Headcount: ${results.headcount} employees%0D%0A- Annual Savings: ${formatCurrency(totalSavings)}%0D%0A- Monthly Savings: ${formatCurrency(results.totalMonthlySavings || results.monthlySavings)}%0D%0A- Hours Saved/Year: ${formatNumber(results.totalHoursPerYear)}`;
                      window.location.href = `mailto:support@tqima.com?subject=Agentic Launchpad Inquiry&body=${emailBody}`;
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
