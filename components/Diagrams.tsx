/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, GitMerge, Layers, ArrowRight } from 'lucide-react';

// --- ESTIMATOR DECISION TREE ---
export const EstimatorDecisionTree: React.FC = () => {
    const [step, setStep] = useState(0);

    return (
        <div className="bg-white p-8 rounded-xl border border-brand-green/30 shadow-sm">
            <h3 className="font-serif text-xl text-brand-blue mb-6">Decision: Which Estimator?</h3>
            
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                {/* Step 1: Data Type */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center"
                >
                    <div className="w-48 h-24 bg-brand-cream border border-brand-blue/10 rounded-lg flex flex-col items-center justify-center p-4 text-center">
                        <span className="text-xs font-bold uppercase text-brand-blue/50 mb-1">Data Type</span>
                        <div className="font-bold text-brand-blue">Likert Scale <br/>(Ordinal)</div>
                    </div>
                </motion.div>

                <ArrowRight className="text-brand-blue/30 rotate-90 md:rotate-0" />

                {/* Step 2: Items count */}
                <motion.div 
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.2 }}
                     className="flex flex-col items-center"
                >
                     <div className="w-48 h-24 bg-brand-cream border border-brand-blue/10 rounded-lg flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
                        <span className="text-xs font-bold uppercase text-brand-blue/50 mb-1">Condition</span>
                        <div className="font-bold text-brand-blue">&lt; 5 Categories <br/> or Skewed</div>
                        <div className="absolute top-0 right-0 w-3 h-3 bg-brand-orange rounded-bl-lg"></div>
                     </div>
                </motion.div>

                <ArrowRight className="text-brand-blue/30 rotate-90 md:rotate-0" />

                 {/* Step 3: Estimator */}
                 <motion.div 
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.4 }}
                     className="flex flex-col items-center"
                >
                     <div className="w-48 h-24 bg-brand-blue text-white rounded-lg flex flex-col items-center justify-center p-4 text-center shadow-lg shadow-brand-blue/20">
                        <span className="text-xs font-bold uppercase text-white/50 mb-1">Recommended</span>
                        <div className="font-bold text-xl tracking-wider">WLSMV</div>
                        <div className="text-[10px] opacity-70">(or DWLS)</div>
                     </div>
                </motion.div>
            </div>

            <div className="mt-8 text-sm text-brand-blue/60 bg-brand-cream/50 p-4 rounded-lg italic">
                * Note: ML (Maximum Likelihood) is typically only appropriate for continuous data or Likert scales with ≥ 5 categories that follow a normal distribution.
            </div>
        </div>
    );
};

// --- MODEL COMPARISON DIAGRAM ---

const ModelNode = ({ cx, cy, type, label }: { cx: number, cy: number, type: 'latent' | 'item' | 'second', label?: string }) => {
    const r = type === 'item' ? 15 : 22;
    const fill = type === 'latent' ? '#F18C22' : type === 'second' ? '#0D232C' : 'white';
    const stroke = type === 'item' ? '#0D232C' : type === 'second' ? '#0D232C' : '#F18C22';
    const textFill = type === 'second' ? 'white' : '#0D232C';
    
    return (
        <g>
            {type === 'item' ? (
                <rect x={cx-15} y={cy-15} width={30} height={30} fill={fill} stroke={stroke} strokeWidth="2" />
            ) : (
                <circle cx={cx} cy={cy} r={r} fill={fill} stroke={stroke} strokeWidth="2" fillOpacity={type==='latent' ? 0.2 : 1}/>
            )}
            {label && (
                 <text x={cx} y={cy+4} textAnchor="middle" fontSize="10" fill={textFill} fontWeight="bold">{label}</text>
            )}
        </g>
    )
}

const Path = ({ d, dashed = false }: { d: string, dashed?: boolean }) => (
    <path d={d} stroke="#0D232C" strokeWidth="1.5" fill="none" opacity="0.4" strokeDasharray={dashed ? "4,4" : "none"} />
)

export const ModelComparisonDiagram: React.FC = () => {
    const [activeModel, setActiveModel] = useState<'correlated' | 'bifactor' | 'second_order'>('correlated');

    // Coordinates
    const itemY = 250;
    const latentY = 150;
    const generalY = 60;
    
    // 4 Domains
    const factors = [
        { id: 1, x: 100, label: 'Phys' },
        { id: 2, x: 200, label: 'Psych' },
        { id: 3, x: 300, label: 'Soc' },
        { id: 4, x: 400, label: 'Env' },
    ];

    // Items (2 per factor for demo)
    const items = factors.flatMap(f => [
        { id: `${f.id}a`, x: f.x - 20, parent: f.id },
        { id: `${f.id}b`, x: f.x + 20, parent: f.id },
    ]);

    return (
        <div className="flex flex-col md:flex-row h-full min-h-[500px]">
            {/* Controls */}
            <div className="w-full md:w-1/4 bg-brand-cream border-r border-brand-green/20 p-6 flex flex-col gap-4">
                <h3 className="font-serif text-xl text-brand-blue mb-2">Select Model</h3>
                
                <button 
                    onClick={() => setActiveModel('correlated')}
                    className={`p-4 rounded-lg text-left transition-all duration-200 border ${activeModel === 'correlated' ? 'bg-white border-brand-orange shadow-md' : 'bg-transparent border-transparent hover:bg-white/50'}`}
                >
                    <div className="flex items-center gap-3 mb-1">
                        <Network size={18} className={activeModel === 'correlated' ? 'text-brand-orange' : 'text-brand-blue/50'}/>
                        <span className="font-bold text-brand-blue">Correlated Factors</span>
                    </div>
                    <p className="text-xs text-brand-blue/60">Most common. Assume domains are distinct but related.</p>
                </button>

                <button 
                    onClick={() => setActiveModel('bifactor')}
                    className={`p-4 rounded-lg text-left transition-all duration-200 border ${activeModel === 'bifactor' ? 'bg-white border-brand-orange shadow-md' : 'bg-transparent border-transparent hover:bg-white/50'}`}
                >
                    <div className="flex items-center gap-3 mb-1">
                        <GitMerge size={18} className={activeModel === 'bifactor' ? 'text-brand-orange' : 'text-brand-blue/50'}/>
                        <span className="font-bold text-brand-blue">Bifactor</span>
                    </div>
                    <p className="text-xs text-brand-blue/60">One general factor explains variance in all items alongside specific factors.</p>
                </button>

                <button 
                    onClick={() => setActiveModel('second_order')}
                    className={`p-4 rounded-lg text-left transition-all duration-200 border ${activeModel === 'second_order' ? 'bg-white border-brand-orange shadow-md' : 'bg-transparent border-transparent hover:bg-white/50'}`}
                >
                    <div className="flex items-center gap-3 mb-1">
                        <Layers size={18} className={activeModel === 'second_order' ? 'text-brand-orange' : 'text-brand-blue/50'}/>
                        <span className="font-bold text-brand-blue">Second-Order</span>
                    </div>
                    <p className="text-xs text-brand-blue/60">A higher-level factor explains the correlations between lower-level factors.</p>
                </button>
            </div>

            {/* Visualization */}
            <div className="flex-1 bg-white relative flex items-center justify-center p-8">
                <svg width="500" height="350" viewBox="0 0 500 350" className="overflow-visible">
                    <AnimatePresence>
                        {/* 1. Items Layer (Bottom) */}
                        {items.map(item => (
                            <g key={item.id}>
                                <ModelNode cx={item.x} cy={itemY} type="item" />
                            </g>
                        ))}

                        {/* 2. Factors Layer (Middle) */}
                        {factors.map(factor => (
                             <g key={factor.id}>
                                <ModelNode cx={factor.x} cy={latentY} type="latent" label={factor.label} />
                                {/* Paths to items */}
                                {items.filter(i => i.parent === factor.id).map(i => (
                                    <motion.path 
                                        key={`path-${factor.id}-${i.id}`}
                                        d={`M ${factor.x} ${latentY + 22} L ${i.x} ${itemY - 15}`}
                                        stroke="#0D232C" strokeWidth="1.5" opacity="0.6"
                                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                                    />
                                ))}
                             </g>
                        ))}

                        {/* 3. Conditional Connections based on Model */}
                        
                        {/* Correlated: Curves between factors */}
                        {activeModel === 'correlated' && (
                            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <path d={`M ${factors[0].x} ${latentY-22} Q 250 ${latentY-80} ${factors[3].x} ${latentY-22}`} stroke="#87CBCC" fill="none" strokeWidth="2" strokeDasharray="4,4"/>
                                <path d={`M ${factors[0].x+10} ${latentY-20} Q 150 ${latentY-50} ${factors[1].x-10} ${latentY-20}`} stroke="#87CBCC" fill="none" strokeWidth="2" strokeDasharray="4,4"/>
                                <path d={`M ${factors[1].x+10} ${latentY-20} Q 250 ${latentY-50} ${factors[2].x-10} ${latentY-20}`} stroke="#87CBCC" fill="none" strokeWidth="2" strokeDasharray="4,4"/>
                                <path d={`M ${factors[2].x+10} ${latentY-20} Q 350 ${latentY-50} ${factors[3].x-10} ${latentY-20}`} stroke="#87CBCC" fill="none" strokeWidth="2" strokeDasharray="4,4"/>
                            </motion.g>
                        )}

                        {/* Second Order: Higher factor above */}
                        {activeModel === 'second_order' && (
                            <motion.g initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                                <ModelNode cx={250} cy={generalY} type="second" label="QOL" />
                                {factors.map(f => (
                                    <path key={`sec-${f.id}`} d={`M 250 ${generalY+22} L ${f.x} ${latentY-22}`} stroke="#0D232C" strokeWidth="2" />
                                ))}
                            </motion.g>
                        )}

                        {/* Bifactor: General factor pointing directly to items */}
                        {activeModel === 'bifactor' && (
                            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <ModelNode cx={250} cy={generalY} type="second" label="Gen" />
                                {items.map(item => (
                                     <path key={`bi-${item.id}`} d={`M 250 ${generalY+22} L ${item.x} ${itemY-15}`} stroke="#0D232C" strokeWidth="1" opacity="0.3" />
                                ))}
                            </motion.g>
                        )}

                    </AnimatePresence>
                </svg>
            </div>
        </div>
    );
};
