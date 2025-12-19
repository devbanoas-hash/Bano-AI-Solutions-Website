import React, { useEffect, useState } from "react"
import { ArrowRight, Check } from "lucide-react"
import type { IndustryData } from "./types"

interface PainPointsProps {
  industry: IndustryData;
  onConfirm: (points: string[]) => void;
  onBack: () => void;
}

const PainPoints: React.FC<PainPointsProps> = ({ industry, onConfirm, onBack }) => {
  const [selectedPoints, setSelectedPoints] = useState<string[]>([]);

  useEffect(() => {
    // Pre-select all by default
    setSelectedPoints(industry.painPoints);
  }, [industry]);

  const togglePoint = (painPoint: string) => {
    if (selectedPoints.includes(painPoint)) {
      setSelectedPoints(selectedPoints.filter((p) => p !== painPoint));
    } else {
      setSelectedPoints([...selectedPoints, painPoint]);
    }
  };

  return (
    <div className="animate-fade-in w-full h-full flex flex-col relative">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-display text-white mb-1">
          Xác nhận <span className="text-emerald-400">nỗi đau</span>
        </h2>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-600/30">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <p className="text-xs text-emerald-300 uppercase tracking-wider font-semibold">{industry.name}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scroll pr-2 space-y-3 mb-6 p-1">
        {industry.painPoints.map((painPoint) => (
          <div
            key={painPoint}
            onClick={() => togglePoint(painPoint)}
            className={`relative cursor-pointer flex items-center gap-5 p-5 rounded-xl border transition-all duration-300 group overflow-hidden ${
              selectedPoints.includes(painPoint)
                ? 'bg-emerald-900/30 border-emerald-500/60 shadow-[0_0_25px_rgba(16,185,129,0.15)]'
                : 'bg-white/5 border-transparent hover:bg-white/10'
            }`}
          >
             {/* Selection Glow Background */}
             <div className={`absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent transition-opacity duration-300 ${selectedPoints.includes(painPoint) ? 'opacity-100' : 'opacity-0'}`}></div>

            {/* Custom Circular Checkbox */}
            <div className={`relative flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${
                selectedPoints.includes(painPoint) 
                  ? 'bg-emerald-500 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)] scale-110' 
                  : 'border-slate-600 bg-slate-900/50 group-hover:border-emerald-500/50 scale-100'
              }`}>
                <div className={`transition-all duration-200 ${selectedPoints.includes(painPoint) ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                   <Check size={16} className="text-white" strokeWidth={3} />
                </div>
            </div>
            
            <div className="flex-1 relative z-10">
              <p className={`text-sm md:text-base leading-relaxed transition-all duration-300 ${selectedPoints.includes(painPoint) ? 'text-white font-medium tracking-wide' : 'text-slate-400 group-hover:text-emerald-200'}`}>
                {painPoint}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-auto">
        <button 
          onClick={onBack}
          className="btn-secondary"
        >
          Quay lại
        </button>
        <button
          onClick={() => onConfirm(selectedPoints)}
          disabled={selectedPoints.length === 0}
          className="btn-primary flex-1 flex items-center justify-center gap-2 py-3"
        >
          <span className="group-hover:tracking-wide transition-all duration-300">PHÂN TÍCH NGAY</span>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default PainPoints;