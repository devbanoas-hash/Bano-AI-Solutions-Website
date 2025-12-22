import React, { useState, useRef, useEffect } from "react"
import { ChevronRight, Building2, Users, CheckCircle2 } from 'lucide-react';
import { COMPANY_SIZES, industries } from "../../constants/diagnostic.constant"


interface IndustrySelectorProps {
  onSelect: (id: string, companyName: string, companySize: string) => void;
}

const IndustrySelector: React.FC<IndustrySelectorProps> = ({ onSelect }) => {
  const [companyName, setCompanyName] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [errors, setErrors] = useState<{name?: boolean, size?: boolean}>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Prevent scroll from propagating to parent (Lenis)
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const isScrollable = scrollHeight > clientHeight;
      
      if (!isScrollable) return;

      const isAtTop = scrollTop === 0;
      const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 1;
      
      // Allow scroll within the container
      if ((e.deltaY < 0 && !isAtTop) || (e.deltaY > 0 && !isAtBottom)) {
        e.stopPropagation();
      }
      
      // Prevent overscroll from triggering parent scroll
      if ((e.deltaY < 0 && isAtTop) || (e.deltaY > 0 && isAtBottom)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      scrollContainer.dataset.touchStartY = e.touches[0].clientY.toString();
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchStartY = parseFloat(scrollContainer.dataset.touchStartY || '0');
      const touchCurrentY = e.touches[0].clientY;
      const deltaY = touchStartY - touchCurrentY;
      
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const isScrollable = scrollHeight > clientHeight;
      
      if (!isScrollable) return;

      const isAtTop = scrollTop === 0;
      const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 1;
      
      // Prevent overscroll
      if ((deltaY < 0 && isAtTop) || (deltaY > 0 && isAtBottom)) {
        e.preventDefault();
      }
      
      e.stopPropagation();
    };

    scrollContainer.addEventListener('wheel', handleWheel, { passive: false });
    scrollContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
    scrollContainer.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      scrollContainer.removeEventListener('wheel', handleWheel);
      scrollContainer.removeEventListener('touchstart', handleTouchStart);
      scrollContainer.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const handleIndustryClick = (id: string) => {
    const newErrors: {name?: boolean, size?: boolean} = {};
    if (!companyName.trim()) newErrors.name = true;
    if (!companySize) newErrors.size = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSelect(id, companyName, companySize);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(e.target.value);
    if (errors.name) setErrors(prev => ({ ...prev, name: false }));
  };

  const handleSizeSelect = (size: string) => {
    setCompanySize(size);
    if (errors.size) setErrors(prev => ({ ...prev, size: false }));
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="text-center mb-6 shrink-0 animate-fade-in">
        <h2 className="text-2xl md:text-3xl text-white mb-2 tracking-tight">
          Hồ sơ doanh nghiệp
        </h2>
        <p className="text-bano-green text-sm font-medium uppercase tracking-widest">
          Để Bano thiết kế lộ trình phù hợp nhất
        </p>
      </div>

      {/* Vertical List Layout with Custom Scrollbar - SCROLL ISOLATED */}
      <div 
        ref={scrollContainerRef}
        data-lenis-prevent
        className="flex-1 min-h-0 overflow-y-auto custom-scroll pr-2 pb-2 px-1 overscroll-contain"
        style={{ touchAction: 'pan-y' }}
      >
        {/* SECTION 1: Company Info Form - EXPANDED FRAME & HARMONIZED */}
        <div className="mb-8 mx-1">
          <div className="bg-slate-950/30 border border-emerald-900/30 rounded-3xl p-6 backdrop-blur-sm shadow-inner">
            <div className="grid gap-6">
              
              {/* Company Name Input */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-white text-sm font-semibold tracking-wide ml-1">
                  <Building2 size={16} className="text-bano-green" /> TÊN CÔNG TY
                </label>
                <div className="relative group w-full">
                  <div className={`absolute inset-0 rounded-2xl blur transition-opacity duration-300 ${errors.name ? 'bg-red-500/20 opacity-50' : 'bg-emerald-500/10 opacity-0 group-hover:opacity-100'}`}></div>
                  <input 
                    type="text" 
                    value={companyName}
                    onChange={handleNameChange}
                    placeholder="Nhập tên doanh nghiệp của bạn..."
                    className={`relative w-full h-14 bg-slate-900/80 backdrop-blur border rounded-2xl px-5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 transition-all text-base font-medium
                      ${errors.name 
                        ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' 
                        : 'border-emerald-500/20 hover:border-emerald-500/40 focus:border-emerald-500 focus:ring-emerald-500/30'
                      }`}
                  />
                  {errors.name && <p className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-red-400 bg-slate-900 px-2 py-1 rounded">Bắt buộc</p>}
                </div>
              </div>

              {/* Company Size Selection - GRID 2 COLS FOR BALANCE */}
              <div className="space-y-3">
                 <label className="flex items-center gap-2 text-white text-sm font-semibold tracking-wide ml-1">
                  <Users size={16} className="text-bano-green" /> QUY MÔ NHÂN SỰ
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {COMPANY_SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeSelect(size)}
                      className={`h-14 px-4 rounded-2xl border text-sm font-medium transition-all duration-300 relative overflow-hidden flex items-center justify-between group
                        ${companySize === size 
                          ? 'bg-bano-green border-bano-green text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
                          : 'bg-slate-900/60 border-bano-green/10 text-slate-400 hover:border-bano-green/40 hover:bg-bano-green/20 hover:text-bano-green'
                        }
                        ${errors.size && !companySize ? 'border-red-500/40 bg-red-900/10' : ''}
                      `}
                    >
                      <span className="relative z-10">{size}</span>
                      
                      {/* Selection Indicator Icon */}
                      <div className={`transition-all duration-300 ${companySize === size ? 'opacity-100 scale-100' : 'opacity-0 scale-50 -translate-x-2'}`}>
                        <CheckCircle2 size={18} className="text-white" />
                      </div>
                    </button>
                  ))}
                </div>
                 {errors.size && <p className="text-xs text-red-400 text-right pr-1 pt-1">Vui lòng chọn quy mô</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6 px-2">
           <div className="h-px bg-gradient-to-r from-transparent via-bano-green/50 to-transparent flex-1" />
           <span className="text-[10px] md:text-xs text-slate-500 uppercase tracking-[0.2em] font-bold">Lĩnh vực hoạt động</span>
           <div className="h-px bg-gradient-to-r from-transparent via-bano-green/50 to-transparent flex-1" />
        </div>

        <div className="flex flex-col gap-3">
          {industries.map((industry, idx) => (
            <button
              key={industry.id}
              onClick={() => handleIndustryClick(industry.id)}
              className="cursor-pointer group relative w-full flex items-center gap-4 p-4 rounded-2xl border border-green-900/50 bg-green-950/20 hover:bg-green-900/60 hover:border-bano-green/80 transition-all duration-300 overflow-hidden hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]"
              style={{ 
                animation: 'slideInRight 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards', 
                animationDelay: `${idx * 0.08}s`,
                opacity: 0,
                transform: 'translateX(30px)'
              }}
            >
              {/* Hover Highlight Gradient */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-bano-green to-bano-green/50 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-l-full"></div>
              
              {/* Icon Container */}
              <div className="shrink-0 w-12 h-12 rounded-xl bg-slate-900 border border-green-900/50 flex items-center justify-center text-bano-green group-hover:text-bano-green group-hover:border-bano-green/30 transition-all duration-300 shadow-lg">
                <industry.icon className="w-6 h-6" />
              </div>
              
              {/* Text Content */}
              <div className="flex-1 text-left flex flex-col justify-center">
                <h3 className="text-lg font-semibold text-slate-200 group-hover:text-bano-green transition-colors tracking-wide group-hover:-translate-y-0.5 duration-300">
                  {industry.name}
                </h3>
              </div>
              
              {/* Arrow */}
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-green-700 bg-green-950/50 border border-transparent group-hover:border-green-500/30 group-hover:text-green-400 group-hover:bg-green-900 transition-all transform group-hover:translate-x-1 duration-300">
                <ChevronRight size={18} />
              </div>
            </button>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes slideInRight {
          0% { transform: translateX(30px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default IndustrySelector;