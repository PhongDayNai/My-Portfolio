const getExperience = () => {
  const startYear = 2024;
  const startMonth = 5; // June (0-indexed)
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const diffMonths = (currentYear - startYear) * 12 + (currentMonth - startMonth);
  const x = Math.floor(diffMonths / 12);
  const m = diffMonths % 12;

  return { x, m };
};

export const getExperienceVi = () => {
  const { x, m } = getExperience();
  if (m < 4) {
    return `hơn ${x} năm kinh nghiệm thực chiến`;
  } else if (m < 8) {
    return `${x} năm rưỡi kinh nghiệm thực chiến`;
  } else if (m < 11) {
    return `gần ${x + 1} năm kinh nghiệm thực chiến`;
  } else {
    return `${x + 1} năm kinh nghiệm thực chiến`;
  }
};

export const getExperienceEn = () => {
  const { x, m } = getExperience();
  const yearsStr = (num: number) => (num === 1 ? "year" : "years");
  if (m < 4) {
    return `over ${x} ${yearsStr(x)} of hands-on experience`;
  } else if (m < 8) {
    return `${x} and a half ${yearsStr(x)} of hands-on experience`;
  } else if (m < 11) {
    return `nearly ${x + 1} ${yearsStr(x + 1)} of hands-on experience`;
  } else {
    return `${x + 1} ${yearsStr(x + 1)} of hands-on experience`;
  }
};

export const translations = {
  vi: {
    nav: {
      home: "Trang chủ",
      projects: "Dự án",
      experience: "Kinh nghiệm",
      profile: "Cá nhân",
    },
    hero: {
      hello: "/ hello_world",
      firstName: "DƯƠNG",
      lastName: "HÙNG PHONG",
      get summary() {
        return `Multi-disciplinary Developer với ${getExperienceVi()} trong phát triển Android (Kotlin) và Full-stack.`;
      },
      viewPortfolio: "Xem Portfolio",
      contactMe: "Liên hệ",
    },
    sections: {
      experience: "Kinh nghiệm & Học vấn",
      about: "Cá nhân & Kỹ năng",
      skills: "Kỹ năng chuyên môn",
      featuredProject: "Dự án tiêu biểu",
      project: "Dự án",
      education: "Education",
      gpa: "GPA",
    },
    profile: {
      tag: "About Me",
      heading: "Xây dựng giải pháp",
      subHeading: "tối ưu & sáng tạo",
      description:
        "Tôi là một nhà phát triển Full-stack đam mê việc tạo ra các ứng dụng di động và hệ thống backend hiệu suất cao. Với nền tảng từ Đại học Thủy Lợi và kinh nghiệm thực chiến tại ChainZ, tôi luôn chú trọng vào trải nghiệm người dùng và tính ổn định của mã nguồn.",
      location: "Khương Đình, Thanh Xuân, Hà Nội",
    },
    education: {
      university: "Đại học Thủy Lợi",
      degree: "Kỹ sư Công nghệ thông tin",
      duration: "2022 - Hiện tại",
      gpaLabel: "GPA Hiện tại",
    },
    projects: {
      tabs: { professional: "Dự án Công ty", personal: "Dự án Cá nhân" },
    },
    socials: [
      { name: "GitHub", desc: "@PhongDayNai" },
      { name: "Facebook", desc: "Phong" },
      { name: "TikTok", desc: "Sở thích & Đời sống" },
      { name: "Personal Server", desc: "Hệ thống Self-hosted" },
    ],
  },
  en: {
    nav: {
      home: "Home",
      projects: "Projects",
      experience: "Experience",
      profile: "Profile",
    },
    hero: {
      hello: "/ hello_world",
      firstName: "DUONG",
      lastName: "HUNG PHONG",
      get summary() {
        return `Multi-disciplinary Developer with ${getExperienceEn()} in Android (Kotlin) and Full-stack development.`;
      },
      viewPortfolio: "View Portfolio",
      contactMe: "Contact Me",
    },
    sections: {
      experience: "Experience & Education",
      about: "Profile & Skills",
      skills: "Professional Skills",
      featuredProject: "Featured Project",
      project: "Project",
      education: "Education",
      gpa: "GPA",
    },
    profile: {
      tag: "About Me",
      heading: "Building solutions",
      subHeading: "optimal & creative",
      description:
        "I am a Full-stack developer passionate about creating high-performance mobile applications and backend systems. With a background from Thuy Loi University and practical experience at ChainZ, I always focus on user experience and code stability.",
      location: "Khuong Dinh, Thanh Xuan, Hanoi",
    },
    education: {
      university: "Thuy Loi University",
      degree: "Bachelor of IT",
      duration: "2022 - Present",
      gpaLabel: "Current GPA",
    },
    projects: {
      tabs: { professional: "Professional Work", personal: "Personal Lab" },
    },
    socials: [
      { name: "GitHub", desc: "@PhongDayNai" },
      { name: "Facebook", desc: "Phong" },
      { name: "TikTok", desc: "Hobby & Life" },
      { name: "Personal Server", desc: "Self-hosted Lab" },
    ],
  },
};
