import React, { useState } from 'react';
import { Lock, ChevronRight, Loader2, ShieldCheck, AlertCircle } from 'lucide-react';

interface LeadFormProps {
  onSubmit: (phone: string) => void;
  isSubmitting?: boolean;
}

const LeadForm: React.FC<LeadFormProps> = ({ onSubmit, isSubmitting = false }) => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    
    if (!phone || !phone.match(phoneRegex)) {
      setError('Số điện thoại không hợp lệ. Vui lòng kiểm tra lại.');
      return;
    }
    setError('');
    onSubmit(phone);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
    if (error) setError(''); // Clear error on typing
  };

  return (
    <div className="animate-fade-in text-center w-full max-w-sm mx-auto py-8 relative">
      
      {/* Background Decor */}
      <div className="absolute inset-0 bg-emerald-900/10 blur-3xl rounded-full pointer-events-none"></div>

      <div className="relative mb-8">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-emerald-950 to-slate-950 rounded-full flex items-center justify-center border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
          <Lock size={32} className="text-lime-500" />
        </div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1">
          <ShieldCheck size={12} className="text-emerald-400" />
          <span className="text-[10px] text-emerald-200 uppercase tracking-wider">Secure Data</span>
        </div>
      </div>

      <h2 className="text-2xl font-display text-white mb-2">Mở khóa Lộ trình</h2>
      <p className="text-emerald-200/60 text-sm mb-8 px-4">
        Hệ thống đã hoàn tất phân tích. Nhập SĐT để nhận bản kế hoạch chi tiết ngay lập tức.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div className="group relative">
          {/* Input Glow */}
          <div className={`absolute inset-0 rounded-xl blur transition-opacity duration-300 ${error ? 'bg-red-500/20 opacity-50' : 'bg-gradient-to-r from-emerald-500 to-lime-500 opacity-0 group-hover:opacity-20'}`}></div>
          
          <div className="relative">
            <input
              type="tel"
              value={phone}
              onChange={handleInputChange}
              placeholder="0912 xxx xxx"
              className={`w-full bg-slate-950/80 backdrop-blur border text-white rounded-xl py-4 pl-6 pr-12 focus:ring-2 focus:outline-none transition-all placeholder:text-slate-600 text-center text-xl tracking-widest font-display shadow-inner
                ${error 
                  ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' 
                  : 'border-emerald-500/30 focus:border-lime-500/50 focus:ring-lime-500/20'
                }
              `}
            />
            {/* Error Icon inside input */}
            {error && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 animate-bounce">
                <AlertCircle className="text-red-500" size={20} />
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="absolute -bottom-6 left-0 w-full text-center">
               <p className="text-red-400 text-xs font-medium animate-pulse">{error}</p>
            </div>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full py-4 flex items-center justify-center gap-2 mt-2 shadow-lg shadow-emerald-900/20"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin w-5 h-5" />
          ) : (
            <>
              XEM KẾT QUẢ <ChevronRight className="w-5 h-5" strokeWidth={3} />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default LeadForm;