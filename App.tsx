
import React, { useState, useEffect, useRef } from 'react';
import { Icons, DORK_PRESETS } from './constants';
import { DorkResult, DorkCategory } from './types';
import { generateAIDorks } from './services/geminiService';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<DorkCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [results, setResults] = useState<DorkResult[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [vandaStatus, setVandaStatus] = useState('AWAITING COMMAND');
  const [terminalLines, setTerminalLines] = useState<string[]>(['VANDA OS v4.2 INITIALIZED', 'NEURAL LINK ESTABLISHED...']);
  
  useEffect(() => {
    const initialResults: DorkResult[] = DORK_PRESETS.map(p => ({
      query: p.template,
      description: p.name,
      category: p.category
    }));
    setResults(initialResults);
  }, []);

  const addTerminalLine = (line: string) => {
    setTerminalLines(prev => [...prev.slice(-4), `> ${line.toUpperCase()}`]);
  };

  const handleCopy = (query: string) => {
    navigator.clipboard.writeText(query);
    setNotification('DATA EXTRACTED TO CLIPBOARD');
    addTerminalLine('Buffer dump successful');
    setTimeout(() => setNotification(null), 3000);
  };

  const handleOpenSearch = (query: string) => {
    addTerminalLine(`Injecting query to global node...`);
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
  };

  const handleAiGenerate = async () => {
    if (!aiPrompt.trim()) return;
    setIsAiLoading(true);
    setVandaStatus('CALCULATING EXPLOIT VECTORS');
    addTerminalLine(`Infiltrating: ${aiPrompt.slice(0, 20)}...`);
    
    document.body.classList.add('glitch-active');
    
    const aiResults = await generateAIDorks(aiPrompt);
    
    setResults(prev => [...aiResults, ...prev]);
    setIsAiLoading(false);
    setAiPrompt('');
    setVandaStatus('NEURAL OVERRIDE COMPLETE');
    addTerminalLine('Neural synthesis complete. Targets localized.');
    
    setTimeout(() => {
      document.body.classList.remove('glitch-active');
    }, 1000);
  };

  const filteredResults = results.filter(r => {
    const matchesCategory = activeCategory === 'All' || r.category === activeCategory;
    const matchesSearch = r.query.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen text-cyan-400 flex flex-col relative crt-flicker">
      {/* Vanda Interactive Avatar Section */}
      <div className="fixed top-24 right-10 w-72 hidden xl:block z-0 pointer-events-none transition-all duration-1000 opacity-40 hover:opacity-100">
        <div className="relative group">
           <div className="absolute inset-0 bg-fuchsia-500/10 blur-3xl rounded-full"></div>
           <img 
              src="https://images.unsplash.com/photo-1549605659-32d82da3a059?q=80&w=800&auto=format&fit=crop" 
              alt="Vanda Cyborg"
              className="w-full aspect-square object-cover rounded-full border-4 border-fuchsia-500/20 grayscale contrast-150 brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 floating"
           />
           <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-max bg-black/90 border border-cyan-500 px-6 py-2 cyber-font text-xs text-cyan-400 font-black tracking-[0.3em] uppercase shadow-[0_0_20px_rgba(34,211,238,0.4)]">
             <span className="text-fuchsia-500 mr-2">VANDA //</span> {vandaStatus}
           </div>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-cyan-500/20 bg-black/90 backdrop-blur-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="relative">
                <div className="absolute inset-0 bg-cyan-500/40 blur animate-pulse"></div>
                <div className="relative p-4 bg-black border border-cyan-500 rounded-none shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                  <Icons.Shield />
                </div>
            </div>
            <div>
              <h1 className="cyber-font text-4xl font-black tracking-tighter text-white uppercase italic leading-none">
                Vanda <span className="text-cyan-400">Search</span> <span className="text-fuchsia-500">Dork</span>
              </h1>
              <div className="flex gap-6 mt-2">
                 <span className="text-[10px] text-cyan-700 font-bold tracking-[0.4em] uppercase">SYSTEM: NEURAL_NET_v.4</span>
                 <span className="text-[10px] text-fuchsia-900 font-bold tracking-[0.4em] uppercase">ENCRYPTION: 1024-BIT</span>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:flex flex-col items-end">
            {terminalLines.map((line, i) => (
               <div key={i} className="text-[9px] text-cyan-950 font-mono italic tracking-tight">{line}</div>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 md:p-10 space-y-16 relative z-10">
        
        {/* Advanced Filter Matrix */}
        <div className="flex flex-wrap gap-3 pb-4">
            {(Object.values(DorkCategory) as string[]).concat(['All']).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat as any);
                  addTerminalLine(`Focusing scanner: ${cat}`);
                }}
                className={`px-6 py-3 rounded-none border text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-fuchsia-600 text-white border-fuchsia-400 shadow-[0_0_25px_rgba(217,70,239,0.7)] -translate-y-1' 
                    : 'bg-black/60 text-cyan-900 border-cyan-900/40 hover:border-cyan-400 hover:text-cyan-400'
                }`}
              >
                {cat.split(' ')[0]}
              </button>
            ))}
        </div>

        {/* Neural Override Command Console */}
        <section className="hud-border p-12 group relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 space-y-10">
            <div className="flex items-center gap-6">
               <div className="h-12 w-1.5 bg-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.8)]"></div>
               <div>
                  <h2 className="text-cyan-400 font-black cyber-font text-3xl uppercase tracking-[0.3em] italic">Neural Core Input</h2>
                  <p className="text-fuchsia-900 text-xs font-bold uppercase tracking-[0.5em] mt-2">Bypassing Global Web Constraints...</p>
               </div>
            </div>

            <div className="flex flex-col xl:flex-row gap-8">
              <div className="flex-1 space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="TARGET: GOV, SQLI, SHOP, TRAVEL, PASSWORDS..."
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAiGenerate()}
                    className="w-full bg-black/80 border border-cyan-950 rounded-none px-8 py-6 focus:outline-none focus:border-cyan-400 transition-all text-cyan-500 placeholder:text-cyan-950 font-black text-xl italic"
                  />
                  <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent w-full opacity-50"></div>
                </div>
                <div className="flex justify-between items-center text-[10px] font-black tracking-widest">
                   <div className="text-cyan-950">VANDA_INTEL_GATHERING_PROTOCOL_v.4.2</div>
                   <div className={`transition-colors duration-300 ${isAiLoading ? 'text-fuchsia-400' : 'text-cyan-950'}`}>
                      {isAiLoading ? '[ UPLINKING NEURAL DATA ]' : '[ READY ]'}
                   </div>
                </div>
              </div>

              <button
                onClick={handleAiGenerate}
                disabled={isAiLoading}
                className="bg-black hover:bg-cyan-500 border-2 border-cyan-500 text-cyan-500 hover:text-black font-black py-6 px-16 rounded-none transition-all shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:shadow-[0_0_50px_rgba(34,211,238,0.6)] flex items-center justify-center gap-6 cyber-font uppercase text-2xl group/btn"
              >
                {isAiLoading ? (
                  <div className="h-8 w-8 border-4 border-white/20 border-t-cyan-500 rounded-full animate-spin" />
                ) : (
                  <>
                    <Icons.Sparkles />
                    <span className="group-hover/btn:tracking-[0.2em] transition-all">Engage</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Global Node Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {filteredResults.length > 0 ? (
            filteredResults.map((result, idx) => (
              <div 
                key={`${result.query}-${idx}`}
                className="bg-black/90 border border-cyan-950 p-10 rounded-none hover:border-fuchsia-500/50 hover:bg-black transition-all group relative overflow-hidden"
              >
                {/* Visual Scanner Line Effect on Hover */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-fuchsia-500 shadow-[0_0_10px_fuchsia] -translate-y-full group-hover:animate-[scanline_2s_linear_infinite] opacity-0 group-hover:opacity-30"></div>
                
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-cyan-400 animate-pulse rounded-none"></div>
                    <span className="text-[11px] uppercase tracking-[0.4em] font-black text-cyan-600">
                      VECTOR: {result.category}
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => handleCopy(result.query)}
                      className="p-4 text-cyan-900 hover:text-cyan-400 transition-all bg-black border border-cyan-950 hover:border-cyan-400"
                      title="Clone Query"
                    >
                      <Icons.Copy />
                    </button>
                    <button 
                      onClick={() => handleOpenSearch(result.query)}
                      className="p-4 text-cyan-900 hover:text-fuchsia-500 transition-all bg-black border border-cyan-950 hover:border-fuchsia-500"
                      title="Inject Web Node"
                    >
                      <Icons.External />
                    </button>
                  </div>
                </div>
                
                <h3 className="text-white font-black mb-6 tracking-tight uppercase text-lg cyber-font border-b border-cyan-950 pb-4">{result.description}</h3>
                
                <div className="relative group/query">
                    <div className="relative mono text-xs p-6 bg-slate-950 border border-cyan-950/30 rounded-none text-cyan-400 break-all select-all font-bold">
                      <span className="text-cyan-900 mr-4 opacity-30 select-none">VANDA@ROOT:~$</span>{result.query}
                    </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-40 text-center hud-border border-dashed opacity-50">
              <div className="text-fuchsia-950 mb-10 flex justify-center scale-[3] opacity-30">
                <Icons.Search />
              </div>
              <p className="text-fuchsia-900 font-black cyber-font tracking-[0.5em] uppercase text-2xl">Target Frequency Silent</p>
              <p className="text-cyan-950 text-[11px] mt-6 tracking-widest font-black">ADJUST NEURAL PARAMETERS FOR GLOBAL SCAN</p>
            </div>
          )}
        </div>
      </main>

      {/* Notifications - HUD Alert */}
      {notification && (
        <div className="fixed top-28 left-1/2 -translate-x-1/2 bg-black border-2 border-cyan-400 text-cyan-400 px-12 py-5 shadow-[0_0_50px_rgba(34,211,238,0.8)] z-50 font-black cyber-font tracking-tighter animate-pulse flex items-center gap-6">
           <div className="w-4 h-4 bg-cyan-400 rounded-none animate-ping"></div>
           {notification}
        </div>
      )}

      {/* Footer - Cyber Intel */}
      <footer className="border-t border-cyan-950 bg-black py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
          <div className="flex items-center gap-8">
             <div className="cyber-font font-black text-3xl text-cyan-950 tracking-tighter uppercase italic">Vanda OS</div>
             <div className="h-10 w-[2px] bg-cyan-950 hidden md:block opacity-20"></div>
             <div className="text-cyan-950 text-[11px] font-black uppercase tracking-[0.4em]">
                <p>Uplink: STABLE // Nodes: 1,402,119</p>
                <p className="mt-2 text-fuchsia-950">Alert: Unauthorized Access Protocol Active</p>
             </div>
          </div>
          <div className="flex gap-12 text-cyan-950 text-[11px] font-black uppercase tracking-[0.3em]">
            <a href="#" className="hover:text-cyan-400 transition-all hover:tracking-[0.5em]">Security</a>
            <a href="#" className="hover:text-fuchsia-500 transition-all hover:tracking-[0.5em]">Neural</a>
            <a href="#" className="hover:text-white transition-all hover:tracking-[0.5em]">Bypass</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
