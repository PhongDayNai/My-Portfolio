import { Github, Facebook, Globe, Video } from "lucide-react";
import { getExperienceVi } from "./translations";

export interface SubRepository {
  title: string;
  description: {
    vi: string;
    en: string;
  };
  tech: string[];
  link: string;
}

export interface Project {
  title: string;
  description: {
    vi: string;
    en: string;
  };
  tech: string[];
  link: string;
  image?: string;
  category: "work" | "personal";
  featured?: boolean;
  repositories?: SubRepository[];
}

export const PERSONAL_INFO = {
  name: "DƯƠNG HÙNG PHONG",
  role: "Full-Stack Developer",
  email: "dhphong266@gmail.com",
  location: "Khương Đình, Thanh Xuân, Hà Nội",
  github: "https://github.com/PhongDayNai",
  get summary() {
    return `Multi-disciplinary Developer với ${getExperienceVi()} trong phát triển Android (Kotlin) và Full-stack.`;
  },
};

export const PROJECTS: Project[] = [
  {
    title: "Plantie AI - Plant Detection",
    description: {
      vi: "Hệ thống AI nhận diện thực vật và tư vấn chăm sóc qua Live Chat AI.",
      en: "Developed an AI-powered system for plant identification, disease diagnosis, and real-time care advice via AI Live Chat."
    },
    tech: ["Kotlin", "Jetpack Compose", "MVVM", "AI Integration"],
    link: "https://play.google.com/store/apps/details?id=com.plantidentification.chainz",
    image: "/images/plantie.png",
    category: "work",
  },
  {
    title: "GPS Camera - Timestamp & Maps",
    description: {
      vi: "Tối ưu CameraX templates nhúng dữ liệu vị trí và môi trường thời gian thực.",
      en: "Optimized professional CameraX templates to embed real-time location, maps, and environmental metadata into photos/videos."
    },
    tech: ["CameraX", "Google Maps API", "Weather API", "Kotlin"],
    link: "https://play.google.com/store/apps/details?id=com.lawmatic.cameragps",
    image: "/images/cameragps.png",
    category: "work",
  },
  {
    title: "Muslim Pro+ - Lifestyle Companion",
    description: {
      vi: "Tích hợp Sensor và Maps API xây dựng các tính năng định vị chính xác (Chưa phát hành).",
      en: "Integrated Sensor and Maps APIs to build precise location-based prayer alerts and halal discovery features (Unreleased)."
    },
    tech: ["Room", "Sensor API", "Google Maps API", "Kotlin"],
    link: "#",
    image: "/images/muslim-pro.png",
    category: "work",
  },
  {
    title: "AI Studio - AI-art Generator",
    description: {
      vi: "Thiết kế UI/UX và tích hợp mô hình phát sinh ảnh nghệ thuật hiệu suất cao bằng Jetpack Compose.",
      en: "Designed modern UI/UX and integrated high-performance AI-art generation models using Jetpack Compose."
    },
    tech: ["Jetpack Compose", "AI Integration", "Kotlin"],
    link: "https://play.google.com/store/apps/details?id=com.chainz.bananastudio",
    image: "/images/ai-studio.png",
    category: "work",
  },
  {
    title: "AmiChat - AI Creative Buddy",
    description: {
      vi: "Trợ lý AI sáng tạo tích hợp các mô hình ngôn ngữ lớn hỗ trợ trò chuyện và giải đáp.",
      en: "Creative AI companion integrated with LLMs to support intelligent conversation and assistance."
    },
    tech: ["LLM Integration", "Kotlin", "Jetpack Compose"],
    link: "https://play.google.com/store/apps/details?id=com.lawmatic.amichat",
    image: "/images/amichat.png",
    category: "work",
  },

  {
    title: "HTEM - High-Tech Electronic Menu",
    description: {
      vi: "Xây dựng hệ sinh thái menu điện tử gồm Android App, Web Admin và Server.",
      en: "Built a smart electronic menu ecosystem including Android App, ReactJS Admin Dashboard, and Node.js Server."
    },
    tech: ["Jetpack Compose", "ReactJS", "Node.js"],
    link: "https://github.com/PhongDayNai/HTEM_Mobile_App_Client",
    image: "/images/htem.png",
    category: "personal",
  },
  {
    title: "ChillingStories - Infrastructure",
    description: {
      vi: "Vận hành hạ tầng Server và quy trình CI/CD tự động cho hệ thống API.",
      en: "Operating self-hosted server infrastructure and automated CI/CD pipelines for a scalable story-reading API system."
    },
    tech: ["Node.js", "Express", "MySQL", "Docker", "GitHub Actions"],
    link: "https://github.com/PhongDayNai/ChillingStories_Server",
    image: "/images/chilling-stories.png",
    category: "personal"
  },
  {
    title: "ChefMate - Smart Cooking Companion",
    description: {
      vi: "Phát triển trợ lý nấu ăn thông minh quản lý thực đơn và công thức nấu ăn.",
      en: "Developed a full-stack smart cooking assistant for efficient meal planning and recipe management."
    },
    tech: ["Jetpack Compose", "ReactJS", "NextJS", "Node.js", "PostgreSQL"],
    link: "https://github.com/PhongDayNai/ChefMate_Client",
    image: "/images/chefmate.png",
    category: "personal",
    repositories: [
      {
        title: "ChefMate Server (Backend API)",
        description: {
          vi: "Hệ thống Backend API viết bằng Node.js & Express, quản lý dữ liệu người dùng, thực đơn và tích hợp PostgreSQL.",
          en: "Backend API system built with Node.js & Express, managing user data, recipes, and PostgreSQL database."
        },
        tech: ["Node.js", "Express", "PostgreSQL", "Sequelize"],
        link: "https://github.com/PhongDayNai/ChefMate_Server"
      },
      {
        title: "ChefMate Mobile App (Android Native)",
        description: {
          vi: "Ứng dụng Android native client viết bằng Kotlin và Jetpack Compose, tích hợp quản lý trạng thái và tối ưu hóa trải nghiệm nấu ăn.",
          en: "Android native client application built with Kotlin and Jetpack Compose, featuring state management and cooking UX optimization."
        },
        tech: ["Kotlin", "Jetpack Compose", "Retrofit", "Coroutines"],
        link: "https://github.com/PhongDayNai/ChefMate_Client"
      },
      {
        title: "ChefMate Web Client (Landing Page)",
        description: {
          vi: "Trang giới thiệu và tìm kiếm công thức nấu ăn nhanh chóng trên nền tảng Web cho người dùng.",
          en: "Web application for recipe discovery, user engagement, and cooking community integration."
        },
        tech: ["Next.js", "React", "TailwindCSS"],
        link: "https://github.com/PhongDayNai/Chefmate_Web_Client"
      },
      {
        title: "ChefMate Admin Web Dashboard",
        description: {
          vi: "Trang web quản trị nội dung dành cho Admin để quản lý danh mục thực đơn, công thức nấu ăn và báo cáo hệ thống.",
          en: "Admin dashboard website for managing culinary content, user reports, and system analytics."
        },
        tech: ["React", "Vite", "TailwindCSS", "Recharts"],
        link: "https://github.com/PhongDayNai/ChefMate_Admin_Web"
      }
    ]
  },
];

export const WORK_EXPERIENCE = [
  {
    company: "CHAINZ JS COMPANY",
    role: "Android Developer",
    duration: "12/2024 - 06/2026",
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
    date: "12/2024 - 06/2026",
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
      "GPA:3.2/4.0.",
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
