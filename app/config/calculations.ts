/**
 * Calculation Configuration for TQ IMA Agentic Launchpad ROI Calculator
 *
 * This file contains all the assumptions and calculation parameters.
 * Adjust these values to update the calculator's output.
 *
 * Research basis:
 * - ServiceNow AI agents show ~20% productivity improvement
 * - 3 million hours saved with internal deployment
 * - Focus on GBS (Global Business Services) professionals
 */

export const CalculationConfig = {
  // Productivity Assumptions
  productivity: {
    // Average annual working hours per FTE (40 hrs/week * 52 weeks - vacation/holidays)
    annualWorkingHours: 2080,

    // Time spent on automatable tasks (percentage of total work time)
    automatableTasksPercentage: 0.35, // 35% of work can be automated/augmented

    // Productivity improvement from agentic workflows (based on ServiceNow research)
    productivityGainPercentage: 0.20, // 20% improvement on automatable tasks

    // Ramp-up time (months) before full productivity gains are realized
    rampUpMonths: 3,
  },

  // Cost Assumptions
  costs: {
    // Average hourly rate for GBS professionals (USD)
    averageHourlyRate: 75, // $75/hour is typical for mid-level GBS roles

    // Fully loaded cost multiplier (includes benefits, overhead, etc.)
    loadedCostMultiplier: 1.4, // 40% additional for benefits/overhead
  },

  // ServiceNow Now Assist Configuration
  agenticLaunchpad: {
    // Typical use cases automated
    useCases: [
      'Incident ticket triage and routing',
      'Knowledge base article generation',
      'Automated customer request handling',
      'Report generation and analysis',
      'Routine approvals and workflows',
      'Employee onboarding tasks',
    ],

    // Implementation timeline (weeks)
    implementationWeeks: 8,

    // Average time to deploy per workflow (days)
    deploymentTimePerWorkflow: 2,
  },

  // Calculation Methods
  calculations: {
    productivity: null as any,
    costs: null as any,
    agenticLaunchpad: null as any,

    /**
     * Calculate annual hours saved per employee
     */
    calculateHoursSavedPerEmployee: function(): number {
      const automatableHours = this.productivity.annualWorkingHours * this.productivity.automatableTasksPercentage;
      return automatableHours * this.productivity.productivityGainPercentage;
    },

    /**
     * Calculate total annual hours saved for headcount
     */
    calculateTotalHoursSaved: function(headcount: number): number {
      const hoursPerEmployee = this.calculateHoursSavedPerEmployee();
      // Account for ramp-up period (linear ramp over ramp-up months)
      const rampUpFactor = 1 - (this.productivity.rampUpMonths / 24); // Partial year impact
      return hoursPerEmployee * headcount * rampUpFactor;
    },

    /**
     * Calculate fully loaded hourly cost
     */
    getLoadedHourlyRate: function(): number {
      return this.costs.averageHourlyRate * this.costs.loadedCostMultiplier;
    },

    /**
     * Calculate annual savings
     */
    calculateAnnualSavings: function(headcount: number): number {
      const totalHoursSaved = this.calculateTotalHoursSaved(headcount);
      const loadedRate = this.getLoadedHourlyRate();
      return totalHoursSaved * loadedRate;
    },

    /**
     * Calculate monthly savings
     */
    calculateMonthlySavings: function(headcount: number): number {
      return this.calculateAnnualSavings(headcount) / 12;
    },

    /**
     * Calculate ROI metrics
     */
    calculateROIMetrics: function(headcount: number) {
      const hoursPerEmployee = this.calculateHoursSavedPerEmployee();
      const totalHours = this.calculateTotalHoursSaved(headcount);
      const loadedRate = this.getLoadedHourlyRate();
      const annualSavings = this.calculateAnnualSavings(headcount);
      const monthlySavings = this.calculateMonthlySavings(headcount);

      return {
        headcount,
        hoursPerEmployeePerYear: Math.round(hoursPerEmployee),
        totalHoursPerYear: Math.round(totalHours),
        loadedHourlyRate: loadedRate,
        annualSavings: Math.round(annualSavings),
        monthlySavings: Math.round(monthlySavings),
        dailySavings: Math.round(monthlySavings / 21.67), // Average working days per month
        productivityGainPercentage: this.productivity.productivityGainPercentage * 100,
      };
    },
  },
};

// Bind the calculation methods to the config object
CalculationConfig.calculations.productivity = CalculationConfig.productivity;
CalculationConfig.calculations.costs = CalculationConfig.costs;
CalculationConfig.calculations.agenticLaunchpad = CalculationConfig.agenticLaunchpad;
