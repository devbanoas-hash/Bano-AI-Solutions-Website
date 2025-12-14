import { useEffect } from "react"
import Lenis from "lenis"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { scrollToTop } from "../utils/scroll-helper"
import CTASection from "../components/cta-section"
import { Link } from "wouter"

// Blog data structure
const blogPosts: Record<string, {
  id: string
  title: string
  client: string
  date: string
  readTime: string
  image: string
  chunks: Array<{
    type: "text" | "image"
    content?: string
    imageUrl?: string
    imageAlt?: string
  }>
}> = {
  lavo: {
    id: "lavo",
    title: "LAVO: Khi dữ liệu trở thành động lực tăng trưởng mới",
    client: "LAVO",
    date: "15 Tháng 12, 2024",
    readTime: "8 phút đọc",
    image: "/Lavo.png",
    chunks: [
      {
        type: "text",
        content: "Trong ngành làm đẹp chuyên nghiệp, nơi cạnh tranh ngày càng khốc liệt, bài toán lớn nhất của các thương hiệu không nằm ở sản phẩm, mà nằm ở việc hiểu khách hàng và nuôi dưỡng họ đúng cách. LAVO – thương hiệu mỹ phẩm tóc lâu năm tại Việt Nam – sở hữu hàng chục nghìn điểm chạm với salon mỗi tháng. Nhưng cũng giống nhiều doanh nghiệp B2B2C khác, LAVO đối mặt với thực tế: dữ liệu khách hàng nằm rải rác trên POS, hệ thống phân phối, website, mạng xã hội, và đội ngũ vận hành gần như “mù” trước bức tranh toàn diện về hành vi người dùng."
      },
      {
        type: "image",
        imageUrl: "/Lavo.png",
        imageAlt: "LAVO AI Marketing Automation"
      },
      {
        type: "text",
        content: "Điều này dẫn đến một vòng luẩn quẩn quen thuộc trong thị trường bán lẻ: doanh nghiệp tiếp tục đổ tiền thu hút salon mới, trong khi một phần đáng kể khách hàng hiện tại lại rời bỏ âm thầm. Đây chính xác là “Hội chứng Xô Nước Thủng” – khái niệm mô tả việc chi phí để có khách hàng mới luôn lớn hơn rất nhiều so với việc giữ chân khách hàng cũ."
      },
      {
        type: "text",
        content: "Nhận thấy thách thức đó, LAVO quyết định hợp tác cùng Bano để xây dựng một hệ thống AI Marketing Automation phù hợp với đặc thù ngành làm đẹp. Thay vì nói về công nghệ, Bano bắt đầu bằng việc giải quyết gốc rễ vấn đề: giúp LAVO nhìn rõ khách hàng và chuyển đổi dữ liệu thành hành động kinh doanh."
      },
      {
        type: "text",
        content: "Giải pháp được triển khai xoay quanh năng lực cốt lõi của Bano: hợp nhất dữ liệu từ nhiều nguồn, phân loại khách hàng theo hành vi và giá trị, sau đó tự động hóa toàn bộ các chu trình chăm sóc – kích hoạt mua lại – nuôi dưỡng quan hệ. Lần đầu tiên, đội ngũ marketing của LAVO có thể nhìn thấy ai là khách VIP, ai đang suy giảm tần suất mua, ai có nguy cơ rời bỏ. Thay vì những chiến dịch đại trà, LAVO bắt đầu vận hành các chiến dịch cá nhân hóa theo từng nhóm salon: gợi ý sản phẩm theo lịch sử nhập hàng, gửi ưu đãi đúng thời điểm, tự động kích hoạt chương trình win-back cho nhóm sắp rời bỏ, và xây dựng các chuỗi nuôi dưỡng định kỳ theo hành vi thực tế."
      },
      {
        type: "text",
        content: "Khi những tác vụ thủ công trước đây được tự động hóa hoàn toàn, đội ngũ marketing có nhiều thời gian hơn để tập trung vào chiến lược. Các chiến dịch được triển khai nhanh hơn, chi phí quảng cáo được tối ưu dựa trên dữ liệu, và hiệu suất vận hành cải thiện rõ rệt. Quan trọng hơn, LAVO bắt đầu chứng kiến sự thay đổi trong các chỉ số cốt lõi: tỷ lệ giữ chân khách hàng tăng, số lượng mua lặp cao hơn, và giá trị vòng đời khách hàng được cải thiện đáng kể."
      },
      {
        type: "text",
        content: "Trường hợp của LAVO là minh chứng rõ ràng cho điều mà nhiều CEO vẫn băn khoăn: liệu AI có thực sự tạo ra giá trị hay chỉ là khái niệm hào nhoáng? Câu trả lời đến từ kết quả. Khi dữ liệu được hợp nhất và kích hoạt đúng cách, doanh nghiệp không chỉ tiết kiệm chi phí, mà còn xây dựng được một nền tảng tăng trưởng bền vững – thứ mà mọi doanh nghiệp đều theo đuổi."
      }
    ]
  },
  dma: {
    id: "dma",
    title: "DMA Co-pilot: Tự động hóa Nhà máy Nội dung Marketing",
    client: "DMA Co-pilot",
    date: "10 Tháng 12, 2024",
    readTime: "6 phút đọc",
    image: "/abstract-ai-neural-network-dark-blue-green-technol.jpg",
    chunks: [
      {
        type: "text",
        content: "Trong những năm gần đây, áp lực sản xuất nội dung đè nặng lên các đội marketing SME. Mỗi tuần đều diễn ra theo một kịch bản quen thuộc: họp kế hoạch dài lê thê, tranh luận về ý tưởng nhưng thiếu dữ liệu để ra quyết định; sau đó là chuỗi ngày cắm cúi viết bài, thiết kế, chỉnh sửa, duyệt nội dung; rồi đến thứ Sáu lại tất bật đăng tải thủ công và tổng hợp báo cáo từ đủ loại file rời rạc. Sự lặp lại đó khiến đội ngũ sáng tạo kiệt sức, còn doanh nghiệp thì chậm phản ứng trước thị trường."
      },
      {
        type: "image",
        imageUrl: "/abstract-ai-neural-network-dark-blue-green-technol.jpg",
        imageAlt: "DMA Co-pilot Content Marketing"
      },
      {
        type: "text",
        content: "Câu chuyện của chị Linh – Marketing Manager của thương hiệu thời trang Aniwear – cũng không ngoại lệ. Một tuần làm việc của đội chị trải dài từ họp ba tiếng vào thứ Hai, 16 giờ sản xuất nội dung liên tục trong hai ngày sau, một ngày chỉ để duyệt bài và chỉnh sửa thủ công, rồi thêm nhiều giờ để đăng tải và báo cáo. Tất cả diễn ra qua Zalo, Drive, Excel và các nền tảng khác nhau, tạo nên một “mê cung” thông tin khiến đội ngũ mất nhiều thời gian hơn là tạo ra giá trị."
      },
      {
        type: "text",
        content: "Sự thay đổi chỉ thật sự bắt đầu khi Aniwear triển khai DMA Co-pilot – giải pháp AI vận hành nội dung thuộc Gói Core của Bano. Không nhằm thay thế con người, DMA Co-pilot được thiết kế để loại bỏ những công việc lặp lại và giúp đội ngũ tập trung vào phần giá trị nhất: chiến lược và sáng tạo."
      },
      {
        type: "text",
        content: "Thứ Hai, thay vì họp 3 tiếng, chị Linh chỉ mất 30 phút để nhập định hướng chiến dịch. AI ngay lập tức dựng bản đồ nội dung tuần với các chủ đề gợi ý phù hợp với ngành thời trang và đối tượng khách hàng. Thứ Ba, quá trình sản xuất nội dung diễn ra chỉ trong 1 giờ: AI viết caption, tạo hình ảnh dựa trên thư viện sản phẩm, đề xuất nhiều phương án sáng tạo khác nhau. Với các video cần đầu tư, AI không tự làm thay đội ngũ mà cung cấp một creative brief đầy đủ – góc quay, thông điệp, nhạc nền – để cả team triển khai nhanh và đúng hướng."
      },
      {
        type: "text",
        content: "Đến giữa tuần, việc duyệt nội dung cũng thay đổi hoàn toàn. Thay vì đi qua nhiều vòng feedback, chị Linh chỉ cần để lại vài ghi chú và AI chỉnh sửa trong vài giây. Cuối cùng, toàn bộ bài viết được kéo–thả vào lịch và phân phối tự động lên các kênh trong 15 phút. Công việc mà trước đây mất tới năm ngày, giờ chỉ còn dưới ba giờ cho cả tuần."
      },
      {
        type: "text",
        content: "Không chỉ tiết kiệm thời gian, DMA Co-pilot còn giúp đội ngũ thoát khỏi cảm giác “bị đè nặng bởi vận hành” để có không gian sáng tạo đột phá. Thương hiệu vận hành rõ ràng hơn, nhất quán hơn và phản ứng nhanh hơn với thị trường. Đây cũng là bước đệm tự nhiên để doanh nghiệp chuyển sang Gói Advanced, nơi dữ liệu thật sự trở thành nền tảng cho mọi chiến dịch – từ đề xuất ý tưởng đến tối ưu chuyển đổi."
      },
      {
        type: "text",
        content: "Câu chuyện của Aniwear cho thấy rằng tự động hoá Marketing không phải là cuộc chơi của các tập đoàn. Với cách tiếp cận “AI hỗ trợ – con người dẫn dắt”, DMA Co-pilot trở thành một “trợ lý chiến lược” giúp doanh nghiệp vừa và nhỏ đạt được tốc độ, hiệu suất và sự chuyên nghiệp như một tổ chức lớn – mà không cần mở rộng đội ngũ hay tăng chi phí."
      }
    ]
  }
}

interface BlogPageProps {
  params?: {
    id?: string
  }
}

export default function BlogPage({ params }: BlogPageProps = {}) {
  const postId = params?.id || ""
  const post = blogPosts[postId]

  // Get other blog posts (excluding current one)
  const otherPosts = Object.values(blogPosts).filter((p) => p.id !== postId)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.2,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-muted-foreground mb-8">Bài viết không tìm thấy</p>
          {/* <Button variant="primary" href="/case-studies" onClick={scrollToTop}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại Case Studies
          </Button> */}
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Back Button */}
      <section className="pt-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              onClick={scrollToTop}
              href="/case-studies"
              className="cursor-pointer w-fit flex items-center gap-2 bg-bano-green text-white px-4 py-2 rounded-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-9">
              {/* Hero Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-12"
              >
                {/* Meta Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6"
                >
                  <span className="px-3 py-1 rounded-full bg-bano-green/10 text-bano-green font-medium">
                    {post.client}
                  </span>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight"
                >
                  {post.title}
                </motion.h1>
              </motion.div>

              {/* Content */}
              <div className="max-w-none">
                {post.chunks.map((chunk, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="mb-12 text-justify"
                  >
                    {chunk.type === "text" && chunk.content && (
                      <p className="text-lg leading-relaxed text-foreground/90">
                        {chunk.content}
                      </p>
                    )}
                    {chunk.type === "image" && chunk.imageUrl && (
                      <div className="my-8 rounded-2xl overflow-hidden">
                        <img
                          src={chunk.imageUrl}
                          alt={chunk.imageAlt || post.title}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="sticky top-24"
              >
                <h3 className="text-lg font-bold mb-6 text-foreground">
                  Bài viết khác
                </h3>
                <div className="mb-6 border-b border-bano-green"></div>
                <div className="glass rounded-2xl p-4 border-2 border-bano-green/10">
                  <div className="space-y-6">
                    {otherPosts.map((otherPost, index) => (
                      <motion.div
                        key={otherPost.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                      >
                        <Link
                          href={`/blog/${otherPost.id}`}
                          onClick={scrollToTop}
                          className="block group"
                        >
                          <motion.div
                            className="overflow-hidden rounded-xl mb-3"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                          >
                            <img
                              src={otherPost.image}
                              alt={otherPost.title}
                              className="w-full h-42 object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </motion.div>
                          <h4 className="font-semibold text-sm leading-tight group-hover:text-bano-green transition-colors mb-2 line-clamp-2">
                            {otherPost.title}
                          </h4>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span className="px-2 py-1 rounded-full bg-bano-green/10 text-bano-green text-xs">
                              {otherPost.client}
                            </span>
                            <span className="text-xs">{otherPost.readTime}</span>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </aside>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Nhận lộ trình chuyển đổi phù hợp doanh nghiệp bạn"
        description="Hãy để BANO giúp bạn xây dựng chiến lược AI phù hợp với doanh nghiệp của bạn"
        buttonText="Đặt lịch tư vấn"
        buttonLink="/contact"
      />
    </div>
  )
}