/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { Check, X, ClipboardList, Activity, BarChart, Settings, FileText, Search, GitMerge } from 'lucide-react';

interface StepCardProps { 
    step: string;
    title: string;
    icon: any;
    doList: string[];
    dontList: string[];
    reportList: string[];
}

const StepCard: React.FC<StepCardProps> = ({ 
    step, 
    title, 
    icon: Icon,
    doList, 
    dontList, 
    reportList 
}) => {
    return (
        <div className="flex flex-col md:flex-row gap-8 py-12 border-b border-brand-green/20 last:border-0">
            {/* Left: Header */}
            <div className="md:w-1/4 flex flex-col items-start">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold font-serif">
                        {step}
                    </div>
                    <Icon className="text-brand-orange" size={24} />
                </div>
                <h3 className="text-2xl font-serif text-brand-blue mb-2">{title}</h3>
            </div>

            {/* Right: Content Grid */}
            <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Do's */}
                <div className="bg-brand-cream/50 p-6 rounded-lg border-t-4 border-brand-green">
                    <div className="flex items-center gap-2 mb-4 text-brand-green font-bold uppercase text-xs tracking-wider">
                        <Check size={16} /> Best Practices
                    </div>
                    <ul className="space-y-3">
                        {doList.map((item, i) => (
                            <li key={i} className="text-sm text-brand-blue/80 leading-relaxed">• {item}</li>
                        ))}
                    </ul>
                </div>

                {/* Don'ts */}
                <div className="bg-red-50 p-6 rounded-lg border-t-4 border-red-400">
                     <div className="flex items-center gap-2 mb-4 text-red-500 font-bold uppercase text-xs tracking-wider">
                        <X size={16} /> Avoid
                    </div>
                    <ul className="space-y-3">
                        {dontList.map((item, i) => (
                            <li key={i} className="text-sm text-brand-blue/80 leading-relaxed">• {item}</li>
                        ))}
                    </ul>
                </div>

                {/* Report */}
                <div className="bg-blue-50 p-6 rounded-lg border-t-4 border-brand-blue">
                     <div className="flex items-center gap-2 mb-4 text-brand-blue font-bold uppercase text-xs tracking-wider">
                        <FileText size={16} /> What to Report
                    </div>
                    <ul className="space-y-3">
                        {reportList.map((item, i) => (
                            <li key={i} className="text-sm text-brand-blue/80 leading-relaxed">• {item}</li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    );
};

export const BestPracticesTimeline: React.FC = () => {
    const steps = [
        {
            step: "1",
            title: "Model Selection",
            icon: Search,
            doList: [
                "Prioritize scales validated in target population.",
                "Verify translation/adaptation evidence.",
                "Review systematic reviews/meta-analyses.",
                "Incorporate control questions (attention checks)."
            ],
            dontList: [
                "Using scales aimed at specific diagnostics for general research without validation.",
                "Using 'ad hoc' translations without psychometric testing.",
                "Withholding info on alternative structures (e.g., bifactor)."
            ],
            reportList: [
                "Justification of psychometric quality (reliability/validity evidence).",
                "Graphical representation of tested models.",
                "Justification for competing models (e.g., 4-factor vs Bifactor)."
            ]
        },
        {
            step: "2",
            title: "Pre-processing",
            icon: ClipboardList,
            doList: [
                "Remove careless respondents (attention checks).",
                "Handle missing data (Multiple Imputation).",
                "Check for multicollinearity (VIF > 10).",
                "Analyze ordinal nature of items."
            ],
            dontList: [
                "Using single-imputation methods (mean substitution).",
                "Parceling items (hides multidimensionality).",
                "Ignoring missing data if > 5%."
            ],
            reportList: [
                "Method for determining respondent engagement.",
                "Packages/Software versions used.",
                "Missing data handling technique.",
                "Share raw data/covariance matrix if possible."
            ]
        },
        {
            step: "3",
            title: "Estimation",
            icon: Settings,
            doList: [
                "Use OLS family for ordinal data: WLSMV (DWLS).",
                "Robust versions for non-normality (e.g., Robust DWLS).",
                "Use ML only for continuous data (5+ categories, normal)."
            ],
            dontList: [
                "Using ML for Likert scales < 5 points.",
                "Ignoring convergence issues."
            ],
            reportList: [
                "Justify estimator choice (based on data type).",
                "Report standardized AND non-standardized parameters.",
                "Specify identification method (marker variable vs fixed variance)."
            ]
        },
        {
            step: "4",
            title: "Model Fitting",
            icon: Activity,
            doList: [
                "Check local fit (factor loadings, residuals).",
                "Use Dynamic Fit Index (DFI) if possible.",
                "Prioritize SRMR (more robust for ordinal).",
                "Use reliability measures like McDonald's Omega."
            ],
            dontList: [
                "Relying solely on global fit (RMSEA/CFI) cutoffs.",
                "Using Cronbach's Alpha (assumes tau-equivalence).",
                "Ignoring high residuals or modification indices."
            ],
            reportList: [
                "Scaled Chi-square & df.",
                "RMSEA, CFI, SRMR.",
                "McDonald's Omega (or GLB).",
                "Local fit issues (cross-loadings > 0.3)."
            ]
        },
        {
            step: "5",
            title: "Comparisons",
            icon: GitMerge,
            doList: [
                "Compare nested models using Scaled Chi-square diff.",
                "Ensure modifications are theoretically justifiable.",
                "Compare using Power Analysis approach if in doubt."
            ],
            dontList: [
                "Comparing models using raw Chi-square diff.",
                "Drastic modifications (>20% of model).",
                "Adding error correlations without theoretical reason."
            ],
            reportList: [
                "All modifications made to the initial model.",
                "Justification for error correlations.",
                "Transparency on 'exploratory' changes."
            ]
        },
        {
            step: "6",
            title: "Power Analysis",
            icon: BarChart,
            doList: [
                "A priori sample planning.",
                "Post hoc power analysis using Monte Carlo simulation (simsem).",
                "Consider ordinal nature in power simulations."
            ],
            dontList: [
                "Using 'Rule of Thumb' (e.g., N=200) blindly.",
                "Using RMSEA-based power curves for ordinal data."
            ],
            reportList: [
                "Simulation stats: Parameter bias, SE bias, Coverage, Power.",
                "Did power exceed 0.80 for key parameters?"
            ]
        }
    ];

    return (
        <div className="w-full">
            {steps.map((s) => (
                <StepCard key={s.step} {...s} />
            ))}
        </div>
    );
};