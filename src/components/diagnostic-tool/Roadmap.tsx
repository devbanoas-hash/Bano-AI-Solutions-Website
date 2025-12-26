import React, { useEffect, useMemo, useState, useRef } from "react"
import { RefreshCw, Zap, CheckCircle2, ArrowRight } from "lucide-react"
import Hourglass from "./Hourglass"
import { api } from "../../configs/axios"
import type { IndustryData, RoadmapData, UserState } from "./types"
import { Link } from "wouter"
import { scrollToTop } from "../../utils/scroll-helper"

interface RoadmapProps {
  industry: IndustryData;
  userState: UserState;
  onReset: () => void;
}

const Roadmap: React.FC<RoadmapProps> = ({ industry, userState, onReset }) => {
  const selectedPainPoints = userState.confirmedPainPoints;
  const userPhone = userState.phoneNumber;
  const companyName = userState.companyName;

  const [loading, setLoading] = useState(true)
  const [roadmapData, setRoadmapData] = useState<RoadmapData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const hasFetchedRef = useRef(false)

  useEffect(() => {
    // Prevent double calls
    if (hasFetchedRef.current) return
    hasFetchedRef.current = true

    let isMounted = true

    async function fetchRoadmap() {
      if (!isMounted) return
      setLoading(true)
      setError(null)
      setRoadmapData(null)

      const submissionData = {
        timestamp: new Date().toISOString(),
        industry: {
          id: industry.id,
          name: industry.name,
        },
        painPoints: {
          selected: selectedPainPoints,
          other: null,
          totalCount: selectedPainPoints.length,
        },
        contact: {
          phone: userPhone,
        },
        metadata: {
          submittedAt: new Date().toLocaleString("vi-VN"),
          userAgent: typeof window !== "undefined" ? window.navigator.userAgent : null,
        },
      }

      try {
        const { data: response } = await api.post("/", submissionData)

        if (!response || !Array.isArray(response) || !response[0]?.output) {
          throw new Error("Invalid response structure")
        }

        // Map response to match RoadmapData type structure
        const mappedData: RoadmapData = {
          output: response[0].output
        }

        if (!mappedData.output?.roadmap) {
          throw new Error("Invalid roadmap data")
        }

        setRoadmapData(mappedData)
      }
      catch (e) {
        console.log("Error fetching roadmap:", e)
        if (!isMounted) return
        setError("Không thể tạo lộ trình lúc này. Vui lòng thử lại.")
      }
      finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchRoadmap()
    return () => {
      isMounted = false
      hasFetchedRef.current = false
    }
  }, [industry.id, industry.name, selectedPainPoints, userPhone])

  const phases = useMemo(() => {
    const rm = roadmapData?.output?.roadmap
    if (!rm) return []
    return [rm.phase_1, rm.phase_2, rm.phase_3].filter(Boolean)
  }, [roadmapData])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] animate-fade-in w-full">
        <Hourglass />
        <div className="mt-8 text-center">
          <h3 className="text-green-500 text-lg tracking-widest uppercase animate-pulse mb-1">
            AI Processing
          </h3>
          <p className="text-green-800 text-xs font-medium">Đang xây dựng kiến trúc dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="animate-fade-in w-full flex flex-col items-center justify-center text-center p-6">
        <div className="max-w-lg">
          <h2 className="text-2xl font-bold text-white mb-2">Có lỗi xảy ra</h2>
          <p className="text-slate-400 text-sm mb-6">{error}</p>
          <button
            onClick={onReset}
            className="btn-primary px-6 py-3 inline-flex items-center justify-center gap-2"
          >
            Thử lại
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    )
  }

  if (!roadmapData?.output?.roadmap) {
    return null
  }

  return (
    <div className="animate-fade-in w-full flex flex-col p-2">
      
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-green-900/50 flex-shrink-0">
         <div className="flex flex-col gap-2">
            <div className="inline-flex items-center w-fit gap-1.5 px-3 py-1 rounded-full bg-green-900/20 border border-green-500/30 text-green-500 text-xs font-bold uppercase tracking-wider mb-2">
              <CheckCircle2 size={12} />
              <span>Transformation Ready</span>
            </div>
            <h2 className="text-3xl font-bold text-white">
              Lộ trình chuyển đổi cho <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-200">{companyName}</span>
            </h2>
         </div>
         <div className="hidden md:block text-right">
            <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">Mã hồ sơ</p>
            <p className="text-green-500">BANO-{Math.floor(Math.random() * 10000)}</p>
         </div>
      </div>

      {/* Main Content - Grid Layout for Large Screen */}
      <div className="pr-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: The Roadmap Timeline (7 cols) - Added Padding Left to fix clipping */}
          <div className="lg:col-span-8 space-y-8 pl-6">
            {phases.map((phase, index) => (
              <div key={index} className="relative pl-8 md:pl-10 border-l-2 border-green-900 last:border-0 group">
                {/* Timeline Connector & Dot - Fixed negative positioning clipping issues by adding padding to parent */}
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-slate-900 border-2 border-green-600 group-hover:bg-green-500 group-hover:border-green-300 shadow-[0_0_15px_rgba(5,150,105,0.4)] transition-all duration-300 z-10"></div>
                
                {/* Content Card */}
                <div className="bg-green-950/30 hover:bg-green-900/40 border border-green-900 hover:border-green-500/50 rounded-2xl p-6 transition-all duration-300">
                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                      <div className="text-xs text-green-400 uppercase tracking-wide px-2 py-1 bg-green-900/20 rounded w-fit border border-green-500/20">
                        GIAI ĐOẠN {index + 1}
                      </div>
                      <div className="inline-flex items-center gap-2 text-green-300 text-xs font-medium bg-green-950 px-3 py-1 rounded-full border border-green-800">
                        <Zap size={12} /> AI Roadmap
                      </div>
                   </div>
                   
                   <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-300 transition-colors">
                      {(phase.title?.includes(":") ? phase.title.split(":").slice(1).join(":") : phase.title)?.trim() || `Giai đoạn ${index + 1}`}
                   </h3>
                   <div className="space-y-3">
                     {phase.items?.map((item, itemIndex) => (
                       <div key={itemIndex} className="space-y-2">
                         <div className="flex gap-2">
                           <span className="text-md text-muted-foreground">•</span>
                           <p className="text-slate-300 text-sm leading-relaxed">{item.action}</p>
                         </div>
                         <div className="flex items-start gap-2 text-sm text-green-300 pl-3">
                           <Zap className="w-4 h-4 mt-0.5" />
                           <span>{item.result}</span>
                         </div>
                       </div>
                     ))}
                   </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Summary & Actions (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
             
             {/* Recommendation Box - Removed Download Button */}
             {/* <div className="bg-gradient-to-br from-green-950 to-slate-950 rounded-2xl p-6 border border-green-800 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-green-600/10 blur-3xl rounded-full group-hover:bg-green-600/20 transition-all"></div>
                
                <h4 className="text-white font-semibold mb-3 text-lg relative z-10">Đề xuất ưu tiên</h4>
                <div className="h-px w-full bg-green-900 mb-4"></div>
                <p className="text-slate-300 text-sm mb-2 relative z-10 leading-relaxed">
                  Dựa trên các nỗi đau đã chọn, Bano AI khuyến nghị bạn bắt đầu với:
                </p>
                <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-400 mb-4 relative z-10">
                    Gói Advanced
                </div>
                <p className="text-xs text-green-600/70 italic relative z-10">
                   *Phù hợp nhất để tích hợp dữ liệu đa kênh & automation.
                </p>
             </div> */}

             {/* Support Info */}
             <div className="rounded-2xl p-6 border border-green-900 bg-green-950/20">
                <h4 className="text-white font-medium mb-2 text-sm">Chuyên gia tư vấn</h4>
                <div className="flex items-center gap-3 mb-4">
                   <div className="w-10 h-10 rounded-full bg-green-800 flex items-center justify-center text-green-100 font-bold border border-green-600">B</div>
                   <div>
                      <p className="text-sm text-white">Bano Senior Advisor</p>
                      <p className="text-xs text-slate-500">Available 24/7</p>
                   </div>
                </div>
                <Link 
                  onClick={scrollToTop}
                  href="/contact"
                  className="w-full cursor-pointer py-2.5 bg-green-900/30 border border-green-700 hover:border-green-500 hover:bg-green-800/50 text-green-100 text-sm rounded-lg transition-all flex items-center justify-center gap-2"
                >
                   Liên hệ trực tiếp <ArrowRight size={14} />
                </Link>
             </div>

          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="cursor-pointer mt-4 pt-4 border-t border-green-900/50 flex-shrink-0 flex justify-center">
        <button 
          onClick={onReset}
          className="cursor-pointer text-slate-500 hover:text-white flex items-center gap-2 text-sm transition-colors py-2 px-4 rounded-lg hover:bg-green-900/30"
        >
          <RefreshCw size={14} /> Phân tích lại ngành khác
        </button>
      </div>
    </div>
  );
};

export default Roadmap;