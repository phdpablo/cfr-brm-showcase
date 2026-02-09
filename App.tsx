/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { FactorModelScene } from './components/QuantumScene';
import { ModelComparisonDiagram, EstimatorDecisionTree } from './components/Diagrams';
import { BestPracticesTimeline } from './components/BestPractices';
import { ArrowDown, Menu, X, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream text-brand-blue selection:bg-brand-orange selection:text-white font-sans">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-brand-orange rounded-md flex items-center justify-center text-white font-serif font-bold text-xl shadow-sm">
              Ψ
            </div>
            <span className={`font-serif font-bold text-lg tracking-wide transition-opacity ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
              CFA <span className="font-normal text-brand-orange">BEST PRACTICES</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-brand-blue/80">
            <a href="#introduction" onClick={scrollToSection('introduction')} className="hover:text-brand-orange transition-colors cursor-pointer uppercase">Introduction</a>
            <a href="#models" onClick={scrollToSection('models')} className="hover:text-brand-orange transition-colors cursor-pointer uppercase">Models</a>
            <a href="#guidelines" onClick={scrollToSection('guidelines')} className="hover:text-brand-orange transition-colors cursor-pointer uppercase">Guidelines</a>
            <a href="#software" onClick={scrollToSection('software')} className="hover:text-brand-orange transition-colors cursor-pointer uppercase">Software</a>
            <a 
              href="https://doi.org/10.3758/s13428-024-02375-7" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-5 py-2 bg-brand-blue text-white rounded-md hover:bg-brand-blue/90 transition-colors shadow-sm cursor-pointer"
            >
              Read Paper
            </a>
          </div>

          <button className="md:hidden text-brand-blue p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-brand-cream flex flex-col items-center justify-center gap-8 text-xl font-serif animate-fade-in text-brand-blue">
            <a href="#introduction" onClick={scrollToSection('introduction')} className="hover:text-brand-orange transition-colors cursor-pointer uppercase">Introduction</a>
            <a href="#models" onClick={scrollToSection('models')} className="hover:text-brand-orange transition-colors cursor-pointer uppercase">Visual Models</a>
            <a href="#guidelines" onClick={scrollToSection('guidelines')} className="hover:text-brand-orange transition-colors cursor-pointer uppercase">The Checklist</a>
            <a href="#software" onClick={scrollToSection('software')} className="hover:text-brand-orange transition-colors cursor-pointer uppercase">JASP vs Lavaan</a>
            <a 
              href="https://doi.org/10.3758/s13428-024-02375-7" 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => setMenuOpen(false)} 
              className="px-6 py-3 bg-brand-blue text-white rounded-md shadow-lg cursor-pointer"
            >
              Read Paper
            </a>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden bg-brand-blue/5">
        <FactorModelScene />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(249,248,244,0.1)_0%,rgba(249,248,244,0.8)_80%,rgba(249,248,244,1)_100%)]" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-block mb-4 px-3 py-1 border border-brand-orange text-brand-orange text-xs tracking-[0.2em] uppercase font-bold rounded-full backdrop-blur-sm bg-white/50">
            Behavior Research Methods • 2024
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-medium leading-tight mb-6 text-brand-blue drop-shadow-sm">
            Confirmatory <br/> Factor Analysis
          </h1>
          <h2 className="text-xl md:text-3xl font-light text-brand-blue/70 mb-8 max-w-3xl mx-auto">
            A practical guide to "Typical CFA" in Applied Social Sciences using <span className="font-semibold text-brand-orange">JASP</span> and <span className="font-semibold text-brand-orange">lavaan</span>.
          </h2>
          <p className="max-w-xl mx-auto text-sm md:text-base text-brand-blue/60 font-medium leading-relaxed mb-12 uppercase tracking-wide">
             Based on the tutorial by Pablo Rogers
          </p>
          
          <div className="flex justify-center">
             <a href="#introduction" onClick={scrollToSection('introduction')} className="group flex flex-col items-center gap-2 text-sm font-medium text-brand-blue/50 hover:text-brand-orange transition-colors cursor-pointer">
                <span>START GUIDE</span>
                <span className="p-2 border border-brand-blue/20 rounded-full group-hover:border-brand-orange transition-colors bg-white/50">
                    <ArrowDown size={16} />
                </span>
             </a>
          </div>
        </div>
      </header>

      <main>
        {/* Introduction / The Problem */}
        <section id="introduction" className="py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4 sticky top-32">
              <div className="inline-block mb-3 text-xs font-bold tracking-widest text-brand-orange uppercase">Context</div>
              <h2 className="font-serif text-4xl mb-6 leading-tight text-brand-blue">The "Typical" CFA Problem</h2>
              <div className="w-16 h-1 bg-brand-green mb-6"></div>
              <p className="text-brand-blue/60 text-sm leading-relaxed">
                Most CFA textbooks focus on continuous data and Maximum Likelihood (ML) estimation. However, applied social sciences typically use <strong>ordinal data</strong> (Likert scales).
              </p>
            </div>
            <div className="md:col-span-8 space-y-12">
               <div className="bg-brand-cream p-8 rounded-xl border border-brand-green/20">
                  <h3 className="font-serif text-2xl mb-4 text-brand-blue">Why it matters</h3>
                  <p className="text-lg text-brand-blue/80 leading-relaxed mb-6">
                    Using ML on ordinal data can lead to biased parameters and incorrect fit indices. The "Typical CFA" requires specific handling:
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <AlertTriangle className="text-brand-orange shrink-0 mt-1" size={20}/>
                      <span><strong>The Error:</strong> Treating 5-point Likert scales as continuous and using default ML estimation.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-brand-green shrink-0 mt-1" size={20}/>
                      <span><strong>The Solution:</strong> Using <strong>WLSMV</strong> (Weighted Least Squares Mean and Variance adjusted) or <strong>DWLS</strong> estimators designed for categorical data.</span>
                    </li>
                  </ul>
               </div>

               <EstimatorDecisionTree />
            </div>
          </div>
        </section>

        {/* Visual Models */}
        <section id="models" className="py-24 bg-brand-blue text-white overflow-hidden relative">
             <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none"></div>
             
             <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-brand-green uppercase">Visualization</div>
                    <h2 className="font-serif text-4xl md:text-5xl mb-6">Structural Models</h2>
                    <p className="text-brand-green max-w-2xl mx-auto">
                        A typical validation often compares different structural hypotheses. Explore the three common models discussed in the tutorial.
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-brand-blue/30">
                    <ModelComparisonDiagram />
                </div>
             </div>
        </section>

        {/* The Checklist (Table 3) */}
        <section id="guidelines" className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <div className="inline-block mb-3 text-xs font-bold tracking-widest text-brand-orange uppercase">Methodology</div>
                <h2 className="font-serif text-4xl md:text-5xl mb-6 text-brand-blue">Best Practices Checklist</h2>
                <p className="text-brand-blue/60 max-w-2xl mx-auto">
                    A comprehensive guide for conducting a typical CFA, from model selection to reporting.
                </p>
            </div>
            
            <BestPracticesTimeline />

          </div>
        </section>

        {/* Software: JASP vs lavaan */}
        <section id="software" className="py-24 bg-brand-cream border-t border-brand-green/20">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="bg-white p-10 rounded-xl shadow-sm border border-brand-green/30 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-6">
                            <h3 className="font-serif text-3xl text-brand-blue">JASP</h3>
                            <span className="bg-brand-green/10 text-brand-green text-xs font-bold px-2 py-1 rounded uppercase">Beginner Friendly</span>
                        </div>
                        <p className="text-brand-blue/70 mb-6 leading-relaxed">
                            A versatile, open-source software with a "point-and-click" interface. Often described as an R front-end.
                        </p>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center gap-2 text-sm text-brand-blue/80">
                                <CheckCircle size={16} className="text-brand-green"/> No coding required (GUI)
                            </li>
                            <li className="flex items-center gap-2 text-sm text-brand-blue/80">
                                <CheckCircle size={16} className="text-brand-green"/> Real-time results
                            </li>
                            <li className="flex items-center gap-2 text-sm text-brand-blue/80">
                                <AlertTriangle size={16} className="text-brand-orange"/> Limited advanced features (Power analysis, DFI)
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white p-10 rounded-xl shadow-sm border border-brand-orange/30 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-6">
                            <h3 className="font-serif text-3xl text-brand-blue">lavaan</h3>
                            <span className="bg-brand-orange/10 text-brand-orange text-xs font-bold px-2 py-1 rounded uppercase">Advanced Control</span>
                        </div>
                        <p className="text-brand-blue/70 mb-6 leading-relaxed">
                            A comprehensive R package for Structural Equation Modeling. Offers maximum flexibility and advanced estimation.
                        </p>
                         <ul className="space-y-3 mb-8">
                            <li className="flex items-center gap-2 text-sm text-brand-blue/80">
                                <CheckCircle size={16} className="text-brand-green"/> Full control over estimation & missing data
                            </li>
                            <li className="flex items-center gap-2 text-sm text-brand-blue/80">
                                <CheckCircle size={16} className="text-brand-green"/> Access to add-ons (semTools, dynamic, simsem)
                            </li>
                            <li className="flex items-center gap-2 text-sm text-brand-blue/80">
                                <AlertTriangle size={16} className="text-brand-orange"/> Steeper learning curve (R Syntax)
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

      </main>

      <footer className="bg-brand-blue text-white py-16 border-t border-brand-green/20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
                <div className="font-serif font-bold text-2xl mb-2 text-brand-orange">Rogers (2024)</div>
                <p className="text-sm text-brand-green/60">"Best practices for your confirmatory factor analysis: A JASP and lavaan tutorial"</p>
                <p className="text-xs text-brand-green/40 mt-1">Behavior Research Methods</p>
            </div>
            <div className="flex gap-4">
                 <a href="#" className="text-brand-green hover:text-white transition-colors text-sm">Download JASP File</a>
                 <a href="#" className="text-brand-green hover:text-white transition-colors text-sm">R Scripts</a>
            </div>
        </div>
        <div className="text-center mt-12 text-xs text-brand-blue/40">
            Visualization generated by AI based on the original manuscript.
        </div>
      </footer>
    </div>
  );
};

export default App;