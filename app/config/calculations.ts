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

// Industry-specific defaults for cost and automation potential
export const IndustryDefaults = {
  'financial-services': {
    averageHourlyRate: 85,
    automatablePercentage: 0.40,
    complexityMultiplier: 1.2,
  },
  'technology': {
    averageHourlyRate: 90,
    automatablePercentage: 0.45,
    complexityMultiplier: 1.1,
  },
  'healthcare': {
    averageHourlyRate: 80,
    automatablePercentage: 0.30,
    complexityMultiplier: 1.3,
  },
  'manufacturing': {
    averageHourlyRate: 70,
    automatablePercentage: 0.35,
    complexityMultiplier: 1.0,
  },
  'retail': {
    averageHourlyRate: 65,
    automatablePercentage: 0.38,
    complexityMultiplier: 0.9,
  },
  'other': {
    averageHourlyRate: 75,
    automatablePercentage: 0.35,
    complexityMultiplier: 1.0,
  },
};

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
     * Calculate metrics with enhanced inputs
     */
    calculateROIMetrics: function(inputs: {
      // Tier 1 - Basic Inputs
      headcount: number;
      monthlyTicketVolume?: number;
      currentAutomationRate?: number;
      avgHandleTimeMinutes?: number;
      avgCostPerEmployee?: number;
      industry?: string;

      // Tier 2 - Advanced Inputs
      firstContactResolutionRate?: number;
      avgResolutionTimeHours?: number;
      monthlyEscalationVolume?: number;
      errorReworkRate?: number;
    }) {
      // Use industry defaults or provided values
      const industryData = inputs.industry
        ? IndustryDefaults[inputs.industry as keyof typeof IndustryDefaults] || IndustryDefaults.other
        : IndustryDefaults.other;

      // Calculate base hourly rate
      const baseHourlyRate = inputs.avgCostPerEmployee
        ? inputs.avgCostPerEmployee / this.productivity.annualWorkingHours
        : industryData.averageHourlyRate;

      const loadedHourlyRate = baseHourlyRate * this.costs.loadedCostMultiplier;

      // Calculate automatable percentage
      const currentAutomation = (inputs.currentAutomationRate || 0) / 100;
      const targetAutomation = Math.min(industryData.automatablePercentage, 0.60); // Cap at 60%
      const automationGain = targetAutomation - currentAutomation;

      // Calculate time savings
      let totalHoursSaved: number;
      let hoursPerEmployee: number;

      if (inputs.monthlyTicketVolume && inputs.avgHandleTimeMinutes) {
        // Ticket-based calculation (more accurate)
        const annualTicketVolume = inputs.monthlyTicketVolume * 12;
        const hoursPerTicket = inputs.avgHandleTimeMinutes / 60;
        const totalTicketHours = annualTicketVolume * hoursPerTicket;

        // Apply automation gain percentage
        totalHoursSaved = totalTicketHours * automationGain * this.productivity.productivityGainPercentage;
        hoursPerEmployee = totalHoursSaved / inputs.headcount;
      } else {
        // Employee-based calculation (fallback)
        const automatableHours = this.productivity.annualWorkingHours * industryData.automatablePercentage;
        hoursPerEmployee = automatableHours * this.productivity.productivityGainPercentage;
        totalHoursSaved = hoursPerEmployee * inputs.headcount;
      }

      // Account for ramp-up period
      const rampUpFactor = 1 - (this.productivity.rampUpMonths / 24);
      totalHoursSaved = totalHoursSaved * rampUpFactor;

      // Calculate base savings
      const annualSavings = totalHoursSaved * loadedHourlyRate;
      const monthlySavings = annualSavings / 12;

      // Advanced calculations (Tier 2)
      let qualityImprovementSavings = 0;
      let escalationReductionSavings = 0;
      let errorReductionSavings = 0;

      if (inputs.firstContactResolutionRate !== undefined && inputs.avgResolutionTimeHours) {
        // Better FCR means fewer callbacks and repeat work
        const currentFCR = inputs.firstContactResolutionRate / 100;
        const targetFCR = Math.min(currentFCR + 0.15, 0.95); // 15% improvement, cap at 95%
        const fcrImprovement = targetFCR - currentFCR;
        const annualTickets = (inputs.monthlyTicketVolume || inputs.headcount * 50) * 12;
        const reworkHoursSaved = annualTickets * fcrImprovement * inputs.avgResolutionTimeHours;
        qualityImprovementSavings = reworkHoursSaved * loadedHourlyRate;
      }

      if (inputs.monthlyEscalationVolume) {
        // Escalations are expensive (2-3x cost)
        const escalationCostMultiplier = 2.5;
        const escalationReduction = 0.30; // 30% reduction in escalations
        const annualEscalations = inputs.monthlyEscalationVolume * 12;
        const avgEscalationHours = 2; // Typical escalation handling time
        const escalationHoursSaved = annualEscalations * escalationReduction * avgEscalationHours;
        escalationReductionSavings = escalationHoursSaved * loadedHourlyRate * escalationCostMultiplier;
      }

      if (inputs.errorReworkRate) {
        // Errors require rework
        const currentErrorRate = inputs.errorReworkRate / 100;
        const errorReduction = 0.50; // 50% reduction in errors with AI
        const annualTickets = (inputs.monthlyTicketVolume || inputs.headcount * 50) * 12;
        const reworkTimePerError = 0.5; // 30 minutes per error correction
        const errorHoursSaved = annualTickets * currentErrorRate * errorReduction * reworkTimePerError;
        errorReductionSavings = errorHoursSaved * loadedHourlyRate;
      }

      // Total savings including quality improvements
      const totalAnnualSavings = annualSavings + qualityImprovementSavings + escalationReductionSavings + errorReductionSavings;
      const totalMonthlySavings = totalAnnualSavings / 12;

      // Calculate new automation rate after implementation
      const newAutomationRate = Math.min((currentAutomation + automationGain) * 100, 60);

      return {
        // Basic metrics
        headcount: inputs.headcount,
        hoursPerEmployeePerYear: Math.round(hoursPerEmployee),
        totalHoursPerYear: Math.round(totalHoursSaved),
        loadedHourlyRate: Math.round(loadedHourlyRate),

        // Savings breakdown
        annualSavings: Math.round(annualSavings),
        monthlySavings: Math.round(monthlySavings),
        dailySavings: Math.round(monthlySavings / 21.67),

        // Total savings (including quality improvements)
        totalAnnualSavings: Math.round(totalAnnualSavings),
        totalMonthlySavings: Math.round(totalMonthlySavings),
        totalDailySavings: Math.round(totalMonthlySavings / 21.67),

        // Breakdown of additional savings
        qualityImprovementSavings: Math.round(qualityImprovementSavings),
        escalationReductionSavings: Math.round(escalationReductionSavings),
        errorReductionSavings: Math.round(errorReductionSavings),

        // Automation metrics
        currentAutomationRate: inputs.currentAutomationRate || currentAutomation * 100,
        projectedAutomationRate: Math.round(newAutomationRate),
        automationGain: Math.round((newAutomationRate - (inputs.currentAutomationRate || currentAutomation * 100))),

        // Productivity
        productivityGainPercentage: this.productivity.productivityGainPercentage * 100,

        // Ticket metrics (if applicable)
        monthlyTicketVolume: inputs.monthlyTicketVolume,
        annualTicketVolume: inputs.monthlyTicketVolume ? inputs.monthlyTicketVolume * 12 : undefined,
      };
    },
  },
};

// Bind the calculation methods to the config object
CalculationConfig.calculations.productivity = CalculationConfig.productivity;
CalculationConfig.calculations.costs = CalculationConfig.costs;
CalculationConfig.calculations.agenticLaunchpad = CalculationConfig.agenticLaunchpad;
