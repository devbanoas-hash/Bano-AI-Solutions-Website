import { Building2, GraduationCap, Hotel, Heart, Truck } from "lucide-react";

export const COMPANY_SIZES = [
  "1 - 10 nhân viên",
  "11 - 50 nhân viên",
  "51 - 200 nhân viên",
  "200+ nhân viên"
];

export const industries = [
  {
    id: "fashion",
    name: "Thời trang & Bán lẻ",
    icon: Building2,
    painPoints: [
      "Dữ liệu phân mảnh đa kênh, không nhận diện được khách hàng.",
      "Mù mờ hiệu quả quảng cáo, không biết khách đến từ đâu.",
      "Tồn kho lệch pha: Hàng hot đứt gãy, hàng ế chất đống.",
      "Cuốn vào cuộc chiến giảm giá, khách hàng thiếu trung thành."
    ],
  },
  {
    id: "education",
    name: "Giáo dục",
    icon: GraduationCap,
    painPoints: [
      "Đốt tiền Ads nhưng Lead lạnh, bỏ sót khách, tỷ lệ chốt thấp.",
      "Vận hành thủ công, báo cáo sai lệch, giáo viên quá tải sổ sách.",
      "Mất học viên không rõ lý do, phụ huynh thiếu thông tin.",
      "Mù mờ tài chính, khó kiểm soát công nợ và dòng tiền."
    ],
  },
  {
    id: "hotel",
    name: "Khách sạn",
    icon: Hotel,
    painPoints: [
      "Mất 15-25% doanh thu cho hoa hồng OTA/CTV, lợi nhuận mỏng.",
      "Ác mộng Overbooking, xử lý sự cố mệt mỏi, mất uy tín.",
      "Rủi ro lừa đảo chuyển khoản, nhận Bill giả, thất thoát tiền.",
      "Bỏ lỡ doanh thu dịch vụ do không mời khách đúng lúc.",
      "Lãng phí nhân sự lễ tân trả lời câu hỏi lặp lại."
    ],
  },
  {
    id: "healthcare",
    name: "Nha khoa & Thẩm mỹ",
    icon: Heart,
    painPoints: [
      `Thất thoát doanh thu, nhân viên "làm chui" không kiểm soát được.`,
      "Tỷ lệ chốt Sale thấp, khách tư vấn xong rồi đi mất.",
      "Rủi ro y tế, quy trình lỏng lẻo, nguy cơ khủng hoảng thương hiệu.",
      "Chủ vắng mặt là loạn, mở thêm chi nhánh dễ vỡ trận."
    ],
  },
  {
    id: "logistics",
    name: "Logistics & Chuỗi cung ứng",
    icon: Truck,
    painPoints: [
      "Kẹt vốn lưu động, tài xế giam chứng từ, khách chây ì trả nợ.",
      `"Điểm mù" giao vận, không biết xe ở đâu, khách giục liên tục.`,
      "Xe chạy rỗng, lộ trình kém tối ưu, chi phí bào mòn lợi nhuận.",
      "Nhập liệu thủ công hàng nghìn đơn, sai lệch số liệu liên tục."
    ],
  }
]