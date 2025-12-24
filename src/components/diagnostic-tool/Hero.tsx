interface HeroProps {
  isExpanded: boolean;
  isHovered?: boolean;
}

const Hero = ({ isExpanded }: HeroProps) => {
    return (
        <div className="absolute inset-0 w-full overflow-hidden bg-black">
            {/* 1. Background Effects - Spotlight Style */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Main Center Glow - The "Green Sun" */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] md:w-[600px] h-[600px] bg-bano-green/20 blur-[120px] rounded-full transition-all duration-1000 ${isExpanded ? 'opacity-20 scale-150' : 'opacity-100 scale-100'}`}></div>
                
                {/* Secondary Ambient Glows */}
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-bano-navy/20 blur-[100px] rounded-full"></div>
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-bano-navy/20 blur-[100px] rounded-full"></div>

                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 opacity-[0.15]" 
                    style={{ 
                        backgroundImage: 'linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)', 
                        backgroundSize: '50px 50px',
                        maskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)'
                    }}>
                </div>
            </div>

            {/* 2. Typography Content */}
            <div className={`absolute top-[20%] md:top-[25%] w-full text-center transition-all duration-700 z-10 px-4 ${isExpanded ? 'opacity-0 -translate-y-10 blur-sm' : 'opacity-100 translate-y-0'}`}>
                
                {/* Top Tagline */}
                <div className="inline-block mb-6 animate-fade-in">
                    <div className="px-4 py-1.5 rounded-full border border-bano-green/30 bg-bano-navy/30 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    <span className="text-bano-green text-[10px] md:text-xs font-semibold uppercase tracking-widest">
                        Công cụ chẩn đoán AI miễn phí
                    </span>
                    </div>
                </div>

                {/* Main Headline */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6 drop-shadow-2xl leading-[1.1]">
                Tìm lời giải riêng cho <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-bano-green/100 to-bano-green">
                    Bài toán của bạn
                </span>
                </h1>

                {/* Subline */}
                <p className="max-w-2xl mx-auto text-sm md:text-base font-light leading-relaxed tracking-wide">
                    Chọn ngành và vấn đề đang gặp phải để xem Bano sẽ triển khai AI <br className="hidden md:block"/>
                    như thế nào cho doanh nghiệp tương tự bạn.
                </p>
            </div>

            {/* 3. Floating Particles (Subtle) */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {[...Array(8)].map((_, i) => (
                    <div 
                    key={i}
                    className="absolute bg-emerald-400 rounded-full opacity-20 blur-[1px] animate-float"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        width: `${Math.random() * 3 + 1}px`,
                        height: `${Math.random() * 3 + 1}px`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${Math.random() * 10 + 10}s`
                    }}
                    />
                ))}
            </div>
        </div>
    );
}
 
export default Hero;