import { Github, Facebook, Globe, Video } from "lucide-react";

export interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
  image?: string;
  category: "work" | "personal";
}

export const PERSONAL_INFO = {
  name: "DƯƠNG HÙNG PHONG",
  role: "Full-Stack Developer",
  email: "dhphong266@gmail.com",
  location: "Khương Đình, Thanh Xuân, Hà Nội",
  github: "https://github.com/PhongDayNai",
  summary:
    "Multi-disciplinary Developer với hơn 1 năm kinh nghiệm thực chiến trong phát triển Android (Kotlin) và Full-stack.",
};

export const PROJECTS: Project[] = [
  {
    title: "Plantie AI - Plant Detection",
    description:
      "Hệ thống AI nhận diện thực vật và tư vấn chăm sóc qua Live Chat.",
    tech: ["Kotlin", "Jetpack Compose", "MVVM", "AI Integration"],
    link: "https://play.google.com/store/apps/details?id=com.plantidentification.chainz",
    image: "/images/plantie.png",
    category: "work",
  },
  {
    title: "GPS Camera - Timestamp & Maps",
    description:
      "Công cụ chụp ảnh nhúng dữ liệu vị trí và môi trường thời gian thực.",
    tech: ["CameraX", "Google Maps API", "Weather API", "Kotlin"],
    link: "https://play.google.com/store/apps/details?id=com.lawmatic.cameragps",
    image: "/images/cameragps.png",
    category: "work",
  },
  {
    title: "Muslim Pro+ - Lifestyle Companion",
    description:
      "Ứng dụng hỗ trợ cộng đồng Hồi giáo với định vị và cảm biến chính xác.",
    tech: ["Room", "Sensor API", "Google Maps API", "Kotlin"],
    link: "#",
    image: "/images/muslim-pro.png",
    category: "work",
  },
  {
    title: "Nano Banana - Photo Editor",
    description:
      "Trình chỉnh sửa ảnh hiệu suất cao với giao diện tối ưu bằng Jetpack Compose.",
    tech: ["Jetpack Compose", "Image Processing", "Kotlin"],
    link: "#",
    image: "/images/nano-banana.png",
    category: "work",
  },
  {
    title: "ChillingStories - Infrastructure",
    description:
      "Vận hành hạ tầng Server và quy trình CI/CD tự động cho hệ thống API đọc truyện.",
    tech: ["Node.js", "Express", "MySQL", "Docker", "GitHub Actions"],
    link: "https://github.com/PhongDayNai/ChillingStories_Server",
    image: "/images/chilling-stories.png",
    category: "personal",
  },
  {
    title: "HTEM - High-Tech Electronic Menu",
    description:
      "Hệ sinh thái menu điện tử tích hợp Mobile App, Web Admin và Backend.",
    tech: ["Jetpack Compose", "ReactJS", "Node.js", "Socket.io"],
    link: "https://github.com/PhongDayNai/HTEM_Mobile_App_Client",
    image: "/images/htem.png",
    category: "personal",
  },
  {
    title: "ChefMate - Smart Cooking Companion",
    description:
      "Nền tảng hỗ trợ nấu ăn thông minh với quản lý công thức và tìm kiếm kép.",
    tech: ["Jetpack Compose", "ReactJS", "Node.js", "PostgreSQL"],
    link: "https://github.com/PhongDayNai/ChefMate_Client",
    image: "/images/chefmate.png",
    category: "personal",
  },
];

export const WORK_EXPERIENCE = [
  {
    company: "CHAINZ JS COMPANY",
    role: "Android Developer",
    duration: "12/2024 - Hiện tại",
    tasks: [
      "Phát triển hệ thống nhận diện thực vật Plantie AI.",
      "Xây dựng công cụ GPS Camera tích hợp dữ liệu môi trường thời gian thực.",
      "Phát triển ứng dụng Muslim Pro+ hỗ trợ cộng đồng Hồi giáo.",
    ],
  },
];

export const TIMELINE_DATA = [
  {
    id: 1,
    title: "Mobile App Developer",
    organization: "ChainZ",
    date: "12/2025 - Hiện tại",
    status: "active",
    description: [
      "Phát triển các giải pháp di động trên nền tảng Flutter và Android Native.",
      "Tối ưu hóa quy trình kết nối API và quản lý trạng thái ứng dụng.",
      "Làm việc trong môi trường chuyên nghiệp với quy trình Scrum/Agile.",
    ],
    type: "work",
  },
  {
    id: 2,
    title: "Full-Stack Developer (Independent)",
    organization: "Personal Projects",
    date: "2023 - Hiện tại",
    status: "active",
    description: [
      "Vận hành hệ thống ChillingStories (Node.js/Docker/CI-CD).",
      "Phát triển hệ thống HTEM - Smart Electronic Menu.",
      "Tự quản lý hệ thống Home-lab và Cloudflare Tunnel cá nhân.",
    ],
    type: "work",
  },
  {
    id: 3,
    title: "Sinh viên CNTT",
    organization: "Đại học Thủy Lợi",
    date: "2022 - Hiện tại",
    status: "studying",
    description: [
      "GPA: 3.17/4.0.",
      "Tập trung nghiên cứu chuyên sâu về Android SDK và Kiến trúc hệ thống.",
    ],
    type: "education",
  },
];

export const SOCIALS = [
  {
    name: "GitHub",
    icon: Github,
    link: "https://github.com/PhongDayNai",
    color: "hover:bg-white/10",
    desc: "@PhongDayNai",
  },
  {
    name: "Facebook",
    icon: Facebook,
    link: "https://www.facebook.com/phongdaynai",
    color: "hover:bg-blue-600/20",
    desc: "Phong",
  },
  {
    name: "TikTok",
    icon: Video,
    link: "https://www.tiktok.com/@phongdaynai",
    color: "hover:bg-pink-600/20",
    desc: "Hobby & Life",
  },
  {
    name: "Personal Server",
    icon: Globe,
    link: "https://portfolio.phongdaynai.id.vn",
    color: "hover:bg-orange-500/20",
    desc: "Self-hosted Lab",
  },
];
