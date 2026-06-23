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
  website?: string;
}

export interface Project {
  title: string;
  description: {
    vi: string;
    en: string;
  };
  tech: string[];
  link: string;
  category: "work" | "personal";
  featured?: boolean;
  repositories?: SubRepository[];
  website?: string;
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
      vi: "Hệ thống trí tuệ nhân tạo (AI) nhận diện thực vật thông qua hình ảnh và hỗ trợ tư vấn chăm sóc trực tuyến thời gian thực qua Live Chat AI.",
      en: "An AI-powered system that identifies plant species via photo analysis and provides real-time care guidance through an interactive AI Live Chat."
    },
    tech: ["Kotlin", "Jetpack Compose", "MVVM", "AI Integration"],
    link: "https://play.google.com/store/apps/details?id=com.plantidentification.chainz",
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
    category: "work",
  },
  {
    title: "Muslim Pro+ - Lifestyle Companion",
    description: {
      vi: "Ứng dụng hỗ trợ phong cách sống Hồi giáo tích hợp nhắc nhở giờ cầu nguyện tự động, la bàn định hướng Qibla và đọc kinh Quran (Chưa phát hành).",
      en: "An Islamic lifestyle companion app featuring automated prayer time alerts, Qibla compass orientation, and digital Quran integration (Unreleased)."
    },
    tech: ["Room", "Sensor API", "Google Maps API", "Kotlin"],
    link: "#",
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
    category: "work",
  },
  {
    title: "AmiChat - AI Creative Buddy",
    description: {
      vi: "Người bạn đồng hành AI sáng tạo và thân thiện, tích hợp các mô hình ngôn ngữ lớn (LLM) để tối ưu hóa trải nghiệm trò chuyện và giải đáp thông tin thông minh.",
      en: "A friendly and creative AI companion integrated with large language models (LLMs) to deliver seamless conversations and intelligent assistance."
    },
    tech: ["LLM Integration", "Kotlin", "Jetpack Compose"],
    link: "https://play.google.com/store/apps/details?id=com.lawmatic.amichat",
    category: "work",
  },

  {
    title: "HTEM - High-Tech Electronic Menu",
    description: {
      vi: "Hệ sinh thái thực đơn điện tử thông minh tích hợp giải pháp gọi món thời gian thực, quản lý bàn ăn và tối ưu hóa vận hành nhà hàng.",
      en: "A smart electronic menu ecosystem integrating real-time ordering, table management, and restaurant operation optimization."
    },
    tech: ["Kotlin", "Jetpack Compose", "React", "Node.js", "MySQL", "Socket.io"],
    link: "",
    category: "personal",
    repositories: [
      {
        title: "HTEM Server (Backend API)",
        description: {
          vi: "Hệ thống API backend viết bằng Node.js & Express kết hợp Socket.io để xử lý các yêu cầu gọi món thời gian thực và quản lý trạng thái bàn ăn.",
          en: "Backend API built with Node.js & Express, utilizing Socket.io for real-time order processing and table status sync."
        },
        tech: ["Node.js", "Express", "MySQL", "Socket.io", "Sequelize"],
        link: "https://github.com/PhongDayNai/HTEM_Server"
      },
      {
        title: "HTEM Mobile App (Android Client)",
        description: {
          vi: "Ứng dụng gọi món tại bàn chạy native trên thiết bị Android dành cho khách hàng, tích hợp cập nhật trạng thái đơn hàng thời gian thực.",
          en: "Native Android application for customer table ordering, featuring real-time order status updates."
        },
        tech: ["Kotlin", "Jetpack Compose", "Retrofit", "Socket.io-client", "Coroutines"],
        link: "https://github.com/PhongDayNai/HTEM_Mobile_App_Client"
      },
      {
        title: "HTEM Admin Web Dashboard",
        description: {
          vi: "Trang quản trị vận hành nhà hàng dành cho Admin và Nhân viên để tiếp nhận đơn hàng, quản lý doanh thu, thực đơn và sơ đồ bàn ăn.",
          en: "Administrative web dashboard for restaurant management, order fulfillment, menu configuration, and table layouts."
        },
        tech: ["React", "Vite", "TailwindCSS", "Recharts"],
        link: "https://github.com/PhongDayNai/HTEM_Admin_Web"
      }
    ]
  },
  {
    title: "ChillingStories - Scalable Backend Engine",
    description: {
      vi: "Thiết kế và tối ưu hóa hệ thống backend hiệu năng cao cho ứng dụng đọc truyện, tích hợp hạ tầng tự động hóa CI/CD và ảo hóa Docker.",
      en: "Designed and optimized a high-performance backend system for a story-reading platform, implementing automated CI/CD pipelines and Docker virtualization."
    },
    tech: ["Node.js", "Express", "MySQL", "Docker", "GitHub Actions"],
    link: "https://github.com/PhongDayNai/ChillingStories_Server",
    category: "personal"
  },
  {
    title: "ChefMate - Smart Cooking Companion",
    description: {
      vi: "Hệ thống trợ lý nấu ăn thông minh quản lý thực phẩm trong tủ lạnh, theo dõi lịch sử ăn uống để đề xuất món ăn cá nhân hóa và nhắc nhở ngày hết hạn của nguyên liệu.",
      en: "A smart cooking assistant ecosystem that manages refrigerator inventory, tracks dietary history for personalized recipe recommendations, and alerts users of expiring ingredients."
    },
    tech: ["Kotlin", "Jetpack Compose", "Next.js", "Node.js", "MySQL", "Docker", "llama.cpp"],
    link: "",
    category: "personal",
    repositories: [
      {
        title: "ChefMate Server (Backend API)",
        description: {
          vi: "Hệ thống Backend API viết bằng Node.js & Express, quản lý dữ liệu người dùng, thực đơn, tích hợp MySQL và hỗ trợ AI chat session.",
          en: "Backend API system built with Node.js & Express, managing user data, recipes, MySQL database, and AI chat session integration."
        },
        tech: ["Node.js", "Express", "MySQL", "Docker", "JWT"],
        link: "https://github.com/PhongDayNai/ChefMate_Server"
      },
      {
        title: "ChefMate Mobile App (Android Native)",
        description: {
          vi: "Ứng dụng Android native client viết bằng Kotlin và Jetpack Compose, tích hợp quản lý trạng thái và tối ưu hóa trải nghiệm nấu ăn.",
          en: "Android native client application built with Kotlin and Jetpack Compose, featuring state management and cooking UX optimization."
        },
        tech: ["Kotlin", "Jetpack Compose", "Room DB", "OkHttp", "Gson", "DataStore"],
        link: "https://github.com/PhongDayNai/ChefMate_Client"
      },
      {
        title: "ChefMate Web App",
        description: {
          vi: "Ứng dụng web đa nền tảng cho phép người dùng tìm kiếm công thức, lên kế hoạch bữa ăn và quản lý thực đơn đầy đủ tính năng thay thế cho phiên bản di động.",
          en: "A comprehensive web application that serves as a fully functional alternative to the mobile app for recipe discovery and meal planning."
        },
        tech: ["Next.js", "React", "TypeScript", "TailwindCSS", "Docker"],
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
  {
    title: "Vi Vu Bình Điền - Huế Travel Portal",
    description: {
      vi: "Cổng thông tin du lịch trực quan giới thiệu danh lam thắng cảnh, ẩm thực địa phương, văn hóa bản địa cùng tích hợp bản đồ số và kênh phản hồi tại xã Bình Điền, Huế.",
      en: "An interactive tourism web portal promoting Bình Điền (Huế), showcasing scenic landscapes, local cuisine, culture, digital maps, and feedback channels."
    },
    tech: ["Next.js", "React", "TypeScript", "TailwindCSS", "Framer Motion", "Docker"],
    link: "https://github.com/PhongDayNai/hue-heritage-expo",
    category: "personal",
    website: "https://binhdien.phongdaynai.id.vn",
  },
  {
    title: "Agent Chat UI - Desktop Client",
    description: {
      vi: "Ứng dụng chat client chạy trên desktop viết bằng PyQt6 cho các API tương thích OpenAI, hỗ trợ 3 chế độ hoạt động (Chat, Character, Agent) và tích hợp terminal agent chạy lệnh local.",
      en: "A PyQt6 desktop chat client for OpenAI-compatible APIs, featuring Chat, Character, and Agent modes with local terminal execution support for coding tasks."
    },
    tech: ["Python", "PyQt6", "OpenAI API", "Local LLMs", "Keyring"],
    link: "https://github.com/PhongDayNai/Agent-Chat-UI",
    category: "personal",
    website: "https://github.com/PhongDayNai/Agent-Chat-UI/releases",
  },
  {
    title: "My Portfolio - Personal Website",
    description: {
      vi: "Trang web portfolio cá nhân thiết kế theo phong cách hiện đại với hiệu ứng con trỏ chuột tương tác vật lý, spotlight chuyển động và giao diện tối ưu hóa trải nghiệm.",
      en: "A modern, highly interactive personal portfolio website featuring custom physics-based cursor, dynamic spotlight layouts, and responsive design."
    },
    tech: ["Next.js", "React", "TypeScript", "TailwindCSS", "Framer Motion"],
    link: "https://github.com/PhongDayNai/My-Portfolio",
    category: "personal",
    website: "https://portfolio.phongdaynai.id.vn",
  },
  {
    title: "PawFeed - Smart Pet Feeder Ecosystem",
    description: {
      vi: "Hệ sinh thái cho thú cưng ăn tự động từ xa tích hợp AI thông minh với bộ nhớ dài hạn (memory) và cơ chế xây dựng ngữ cảnh (context builder), hỗ trợ gọi hàm (function calling) để tính toán khẩu phần ăn và điều khiển thiết bị.",
      en: "An AI-powered smart pet feeder ecosystem featuring long-term memory, context builder, and function calling capability for automated portion calculations and device control."
    },
    tech: ["Kotlin", "Jetpack Compose", "React", "Next.js", "Node.js", "MySQL", "AI Integration", "Function Calling", "SSE", "TypeScript", "TailwindCSS", "MQTT", "ESP8266", "ESP32", "C++", "Arduino", "Hilt", "Room", "WorkManager", "CameraX", "ML Kit", "Glance", "Zod", "JWT"],
    link: "",
    category: "personal",
    repositories: [
      {
        title: "PawFeed Server (Backend API)",
        description: {
          vi: "Hệ thống API backend viết bằng Node.js kết hợp SSE & MQTT điều khiển thiết bị thời gian thực và tích hợp AI Agent xử lý logic gọi hàm để tự động hóa quy trình cho ăn.",
          en: "Backend API system built with Node.js, SSE & MQTT for real-time device communication, integrated with an AI Agent featuring function calling logic."
        },
        tech: ["Node.js", "Express", "MySQL", "SSE", "AI Integration", "Function Calling", "MQTT", "Zod", "JWT", "Express Rate Limit", "Helmet"],
        link: "https://github.com/PhongDayNai/PawFeed_Server"
      },
      {
        title: "PawFeed Mobile App (Android Client)",
        description: {
          vi: "Ứng dụng di động native chạy trên Android dành cho người dùng để giám sát, điều khiển máy cho ăn và tương tác với trợ lý AI chăm sóc thú cưng.",
          en: "Native Android mobile client for monitoring, remote control, and interacting with the AI pet care assistant."
        },
        tech: ["Jetpack Compose", "Retrofit", "SSE", "Hilt", "Room", "DataStore", "WorkManager", "CameraX", "ML Kit", "Glance"],
        link: "https://github.com/PhongDayNai/PawFeed_App"
      },
      {
        title: "PawFeed Web Client",
        description: {
          vi: "Nền tảng ứng dụng Web đa tính năng giúp người dùng quản lý thiết bị, xem lịch sử cho ăn và thiết lập lịch trình từ trình duyệt.",
          en: "Web application platform for managing pet feeding schedules, viewing history, and controlling devices via web browsers."
        },
        tech: ["Next.js", "React", "TypeScript", "TailwindCSS", "ESLint", "Lucide React"],
        link: "https://github.com/PhongDayNai/PawFeed_Web",
        website: "https://pawfeed.phongdaynai.id.vn"
      },
      {
        title: "PawFeed IoT Firmware (Hardware client)",
        description: {
          vi: "Mã nguồn firmware chạy trên vi điều khiển ESP8266/ESP32, quản lý kết nối Wi-Fi, đọc cảm biến, điều khiển động cơ servo cho ăn, lưu trữ cấu hình cục bộ qua LittleFS và giao tiếp hai chiều thời gian thực qua giao thức MQTT bảo mật bằng chữ ký số HMAC-SHA256.",
          en: "Firmware code running on ESP8266/ESP32 microcontrollers, managing Wi-Fi, reading sensors, controlling servo motors, utilizing LittleFS for local configuration, and communicating via MQTT protocol secured with HMAC-SHA256 signature verification."
        },
        tech: ["ESP8266", "ESP32", "C++", "Arduino", "MQTT", "LittleFS", "BearSSL", "HMAC-SHA256"],
        link: "https://github.com/PhongDayNai/PawFeed_Server/blob/main/machine/main.cpp"
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
