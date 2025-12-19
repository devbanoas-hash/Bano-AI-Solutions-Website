import { motion } from "framer-motion"
import { ScrollReveal } from "./scroll-reveal"
import { capabilities } from "../constants/tech-capabilities"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"

// --- VARIANTS CHO HIỆU ỨNG 3D ---

// 1. Container bao ngoài (Lớp phủ đen)
const overlayVariants = {
  rest: { 
    opacity: 0,
    backgroundColor: "rgba(0, 0, 0, 0)" 
  },
  hover: { 
    opacity: 1,
    backgroundColor: "rgba(0, 0, 0, 0.85)", // Đen đậm hơn để nổi chữ
    transition: {
      duration: 0.3,
      when: "beforeChildren", // Hiện nền đen xong mới chiếu chữ ra
      staggerChildren: 0.15 // Các cột chữ hiện cách nhau 0.15s
    }
  }
}

// 2. Các khối chữ (Description) - Hiệu ứng bay từ trong ra
const text3DVariants = {
  rest: { 
    opacity: 0,
    scale: 0.5,      // Bắt đầu nhỏ xíu (như ở xa)
    y: 50,           // Ở dưới thấp
    rotateX: 45,     // Nghiêng
    filter: "blur(5px)" // Mờ ảo
  },
  hover: { 
    opacity: 1,
    scale: 1,        // Phóng to về bình thường
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: { 
      type: "spring" as const,
      stiffness: 150,
      damping: 15,
      mass: 1
    }
  }
}

export function TechCapabilities() {
  return (
    <section className="py-16 sm:py-20 md:py-28 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <span className="text-bano-green text-sm font-semibold uppercase tracking-wider mb-4 block">
            Năng lực công nghệ
          </span>
          <h2 className="text-3xl font-bold mb-6">
            Công nghệ AI <span className="text-gradient">toàn diện</span>
          </h2>
        </ScrollReveal>

        {/* Swiper Slider */}
        <div className="relative flex items-center justify-center gap-4">
          <button className="swiper-button-prev-tech w-12 h-12 rounded-full border border-gray-200 hover:border-bano-green/60 hover:bg-bano-green/10 flex items-center justify-center transition-all cursor-pointer hidden md:flex z-20 bg-white">
            <svg className="w-6 h-6 text-bano-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={16}
            slidesPerView={1}
            centeredSlides={true}
            breakpoints={{
              640: { slidesPerView: 1.5, spaceBetween: 24 },
              1024: { slidesPerView: 2.2, spaceBetween: 32 } // Giảm số lượng slide để slide chính to hơn
            }}
            navigation={{
              nextEl: ".swiper-button-next-tech",
              prevEl: ".swiper-button-prev-tech",
            }}
            pagination={{
              clickable: true,
              el: ".swiper-pagination-tech",
            }}
            autoplay={{
              delay: 6000, 
              disableOnInteraction: true,
            }}
            loop={true}
            className="!pb-12 tech-swiper w-full"
          >
            {capabilities.map((capability, index) => (
              <SwiperSlide key={index} className="h-auto">
                <motion.div
                  initial="rest"
                  whileHover="hover" // QUAN TRỌNG: Chỉ dùng whileHover, không dùng animate="rest"
                  className="rounded-2xl border border-gray-200 shadow-xl group relative overflow-hidden h-[400px] md:h-[450px] cursor-pointer bg-black"
                >
                  {/* --- BACKGROUND IMAGE --- */}
                  <div className="absolute inset-0 w-full h-full">
                    <img
                      src={capability.image}
                      alt={capability.title}
                      className="object-cover h-full w-full transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Overlay tĩnh để text tiêu đề luôn dễ đọc khi chưa hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-0" />
                  </div>
                  
                  {/* --- TIÊU ĐỀ MẶC ĐỊNH (Sẽ ẩn khi hover) --- */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10 transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-4">
                    <div className="flex items-center gap-3 mb-2">
                       {/* <div className="w-10 h-10 rounded-lg bg-bano-green flex items-center justify-center shadow-lg shadow-bano-green/30">
                          <capability.icon className="w-6 h-6 text-white" />
                       </div> */}
                       <h3 className="text-xl md:text-2xl font-bold text-white drop-shadow-md">
                         {capability.title}
                       </h3>
                    </div>
                  </div>

                  {/* --- HOVER OVERLAY: 3D DESCRIPTION EFFECT --- */}
                  <motion.div 
                    variants={overlayVariants}
                    className="absolute inset-0 z-20 flex flex-col justify-center items-center p-2 md:p-6"
                  >
                    {/* <div className="absolute top-0 left-0 right-0 p-6 z-10 transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-4">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl md:text-2xl font-bold text-white drop-shadow-md">
                          {capability.tag}
                        </h3>
                      </div>
                    </div> */}
                    <motion.h4 
                      variants={text3DVariants} 
                      className="absolute top-6 right-6 px-6 z-10 border border-bano-green/20 rounded-lg transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-4 text-bano-green font-bold text-xs md:text-xs text-left shadow-black drop-shadow-lg"
                    >
                      {capability.tag}
                    </motion.h4>
                    {/* Title nhỏ ở trên cùng khi hover */}
                    <motion.h4 
                      variants={text3DVariants} 
                      className="text-bano-green font-bold text-lg md:text-xl mb-6 text-center shadow-black drop-shadow-lg"
                    >
                      {capability.title}
                    </motion.h4>

                    {/* Grid 3 cột chia màn hình */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 w-full h-full md:h-auto content-center">
                      
                      {/* Cột 1 */}
                      <motion.div 
                        variants={text3DVariants} 
                        className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 flex flex-col items-center justify-center text-center shadow-2xl"
                      >
                        <span className="text-3xl font-bold text-bano-green/80 mb-2">01</span>
                        <p className="text-white font-medium text-sm md:text-base leading-relaxed">
                          {capability.description1}
                        </p>
                      </motion.div>

                      {/* Cột 2 */}
                      <motion.div 
                        variants={text3DVariants} 
                        className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 flex flex-col items-center justify-center text-center shadow-2xl"
                      >
                         <span className="text-3xl font-bold text-bano-green/80 mb-2">02</span>
                        <p className="text-white font-medium text-sm md:text-base leading-relaxed">
                          {capability.description2}
                        </p>
                      </motion.div>

                      {/* Cột 3 */}
                      <motion.div 
                        variants={text3DVariants} 
                        className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 flex flex-col items-center justify-center text-center shadow-2xl"
                      >
                         <span className="text-3xl font-bold text-bano-green/80 mb-2">03</span>
                        <p className="text-white font-medium text-sm md:text-base leading-relaxed">
                          {capability.description3}
                        </p>
                      </motion.div>

                    </div>
                  </motion.div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="swiper-button-next-tech w-12 h-12 rounded-full border border-gray-200 hover:border-bano-green/60 hover:bg-bano-green/10 flex items-center justify-center transition-all cursor-pointer hidden md:flex z-20 bg-white">
            <svg className="w-6 h-6 text-bano-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Custom Navigation Pagination */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <div className="swiper-pagination-tech flex items-center justify-center gap-2"></div>
        </div>
      </div>

      <style>{`
        .swiper-pagination-tech .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #cbd5e1;
          opacity: 1;
          transition: all 0.3s;
        }
        .swiper-pagination-tech .swiper-pagination-bullet-active {
          background: #31B450; /* Màu bano-green */
          width: 24px;
          border-radius: 4px;
        }

        /* Slide Styles */
        .tech-swiper .swiper-slide {
          transition: transform 0.5s ease, opacity 0.5s ease;
          transform: scale(0.9); /* Slide phụ nhỏ lại */
          opacity: 0.4;
          filter: grayscale(100%);
        }

        .tech-swiper .swiper-slide-active {
          transform: scale(1); /* Slide chính to nhất */
          opacity: 1;
          filter: grayscale(0%);
          z-index: 10;
        }
      `}</style>
    </section>
  )
}