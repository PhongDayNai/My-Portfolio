"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LogOut, Settings, User, FileText, Key, ShieldCheck, 
  Loader2, Save, ArrowLeft, Plus, Trash2, HelpCircle, 
  Code, Share2, Calendar, CheckCircle, ChevronDown, ChevronUp,
  Briefcase, GraduationCap, Folder, Search, X, Edit, GitBranch,
  ChevronLeft, ChevronRight, Eye, EyeOff
} from "lucide-react";
import Link from "next/link";
import { PortfolioData } from "@/lib/schema";
import { updatePortfolio } from "@/app/actions";
import { settingsTranslations } from "@/constants";
import CustomDatePicker from "@/components/CustomDatePicker";

interface SettingsClientProps {
  data: PortfolioData;
}

// 1. Component AutoResizeTextarea custom thay thế textarea mặc định
interface AutoResizeTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
}

function AutoResizeTextarea({ value, onChange, className, ...props }: AutoResizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => {
        if (onChange) onChange(e);
        adjustHeight();
      }}
      className={`w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl p-3 text-white text-sm outline-none transition-all resize-none overflow-hidden ${className}`}
      {...props}
    />
  );
}

// 2. Component PillSelector custom thay thế thẻ <select> thô sơ
interface PillSelectorProps<T extends string> {
  options: { value: T; label: string }[];
  selectedValue: T;
  onChange: (value: T) => void;
  layoutId: string;
}

function PillSelector<T extends string>({ options, selectedValue, onChange, layoutId }: PillSelectorProps<T>) {
  return (
    <div className="flex bg-[#1e293b]/50 border border-white/5 rounded-xl p-1 relative w-full select-none">
      {options.map((opt) => {
        const isSelected = selectedValue === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`flex-1 text-center py-2.5 px-3 rounded-lg text-xs font-bold transition-all relative z-10 ${
              isSelected ? "text-white" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {isSelected && (
              <motion.div
                layoutId={layoutId}
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg shadow-blue-500/25"
                transition={{ type: "spring", bounce: 0.15, duration: 0.35 }}
              />
            )}
            <span className="relative z-20">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}



// 3. Component CustomDropdown thay thế input text của status
interface DropdownOption<T extends string> {
  value: T;
  label: string;
}

interface DropdownProps<T extends string> {
  options: DropdownOption<T>[];
  selectedValue: T;
  onChange: (value: T) => void;
  className?: string;
}

function CustomDropdown<T extends string>({ options, selectedValue, onChange, className }: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const selectedOption = options.find(opt => opt.value === selectedValue) || options[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={`relative w-full ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-[#1e293b]/50 border border-white/5 hover:border-white/10 rounded-xl p-3 text-white text-sm outline-none transition-all text-left"
      >
        <span>{selectedOption ? selectedOption.label : selectedValue}</span>
        <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-2 bg-[#1a2333] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-xs font-bold transition-all hover:bg-blue-600/20 ${
                  selectedValue === opt.value ? "bg-blue-600/10 text-blue-400" : "text-slate-300"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const PREDEFINED_SOCIALS = [
  { name: "GitHub", icon: "Github", color: "hover:bg-white/10" },
  { name: "Facebook", icon: "Facebook", color: "hover:bg-blue-600/20" },
  { name: "TikTok", icon: "TikTok", color: "hover:bg-pink-600/20" },
  { name: "HomeLab", icon: "Server", color: "hover:bg-orange-500/20" },
  { name: "LinkedIn", icon: "Linkedin", color: "hover:bg-blue-700/20" },
  { name: "X", icon: "X", color: "hover:bg-slate-800/40" },
  { name: "Reddit", icon: "Reddit", color: "hover:bg-orange-600/20" },
  { name: "Telegram", icon: "Telegram", color: "hover:bg-sky-500/20" },
  { name: "Zalo", icon: "Zalo", color: "hover:bg-blue-500/20" },
  { name: "Discord", icon: "Discord", color: "hover:bg-indigo-600/20" },
  { name: "YouTube", icon: "Youtube", color: "hover:bg-red-600/20" },
  { name: "Instagram", icon: "Instagram", color: "hover:bg-pink-600/20" },
];

const SOCIAL_METADATA: Record<string, {
  placeholderLink: string;
  placeholderDescVi: string;
  placeholderDescEn: string;
}> = {
  GitHub: {
    placeholderLink: "https://github.com/username",
    placeholderDescVi: "@username",
    placeholderDescEn: "@username",
  },
  Facebook: {
    placeholderLink: "https://www.facebook.com/username",
    placeholderDescVi: "Tên hiển thị",
    placeholderDescEn: "Display Name",
  },
  TikTok: {
    placeholderLink: "https://www.tiktok.com/@username",
    placeholderDescVi: "Sở thích & Đời sống",
    placeholderDescEn: "Hobby & Life",
  },
  HomeLab: {
    placeholderLink: "https://homelab.yourdomain.com",
    placeholderDescVi: "Hệ thống Self-hosted",
    placeholderDescEn: "Self-hosted Lab",
  },
  LinkedIn: {
    placeholderLink: "https://www.linkedin.com/in/username",
    placeholderDescVi: "Kết nối công việc",
    placeholderDescEn: "Professional Network",
  },
  X: {
    placeholderLink: "https://x.com/username",
    placeholderDescVi: "Tin tức & Chia sẻ",
    placeholderDescEn: "Thoughts & Tech",
  },
  Reddit: {
    placeholderLink: "https://www.reddit.com/user/username",
    placeholderDescVi: "Cộng đồng & Thảo luận",
    placeholderDescEn: "Communities & Forums",
  },
  Telegram: {
    placeholderLink: "https://t.me/username",
    placeholderDescVi: "Kênh trao đổi lập trình",
    placeholderDescEn: "Developer Chat Channel",
  },
  Zalo: {
    placeholderLink: "https://zalo.me/phone_number",
    placeholderDescVi: "Liên hệ trực tiếp",
    placeholderDescEn: "Direct Contact",
  },
  Discord: {
    placeholderLink: "https://discord.gg/invite",
    placeholderDescVi: "Cộng đồng công nghệ",
    placeholderDescEn: "Tech Community",
  },
  YouTube: {
    placeholderLink: "https://youtube.com/@channel",
    placeholderDescVi: "Chia sẻ video & Hướng dẫn",
    placeholderDescEn: "Video Tutorials",
  },
  Instagram: {
    placeholderLink: "https://instagram.com/username",
    placeholderDescVi: "Hình ảnh đời sống",
    placeholderDescEn: "Life & Photos",
  },
};

export default function SettingsClient({ data }: SettingsClientProps) {
  const { lang } = useLanguage();
  const t = settingsTranslations[lang] || settingsTranslations.vi;
  const router = useRouter();

  const [portfolio, setPortfolio] = useState<PortfolioData>(data);
  const [activeTab, setActiveTab] = useState<"general" | "skills" | "projects" | "timeline">("general");
  
  const [isSaving, setIsSaving] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // States quản lý Modal thêm mạng xã hội
  const [isAddSocialModalOpen, setIsAddSocialModalOpen] = useState(false);
  const [newSocial, setNewSocial] = useState({
    name: "GitHub",
    icon: "Github",
    link: "",
    color: "hover:bg-white/10",
    desc: { vi: "", en: "" }
  });

  // States quản lý accordion
  const [expandedProjectIndex, setExpandedProjectIndex] = useState<number | null>(null);
  const [expandedTimelineIndex, setExpandedTimelineIndex] = useState<number | null>(null);

  // States quản lý tìm kiếm
  const [projectSearch, setProjectSearch] = useState("");
  const [timelineSearch, setTimelineSearch] = useState("");
  const [socialSearch, setSocialSearch] = useState("");

  // Modals quản lý thêm mới
  const [isAddSkillModalOpen, setIsAddSkillModalOpen] = useState(false);
  const [newSkill, setNewSkill] = useState({
    category: { vi: "", en: "" },
    items: ""
  });

  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [newProjectState, setNewProjectState] = useState({
    title: "",
    category: "personal" as "work" | "personal",
    link: "",
    website: "",
    company: "",
    tech: "",
    description: { vi: "", en: "" }
  });

  const [isAddTimelineModalOpen, setIsAddTimelineModalOpen] = useState(false);
  const [newTimelineState, setNewTimelineState] = useState({
    type: "work" as "work" | "education",
    status: "active",
    title: { vi: "", en: "" },
    organization: { vi: "", en: "" },
    date: { vi: "", en: "" },
    description: { vi: "", en: "" }
  });

  // States quản lý Modal thêm/sửa repo con (sub-repo)
  const [isSubRepoModalOpen, setIsSubRepoModalOpen] = useState(false);
  const [subRepoModalMode, setSubRepoModalMode] = useState<"add" | "edit">("add");
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const [activeSubRepoIndex, setActiveSubRepoIndex] = useState<number | null>(null);
  const [newSubRepoState, setNewSubRepoState] = useState({
    title: "",
    link: "",
    website: "",
    tech: "",
    description: { vi: "", en: "" }
  });

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });
      if (response.ok) {
        router.push("/login");
        router.refresh();
      }
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setToast(null);
    try {
      // Validate duplicate social link names with the same URLs
      // "cho phép trùng loại item nhưng phải khác value link url"
      const socialLinks = portfolio.socialLinks;
      const duplicates = socialLinks.filter((item, index) => 
        socialLinks.findIndex(s => s.name === item.name && s.link.trim() === item.link.trim()) !== index
      );
      if (duplicates.length > 0) {
        setToast({ 
          type: "error", 
          message: `${t.duplicateSocialError}${duplicates[0].name} (${duplicates[0].link})`
        });
        setIsSaving(false);
        setTimeout(() => setToast(null), 4000);
        return;
      }

      const res = await updatePortfolio(portfolio);
      if (res.success) {
        setToast({ type: "success", message: t.saveSuccess });
        router.refresh();
      } else {
        setToast({ type: "error", message: res.error || t.saveError });
      }
    } catch (err: any) {
      setToast({ type: "error", message: err?.message || t.saveError });
    } finally {
      setIsSaving(false);
      setTimeout(() => setToast(null), 4000);
    }
  };

  // Helper state updates
  const updatePersonalInfo = (field: keyof PortfolioData["personalInfo"], value: string) => {
    setPortfolio(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const updateTranslation = (langKey: "vi" | "en", section: "hero" | "profile" | "education", field: string, value: string) => {
    setPortfolio(prev => ({
      ...prev,
      translations: {
        ...prev.translations,
        [langKey]: {
          ...prev.translations[langKey],
          [section]: {
            ...prev.translations[langKey][section],
            [field]: value
          }
        }
      }
    }));
  };

  // Các hàm helper quản lý Kỹ năng (Skills)
  const updateSkill = (index: number, value: string) => {
    setPortfolio(prev => {
      const updated = [...prev.skills];
      updated[index] = { ...updated[index], items: value };
      return { ...prev, skills: updated };
    });
  };

  const updateSkillCategory = (index: number, langKey: "vi" | "en", value: string) => {
    setPortfolio(prev => {
      const updated = [...prev.skills];
      updated[index] = {
        ...updated[index],
        category: { ...updated[index].category, [langKey]: value }
      };
      return { ...prev, skills: updated };
    });
  };

  const openAddSkillModal = () => {
    setNewSkill({
      category: { vi: "", en: "" },
      items: ""
    });
    setIsAddSkillModalOpen(true);
  };

  const handleAddSkillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.category.vi.trim() || !newSkill.category.en.trim()) {
      setToast({
        type: "error",
        message: lang === "vi" ? "Tên nhóm kỹ năng không được để trống" : "Skill group name cannot be empty"
      });
      setTimeout(() => setToast(null), 4000);
      return;
    }
    setPortfolio(prev => ({
      ...prev,
      skills: [
        ...prev.skills,
        {
          category: {
            vi: newSkill.category.vi.trim(),
            en: newSkill.category.en.trim()
          },
          items: newSkill.items.trim(),
          show: true
        }
      ]
    }));
    setIsAddSkillModalOpen(false);
    setToast({
      type: "success",
      message: lang === "vi" ? "Đã thêm nhóm kỹ năng mới!" : "Skill group added!"
    });
    setTimeout(() => setToast(null), 4000);
  };

  const openAddProjectModal = () => {
    setNewProjectState({
      title: "",
      category: "personal",
      link: "",
      website: "",
      company: "",
      tech: "",
      description: { vi: "", en: "" }
    });
    setIsAddProjectModalOpen(true);
  };

  const handleAddProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectState.title.trim()) {
      setToast({
        type: "error",
        message: lang === "vi" ? "Tên dự án không được để trống" : "Project title cannot be empty"
      });
      setTimeout(() => setToast(null), 4000);
      return;
    }
    const newProj = {
      title: newProjectState.title.trim(),
      category: newProjectState.category,
      link: newProjectState.link.trim() || "#",
      website: newProjectState.website.trim() || undefined,
      company: newProjectState.category === "work" ? (newProjectState.company.trim() || undefined) : undefined,
      tech: newProjectState.tech.split(";").map(t => t.trim()).filter(Boolean),
      description: {
        vi: newProjectState.description.vi.trim(),
        en: newProjectState.description.en.trim()
      },
      show: true
    };
    setPortfolio(prev => ({
      ...prev,
      projects: [newProj, ...prev.projects]
    }));
    setIsAddProjectModalOpen(false);
    setExpandedProjectIndex(0);
    setToast({
      type: "success",
      message: lang === "vi" ? "Đã thêm dự án mới!" : "Project added!"
    });
    setTimeout(() => setToast(null), 4000);
  };

  // Các hàm helper quản lý Repo con (Sub-repositories)
  const openAddSubRepoModal = (projectIdx: number) => {
    setActiveProjectIndex(projectIdx);
    setActiveSubRepoIndex(null);
    setSubRepoModalMode("add");
    setNewSubRepoState({
      title: "",
      link: "",
      website: "",
      tech: "",
      description: { vi: "", en: "" }
    });
    setIsSubRepoModalOpen(true);
  };

  const openEditSubRepoModal = (projectIdx: number, subRepoIdx: number) => {
    const project = portfolio.projects[projectIdx];
    const subRepo = project.repositories?.[subRepoIdx];
    if (!subRepo) return;

    setActiveProjectIndex(projectIdx);
    setActiveSubRepoIndex(subRepoIdx);
    setSubRepoModalMode("edit");
    setNewSubRepoState({
      title: subRepo.title,
      link: subRepo.link,
      website: subRepo.website || "",
      tech: subRepo.tech.join("; "),
      description: {
        vi: subRepo.description.vi,
        en: subRepo.description.en
      }
    });
    setIsSubRepoModalOpen(true);
  };

  const handleSubRepoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeProjectIndex === null) return;
    if (!newSubRepoState.title.trim()) {
      setToast({
        type: "error",
        message: lang === "vi" ? "Tên repo con không được để trống" : "Sub-repo title cannot be empty"
      });
      setTimeout(() => setToast(null), 4000);
      return;
    }
    if (!newSubRepoState.link.trim()) {
      setToast({
        type: "error",
        message: lang === "vi" ? "Đường dẫn không được để trống" : "Link URL cannot be empty"
      });
      setTimeout(() => setToast(null), 4000);
      return;
    }

    const updatedSubRepo = {
      title: newSubRepoState.title.trim(),
      link: newSubRepoState.link.trim(),
      website: newSubRepoState.website.trim() || undefined,
      tech: newSubRepoState.tech.split(";").map(t => t.trim()).filter(Boolean),
      description: {
        vi: newSubRepoState.description.vi.trim(),
        en: newSubRepoState.description.en.trim()
      }
    };

    setPortfolio(prev => {
      const updatedProjects = [...prev.projects];
      const project = updatedProjects[activeProjectIndex];
      const currentRepos = project.repositories || [];

      if (subRepoModalMode === "add") {
        project.repositories = [...currentRepos, updatedSubRepo];
      } else if (subRepoModalMode === "edit" && activeSubRepoIndex !== null) {
        const newRepos = [...currentRepos];
        newRepos[activeSubRepoIndex] = updatedSubRepo;
        project.repositories = newRepos;
      }

      return {
        ...prev,
        projects: updatedProjects
      };
    });

    setIsSubRepoModalOpen(false);
    setToast({
      type: "success",
      message: subRepoModalMode === "add" 
        ? (lang === "vi" ? "Đã thêm repo con mới!" : "Sub-repository added!")
        : (lang === "vi" ? "Đã cập nhật repo con!" : "Sub-repository updated!")
    });
    setTimeout(() => setToast(null), 4000);
  };

  const deleteSubRepo = (projectIdx: number, subRepoIdx: number) => {
    setPortfolio(prev => {
      const updatedProjects = [...prev.projects];
      const project = updatedProjects[projectIdx];
      if (project.repositories) {
        project.repositories = project.repositories.filter((_, i) => i !== subRepoIdx);
      }
      return {
        ...prev,
        projects: updatedProjects
      };
    });
    setToast({
      type: "success",
      message: lang === "vi" ? "Đã xóa repo con!" : "Sub-repository deleted!"
    });
    setTimeout(() => setToast(null), 4000);
  };

  const openAddTimelineModal = () => {
    setNewTimelineState({
      type: "work",
      status: "active",
      title: { vi: "", en: "" },
      organization: { vi: "", en: "" },
      date: { vi: "", en: "" },
      description: { vi: "", en: "" }
    });
    setIsAddTimelineModalOpen(true);
  };

  const handleAddTimelineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTimelineState.title.vi.trim() || !newTimelineState.title.en.trim()) {
      setToast({
        type: "error",
        message: lang === "vi" ? "Tiêu đề không được để trống" : "Title cannot be empty"
      });
      setTimeout(() => setToast(null), 4000);
      return;
    }
    const newTime = {
      id: Date.now(),
      type: newTimelineState.type,
      status: newTimelineState.status,
      title: {
        vi: newTimelineState.title.vi.trim(),
        en: newTimelineState.title.en.trim()
      },
      organization: {
        vi: newTimelineState.organization.vi.trim(),
        en: newTimelineState.organization.en.trim()
      },
      date: {
        vi: newTimelineState.date.vi.trim(),
        en: newTimelineState.date.en.trim()
      },
      description: {
        vi: newTimelineState.description.vi.split("\n").map(d => d.trim()).filter(Boolean),
        en: newTimelineState.description.en.split("\n").map(d => d.trim()).filter(Boolean)
      },
      show: true
    };
    setPortfolio(prev => ({
      ...prev,
      timeline: [newTime, ...prev.timeline]
    }));
    setIsAddTimelineModalOpen(false);
    setExpandedTimelineIndex(0);
    setToast({
      type: "success",
      message: lang === "vi" ? "Đã thêm dòng thời gian mới!" : "Timeline item added!"
    });
    setTimeout(() => setToast(null), 4000);
  };

  const deleteSkillGroup = (index: number) => {
    setPortfolio(prev => ({
      ...prev,
      skills: prev.skills.filter((_, idx) => idx !== index)
    }));
  };

  const updateSocialLink = (index: number, field: keyof typeof portfolio.socialLinks[0], value: any) => {
    setPortfolio(prev => {
      const updated = [...prev.socialLinks];
      updated[index] = { ...updated[index], [field]: value } as any;
      return { ...prev, socialLinks: updated };
    });
  };

  const updateSocialLinkDesc = (index: number, langKey: "vi" | "en", value: string) => {
    setPortfolio(prev => {
      const updated = [...prev.socialLinks];
      updated[index] = {
        ...updated[index],
        desc: { ...updated[index].desc, [langKey]: value }
      };
      return { ...prev, socialLinks: updated };
    });
  };

  const openAddSocialModal = () => {
    setNewSocial({
      name: "GitHub",
      icon: "Github",
      link: "",
      color: "hover:bg-white/10",
      desc: { vi: "", en: "" }
    });
    setIsAddSocialModalOpen(true);
  };

  const handleAddSocialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSocial.link.trim()) {
      setToast({
        type: "error",
        message: lang === "vi" ? "Đường dẫn URL không được để trống" : "URL link cannot be empty"
      });
      setTimeout(() => setToast(null), 4000);
      return;
    }
    
    // Check duplicates
    const socialLinks = portfolio.socialLinks;
    const exists = socialLinks.some(s => s.name === newSocial.name && s.link.trim() === newSocial.link.trim());
    if (exists) {
      setToast({
        type: "error",
        message: `${t.duplicateSocialError}${newSocial.name} (${newSocial.link})`
      });
      setTimeout(() => setToast(null), 4000);
      return;
    }

    const meta = SOCIAL_METADATA[newSocial.name] || SOCIAL_METADATA.GitHub;
    const finalDescVi = newSocial.desc.vi.trim() || meta.placeholderDescVi;
    const finalDescEn = newSocial.desc.en.trim() || meta.placeholderDescEn;

    const newLinkItem = {
      ...newSocial,
      desc: {
        vi: finalDescVi,
        en: finalDescEn
      },
      show: true
    };

    setPortfolio(prev => ({
      ...prev,
      socialLinks: [...prev.socialLinks, newLinkItem]
    }));
    setIsAddSocialModalOpen(false);
    setToast({
      type: "success",
      message: lang === "vi" ? "Đã thêm liên kết mạng xã hội!" : "Social link added!"
    });
    setTimeout(() => setToast(null), 4000);
  };

  const deleteSocialLink = (index: number) => {
    setPortfolio(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, idx) => idx !== index)
    }));
  };

  return (
    <div className="relative min-h-screen bg-[#101622] text-slate-200 p-6 md:p-12 overflow-y-auto">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
              <Settings size={24} />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider">{t.title}</h1>
              <p className="text-slate-400 text-xs md:text-sm">{t.subtitle}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="text-slate-400 hover:text-white text-xs md:text-sm font-semibold transition-colors py-2.5 px-4 rounded-xl border border-white/5 bg-white/5 flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              <span>{t.backToHome}</span>
            </Link>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs md:text-sm font-bold py-2.5 px-6 rounded-xl transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
              <span>{isSaving ? t.saving : t.saveBtn}</span>
            </button>

            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 active:bg-red-500/30 border border-red-500/20 text-red-400 text-xs md:text-sm font-bold py-2.5 px-4 rounded-xl transition-all disabled:opacity-50"
            >
              {isLoggingOut ? <Loader2 className="animate-spin" size={16} /> : <LogOut size={16} />}
              <span>{isLoggingOut ? t.loggingOut : t.logoutBtn}</span>
            </button>
          </div>
        </div>

        {/* Toasts */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className={`p-4 rounded-xl border font-bold text-sm text-center flex items-center justify-center gap-2 ${
                toast.type === "success" 
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" 
                  : "bg-red-500/10 border-red-500/30 text-red-400"
              }`}
            >
              {toast.type === "success" && <CheckCircle size={16} />}
              <span>{toast.message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tab Controls */}
        <div className="flex border-b border-white/5 overflow-x-auto gap-2 pb-px scrollbar-none">
          {[
            { id: "general", label: t.tabGeneral, icon: User },
            { id: "skills", label: t.tabSkillsSocials, icon: Code },
            { id: "projects", label: t.tabProjects, icon: FileText },
            { id: "timeline", label: t.tabTimeline, icon: Calendar },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 border-b-2 font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-400 bg-blue-500/5"
                  : "border-transparent text-slate-500 hover:text-slate-300 hover:bg-white/5"
              }`}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content Panels */}
        <div className="bg-[#141b2b]/40 border border-white/5 p-6 md:p-8 rounded-2xl shadow-xl min-h-[400px]">
          
          {/* TAB 1: GENERAL INFO */}
          {activeTab === "general" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">{t.adminName}</label>
                  <input
                    type="text"
                    value={portfolio.personalInfo.name}
                    onChange={(e) => updatePersonalInfo("name", e.target.value)}
                    className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl p-3 text-white text-sm outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">{t.adminRole}</label>
                  <input
                    type="text"
                    value={portfolio.personalInfo.role}
                    onChange={(e) => updatePersonalInfo("role", e.target.value)}
                    className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl p-3 text-white text-sm outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">{t.email}</label>
                  <input
                    type="email"
                    value={portfolio.personalInfo.email}
                    onChange={(e) => updatePersonalInfo("email", e.target.value)}
                    className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl p-3 text-white text-sm outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">{t.phone}</label>
                  <input
                    type="text"
                    value={portfolio.personalInfo.phone}
                    onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                    className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl p-3 text-white text-sm outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">{t.address}</label>
                  <input
                    type="text"
                    value={portfolio.personalInfo.location}
                    onChange={(e) => updatePersonalInfo("location", e.target.value)}
                    className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl p-3 text-white text-sm outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">{t.expStartDate}</label>
                  <CustomDatePicker
                    value={portfolio.personalInfo.experienceStartDate}
                    onChange={(val) => updatePersonalInfo("experienceStartDate", val)}
                    lang={lang}
                  />
                </div>
              </div>

              {/* VIETNAMESE HERO & PROFILE */}
              <div className="border-t border-white/5 pt-6 space-y-6">
                <h3 className="text-sm font-bold text-blue-400 uppercase tracking-widest">{t.sectionVi}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">{t.heroHello} ({t.fieldVietnamese})</label>
                    <input
                      type="text"
                      value={portfolio.translations.vi.hero.hello}
                      onChange={(e) => updateTranslation("vi", "hero", "hello", e.target.value)}
                      className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl p-3 text-white text-sm outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">{t.heroFirstName} ({t.fieldVietnamese})</label>
                    <input
                      type="text"
                      value={portfolio.translations.vi.hero.firstName}
                      onChange={(e) => updateTranslation("vi", "hero", "firstName", e.target.value)}
                      className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl p-3 text-white text-sm outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">{t.heroLastName} ({t.fieldVietnamese})</label>
                    <input
                      type="text"
                      value={portfolio.translations.vi.hero.lastName}
                      onChange={(e) => updateTranslation("vi", "hero", "lastName", e.target.value)}
                      className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl p-3 text-white text-sm outline-none transition-all"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      {t.heroSummary} ({t.fieldVietnamese}) <span className="text-[10px] text-slate-500 lowercase normal-case">{t.heroSummaryDesc}</span>
                    </label>
                    <AutoResizeTextarea
                      rows={2}
                      value={portfolio.translations.vi.hero.summary}
                      onChange={(e) => updateTranslation("vi", "hero", "summary", e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">{t.profileDesc} ({t.fieldVietnamese})</label>
                    <AutoResizeTextarea
                      rows={4}
                      value={portfolio.translations.vi.profile.description}
                      onChange={(e) => updateTranslation("vi", "profile", "description", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* ENGLISH HERO & PROFILE */}
              <div className="border-t border-white/5 pt-6 space-y-6">
                <h3 className="text-sm font-bold text-blue-400 uppercase tracking-widest">{t.sectionEn}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">{t.heroHello} ({t.fieldEnglish})</label>
                    <input
                      type="text"
                      value={portfolio.translations.en.hero.hello}
                      onChange={(e) => updateTranslation("en", "hero", "hello", e.target.value)}
                      className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl p-3 text-white text-sm outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">{t.heroFirstName} ({t.fieldEnglish})</label>
                    <input
                      type="text"
                      value={portfolio.translations.en.hero.firstName}
                      onChange={(e) => updateTranslation("en", "hero", "firstName", e.target.value)}
                      className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl p-3 text-white text-sm outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">{t.heroLastName} ({t.fieldEnglish})</label>
                    <input
                      type="text"
                      value={portfolio.translations.en.hero.lastName}
                      onChange={(e) => updateTranslation("en", "hero", "lastName", e.target.value)}
                      className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl p-3 text-white text-sm outline-none transition-all"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      {t.heroSummary} ({t.fieldEnglish}) <span className="text-[10px] text-slate-500 lowercase normal-case">{t.heroSummaryDesc}</span>
                    </label>
                    <AutoResizeTextarea
                      rows={2}
                      value={portfolio.translations.en.hero.summary}
                      onChange={(e) => updateTranslation("en", "hero", "summary", e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">{t.profileDesc} ({t.fieldEnglish})</label>
                    <AutoResizeTextarea
                      rows={4}
                      value={portfolio.translations.en.profile.description}
                      onChange={(e) => updateTranslation("en", "profile", "description", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SKILLS & SOCIALS */}
          {activeTab === "skills" && (
            <div className="space-y-8">
              
              {/* SKILLS SECTION - ĐÃ ĐƯỢC CHUYỂN DỊCH SANG DẠNG QUẢN LÝ ĐỘNG (THÊM/BỚT/SỬA) */}
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <h3 className="text-sm font-bold text-blue-400 uppercase tracking-widest">{t.skillsTitle}</h3>
                  <button
                    type="button"
                    onClick={openAddSkillModal}
                    className="flex items-center gap-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 active:scale-95 text-white py-2 px-4 rounded-xl transition-all shadow-md shadow-blue-500/10 shrink-0"
                  >
                    <Plus size={14} />
                    <span>{t.addSkillGroup}</span>
                  </button>
                </div>
                
                {portfolio.skills.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 text-sm font-semibold">{t.noItem}</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {portfolio.skills.map((skillGroup, idx) => (
                      <div 
                        key={idx} 
                        className={`border rounded-2xl p-5 space-y-4 relative transition-all ${
                          skillGroup.show === false
                            ? "bg-[#1e293b]/5 border-red-500/20 opacity-60"
                            : "bg-[#1e293b]/20 border-white/5"
                        }`}
                      >
                        {/* Nút ẩn/hiện nhóm kỹ năng */}
                        <button
                          onClick={() => {
                            const updated = [...portfolio.skills];
                            updated[idx] = {
                              ...updated[idx],
                              show: skillGroup.show === false ? true : false
                            };
                            setPortfolio(prev => ({ ...prev, skills: updated }));
                          }}
                          className={`absolute top-4 right-12 p-1.5 rounded-lg transition-all ${
                            skillGroup.show === false 
                              ? "text-red-400 hover:text-red-300 hover:bg-red-500/10" 
                              : "text-slate-500 hover:text-blue-400 hover:bg-white/5"
                          }`}
                          title={skillGroup.show === false ? (lang === "vi" ? "Đang ẩn (Click để hiện)" : "Hidden (Click to show)") : (lang === "vi" ? "Đang hiện (Click để ẩn)" : "Shown (Click to hide)")}
                        >
                          {skillGroup.show === false ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>

                        {/* Nút xóa nhóm kỹ năng */}
                        <button
                          onClick={() => {
                            if (confirm(t.confirmDeleteSkillGroup)) {
                              deleteSkillGroup(idx);
                            }
                          }}
                          className="absolute top-4 right-4 text-slate-500 hover:text-red-400 hover:bg-red-500/10 p-1.5 rounded-lg transition-all"
                          title={t.confirmDeleteSkillGroup}
                        >
                          <Trash2 size={16} />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">
                              {t.skillCategoryName} ({t.fieldVietnamese})
                            </label>
                            <input
                              type="text"
                              value={skillGroup.category.vi}
                              onChange={(e) => updateSkillCategory(idx, "vi", e.target.value)}
                              className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-lg p-2.5 text-white text-xs outline-none transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">
                              {t.skillCategoryName} ({t.fieldEnglish})
                            </label>
                            <input
                              type="text"
                              value={skillGroup.category.en}
                              onChange={(e) => updateSkillCategory(idx, "en", e.target.value)}
                              className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-lg p-2.5 text-white text-xs outline-none transition-all"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">
                            {t.skillItems}
                          </label>
                          <AutoResizeTextarea
                            rows={3}
                            placeholder={t.skillItemsPlaceholder}
                            value={skillGroup.items}
                            onChange={(e) => updateSkill(idx, e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* SOCIAL LINKS */}
              <div className="border-t border-white/5 pt-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
                  <h3 className="text-sm font-bold text-blue-400 uppercase tracking-widest">{t.socialsTitle}</h3>
                  
                  <div className="flex items-center gap-3 flex-1 sm:max-w-md">
                    <div className="relative flex-1">
                      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="text"
                        placeholder={lang === "vi" ? "Tìm kiếm mạng xã hội..." : "Search social links..."}
                        value={socialSearch}
                        onChange={(e) => setSocialSearch(e.target.value)}
                        className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl py-2 pl-9 pr-8 text-slate-200 text-xs outline-none transition-all"
                      />
                      {socialSearch && (
                        <button
                          type="button"
                          onClick={() => setSocialSearch("")}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white p-0.5 rounded-md transition-colors"
                          title={t.clearSearch}
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={openAddSocialModal}
                      className="flex items-center gap-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 active:scale-95 text-white py-2.5 px-4 rounded-xl transition-all shadow-md shadow-blue-500/10 shrink-0"
                    >
                      <Plus size={14} />
                      <span>{t.addSocialLink}</span>
                    </button>
                  </div>
                </div>
                
                {portfolio.socialLinks.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 text-sm font-semibold">{t.noItem}</div>
                ) : (
                  <div className="space-y-6">
                    {portfolio.socialLinks.map((social, idx) => {
                      const searchLower = socialSearch.toLowerCase();
                      const matchesSearch = 
                        social.name.toLowerCase().includes(searchLower) ||
                        social.link.toLowerCase().includes(searchLower) ||
                        social.desc.vi.toLowerCase().includes(searchLower) ||
                        social.desc.en.toLowerCase().includes(searchLower);

                      if (socialSearch && !matchesSearch) return null;

                      return (
                        <div 
                          key={`${social.name}-${idx}`} 
                          className={`relative p-5 rounded-2xl border transition-all space-y-4 ${
                            social.show === false 
                              ? "bg-[#1e293b]/5 border-red-500/20 opacity-60" 
                              : "bg-[#1e293b]/20 border-white/5"
                          }`}
                        >
                          {/* Visibility Toggle Button */}
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...portfolio.socialLinks];
                              updated[idx] = {
                                ...updated[idx],
                                show: social.show === false ? true : false
                              };
                              setPortfolio(prev => ({ ...prev, socialLinks: updated }));
                            }}
                            className={`absolute top-4 right-12 p-1.5 rounded-lg transition-all ${
                              social.show === false 
                                ? "text-red-400 hover:text-red-300 hover:bg-red-500/10" 
                                : "text-slate-500 hover:text-blue-400 hover:bg-white/5"
                            }`}
                            title={social.show === false ? (lang === "vi" ? "Đang ẩn (Click để hiện)" : "Hidden (Click to show)") : (lang === "vi" ? "Đang hiện (Click để ẩn)" : "Shown (Click to hide)")}
                          >
                            {social.show === false ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>

                          {/* Delete Button */}
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(t.confirmDeleteSocial)) {
                                deleteSocialLink(idx);
                              }
                            }}
                            className="absolute top-4 right-4 text-slate-500 hover:text-red-400 hover:bg-red-500/10 p-1.5 rounded-lg transition-all"
                            title={t.confirmDeleteSocial}
                          >
                            <Trash2 size={16} />
                          </button>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">
                                {t.socialType}
                              </label>
                              <CustomDropdown
                                options={PREDEFINED_SOCIALS.map(item => ({
                                  value: item.name,
                                  label: item.name,
                                }))}
                                selectedValue={social.name}
                                onChange={(val) => {
                                  const matched = PREDEFINED_SOCIALS.find(p => p.name === val);
                                  if (matched) {
                                    setPortfolio(prev => {
                                      const updated = [...prev.socialLinks];
                                      updated[idx] = {
                                        ...updated[idx],
                                        name: matched.name,
                                        icon: matched.icon,
                                        color: matched.color,
                                      };
                                      return { ...prev, socialLinks: updated };
                                    });
                                  }
                                }}
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">
                                {t.socialLink}
                              </label>
                              <input
                                type="text"
                                value={social.link}
                                onChange={(e) => updateSocialLink(idx, "link", e.target.value)}
                                className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl p-3 text-white text-xs outline-none transition-all"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">
                                {t.socialDescVi}
                              </label>
                              <input
                                type="text"
                                value={social.desc?.vi || ""}
                                onChange={(e) => updateSocialLinkDesc(idx, "vi", e.target.value)}
                                className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl p-3 text-white text-xs outline-none transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">
                                {t.socialDescEn}
                              </label>
                              <input
                                type="text"
                                value={social.desc?.en || ""}
                                onChange={(e) => updateSocialLinkDesc(idx, "en", e.target.value)}
                                className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl p-3 text-white text-xs outline-none transition-all"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: PROJECTS */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
                <h3 className="text-sm font-bold text-blue-400 uppercase tracking-widest">{t.projectList}</h3>
                
                <div className="flex items-center gap-3 flex-1 sm:max-w-md">
                  <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      placeholder={t.searchPlaceholderProjects}
                      value={projectSearch}
                      onChange={(e) => setProjectSearch(e.target.value)}
                      className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl py-2 pl-9 pr-8 text-slate-200 text-xs outline-none transition-all"
                    />
                    {projectSearch && (
                      <button
                        onClick={() => setProjectSearch("")}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white p-0.5 rounded-md transition-colors"
                        title={t.clearSearch}
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={openAddProjectModal}
                    className="flex items-center gap-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 active:scale-95 text-white py-2.5 px-4 rounded-xl transition-all shadow-md shadow-blue-500/10 shrink-0"
                  >
                    <Plus size={14} />
                    <span>{t.addProject}</span>
                  </button>
                </div>
              </div>

              {portfolio.projects.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-sm font-semibold">{t.noItem}</div>
              ) : (
                <div className="space-y-4">
                  {portfolio.projects.map((project, idx) => {
                    const searchLower = projectSearch.toLowerCase();
                    const matchesSearch = 
                      project.title.toLowerCase().includes(searchLower) ||
                      project.company?.toLowerCase().includes(searchLower) ||
                      project.tech.some(t => t.toLowerCase().includes(searchLower)) ||
                      project.description.vi.toLowerCase().includes(searchLower) ||
                      project.description.en.toLowerCase().includes(searchLower);

                    if (projectSearch && !matchesSearch) return null;

                    const isExpanded = expandedProjectIndex === idx;
                    return (
                      <div 
                        key={idx} 
                        className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                          project.show === false
                            ? "bg-[#1e293b]/5 border-red-500/20 opacity-60"
                            : isExpanded 
                              ? "bg-[#141b2b]/60 border-blue-500/30 shadow-xl shadow-blue-900/5" 
                              : "bg-[#1e293b]/10 border-white/5 hover:border-white/10"
                        }`}
                      >
                        {/* Header Accordion */}
                        <div 
                          onClick={() => setExpandedProjectIndex(isExpanded ? null : idx)}
                          className={`p-5 flex items-center justify-between cursor-pointer select-none gap-4 transition-colors ${
                            isExpanded ? "bg-blue-600/5" : "bg-[#141b2b]/30 hover:bg-[#141b2b]/50"
                          }`}
                        >
                          <div className="flex items-center gap-4 min-w-0">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
                              isExpanded 
                                ? "bg-blue-500/10 border-blue-500/30 text-blue-400" 
                                : "bg-slate-500/5 border-white/5 text-slate-400"
                            }`}>
                              <Folder size={18} />
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-sm font-bold text-white truncate leading-tight">
                                {project.title || "Unnamed Project"}
                              </h4>
                              <p className="text-slate-400 text-xs mt-1.5 flex items-center gap-2">
                                <span className="capitalize text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-white/5 tracking-wider">
                                  {project.category === "work" ? t.projectCategoryWork : t.projectCategoryPersonal}
                                </span>
                                {project.company && (
                                  <>
                                    <span className="text-slate-600">•</span>
                                    <span className="truncate">{project.company}</span>
                                  </>
                                )}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                            {/* Visibility Toggle */}
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...portfolio.projects];
                                updated[idx] = {
                                  ...updated[idx],
                                  show: project.show === false ? true : false
                                };
                                setPortfolio(prev => ({ ...prev, projects: updated }));
                              }}
                              className={`p-2 rounded-xl transition-colors ${
                                project.show === false 
                                  ? "text-red-400 hover:text-red-300 hover:bg-red-500/10" 
                                  : "text-slate-500 hover:text-blue-400 hover:bg-white/5"
                              }`}
                              title={project.show === false ? (lang === "vi" ? "Đang ẩn (Click để hiện)" : "Hidden (Click to show)") : (lang === "vi" ? "Đang hiện (Click để ẩn)" : "Shown (Click to hide)")}
                            >
                              {project.show === false ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>

                            <button
                              onClick={() => {
                                if (confirm("Xóa dự án này?")) {
                                  setPortfolio(prev => ({
                                    ...prev,
                                    projects: prev.projects.filter((_, i) => i !== idx)
                                  }));
                                  if (expandedProjectIndex === idx) setExpandedProjectIndex(null);
                                }
                              }}
                              className="text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors p-2 rounded-xl"
                            >
                              <Trash2 size={16} />
                            </button>
                            <button
                              onClick={() => setExpandedProjectIndex(isExpanded ? null : idx)}
                              className="text-slate-400 hover:text-white transition-colors p-2 rounded-xl"
                            >
                              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>
                          </div>
                        </div>

                        {/* Content Accordion */}
                        <div
                          className={`grid transition-all duration-300 ease-in-out ${
                            isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 pointer-events-none"
                          }`}
                        >
                          <div className="overflow-hidden border-t border-white/5 bg-[#141b2b]/15">
                            <div className="p-6 space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="md:col-span-2">
                                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">{t.projectTitle}</label>
                                  <input
                                    type="text"
                                    value={project.title}
                                    onChange={(e) => {
                                      const updated = [...portfolio.projects];
                                      updated[idx].title = e.target.value;
                                      setPortfolio(prev => ({ ...prev, projects: updated }));
                                    }}
                                    className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl p-3 text-white text-sm outline-none"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">{t.projectCategory}</label>
                                  <PillSelector
                                    options={[
                                      { value: "personal", label: t.projectCategoryPersonal },
                                      { value: "work", label: t.projectCategoryWork },
                                    ]}
                                    selectedValue={project.category}
                                    layoutId={`project-category-${idx}`}
                                    onChange={(val) => {
                                      const updated = [...portfolio.projects];
                                      updated[idx].category = val;
                                      setPortfolio(prev => ({ ...prev, projects: updated }));
                                    }}
                                  />
                                </div>

                                <div>
                                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">{t.projectLink}</label>
                                  <input
                                    type="text"
                                    value={project.link}
                                    onChange={(e) => {
                                      const updated = [...portfolio.projects];
                                      updated[idx].link = e.target.value;
                                      setPortfolio(prev => ({ ...prev, projects: updated }));
                                    }}
                                    className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl p-3 text-white text-sm outline-none"
                                  />
                                </div>

                                <div>
                                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">{t.projectWebsite}</label>
                                  <input
                                    type="text"
                                    value={project.website || ""}
                                    onChange={(e) => {
                                      const updated = [...portfolio.projects];
                                      updated[idx].website = e.target.value;
                                      setPortfolio(prev => ({ ...prev, projects: updated }));
                                    }}
                                    className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl p-3 text-white text-sm outline-none"
                                  />
                                </div>

                                <div>
                                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">{t.projectCompany}</label>
                                  <input
                                    type="text"
                                    disabled={project.category !== "work"}
                                    value={project.company || ""}
                                    onChange={(e) => {
                                      const updated = [...portfolio.projects];
                                      updated[idx].company = e.target.value;
                                      setPortfolio(prev => ({ ...prev, projects: updated }));
                                    }}
                                    className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl p-3 text-white text-sm outline-none disabled:opacity-30 disabled:cursor-not-allowed"
                                  />
                                </div>

                                <div className="md:col-span-3">
                                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">{t.projectTechTags}</label>
                                  <input
                                    type="text"
                                    placeholder={t.projectTechTagsPlaceholder}
                                    value={project.tech.join("; ")}
                                    onChange={(e) => {
                                      const updated = [...portfolio.projects];
                                      updated[idx].tech = e.target.value.split(";").map(t => t.trim()).filter(Boolean);
                                      setPortfolio(prev => ({ ...prev, projects: updated }));
                                    }}
                                    className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl p-3 text-white text-sm outline-none"
                                  />
                                </div>

                                <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">{t.projectDesc} ({t.fieldVietnamese})</label>
                                    <AutoResizeTextarea
                                      rows={3}
                                      value={project.description.vi}
                                      onChange={(e) => {
                                        const updated = [...portfolio.projects];
                                        updated[idx].description.vi = e.target.value;
                                        setPortfolio(prev => ({ ...prev, projects: updated }));
                                      }}
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">{t.projectDesc} ({t.fieldEnglish})</label>
                                    <AutoResizeTextarea
                                      rows={3}
                                      value={project.description.en}
                                      onChange={(e) => {
                                        const updated = [...portfolio.projects];
                                        updated[idx].description.en = e.target.value;
                                        setPortfolio(prev => ({ ...prev, projects: updated }));
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* Sub-Repositories Section */}
                              <div className="border-t border-white/5 pt-6 mt-6">
                                <div className="flex items-center justify-between gap-4 mb-4">
                                  <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                                    {t.subReposTitle}
                                  </h4>
                                  <button
                                    type="button"
                                    onClick={() => openAddSubRepoModal(idx)}
                                    className="flex items-center gap-1.5 text-[11px] font-bold bg-blue-600/10 hover:bg-blue-600/20 active:scale-95 text-blue-400 py-2 px-4 rounded-xl border border-blue-500/20 transition-all shadow-md"
                                  >
                                    <Plus size={12} />
                                    <span>{t.addSubRepo}</span>
                                  </button>
                                </div>

                                {!project.repositories || project.repositories.length === 0 ? (
                                  <div className="text-slate-500 text-xs italic py-4 text-center bg-white/5 rounded-xl border border-dashed border-white/5">
                                    {lang === "vi" ? "Chưa có repo con nào được cấu hình." : "No sub-repositories configured yet."}
                                  </div>
                                ) : (
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {project.repositories.map((subRepo, subIdx) => (
                                      <div
                                        key={subIdx}
                                        className="bg-[#1e293b]/20 border border-white/5 p-4 rounded-xl relative hover:border-blue-500/20 transition-all flex flex-col justify-between group"
                                      >
                                        <div>
                                          <div className="flex items-start justify-between gap-4 mb-2">
                                            <div className="flex items-center gap-2">
                                              <GitBranch size={14} className="text-blue-400 shrink-0" />
                                              <span className="text-sm font-bold text-slate-200">
                                                {subRepo.title}
                                              </span>
                                            </div>
                                            <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                              <button
                                                type="button"
                                                onClick={() => openEditSubRepoModal(idx, subIdx)}
                                                className="text-slate-400 hover:text-blue-400 p-1.5 rounded-lg hover:bg-white/5 transition-colors"
                                                title={lang === "vi" ? "Sửa" : "Edit"}
                                              >
                                                <Edit size={12} />
                                              </button>
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  if (confirm(t.confirmDeleteSubRepo)) {
                                                    deleteSubRepo(idx, subIdx);
                                                  }
                                                }}
                                                className="text-slate-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-500/5 transition-colors"
                                                title={t.confirmDeleteSubRepo}
                                              >
                                                <Trash2 size={12} />
                                              </button>
                                            </div>
                                          </div>

                                          <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                                            {lang === "vi" ? subRepo.description.vi : subRepo.description.en}
                                          </p>
                                        </div>

                                        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/5 pt-3 mt-1">
                                          <div className="flex flex-wrap gap-1">
                                            {subRepo.tech.slice(0, 3).map((techItem) => (
                                              <span
                                                key={techItem}
                                                className="px-1.5 py-0.5 bg-white/5 rounded text-[9px] text-slate-400 font-mono"
                                              >
                                                {techItem}
                                              </span>
                                            ))}
                                            {subRepo.tech.length > 3 && (
                                              <span className="px-1.5 py-0.5 bg-white/5 rounded text-[9px] text-slate-500 font-mono">
                                                +{subRepo.tech.length - 3}
                                              </span>
                                            )}
                                          </div>

                                          <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                                            {subRepo.link && (
                                              <a
                                                href={subRepo.link}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="hover:text-white transition-colors"
                                              >
                                                GitHub
                                              </a>
                                            )}
                                            {subRepo.website && (
                                              <>
                                                <span className="text-slate-600">|</span>
                                                <a
                                                  href={subRepo.website}
                                                  target="_blank"
                                                  rel="noreferrer"
                                                  className="hover:text-white transition-colors"
                                                >
                                                  Demo
                                                </a>
                                              </>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: TIMELINE */}
          {activeTab === "timeline" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
                <h3 className="text-sm font-bold text-blue-400 uppercase tracking-widest">{t.timelineTitle}</h3>
                
                <div className="flex items-center gap-3 flex-1 sm:max-w-md">
                  <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      placeholder={t.searchPlaceholderTimeline}
                      value={timelineSearch}
                      onChange={(e) => setTimelineSearch(e.target.value)}
                      className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl py-2 pl-9 pr-8 text-slate-200 text-xs outline-none transition-all"
                    />
                    {timelineSearch && (
                      <button
                        onClick={() => setTimelineSearch("")}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white p-0.5 rounded-md transition-colors"
                        title={t.clearSearch}
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={openAddTimelineModal}
                    className="flex items-center gap-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 active:scale-95 text-white py-2.5 px-4 rounded-xl transition-all shadow-md shadow-blue-500/10 shrink-0"
                  >
                    <Plus size={14} />
                    <span>{t.addTimeline}</span>
                  </button>
                </div>
              </div>

              {portfolio.timeline.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-sm font-semibold">{t.noItem}</div>
              ) : (
                <div className="space-y-4">
                  {portfolio.timeline.map((item, idx) => {
                    const searchLower = timelineSearch.toLowerCase();
                    const matchesSearch = 
                      item.title.vi.toLowerCase().includes(searchLower) ||
                      item.title.en.toLowerCase().includes(searchLower) ||
                      item.organization.vi.toLowerCase().includes(searchLower) ||
                      item.organization.en.toLowerCase().includes(searchLower) ||
                      item.description.vi.some(d => d.toLowerCase().includes(searchLower)) ||
                      item.description.en.some(d => d.toLowerCase().includes(searchLower));

                    if (timelineSearch && !matchesSearch) return null;

                    const isExpanded = expandedTimelineIndex === idx;
                    const TimelineIcon = item.type === "education" ? GraduationCap : Briefcase;
                    const displayTitle = lang === "vi" ? item.title.vi : item.title.en;
                    const displayOrg = lang === "vi" ? item.organization.vi : item.organization.en;
                    const displayDate = lang === "vi" ? item.date.vi : item.date.en;

                    return (
                      <div 
                        key={item.id} 
                        className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                          item.show === false
                            ? "bg-[#1e293b]/5 border-red-500/20 opacity-60"
                            : isExpanded 
                              ? "bg-[#141b2b]/60 border-purple-500/30 shadow-xl shadow-purple-900/5" 
                              : "bg-[#1e293b]/10 border-white/5 hover:border-white/10"
                        }`}
                      >
                        {/* Header Accordion */}
                        <div 
                          onClick={() => setExpandedTimelineIndex(isExpanded ? null : idx)}
                          className={`p-5 flex items-center justify-between cursor-pointer select-none gap-4 transition-colors ${
                            isExpanded ? "bg-purple-600/5" : "bg-[#141b2b]/30 hover:bg-[#141b2b]/50"
                          }`}
                        >
                          <div className="flex items-center gap-4 min-w-0">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
                              isExpanded 
                                ? "bg-purple-500/10 border-purple-500/30 text-purple-400" 
                                : "bg-slate-500/5 border-white/5 text-slate-400"
                            }`}>
                              <TimelineIcon size={18} />
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-sm font-bold text-white truncate leading-tight">
                                {displayTitle || "Untitled Item"}
                              </h4>
                              <p className="text-slate-400 text-xs mt-1.5 flex flex-wrap items-center gap-2">
                                <span className="capitalize text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-white/5 tracking-wider shrink-0">
                                  {item.type === "work" ? t.timelineTypeWork : t.timelineTypeEducation}
                                </span>
                                {displayOrg && (
                                  <>
                                    <span className="text-slate-600 shrink-0">•</span>
                                    <span className="truncate">{displayOrg}</span>
                                  </>
                                )}
                                {displayDate && (
                                  <>
                                    <span className="text-slate-600 shrink-0">•</span>
                                    <span className="text-slate-500 text-[11px] truncate">{displayDate}</span>
                                  </>
                                )}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                            {/* Visibility Toggle */}
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...portfolio.timeline];
                                updated[idx] = {
                                  ...updated[idx],
                                  show: item.show === false ? true : false
                                };
                                setPortfolio(prev => ({ ...prev, timeline: updated }));
                              }}
                              className={`p-2 rounded-xl transition-colors ${
                                item.show === false 
                                  ? "text-red-400 hover:text-red-300 hover:bg-red-500/10" 
                                  : "text-slate-500 hover:text-blue-400 hover:bg-white/5"
                              }`}
                              title={item.show === false ? (lang === "vi" ? "Đang ẩn (Click để hiện)" : "Hidden (Click to show)") : (lang === "vi" ? "Đang hiện (Click để ẩn)" : "Shown (Click to hide)")}
                            >
                              {item.show === false ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>

                            <button
                              onClick={() => {
                                if (confirm("Xóa dòng thời gian này?")) {
                                  setPortfolio(prev => ({
                                    ...prev,
                                    timeline: prev.timeline.filter((_, i) => i !== idx)
                                  }));
                                  if (expandedTimelineIndex === idx) setExpandedTimelineIndex(null);
                                }
                              }}
                              className="text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors p-2 rounded-xl"
                            >
                              <Trash2 size={16} />
                            </button>
                            <button
                              onClick={() => setExpandedTimelineIndex(isExpanded ? null : idx)}
                              className="text-slate-400 hover:text-white transition-colors p-2 rounded-xl"
                            >
                              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>
                          </div>
                        </div>

                        {/* Content Accordion */}
                        <div
                          className={`grid transition-all duration-300 ease-in-out ${
                            isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 pointer-events-none"
                          }`}
                        >
                          <div className="overflow-hidden border-t border-white/5 bg-[#141b2b]/15">
                            <div className="p-6 space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">{t.timelineType}</label>
                                  <PillSelector
                                    options={[
                                      { value: "work", label: t.timelineTypeWork },
                                      { value: "education", label: t.timelineTypeEducation },
                                    ]}
                                    selectedValue={item.type}
                                    layoutId={`timeline-type-${idx}`}
                                    onChange={(val) => {
                                      const updated = [...portfolio.timeline];
                                      updated[idx].type = val;
                                      setPortfolio(prev => ({ ...prev, timeline: updated }));
                                    }}
                                  />
                                </div>

                                <div>
                                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">{t.timelineStatus}</label>
                                  <CustomDropdown
                                    options={[
                                      { value: "active", label: t.timelineStatusActiveLabel },
                                      { value: "completed", label: t.timelineStatusCompletedLabel },
                                    ]}
                                    selectedValue={item.status === "active" ? "active" : "completed"}
                                    onChange={(val) => {
                                      const updated = [...portfolio.timeline];
                                      updated[idx].status = val;
                                      setPortfolio(prev => ({ ...prev, timeline: updated }));
                                    }}
                                  />
                                </div>

                                <div className="flex flex-col justify-end">
                                  <div className={`p-3 rounded-xl border text-[11px] leading-relaxed transition-all duration-300 ${
                                    item.status === "active" 
                                      ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400 shadow-md shadow-emerald-500/5" 
                                      : "bg-slate-500/5 border-white/5 text-slate-400"
                                  }`}>
                                    {item.status === "active" ? t.timelineStatusActiveDesc : t.timelineStatusCompletedDesc}
                                  </div>
                                </div>

                                {/* VI fields */}
                                <div>
                                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">{t.projectTitle} ({t.fieldVietnamese})</label>
                                  <input
                                    type="text"
                                    value={item.title.vi}
                                    onChange={(e) => {
                                      const updated = [...portfolio.timeline];
                                      updated[idx].title.vi = e.target.value;
                                      setPortfolio(prev => ({ ...prev, timeline: updated }));
                                    }}
                                    className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl p-3 text-white text-sm outline-none"
                                  />
                                </div>

                                <div>
                                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">{t.timelineOrg} ({t.fieldVietnamese})</label>
                                  <input
                                    type="text"
                                    value={item.organization.vi}
                                    onChange={(e) => {
                                      const updated = [...portfolio.timeline];
                                      updated[idx].organization.vi = e.target.value;
                                      setPortfolio(prev => ({ ...prev, timeline: updated }));
                                    }}
                                    className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl p-3 text-white text-sm outline-none"
                                  />
                                </div>

                                <div>
                                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">{t.timelineDate} ({t.fieldVietnamese})</label>
                                  <input
                                    type="text"
                                    value={item.date.vi}
                                    onChange={(e) => {
                                      const updated = [...portfolio.timeline];
                                      updated[idx].date.vi = e.target.value;
                                      setPortfolio(prev => ({ ...prev, timeline: updated }));
                                    }}
                                    className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl p-3 text-white text-sm outline-none"
                                  />
                                </div>

                                {/* EN fields */}
                                <div>
                                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">{t.projectTitle} ({t.fieldEnglish})</label>
                                  <input
                                    type="text"
                                    value={item.title.en}
                                    onChange={(e) => {
                                      const updated = [...portfolio.timeline];
                                      updated[idx].title.en = e.target.value;
                                      setPortfolio(prev => ({ ...prev, timeline: updated }));
                                    }}
                                    className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl p-3 text-white text-sm outline-none"
                                  />
                                </div>

                                <div>
                                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">{t.timelineOrg} ({t.fieldEnglish})</label>
                                  <input
                                    type="text"
                                    value={item.organization.en}
                                    onChange={(e) => {
                                      const updated = [...portfolio.timeline];
                                      updated[idx].organization.en = e.target.value;
                                      setPortfolio(prev => ({ ...prev, timeline: updated }));
                                    }}
                                    className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl p-3 text-white text-sm outline-none"
                                  />
                                </div>

                                <div>
                                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">{t.timelineDate} ({t.fieldEnglish})</label>
                                  <input
                                    type="text"
                                    value={item.date.en}
                                    onChange={(e) => {
                                      const updated = [...portfolio.timeline];
                                      updated[idx].date.en = e.target.value;
                                      setPortfolio(prev => ({ ...prev, timeline: updated }));
                                    }}
                                    className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl p-3 text-white text-sm outline-none"
                                  />
                                </div>

                                <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                                      {t.timelineDetailDesc} ({t.fieldVietnamese}) <span className="text-[10px] text-slate-500 lowercase normal-case">{t.timelineDetailDescPlaceholder}</span>
                                    </label>
                                    <AutoResizeTextarea
                                      rows={4}
                                      value={item.description.vi.join("\n")}
                                      onChange={(e) => {
                                        const updated = [...portfolio.timeline];
                                        updated[idx].description.vi = e.target.value.split("\n").filter(Boolean);
                                        setPortfolio(prev => ({ ...prev, timeline: updated }));
                                      }}
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                                      {t.timelineDetailDesc} ({t.fieldEnglish}) <span className="text-[10px] text-slate-500 lowercase normal-case">{t.timelineDetailDescPlaceholder}</span>
                                    </label>
                                    <AutoResizeTextarea
                                      rows={4}
                                      value={item.description.en.join("\n")}
                                      onChange={(e) => {
                                        const updated = [...portfolio.timeline];
                                        updated[idx].description.en = e.target.value.split("\n").filter(Boolean);
                                        setPortfolio(prev => ({ ...prev, timeline: updated }));
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* MODAL THÊM MẠNG XÃ HỘI */}
      <AnimatePresence>
        {isAddSocialModalOpen && (
          <div 
            onClick={() => setIsAddSocialModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#141b2b] border border-white/10 rounded-3xl p-6 md:p-8 w-full max-w-lg shadow-2xl relative"
            >
              {/* Close button */}
              <button
                type="button"
                onClick={() => setIsAddSocialModalOpen(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-white p-2 rounded-xl transition-colors"
              >
                <X size={20} />
              </button>

              <h3 className="text-lg font-black text-white uppercase tracking-wider mb-6">
                {t.addSocialLink}
              </h3>

              <form onSubmit={handleAddSocialSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                    {t.socialType}
                  </label>
                  <CustomDropdown
                    options={PREDEFINED_SOCIALS.map(item => ({
                      value: item.name,
                      label: item.name,
                    }))}
                    selectedValue={newSocial.name}
                    onChange={(val) => {
                      const matched = PREDEFINED_SOCIALS.find(p => p.name === val);
                      if (matched) {
                        setNewSocial(prev => ({
                          ...prev,
                          name: matched.name,
                          icon: matched.icon,
                          color: matched.color,
                        }));
                      }
                    }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                    {t.socialLink}
                  </label>
                  <input
                    type="text"
                    required
                    value={newSocial.link}
                    onChange={(e) => setNewSocial(prev => ({ ...prev, link: e.target.value }))}
                    placeholder={SOCIAL_METADATA[newSocial.name]?.placeholderLink || "https://"}
                    className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl p-3 text-white text-sm outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      {t.socialDescVi}
                    </label>
                    <input
                      type="text"
                      value={newSocial.desc.vi}
                      onChange={(e) => setNewSocial(prev => ({
                        ...prev,
                        desc: { ...prev.desc, vi: e.target.value }
                      }))}
                      placeholder={SOCIAL_METADATA[newSocial.name]?.placeholderDescVi || ""}
                      className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl p-3 text-white text-sm outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      {t.socialDescEn}
                    </label>
                    <input
                      type="text"
                      value={newSocial.desc.en}
                      onChange={(e) => setNewSocial(prev => ({
                        ...prev,
                        desc: { ...prev.desc, en: e.target.value }
                      }))}
                      placeholder={SOCIAL_METADATA[newSocial.name]?.placeholderDescEn || ""}
                      className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl p-3 text-white text-sm outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setIsAddSocialModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-white/5 bg-white/5 text-slate-400 hover:text-white text-sm font-semibold transition-colors"
                  >
                    {lang === "vi" ? "Hủy" : "Cancel"}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-colors shadow-lg shadow-blue-500/20"
                  >
                    {lang === "vi" ? "Thêm" : "Add"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL THÊM NHÓM KỸ NĂNG */}
      <AnimatePresence>
        {isAddSkillModalOpen && (
          <div 
            onClick={() => setIsAddSkillModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#141b2b] border border-white/10 rounded-3xl p-6 md:p-8 w-full max-w-lg shadow-2xl relative"
            >
              <button
                type="button"
                onClick={() => setIsAddSkillModalOpen(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-white p-2 rounded-xl transition-colors"
              >
                <X size={20} />
              </button>

              <h3 className="text-lg font-black text-white uppercase tracking-wider mb-6">
                {t.addSkillGroup}
              </h3>

              <form onSubmit={handleAddSkillSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      {t.skillCategoryName} ({t.fieldVietnamese})
                    </label>
                    <input
                      type="text"
                      required
                      value={newSkill.category.vi}
                      onChange={(e) => setNewSkill(prev => ({
                        ...prev,
                        category: { ...prev.category, vi: e.target.value }
                      }))}
                      placeholder="Ví dụ: Backend"
                      className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl p-3 text-white text-sm outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      {t.skillCategoryName} ({t.fieldEnglish})
                    </label>
                    <input
                      type="text"
                      required
                      value={newSkill.category.en}
                      onChange={(e) => setNewSkill(prev => ({
                        ...prev,
                        category: { ...prev.category, en: e.target.value }
                      }))}
                      placeholder="Ví dụ: Backend"
                      className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl p-3 text-white text-sm outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                    {t.skillItems}
                  </label>
                  <AutoResizeTextarea
                    rows={3}
                    required
                    value={newSkill.items}
                    onChange={(e) => setNewSkill(prev => ({ ...prev, items: e.target.value }))}
                    placeholder={t.skillItemsPlaceholder}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setIsAddSkillModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-white/5 bg-white/5 text-slate-400 hover:text-white text-sm font-semibold transition-colors"
                  >
                    {lang === "vi" ? "Hủy" : "Cancel"}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-colors shadow-lg shadow-blue-500/20"
                  >
                    {lang === "vi" ? "Thêm" : "Add"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL THÊM DỰ ÁN */}
      <AnimatePresence>
        {isAddProjectModalOpen && (
          <div 
            onClick={() => setIsAddProjectModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#141b2b] border border-white/10 rounded-3xl p-6 md:p-8 w-full max-w-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              <button
                type="button"
                onClick={() => setIsAddProjectModalOpen(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-white p-2 rounded-xl transition-colors"
              >
                <X size={20} />
              </button>

              <h3 className="text-lg font-black text-white uppercase tracking-wider mb-6">
                {t.addProject}
              </h3>

              <form onSubmit={handleAddProjectSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      {t.projectTitle}
                    </label>
                    <input
                      type="text"
                      required
                      value={newProjectState.title}
                      onChange={(e) => setNewProjectState(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Ví dụ: My Portfolio"
                      className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl p-3 text-white text-sm outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      {t.projectCategory}
                    </label>
                    <PillSelector
                      options={[
                        { value: "personal", label: t.projectCategoryPersonal },
                        { value: "work", label: t.projectCategoryWork },
                      ]}
                      selectedValue={newProjectState.category}
                      layoutId="new-project-category"
                      onChange={(val) => setNewProjectState(prev => ({ ...prev, category: val }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      {t.projectLink}
                    </label>
                    <input
                      type="text"
                      value={newProjectState.link}
                      onChange={(e) => setNewProjectState(prev => ({ ...prev, link: e.target.value }))}
                      placeholder="https://github.com/..."
                      className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl p-3 text-white text-sm outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      {t.projectWebsite}
                    </label>
                    <input
                      type="text"
                      value={newProjectState.website}
                      onChange={(e) => setNewProjectState(prev => ({ ...prev, website: e.target.value }))}
                      placeholder="https://..."
                      className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl p-3 text-white text-sm outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      {t.projectCompany}
                    </label>
                    <input
                      type="text"
                      disabled={newProjectState.category !== "work"}
                      value={newProjectState.company}
                      onChange={(e) => setNewProjectState(prev => ({ ...prev, company: e.target.value }))}
                      placeholder="Tên công ty"
                      className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl p-3 text-white text-sm outline-none transition-all disabled:opacity-30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                    {t.projectTechTags}
                  </label>
                  <input
                    type="text"
                    required
                    value={newProjectState.tech}
                    onChange={(e) => setNewProjectState(prev => ({ ...prev, tech: e.target.value }))}
                    placeholder={t.projectTechTagsPlaceholder}
                    className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl p-3 text-white text-sm outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      {t.projectDesc} ({t.fieldVietnamese})
                    </label>
                    <AutoResizeTextarea
                      rows={3}
                      required
                      value={newProjectState.description.vi}
                      onChange={(e) => setNewProjectState(prev => ({
                        ...prev,
                        description: { ...prev.description, vi: e.target.value }
                      }))}
                      placeholder="Nhập mô tả tiếng Việt..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      {t.projectDesc} ({t.fieldEnglish})
                    </label>
                    <AutoResizeTextarea
                      rows={3}
                      required
                      value={newProjectState.description.en}
                      onChange={(e) => setNewProjectState(prev => ({
                        ...prev,
                        description: { ...prev.description, en: e.target.value }
                      }))}
                      placeholder="Enter English description..."
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setIsAddProjectModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-white/5 bg-white/5 text-slate-400 hover:text-white text-sm font-semibold transition-colors"
                  >
                    {lang === "vi" ? "Hủy" : "Cancel"}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-colors shadow-lg shadow-blue-500/20"
                  >
                    {lang === "vi" ? "Thêm" : "Add"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL THÊM DÒNG THỜI GIAN */}
      <AnimatePresence>
        {isAddTimelineModalOpen && (
          <div 
            onClick={() => setIsAddTimelineModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#141b2b] border border-white/10 rounded-3xl p-6 md:p-8 w-full max-w-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              <button
                type="button"
                onClick={() => setIsAddTimelineModalOpen(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-white p-2 rounded-xl transition-colors"
              >
                <X size={20} />
              </button>

              <h3 className="text-lg font-black text-white uppercase tracking-wider mb-6">
                {t.addTimeline}
              </h3>

              <form onSubmit={handleAddTimelineSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      {t.timelineType}
                    </label>
                    <PillSelector
                      options={[
                        { value: "work", label: t.timelineTypeWork },
                        { value: "education", label: t.timelineTypeEducation },
                      ]}
                      selectedValue={newTimelineState.type}
                      layoutId="new-timeline-type"
                      onChange={(val) => setNewTimelineState(prev => ({ ...prev, type: val }))}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      {t.timelineStatus}
                    </label>
                    <CustomDropdown
                      options={[
                        { value: "active", label: t.timelineStatusActiveLabel },
                        { value: "completed", label: t.timelineStatusCompletedLabel },
                      ]}
                      selectedValue={newTimelineState.status}
                      onChange={(val) => setNewTimelineState(prev => ({ ...prev, status: val }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      {t.projectTitle} ({t.fieldVietnamese})
                    </label>
                    <input
                      type="text"
                      required
                      value={newTimelineState.title.vi}
                      onChange={(e) => setNewTimelineState(prev => ({
                        ...prev,
                        title: { ...prev.title, vi: e.target.value }
                      }))}
                      placeholder="Ví dụ: Lập trình viên Full-Stack"
                      className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl p-3 text-white text-sm outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      {t.projectTitle} ({t.fieldEnglish})
                    </label>
                    <input
                      type="text"
                      required
                      value={newTimelineState.title.en}
                      onChange={(e) => setNewTimelineState(prev => ({
                        ...prev,
                        title: { ...prev.title, en: e.target.value }
                      }))}
                      placeholder="Ví dụ: Full-Stack Developer"
                      className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl p-3 text-white text-sm outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      {t.timelineOrg} ({t.fieldVietnamese})
                    </label>
                    <input
                      type="text"
                      required
                      value={newTimelineState.organization.vi}
                      onChange={(e) => setNewTimelineState(prev => ({
                        ...prev,
                        organization: { ...prev.organization, vi: e.target.value }
                      }))}
                      placeholder="Tên công ty hoặc trường học"
                      className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl p-3 text-white text-sm outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      {t.timelineOrg} ({t.fieldEnglish})
                    </label>
                    <input
                      type="text"
                      required
                      value={newTimelineState.organization.en}
                      onChange={(e) => setNewTimelineState(prev => ({
                        ...prev,
                        organization: { ...prev.organization, en: e.target.value }
                      }))}
                      placeholder="Company or School Name"
                      className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl p-3 text-white text-sm outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      {t.timelineDate} ({t.fieldVietnamese})
                    </label>
                    <input
                      type="text"
                      required
                      value={newTimelineState.date.vi}
                      onChange={(e) => setNewTimelineState(prev => ({
                        ...prev,
                        date: { ...prev.date, vi: e.target.value }
                      }))}
                      placeholder="Ví dụ: 12/2024 - Hiện tại"
                      className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl p-3 text-white text-sm outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      {t.timelineDate} ({t.fieldEnglish})
                    </label>
                    <input
                      type="text"
                      required
                      value={newTimelineState.date.en}
                      onChange={(e) => setNewTimelineState(prev => ({
                        ...prev,
                        date: { ...prev.date, en: e.target.value }
                      }))}
                      placeholder="Ví dụ: 12/2024 - Present"
                      className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl p-3 text-white text-sm outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      {t.timelineDetailDesc} ({t.fieldVietnamese}) <span className="text-[10px] text-slate-500 lowercase normal-case">{t.timelineDetailDescPlaceholder}</span>
                    </label>
                    <AutoResizeTextarea
                      rows={4}
                      required
                      value={newTimelineState.description.vi}
                      onChange={(e) => setNewTimelineState(prev => ({
                        ...prev,
                        description: { ...prev.description, vi: e.target.value }
                      }))}
                      placeholder="Mô tả công việc (Xuống dòng cho mỗi gạch đầu dòng)..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      {t.timelineDetailDesc} ({t.fieldEnglish}) <span className="text-[10px] text-slate-500 lowercase normal-case">{t.timelineDetailDescPlaceholder}</span>
                    </label>
                    <AutoResizeTextarea
                      rows={4}
                      required
                      value={newTimelineState.description.en}
                      onChange={(e) => setNewTimelineState(prev => ({
                        ...prev,
                        description: { ...prev.description, en: e.target.value }
                      }))}
                      placeholder="Enter description (New line for each bullet)..."
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setIsAddTimelineModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-white/5 bg-white/5 text-slate-400 hover:text-white text-sm font-semibold transition-colors"
                  >
                    {lang === "vi" ? "Hủy" : "Cancel"}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-colors shadow-lg shadow-blue-500/20"
                  >
                    {lang === "vi" ? "Thêm" : "Add"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL THÊM/SỬA REPO CON (SUB-REPO) */}
      <AnimatePresence>
        {isSubRepoModalOpen && (
          <div 
            onClick={() => setIsSubRepoModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#141b2b] border border-white/10 rounded-3xl p-6 md:p-8 w-full max-w-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              <button
                type="button"
                onClick={() => setIsSubRepoModalOpen(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-white p-2 rounded-xl transition-colors"
              >
                <X size={20} />
              </button>

              <h3 className="text-lg font-black text-white uppercase tracking-wider mb-6">
                {subRepoModalMode === "add" ? t.addSubRepo : (lang === "vi" ? "Chỉnh sửa Repo con" : "Edit Sub-Repository")}
              </h3>

              <form onSubmit={handleSubRepoSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      {t.subRepoTitle}
                    </label>
                    <input
                      type="text"
                      required
                      value={newSubRepoState.title}
                      onChange={(e) => setNewSubRepoState(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Ví dụ: Backend Core / Admin Panel"
                      className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl p-3 text-white text-sm outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      {t.subRepoTech}
                    </label>
                    <input
                      type="text"
                      required
                      value={newSubRepoState.tech}
                      onChange={(e) => setNewSubRepoState(prev => ({ ...prev, tech: e.target.value }))}
                      placeholder={t.projectTechTagsPlaceholder}
                      className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl p-3 text-white text-sm outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      {t.subRepoLink}
                    </label>
                    <input
                      type="text"
                      required
                      value={newSubRepoState.link}
                      onChange={(e) => setNewSubRepoState(prev => ({ ...prev, link: e.target.value }))}
                      placeholder="https://github.com/..."
                      className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl p-3 text-white text-sm outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      {t.subRepoWebsite}
                    </label>
                    <input
                      type="text"
                      value={newSubRepoState.website}
                      onChange={(e) => setNewSubRepoState(prev => ({ ...prev, website: e.target.value }))}
                      placeholder="https://..."
                      className="w-full bg-[#1e293b]/50 border border-white/5 focus:border-blue-500 rounded-xl p-3 text-white text-sm outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      {t.subRepoDescVi}
                    </label>
                    <AutoResizeTextarea
                      rows={3}
                      required
                      value={newSubRepoState.description.vi}
                      onChange={(e) => setNewSubRepoState(prev => ({
                        ...prev,
                        description: { ...prev.description, vi: e.target.value }
                      }))}
                      placeholder="Nhập mô tả tiếng Việt..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                      {t.subRepoDescEn}
                    </label>
                    <AutoResizeTextarea
                      rows={3}
                      required
                      value={newSubRepoState.description.en}
                      onChange={(e) => setNewSubRepoState(prev => ({
                        ...prev,
                        description: { ...prev.description, en: e.target.value }
                      }))}
                      placeholder="Enter English description..."
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setIsSubRepoModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-white/5 bg-white/5 text-slate-400 hover:text-white text-sm font-semibold transition-colors"
                  >
                    {lang === "vi" ? "Hủy" : "Cancel"}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-colors shadow-lg shadow-blue-500/20"
                  >
                    {subRepoModalMode === "add" ? (lang === "vi" ? "Thêm" : "Add") : (lang === "vi" ? "Lưu" : "Save")}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
