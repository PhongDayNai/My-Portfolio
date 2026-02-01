export interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
  image?: string;
}

export const PERSONAL_INFO = {
  name: "DƯƠNG HÙNG PHONG",
  role: "Full-Stack Developer",
  email: "dhphong266@gmail.com",
  location: "Khương Đình, Thanh Xuân, Hà Nội",
  github: "https://github.com/PhongDayNai",
  summary: "Multi-disciplinary Developer với hơn 1 năm kinh nghiệm thực chiến trong phát triển Android (Kotlin) và Full-stack.",
};

export const PROJECTS: Project[] = [
  {
    title: "ChillingStories - Backend & Infrastructure",
    description: "Phát triển hệ thống API đọc truyện và cơ sở dữ liệu với quy trình CI/CD tự động, vận hành trên Docker.",
    tech: ["Node.js", "Express", "MySQL", "Docker", "GitHub Actions"],
    link: "https://github.com/PhongDayNai/ChillingStories_Server",
    image: "/images/chilling-stories.png" 
  },
  {
    title: "HTEM - High-Tech Electronic Menu",
    description: "Hệ thống menu điện tử tích hợp Android (Jetpack Compose), ReactJS (Admin) và Node.js server.",
    tech: ["Jetpack Compose", "ReactJS", "Node.js", "RESTful API"],
    link: "https://github.com/PhongDayNai/HTEM_Mobile_App_Client",
    image: "/images/htem.png"
  },
  {
    title: "ChefMate - Smart Cooking Companion",
    description: "Nền tảng hỗ trợ nấu ăn thông minh với hệ thống tìm kiếm kép và quản lý công thức nấu ăn riêng tư.",
    tech: ["Jetpack Compose", "ReactJS", "Node.js", "MySQL"],
    link: "https://github.com/PhongDayNai/ChefMate_Client",
    image: "/images/chefmate.png"
  },
  {
    title: "Plantie AI - Plant Detection",
    description: "Ứng dụng Android sử dụng AI để nhận diện thực vật, chẩn đoán bệnh và tư vấn chăm sóc cây qua Live Chat.",
    tech: ["Kotlin", "Jetpack Compose", "MVVM", "AI Integration"],
    link: "https://play.google.com/store/apps/details?id=com.plantidentification.chainz",
    image: "/images/plantie.png"
  }
];

export const WORK_EXPERIENCE = [
  {
    company: "CHAINZ JS COMPANY",
    role: "Android Developer",
    duration: "12/2024 - Hiện tại",
    tasks: [
      "Phát triển hệ thống nhận diện thực vật Plantie AI.",
      "Xây dựng công cụ GPS Camera tích hợp dữ liệu môi trường thời gian thực.",
      "Phát triển ứng dụng Muslim Pro+ hỗ trợ cộng đồng Hồi giáo."
    ]
  }
];