import { Experience } from "@/components/timeline-02/timeline-02";
import { Code2Icon } from "lucide-react";

export const experiences: Experience[] = [
  {
    title: "Lập trình viên Full-stack",
    company: "Công ty cổ phần viễn thông CGV",
    icon_timeline: <Code2Icon className="h-3 w-3 text-primary" />,
    level: "Middle",
    image:
      "https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/company_logos/XiVmux6f3zmmUAy5REVVpixvYGPvv73Y_1731309902____a49b8f1134f559fb1766f3d02e12f1a2.jpg",
    period: "12/03/2025 - Hiện tại",
    description: [
      "Tham gia vào quá trình phát triển và duy trì các dự án phần mềm của công ty.",
      "Phối hợp cùng các thành viên trong nhóm để phân tích yêu cầu và xây dựng giải pháp phù hợp.",
      "Thực hiện lập trình, kiểm thử và tối ưu mã nguồn nhằm đảm bảo hiệu suất và tính ổn định của hệ thống.",
      "Tìm hiểu và áp dụng các kiến thức, công nghệ mới vào công việc thực tế.",
      "Hỗ trợ xử lý sự cố, cải thiện trải nghiệm người dùng và nâng cao chất lượng sản phẩm.",
    ],

    technologies: [
      {
        name: "React",
        icon: "/icon/react.avif",
      },
      {
        name: "Python",
        icon: "/icon/python.png",
      },
      {
        name: "FastAPI",
        icon: "/icon/fastapi.svg",
      },
      {
        name: "TypeScript",
        icon: "/icon/ts.png",
      },
      {
        name: "Linux",
        icon: "/icon/linux.png",
      },
      {
        name: "Postgres",
        icon: "/icon/postgres.jpg",
      },
    ],
    projects: [
      {
        name: "Dự án website book số dành cho sales",
        image: "https://images.unsplash.com/photo-1467493330285-2fe6a9f97483",
        content:
          "Dự án thiết kế hệ thống đặt số dành cho sale. Nhà mạng cung cấp và bán số, công ty là bên đại lý thu mua số từ nhà mạng và nhân viên đại lý muốn có số để bán hoặc sử dụng thì phải thực hiện đặt số thông qua hệ thống Book Số. Hệ thống giúp quản lý toàn bộ quá trình đặt – duyệt – cấp số, đảm bảo minh bạch, nhanh chóng và tránh trùng lặp số.",
      },
      {
        name: "Hệ thống quản lý khách hàng CRM",
        image: "https://images.unsplash.com/photo-1611558709798-e009c8fd7706",
        content:
          "Xây dựng hệ thống CRM để quản lý thông tin khách hàng, theo dõi tương tác và tự động hóa quy trình bán hàng.",
      },
      {
        name: "Dashboard Analytics",
        image:
          "https://plus.unsplash.com/premium_photo-1692340973636-6f2ff926af39?auto=format&fit=crop&q=80&w=3506&ixlib=rb-4.0.3",
        content:
          "Dashboard hiển thị các chỉ số kinh doanh quan trọng với biểu đồ tương tác và báo cáo real-time.",
      },
      {
        name: "Mobile App E-commerce",
        image:
          "https://images.unsplash.com/photo-1687795975521-825a47419cc8?auto=format&fit=crop&q=80&w=3506&ixlib=rb-4.0.3",
        content:
          "Ứng dụng di động cho nền tảng thương mại điện tử với tính năng thanh toán và quản lý đơn hàng.",
      },
      {
        name: "API Gateway Service",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
        content:
          "Xây dựng API Gateway để quản lý và bảo mật các microservices với rate limiting và authentication.",
      },
      {
        name: "Real-time Chat System",
        image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624",
        content:
          "Hệ thống chat real-time với WebSocket, hỗ trợ group chat, file sharing và notification.",
      },
    ],
  },
  {
    title: "Lập trình viên Full-stack",
    company: "Công ty trách nghiệm hữu hạn BlueOC Tech",
    icon_timeline: <Code2Icon className="h-3 w-3 text-primary" />,
    image:
      "https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6Nzk3MjczLCJwdXIiOiJibG9iX2lkIn19--febdc41760429a8aac758b65a46af2f275443e61/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemVfdG9fZml0IjpbMTcwLG51bGxdfSwicHVyIjoidmFyaWF0aW9uIn19--296f540994727dae0782a32330a49c8b7374a6c7/jvb-vietnam-logo.png",
    period: "12/01/2025 - 01/03/2025",
    level: "Intern/Fresher",
    description: [
      "Tham gia phát triển giao diện người dùng cho các hệ thống quản lý và website dịch vụ.",
      "Phối hợp với nhóm backend để tích hợp API và xử lý dữ liệu động trên giao diện.",
      "Đảm bảo sản phẩm hiển thị tốt trên đa nền tảng và tối ưu hiệu năng khi tải trang.",
      "Tham gia review code và đóng góp ý kiến cải tiến quy trình phát triển giao diện.",
      "Học hỏi, cập nhật xu hướng UI/UX và công nghệ web mới để áp dụng vào dự án thực tế.",
    ],
    technologies: [
      {
        name: "NextJS",
        icon: "/next-js.svg",
      },
      {
        name: "Shadcn-ui",
        icon: "/next-js.svg",
      },
      {
        name: "Tailwind",
        icon: "/tailwind.svg",
      },
      {
        name: "TypeScript",
        icon: "/icon/ts.png",
      },
    ],
    projects: [
      {
        name: "Project 3",
        image:
          "https://plus.unsplash.com/premium_photo-1692340973636-6f2ff926af39?auto=format&fit=crop&q=80&w=3506&ixlib=rb-4.0.3",
        content: "Project 3",
      },
      {
        name: "Project 4",
        image:
          "https://images.unsplash.com/photo-1687795975521-825a47419cc8?auto=format&fit=crop&q=80&w=3506&ixlib=rb-4.0.3",
        content: "Project 4",
      },
    ],
  },
  {
    title: "Lập trình viên Frontend",
    company: "Công ty Cổ phần JVB Việt Nam",
    icon_timeline: <Code2Icon className="h-3 w-3 text-primary" />,
    image:
      "https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6Nzk3MjczLCJwdXIiOiJibG9iX2lkIn19--febdc41760429a8aac758b65a46af2f275443e61/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemVfdG9fZml0IjpbMTcwLG51bGxdfSwicHVyIjoidmFyaWF0aW9uIn19--296f540994727dae0782a32330a49c8b7374a6c7/jvb-vietnam-logo.png",
    period: "04/09/2024 - 01/01/2025",
    level: "Intern/Fresher",
    description: [
      "Tham gia phát triển giao diện người dùng cho các hệ thống quản lý và website dịch vụ.",
      "Phối hợp với nhóm backend để tích hợp API và xử lý dữ liệu động trên giao diện.",
      "Đảm bảo sản phẩm hiển thị tốt trên đa nền tảng và tối ưu hiệu năng khi tải trang.",
      "Tham gia review code và đóng góp ý kiến cải tiến quy trình phát triển giao diện.",
      "Học hỏi, cập nhật xu hướng UI/UX và công nghệ web mới để áp dụng vào dự án thực tế.",
    ],
    technologies: [
      {
        name: "NextJS",
        icon: "/next-js.svg",
      },
      {
        name: "Shadcn-ui",
        icon: "/next-js.svg",
      },
      {
        name: "Tailwind",
        icon: "/tailwind.svg",
      },
      {
        name: "TypeScript",
        icon: "/icon/ts.png",
      },
    ],
    projects: [
      {
        name: "Project 3",
        image:
          "https://plus.unsplash.com/premium_photo-1692340973636-6f2ff926af39?auto=format&fit=crop&q=80&w=3506&ixlib=rb-4.0.3",
        content: "Project 3",
      },
      {
        name: "Project 4",
        image:
          "https://images.unsplash.com/photo-1687795975521-825a47419cc8?auto=format&fit=crop&q=80&w=3506&ixlib=rb-4.0.3",
        content: "Project 4",
      },
    ],
  },
];
