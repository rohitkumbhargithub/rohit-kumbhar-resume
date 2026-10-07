import React, { useState } from "react";
import {
  X,
  Save,
  Plus,
  Trash2,
  Lock,
  Download,
  Upload,
  RotateCcw,
  User,
  BookOpen,
  Briefcase,
  Layers,
  FolderGit2,
  Mail,
  ShieldCheck,
  Check,
  AlertCircle,
  Palette,
  PlusSquare,
  Eye,
  EyeOff,
  Sparkles,
  LayoutGrid,
  Database,
  Cloud,
} from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import {
  SkillCategory,
  ExperienceItem,
  EducationItem,
  CourseItem,
  ServiceItem,
  ProjectItem,
  CustomSection,
  CustomSectionItem,
  ThemePresetKey,
} from "@/types/portfolio";
import { THEME_PRESETS } from "@/lib/themePresets";

export default function AdminControlModal() {
  const {
    portfolio,
    updateHero,
    updateAbout,
    updateServices,
    updateProjects,
    updateFooter,
    updateCustomSections,
    addCustomSection,
    deleteCustomSection,
    updateSectionVisibility,
    setThemePreset,
    resetPortfolio,
    exportPortfolioJSON,
    importPortfolioJSON,
    isModalOpen,
    setIsModalOpen,
    activeSectionTab,
    changePasscode,
    lockAdmin,
    syncStatus,
    saveToMongoDB,
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState(activeSectionTab || "hero");
  const [aboutSubTab, setAboutSubTab] = useState<"general" | "skills" | "experience" | "education" | "courses">("general");

  // Passcode change states
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [passMsg, setPassMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // JSON import states
  const [importJsonText, setImportJsonText] = useState("");
  const [importMsg, setImportMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Success indicator
  const [showSavedNotification, setShowSavedNotification] = useState(false);

  // Sync activeSectionTab from context when modal opens
  React.useEffect(() => {
    if (activeSectionTab) {
      setActiveTab(activeSectionTab);
    }
  }, [activeSectionTab, isModalOpen]);

  if (!isModalOpen) return null;

  const triggerSaveNotice = () => {
    setShowSavedNotification(true);
    setTimeout(() => setShowSavedNotification(false), 2000);
  };

  const handleDownloadBackup = () => {
    const jsonStr = exportPortfolioJSON();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    triggerSaveNotice();
  };

  const handleImportJSON = () => {
    if (!importJsonText.trim()) return;
    const res = importPortfolioJSON(importJsonText);
    if (res.success) {
      setImportMsg({ type: "success", text: res.message });
      setImportJsonText("");
      triggerSaveNotice();
    } else {
      setImportMsg({ type: "error", text: res.message });
    }
  };

  const handleChangePasscode = (e: React.FormEvent) => {
    e.preventDefault();
    const success = changePasscode(oldPass, newPass);
    if (success) {
      setPassMsg({ type: "success", text: "Passcode updated successfully!" });
      setOldPass("");
      setNewPass("");
    } else {
      setPassMsg({ type: "error", text: "Incorrect current passcode or new passcode is too short (min 4 characters)." });
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm("Are you sure you want to reset all portfolio data to defaults? Any unsaved custom edits will be lost.")) {
      resetPortfolio();
      triggerSaveNotice();
    }
  };

  const handleCreateNewSection = () => {
    const newId = `section-${Date.now()}`;
    const newSection: CustomSection = {
      id: newId,
      slug: `custom-${Date.now()}`,
      title: "New Custom",
      highlightWord: "Section",
      description: "Description of your new custom section.",
      layout: "grid",
      visible: true,
      items: [
        {
          id: `item-${Date.now()}`,
          title: "Sample Card 1",
          subtitle: "Subtitle / Organization",
          description: "Details regarding your achievement, certificate, or content.",
          date: "2025",
          link: "https://example.com",
          linkText: "Learn More",
          tags: ["Achievement", "Featured"],
        },
      ],
    };
    addCustomSection(newSection);
    triggerSaveNotice();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="relative flex flex-col w-full max-w-5xl h-[90vh] bg-card/95 border border-primary/20 rounded-2xl shadow-2xl overflow-hidden glass-card">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card/80">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-teal text-teal-foreground shadow-md">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                Portfolio Customizer <span className="text-xs bg-primary/20 text-primary px-2.5 py-0.5 rounded-full font-semibold">Admin Mode</span>
              </h2>
              <p className="text-xs text-muted-foreground">Changes save automatically to your browser in real-time</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {syncStatus === "synced" && (
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-emerald-400 font-medium px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                MongoDB Atlas Synced
              </span>
            )}
            {syncStatus === "saving" && (
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-amber-400 font-medium px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                Syncing to MongoDB...
              </span>
            )}
            {showSavedNotification && (
              <span className="flex items-center gap-1.5 text-xs text-emerald-500 font-medium px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20 animate-pulse">
                <Check size={14} /> Saved!
              </span>
            )}
            <button
              onClick={() => setIsModalOpen(false)}
              className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Body: Navigation Tabs + Content Area */}
        <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
          {/* Sidebar Tabs */}
          <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-border bg-card/40 p-3 space-y-1 overflow-x-auto md:overflow-y-auto flex md:flex-col gap-1">
            <button
              onClick={() => setActiveTab("hero")}
              className={`flex items-center gap-2.5 w-full px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === "hero"
                  ? "bg-gradient-teal text-teal-foreground shadow-md"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <User size={16} /> Hero Section
            </button>

            <button
              onClick={() => setActiveTab("about")}
              className={`flex items-center gap-2.5 w-full px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === "about"
                  ? "bg-gradient-teal text-teal-foreground shadow-md"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <BookOpen size={16} /> About & Experience
            </button>

            <button
              onClick={() => setActiveTab("services")}
              className={`flex items-center gap-2.5 w-full px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === "services"
                  ? "bg-gradient-teal text-teal-foreground shadow-md"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Layers size={16} /> Services
            </button>

            <button
              onClick={() => setActiveTab("projects")}
              className={`flex items-center gap-2.5 w-full px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === "projects"
                  ? "bg-gradient-teal text-teal-foreground shadow-md"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <FolderGit2 size={16} /> Projects
            </button>

            <button
              onClick={() => setActiveTab("footer")}
              className={`flex items-center gap-2.5 w-full px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === "footer"
                  ? "bg-gradient-teal text-teal-foreground shadow-md"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Mail size={16} /> Footer & Contact
            </button>

            <div className="pt-2 border-t border-border/60 my-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70 px-4 mb-1 block">
                Features & Customization
              </span>
              <button
                onClick={() => setActiveTab("sections")}
                className={`flex items-center gap-2.5 w-full px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === "sections"
                    ? "bg-gradient-teal text-teal-foreground shadow-md"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <PlusSquare size={16} /> Add & Manage Sections
              </button>

              <button
                onClick={() => setActiveTab("theme")}
                className={`flex items-center gap-2.5 w-full px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === "theme"
                    ? "bg-gradient-teal text-teal-foreground shadow-md"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Palette size={16} /> Theme & Colors
              </button>
            </div>

            <div className="pt-2 md:mt-auto border-t border-border/60">
              <button
                onClick={() => setActiveTab("settings")}
                className={`flex items-center gap-2.5 w-full px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === "settings"
                    ? "bg-gradient-teal text-teal-foreground shadow-md"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Lock size={16} /> Passcode & Backup
              </button>
            </div>
          </div>

          {/* Tab Content Panel */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* ================= HERO TAB ================= */}
            {activeTab === "hero" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-foreground">Hero Section Details</h3>
                  <p className="text-xs text-muted-foreground">Customize your name, intro titles, description, and links</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">First Name</label>
                    <input
                      type="text"
                      value={portfolio.hero.firstName}
                      onChange={(e) => {
                        updateHero({ firstName: e.target.value });
                        triggerSaveNotice();
                      }}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-card border border-border focus:border-primary focus:outline-none text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">Last Name</label>
                    <input
                      type="text"
                      value={portfolio.hero.lastName}
                      onChange={(e) => {
                        updateHero({ lastName: e.target.value });
                        triggerSaveNotice();
                      }}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-card border border-border focus:border-primary focus:outline-none text-foreground"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    Dynamic Typing Titles (Rotating Headlines)
                  </label>
                  <p className="text-xs text-muted-foreground mb-2">These rotate automatically with the typewriter animation</p>
                  <div className="space-y-2">
                    {portfolio.hero.titles.map((title, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => {
                            const newTitles = [...portfolio.hero.titles];
                            newTitles[idx] = e.target.value;
                            updateHero({ titles: newTitles });
                            triggerSaveNotice();
                          }}
                          className="flex-1 px-3.5 py-2 text-sm rounded-xl bg-card border border-border focus:border-primary focus:outline-none text-foreground"
                        />
                        <button
                          onClick={() => {
                            const newTitles = portfolio.hero.titles.filter((_, i) => i !== idx);
                            updateHero({ titles: newTitles });
                            triggerSaveNotice();
                          }}
                          disabled={portfolio.hero.titles.length <= 1}
                          className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg disabled:opacity-30"
                          title="Delete title"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        updateHero({ titles: [...portfolio.hero.titles, "New Headline"] });
                        triggerSaveNotice();
                      }}
                      className="flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline mt-2"
                    >
                      <Plus size={14} /> Add Another Title
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Intro Bio Paragraph</label>
                  <textarea
                    rows={3}
                    value={portfolio.hero.bio}
                    onChange={(e) => {
                      updateHero({ bio: e.target.value });
                      triggerSaveNotice();
                    }}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-card border border-border focus:border-primary focus:outline-none text-foreground resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">View CV / Resume Link (Google Drive / PDF URL)</label>
                  <input
                    type="text"
                    value={portfolio.hero.cvLink}
                    onChange={(e) => {
                      updateHero({ cvLink: e.target.value });
                      triggerSaveNotice();
                    }}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-card border border-border focus:border-primary focus:outline-none text-foreground"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">GitHub Profile URL</label>
                    <input
                      type="text"
                      value={portfolio.hero.githubUrl}
                      onChange={(e) => {
                        updateHero({ githubUrl: e.target.value });
                        triggerSaveNotice();
                      }}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-card border border-border focus:border-primary focus:outline-none text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">LinkedIn Profile URL</label>
                    <input
                      type="text"
                      value={portfolio.hero.linkedinUrl}
                      onChange={(e) => {
                        updateHero({ linkedinUrl: e.target.value });
                        triggerSaveNotice();
                      }}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-card border border-border focus:border-primary focus:outline-none text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">Twitter / X URL</label>
                    <input
                      type="text"
                      value={portfolio.hero.twitterUrl}
                      onChange={(e) => {
                        updateHero({ twitterUrl: e.target.value });
                        triggerSaveNotice();
                      }}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-card border border-border focus:border-primary focus:outline-none text-foreground"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ================= ABOUT TAB ================= */}
            {activeTab === "about" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-foreground">About & Experience Section</h3>
                  <p className="text-xs text-muted-foreground">Manage your tech stack, job experience, education, and certifications</p>
                </div>

                {/* Sub-tabs */}
                <div className="flex flex-wrap gap-2 border-b border-border pb-3">
                  {(
                    [
                      { id: "general", label: "Bio & Summary" },
                      { id: "skills", label: "Tech Stack (Skills)" },
                      { id: "experience", label: "Experience" },
                      { id: "education", label: "Education" },
                      { id: "courses", label: "Courses / Certs" },
                    ] as const
                  ).map((st) => (
                    <button
                      key={st.id}
                      onClick={() => setAboutSubTab(st.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        aboutSubTab === st.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted/60 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>

                {/* Subtab: General */}
                {aboutSubTab === "general" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-muted-foreground mb-1">Heading Prefix</label>
                        <input
                          type="text"
                          value={portfolio.about.heading}
                          onChange={(e) => {
                            updateAbout({ heading: e.target.value });
                            triggerSaveNotice();
                          }}
                          className="w-full px-3 py-2 text-sm rounded-xl bg-card border border-border focus:border-primary focus:outline-none text-foreground"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-muted-foreground mb-1">Highlighted Word</label>
                        <input
                          type="text"
                          value={portfolio.about.highlightedText}
                          onChange={(e) => {
                            updateAbout({ highlightedText: e.target.value });
                            triggerSaveNotice();
                          }}
                          className="w-full px-3 py-2 text-sm rounded-xl bg-card border border-border focus:border-primary focus:outline-none text-foreground"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1">About Summary</label>
                      <textarea
                        rows={3}
                        value={portfolio.about.bio}
                        onChange={(e) => {
                          updateAbout({ bio: e.target.value });
                          triggerSaveNotice();
                        }}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-card border border-border focus:border-primary focus:outline-none text-foreground"
                      />
                    </div>
                  </div>
                )}

                {/* Subtab: Skills */}
                {aboutSubTab === "skills" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">Organize your technologies into categories</p>
                      <button
                        onClick={() => {
                          const newCat: SkillCategory = {
                            id: `skill-${Date.now()}`,
                            category: "Tools & DevOps",
                            items: ["Git", "Docker", "Postman"],
                          };
                          updateAbout({ skills: [...portfolio.about.skills, newCat] });
                          triggerSaveNotice();
                        }}
                        className="flex items-center gap-1 text-xs text-primary font-semibold hover:underline"
                      >
                        <Plus size={14} /> Add Category
                      </button>
                    </div>

                    <div className="space-y-4">
                      {portfolio.about.skills.map((skillGroup, catIdx) => (
                        <div key={skillGroup.id || catIdx} className="p-4 rounded-xl border border-border bg-card/60 space-y-3">
                          <div className="flex items-center justify-between gap-2">
                            <input
                              type="text"
                              value={skillGroup.category}
                              onChange={(e) => {
                                const newSkills = [...portfolio.about.skills];
                                newSkills[catIdx] = { ...newSkills[catIdx], category: e.target.value };
                                updateAbout({ skills: newSkills });
                                triggerSaveNotice();
                              }}
                              className="font-bold text-sm bg-transparent border-b border-border/80 focus:border-primary outline-none px-1 py-0.5"
                            />
                            <button
                              onClick={() => {
                                const newSkills = portfolio.about.skills.filter((_, i) => i !== catIdx);
                                updateAbout({ skills: newSkills });
                                triggerSaveNotice();
                              }}
                              className="text-muted-foreground hover:text-destructive p-1 rounded"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>

                          <div>
                            <label className="block text-[11px] text-muted-foreground mb-1">
                              Skill Tags (Comma separated, e.g. React, Node.js, TypeScript)
                            </label>
                            <input
                              type="text"
                              value={skillGroup.items.join(", ")}
                              onChange={(e) => {
                                const newSkills = [...portfolio.about.skills];
                                newSkills[catIdx] = {
                                  ...newSkills[catIdx],
                                  items: e.target.value
                                    .split(",")
                                    .map((s) => s.trim())
                                    .filter(Boolean),
                                };
                                updateAbout({ skills: newSkills });
                                triggerSaveNotice();
                              }}
                              className="w-full px-3 py-1.5 text-xs rounded-lg bg-card border border-border focus:border-primary outline-none"
                            />
                          </div>

                          <div className="flex flex-wrap gap-1.5">
                            {skillGroup.items.map((item, itemIdx) => (
                              <span key={itemIdx} className="text-[11px] px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Subtab: Experience */}
                {aboutSubTab === "experience" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">List your work and internship experience</p>
                      <button
                        onClick={() => {
                          const newExp: ExperienceItem = {
                            id: `exp-${Date.now()}`,
                            role: "Software Engineer",
                            company: "Company Name",
                            location: "City, Country",
                            period: "2024 – Present",
                          };
                          updateAbout({ experiences: [newExp, ...portfolio.about.experiences] });
                          triggerSaveNotice();
                        }}
                        className="flex items-center gap-1 text-xs text-primary font-semibold hover:underline"
                      >
                        <Plus size={14} /> Add Experience
                      </button>
                    </div>

                    <div className="space-y-3">
                      {portfolio.about.experiences.map((exp, idx) => (
                        <div key={exp.id || idx} className="p-4 rounded-xl border border-border bg-card/60 space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-primary">#{idx + 1} Experience Record</span>
                            <button
                              onClick={() => {
                                const newExps = portfolio.about.experiences.filter((_, i) => i !== idx);
                                updateAbout({ experiences: newExps });
                                triggerSaveNotice();
                              }}
                              className="text-muted-foreground hover:text-destructive p-1 rounded"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] text-muted-foreground mb-1">Job Role / Title</label>
                              <input
                                type="text"
                                value={exp.role}
                                onChange={(e) => {
                                  const updated = [...portfolio.about.experiences];
                                  updated[idx] = { ...updated[idx], role: e.target.value };
                                  updateAbout({ experiences: updated });
                                  triggerSaveNotice();
                                }}
                                className="w-full px-3 py-1.5 text-xs rounded-lg bg-card border border-border focus:border-primary outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] text-muted-foreground mb-1">Company Name</label>
                              <input
                                type="text"
                                value={exp.company}
                                onChange={(e) => {
                                  const updated = [...portfolio.about.experiences];
                                  updated[idx] = { ...updated[idx], company: e.target.value };
                                  updateAbout({ experiences: updated });
                                  triggerSaveNotice();
                                }}
                                className="w-full px-3 py-1.5 text-xs rounded-lg bg-card border border-border focus:border-primary outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] text-muted-foreground mb-1">Location</label>
                              <input
                                type="text"
                                value={exp.location}
                                onChange={(e) => {
                                  const updated = [...portfolio.about.experiences];
                                  updated[idx] = { ...updated[idx], location: e.target.value };
                                  updateAbout({ experiences: updated });
                                  triggerSaveNotice();
                                }}
                                className="w-full px-3 py-1.5 text-xs rounded-lg bg-card border border-border focus:border-primary outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] text-muted-foreground mb-1">Period</label>
                              <input
                                type="text"
                                value={exp.period}
                                onChange={(e) => {
                                  const updated = [...portfolio.about.experiences];
                                  updated[idx] = { ...updated[idx], period: e.target.value };
                                  updateAbout({ experiences: updated });
                                  triggerSaveNotice();
                                }}
                                className="w-full px-3 py-1.5 text-xs rounded-lg bg-card border border-border focus:border-primary outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Subtab: Education */}
                {aboutSubTab === "education" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">List your degrees and colleges</p>
                      <button
                        onClick={() => {
                          const newEdu: EducationItem = {
                            id: `edu-${Date.now()}`,
                            degree: "Degree / Diploma",
                            institution: "University / Institute Name",
                            year: "2020–2024",
                          };
                          updateAbout({ educations: [newEdu, ...portfolio.about.educations] });
                          triggerSaveNotice();
                        }}
                        className="flex items-center gap-1 text-xs text-primary font-semibold hover:underline"
                      >
                        <Plus size={14} /> Add Education
                      </button>
                    </div>

                    <div className="space-y-3">
                      {portfolio.about.educations.map((edu, idx) => (
                        <div key={edu.id || idx} className="p-4 rounded-xl border border-border bg-card/60 space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-primary">#{idx + 1} Education Record</span>
                            <button
                              onClick={() => {
                                const newEdus = portfolio.about.educations.filter((_, i) => i !== idx);
                                updateAbout({ educations: newEdus });
                                triggerSaveNotice();
                              }}
                              className="text-muted-foreground hover:text-destructive p-1 rounded"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-[11px] text-muted-foreground mb-1">Degree</label>
                              <input
                                type="text"
                                value={edu.degree}
                                onChange={(e) => {
                                  const updated = [...portfolio.about.educations];
                                  updated[idx] = { ...updated[idx], degree: e.target.value };
                                  updateAbout({ educations: updated });
                                  triggerSaveNotice();
                                }}
                                className="w-full px-3 py-1.5 text-xs rounded-lg bg-card border border-border focus:border-primary outline-none"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-[11px] text-muted-foreground mb-1">Institution</label>
                              <input
                                type="text"
                                value={edu.institution}
                                onChange={(e) => {
                                  const updated = [...portfolio.about.educations];
                                  updated[idx] = { ...updated[idx], institution: e.target.value };
                                  updateAbout({ educations: updated });
                                  triggerSaveNotice();
                                }}
                                className="w-full px-3 py-1.5 text-xs rounded-lg bg-card border border-border focus:border-primary outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] text-muted-foreground mb-1">Year / Duration</label>
                              <input
                                type="text"
                                value={edu.year}
                                onChange={(e) => {
                                  const updated = [...portfolio.about.educations];
                                  updated[idx] = { ...updated[idx], year: e.target.value };
                                  updateAbout({ educations: updated });
                                  triggerSaveNotice();
                                }}
                                className="w-full px-3 py-1.5 text-xs rounded-lg bg-card border border-border focus:border-primary outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Subtab: Courses */}
                {aboutSubTab === "courses" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">Certifications & online courses</p>
                      <button
                        onClick={() => {
                          const newCourse: CourseItem = {
                            id: `course-${Date.now()}`,
                            name: "Course / Certification Name",
                            provider: "Platform / Institute",
                          };
                          updateAbout({ courses: [newCourse, ...portfolio.about.courses] });
                          triggerSaveNotice();
                        }}
                        className="flex items-center gap-1 text-xs text-primary font-semibold hover:underline"
                      >
                        <Plus size={14} /> Add Course
                      </button>
                    </div>

                    <div className="space-y-3">
                      {portfolio.about.courses.map((course, idx) => (
                        <div key={course.id || idx} className="p-4 rounded-xl border border-border bg-card/60 flex items-center gap-3">
                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] text-muted-foreground mb-1">Course Name</label>
                              <input
                                type="text"
                                value={course.name}
                                onChange={(e) => {
                                  const updated = [...portfolio.about.courses];
                                  updated[idx] = { ...updated[idx], name: e.target.value };
                                  updateAbout({ courses: updated });
                                  triggerSaveNotice();
                                }}
                                className="w-full px-3 py-1.5 text-xs rounded-lg bg-card border border-border focus:border-primary outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] text-muted-foreground mb-1">Provider / Platform</label>
                              <input
                                type="text"
                                value={course.provider}
                                onChange={(e) => {
                                  const updated = [...portfolio.about.courses];
                                  updated[idx] = { ...updated[idx], provider: e.target.value };
                                  updateAbout({ courses: updated });
                                  triggerSaveNotice();
                                }}
                                className="w-full px-3 py-1.5 text-xs rounded-lg bg-card border border-border focus:border-primary outline-none"
                              />
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              const updated = portfolio.about.courses.filter((_, i) => i !== idx);
                              updateAbout({ courses: updated });
                              triggerSaveNotice();
                            }}
                            className="text-muted-foreground hover:text-destructive p-1.5 rounded mt-4"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ================= SERVICES TAB ================= */}
            {activeTab === "services" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Services Offered</h3>
                    <p className="text-xs text-muted-foreground">Add or modify the services highlighted in your services section</p>
                  </div>
                  <button
                    onClick={() => {
                      const newService: ServiceItem = {
                        id: `srv-${Date.now()}`,
                        title: "New Service",
                        desc: "Detailed description of the service and value provided to clients.",
                        gradient: "from-[oklch(0.72_0.17_185)] to-[oklch(0.60_0.15_200)]",
                      };
                      updateServices([...portfolio.services, newService]);
                      triggerSaveNotice();
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90"
                  >
                    <Plus size={14} /> Add Service
                  </button>
                </div>

                <div className="space-y-4">
                  {portfolio.services.map((srv, idx) => (
                    <div key={srv.id || idx} className="p-4 rounded-xl border border-border bg-card/60 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-primary">Service #{idx + 1}</span>
                        <button
                          onClick={() => {
                            const updated = portfolio.services.filter((_, i) => i !== idx);
                            updateServices(updated);
                            triggerSaveNotice();
                          }}
                          disabled={portfolio.services.length <= 1}
                          className="text-muted-foreground hover:text-destructive p-1 rounded disabled:opacity-30"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div>
                        <label className="block text-[11px] text-muted-foreground mb-1">Service Title</label>
                        <input
                          type="text"
                          value={srv.title}
                          onChange={(e) => {
                            const updated = [...portfolio.services];
                            updated[idx] = { ...updated[idx], title: e.target.value };
                            updateServices(updated);
                            triggerSaveNotice();
                          }}
                          className="w-full px-3 py-2 text-sm rounded-lg bg-card border border-border focus:border-primary outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-muted-foreground mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={srv.desc}
                          onChange={(e) => {
                            const updated = [...portfolio.services];
                            updated[idx] = { ...updated[idx], desc: e.target.value };
                            updateServices(updated);
                            triggerSaveNotice();
                          }}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-card border border-border focus:border-primary outline-none resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ================= PROJECTS TAB ================= */}
            {activeTab === "projects" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Projects Showcase</h3>
                    <p className="text-xs text-muted-foreground">Manage project cards, links, tags, and descriptions</p>
                  </div>
                  <button
                    onClick={() => {
                      const newProj: ProjectItem = {
                        id: `proj-${Date.now()}`,
                        title: "New Project",
                        desc: "Exciting web app built using modern tech stack.",
                        tags: ["React", "Node.js", "Tailwind CSS"],
                        emoji: "🚀",
                        liveLink: "https://example.com",
                        githubLink: "https://github.com",
                        gradient: "from-[oklch(0.72_0.17_185)] to-[oklch(0.55_0.15_200)]",
                      };
                      updateProjects([...portfolio.projects, newProj]);
                      triggerSaveNotice();
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90"
                  >
                    <Plus size={14} /> Add Project
                  </button>
                </div>

                <div className="space-y-4">
                  {portfolio.projects.map((proj, idx) => (
                    <div key={proj.id || idx} className="p-4 rounded-xl border border-border bg-card/60 space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={proj.emoji}
                            onChange={(e) => {
                              const updated = [...portfolio.projects];
                              updated[idx] = { ...updated[idx], emoji: e.target.value };
                              updateProjects(updated);
                              triggerSaveNotice();
                            }}
                            className="w-10 text-center text-lg bg-muted border border-border rounded-lg py-0.5 outline-none"
                            title="Card Icon / Emoji"
                          />
                          <input
                            type="text"
                            value={proj.title}
                            onChange={(e) => {
                              const updated = [...portfolio.projects];
                              updated[idx] = { ...updated[idx], title: e.target.value };
                              updateProjects(updated);
                              triggerSaveNotice();
                            }}
                            className="font-bold text-sm bg-transparent border-b border-border/80 focus:border-primary outline-none px-1 py-0.5"
                          />
                        </div>

                        <button
                          onClick={() => {
                            const updated = portfolio.projects.filter((_, i) => i !== idx);
                            updateProjects(updated);
                            triggerSaveNotice();
                          }}
                          className="text-muted-foreground hover:text-destructive p-1 rounded"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div>
                        <label className="block text-[11px] text-muted-foreground mb-1">Project Description</label>
                        <textarea
                          rows={2}
                          value={proj.desc}
                          onChange={(e) => {
                            const updated = [...portfolio.projects];
                            updated[idx] = { ...updated[idx], desc: e.target.value };
                            updateProjects(updated);
                            triggerSaveNotice();
                          }}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-card border border-border focus:border-primary outline-none resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-muted-foreground mb-1">Tags (Comma-separated, e.g. React, Next.js, MongoDB)</label>
                        <input
                          type="text"
                          value={proj.tags.join(", ")}
                          onChange={(e) => {
                            const updated = [...portfolio.projects];
                            updated[idx] = {
                              ...updated[idx],
                              tags: e.target.value
                                .split(",")
                                .map((t) => t.trim())
                                .filter(Boolean),
                            };
                            updateProjects(updated);
                            triggerSaveNotice();
                          }}
                          className="w-full px-3 py-1.5 text-xs rounded-lg bg-card border border-border focus:border-primary outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] text-muted-foreground mb-1">Live Demo URL</label>
                          <input
                            type="text"
                            value={proj.liveLink}
                            onChange={(e) => {
                              const updated = [...portfolio.projects];
                              updated[idx] = { ...updated[idx], liveLink: e.target.value };
                              updateProjects(updated);
                              triggerSaveNotice();
                            }}
                            className="w-full px-3 py-1.5 text-xs rounded-lg bg-card border border-border focus:border-primary outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-muted-foreground mb-1">GitHub Repo URL</label>
                          <input
                            type="text"
                            value={proj.githubLink}
                            onChange={(e) => {
                              const updated = [...portfolio.projects];
                              updated[idx] = { ...updated[idx], githubLink: e.target.value };
                              updateProjects(updated);
                              triggerSaveNotice();
                            }}
                            className="w-full px-3 py-1.5 text-xs rounded-lg bg-card border border-border focus:border-primary outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ================= FOOTER & CONTACT TAB ================= */}
            {activeTab === "footer" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-foreground">Footer & Contact Info</h3>
                  <p className="text-xs text-muted-foreground">Update your contact details, social links, and copyright text</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">Contact Email</label>
                    <input
                      type="email"
                      value={portfolio.footer.email}
                      onChange={(e) => {
                        updateFooter({ email: e.target.value });
                        triggerSaveNotice();
                      }}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-card border border-border focus:border-primary focus:outline-none text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">Location</label>
                    <input
                      type="text"
                      value={portfolio.footer.location}
                      onChange={(e) => {
                        updateFooter({ location: e.target.value });
                        triggerSaveNotice();
                      }}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-card border border-border focus:border-primary focus:outline-none text-foreground"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Footer Bio / Tagline</label>
                  <textarea
                    rows={2}
                    value={portfolio.footer.tagline}
                    onChange={(e) => {
                      updateFooter({ tagline: e.target.value });
                      triggerSaveNotice();
                    }}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-card border border-border focus:border-primary focus:outline-none text-foreground resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Copyright Note</label>
                  <input
                    type="text"
                    value={portfolio.footer.copyrightText}
                    onChange={(e) => {
                      updateFooter({ copyrightText: e.target.value });
                      triggerSaveNotice();
                    }}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-card border border-border focus:border-primary focus:outline-none text-foreground"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">Footer GitHub</label>
                    <input
                      type="text"
                      value={portfolio.footer.githubUrl}
                      onChange={(e) => {
                        updateFooter({ githubUrl: e.target.value });
                        triggerSaveNotice();
                      }}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-card border border-border focus:border-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">Footer LinkedIn</label>
                    <input
                      type="text"
                      value={portfolio.footer.linkedinUrl}
                      onChange={(e) => {
                        updateFooter({ linkedinUrl: e.target.value });
                        triggerSaveNotice();
                      }}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-card border border-border focus:border-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">Footer Twitter</label>
                    <input
                      type="text"
                      value={portfolio.footer.twitterUrl}
                      onChange={(e) => {
                        updateFooter({ twitterUrl: e.target.value });
                        triggerSaveNotice();
                      }}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-card border border-border focus:border-primary outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ================= ADD & MANAGE SECTIONS TAB ================= */}
            {activeTab === "sections" && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-foreground">Section Management</h3>
                  <p className="text-xs text-muted-foreground">Toggle visibility of sections or create brand new custom sections</p>
                </div>

                {/* Core Sections Visibility */}
                <div className="p-5 rounded-2xl border border-border bg-card/60 space-y-4">
                  <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <LayoutGrid size={16} className="text-primary" />
                    Core Sections Visibility
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Hide or show default sections on your portfolio
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-2">
                    {(
                      [
                        { key: "hero", label: "Hero" },
                        { key: "about", label: "About" },
                        { key: "services", label: "Services" },
                        { key: "projects", label: "Projects" },
                        { key: "footer", label: "Contact / Footer" },
                      ] as const
                    ).map(({ key, label }) => {
                      const isVisible = portfolio.visibility?.[key] !== false;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => {
                            updateSectionVisibility({ [key]: !isVisible });
                            triggerSaveNotice();
                          }}
                          className={`flex items-center justify-between p-3 rounded-xl border text-xs font-semibold transition-all ${
                            isVisible
                              ? "bg-primary/10 border-primary/30 text-primary"
                              : "bg-muted/40 border-border text-muted-foreground opacity-60"
                          }`}
                        >
                          <span>{label}</span>
                          {isVisible ? <Eye size={14} /> : <EyeOff size={14} />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Sections Builder */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <Sparkles size={16} className="text-primary" />
                        Custom Sections
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Create custom sections for Certifications, Achievements, Testimonials, or any custom content
                      </p>
                    </div>
                    <button
                      onClick={handleCreateNewSection}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-teal text-teal-foreground text-xs font-bold shadow-md hover:scale-105 transition-all"
                    >
                      <Plus size={14} /> Create New Section
                    </button>
                  </div>

                  {(!portfolio.customSections || portfolio.customSections.length === 0) && (
                    <div className="text-center p-8 rounded-2xl border border-dashed border-border text-muted-foreground space-y-2">
                      <Sparkles size={28} className="mx-auto text-primary/50" />
                      <p className="text-xs font-medium">No custom sections created yet.</p>
                      <p className="text-[11px] text-muted-foreground/80">
                        Click "Create New Section" above to add certificates, testimonials, client reviews, or achievements!
                      </p>
                    </div>
                  )}

                  {portfolio.customSections &&
                    portfolio.customSections.map((sec, secIdx) => (
                      <div
                        key={sec.id}
                        className="p-5 rounded-2xl border border-border bg-card/70 space-y-4 shadow-sm"
                      >
                        <div className="flex items-center justify-between gap-3 border-b border-border/80 pb-3">
                          <div className="flex items-center gap-2 flex-1">
                            <span className="text-xs font-bold text-primary">#{secIdx + 1}</span>
                            <input
                              type="text"
                              value={sec.title}
                              onChange={(e) => {
                                const updated = [...portfolio.customSections];
                                updated[secIdx] = { ...updated[secIdx], title: e.target.value };
                                updateCustomSections(updated);
                                triggerSaveNotice();
                              }}
                              className="font-bold text-sm bg-transparent border-b border-border/80 focus:border-primary outline-none px-1 py-0.5"
                              placeholder="Section Title"
                            />
                            <input
                              type="text"
                              value={sec.highlightWord || ""}
                              onChange={(e) => {
                                const updated = [...portfolio.customSections];
                                updated[secIdx] = { ...updated[secIdx], highlightWord: e.target.value };
                                updateCustomSections(updated);
                                triggerSaveNotice();
                              }}
                              className="text-xs text-primary bg-primary/10 border border-primary/20 rounded-lg px-2 py-0.5 outline-none"
                              placeholder="Highlight Word (Gradient)"
                            />
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Toggle visibility */}
                            <button
                              onClick={() => {
                                const updated = [...portfolio.customSections];
                                updated[secIdx] = { ...updated[secIdx], visible: !sec.visible };
                                updateCustomSections(updated);
                                triggerSaveNotice();
                              }}
                              className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors ${
                                sec.visible ? "text-primary bg-primary/10" : "text-muted-foreground bg-muted"
                              }`}
                              title={sec.visible ? "Visible on website" : "Hidden from website"}
                            >
                              {sec.visible ? <Eye size={15} /> : <EyeOff size={15} />}
                              <span className="text-[11px] hidden sm:inline">{sec.visible ? "Visible" : "Hidden"}</span>
                            </button>

                            {/* Delete Section */}
                            <button
                              onClick={() => {
                                if (window.confirm(`Delete "${sec.title}" section?`)) {
                                  deleteCustomSection(sec.id);
                                  triggerSaveNotice();
                                }
                              }}
                              className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                              title="Delete section"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>

                        {/* Section Description & Layout */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="sm:col-span-2">
                            <label className="block text-[11px] text-muted-foreground mb-1">Section Subtitle / Description</label>
                            <input
                              type="text"
                              value={sec.description || ""}
                              onChange={(e) => {
                                const updated = [...portfolio.customSections];
                                updated[secIdx] = { ...updated[secIdx], description: e.target.value };
                                updateCustomSections(updated);
                                triggerSaveNotice();
                              }}
                              className="w-full px-3 py-1.5 text-xs rounded-lg bg-card border border-border focus:border-primary outline-none"
                              placeholder="e.g. A collection of industry certifications and achievements."
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] text-muted-foreground mb-1">Card Layout</label>
                            <select
                              value={sec.layout || "grid"}
                              onChange={(e) => {
                                const updated = [...portfolio.customSections];
                                updated[secIdx] = { ...updated[secIdx], layout: e.target.value as any };
                                updateCustomSections(updated);
                                triggerSaveNotice();
                              }}
                              className="w-full px-3 py-1.5 text-xs rounded-lg bg-card border border-border focus:border-primary outline-none"
                            >
                              <option value="grid">Grid (3 Columns)</option>
                              <option value="cards">Cards (2 Columns)</option>
                              <option value="list">List (Vertical Stack)</option>
                            </select>
                          </div>
                        </div>

                        {/* Items inside this custom section */}
                        <div className="space-y-3 pt-2 border-t border-border/60">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-muted-foreground">Section Cards / Items</span>
                            <button
                              onClick={() => {
                                const newItem: CustomSectionItem = {
                                  id: `item-${Date.now()}`,
                                  title: "New Item",
                                  subtitle: "Organization / Category",
                                  description: "Add details here...",
                                  date: "2025",
                                  link: "",
                                  linkText: "View",
                                  tags: ["Tag 1"],
                                };
                                const updated = [...portfolio.customSections];
                                updated[secIdx] = {
                                  ...updated[secIdx],
                                  items: [...(updated[secIdx].items || []), newItem],
                                };
                                updateCustomSections(updated);
                                triggerSaveNotice();
                              }}
                              className="flex items-center gap-1 text-xs text-primary font-semibold hover:underline"
                            >
                              <Plus size={13} /> Add Card / Item
                            </button>
                          </div>

                          <div className="space-y-3">
                            {sec.items &&
                              sec.items.map((item, itemIdx) => (
                                <div
                                  key={item.id || itemIdx}
                                  className="p-3.5 rounded-xl border border-border bg-card/50 space-y-2.5"
                                >
                                  <div className="flex justify-between items-center gap-2">
                                    <input
                                      type="text"
                                      value={item.title}
                                      onChange={(e) => {
                                        const updated = [...portfolio.customSections];
                                        const newItems = [...updated[secIdx].items];
                                        newItems[itemIdx] = { ...newItems[itemIdx], title: e.target.value };
                                        updated[secIdx].items = newItems;
                                        updateCustomSections(updated);
                                        triggerSaveNotice();
                                      }}
                                      className="font-semibold text-xs bg-transparent border-b border-border/80 focus:border-primary outline-none px-1 py-0.5 flex-1"
                                      placeholder="Card Title"
                                    />
                                    <button
                                      onClick={() => {
                                        const updated = [...portfolio.customSections];
                                        updated[secIdx].items = updated[secIdx].items.filter((_, i) => i !== itemIdx);
                                        updateCustomSections(updated);
                                        triggerSaveNotice();
                                      }}
                                      className="text-muted-foreground hover:text-destructive p-1 rounded"
                                    >
                                      <Trash2 size={14} />
                                    </button>
                                  </div>

                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    <input
                                      type="text"
                                      value={item.subtitle || ""}
                                      onChange={(e) => {
                                        const updated = [...portfolio.customSections];
                                        const newItems = [...updated[secIdx].items];
                                        newItems[itemIdx] = { ...newItems[itemIdx], subtitle: e.target.value };
                                        updated[secIdx].items = newItems;
                                        updateCustomSections(updated);
                                        triggerSaveNotice();
                                      }}
                                      className="px-2.5 py-1 text-xs rounded-lg bg-card border border-border focus:border-primary outline-none"
                                      placeholder="Subtitle / Issuer"
                                    />
                                    <input
                                      type="text"
                                      value={item.date || ""}
                                      onChange={(e) => {
                                        const updated = [...portfolio.customSections];
                                        const newItems = [...updated[secIdx].items];
                                        newItems[itemIdx] = { ...newItems[itemIdx], date: e.target.value };
                                        updated[secIdx].items = newItems;
                                        updateCustomSections(updated);
                                        triggerSaveNotice();
                                      }}
                                      className="px-2.5 py-1 text-xs rounded-lg bg-card border border-border focus:border-primary outline-none"
                                      placeholder="Date / Year (e.g. 2025)"
                                    />
                                  </div>

                                  <textarea
                                    rows={2}
                                    value={item.description}
                                    onChange={(e) => {
                                      const updated = [...portfolio.customSections];
                                      const newItems = [...updated[secIdx].items];
                                      newItems[itemIdx] = { ...newItems[itemIdx], description: e.target.value };
                                      updated[secIdx].items = newItems;
                                      updateCustomSections(updated);
                                      triggerSaveNotice();
                                    }}
                                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-card border border-border focus:border-primary outline-none resize-none"
                                    placeholder="Description / details..."
                                  />

                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    <input
                                      type="text"
                                      value={item.link || ""}
                                      onChange={(e) => {
                                        const updated = [...portfolio.customSections];
                                        const newItems = [...updated[secIdx].items];
                                        newItems[itemIdx] = { ...newItems[itemIdx], link: e.target.value };
                                        updated[secIdx].items = newItems;
                                        updateCustomSections(updated);
                                        triggerSaveNotice();
                                      }}
                                      className="px-2.5 py-1 text-xs rounded-lg bg-card border border-border focus:border-primary outline-none"
                                      placeholder="Link URL (optional)"
                                    />
                                    <input
                                      type="text"
                                      value={(item.tags || []).join(", ")}
                                      onChange={(e) => {
                                        const updated = [...portfolio.customSections];
                                        const newItems = [...updated[secIdx].items];
                                        newItems[itemIdx] = {
                                          ...newItems[itemIdx],
                                          tags: e.target.value
                                            .split(",")
                                            .map((t) => t.trim())
                                            .filter(Boolean),
                                        };
                                        updated[secIdx].items = newItems;
                                        updateCustomSections(updated);
                                        triggerSaveNotice();
                                      }}
                                      className="px-2.5 py-1 text-xs rounded-lg bg-card border border-border focus:border-primary outline-none"
                                      placeholder="Tags (Comma separated)"
                                    />
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* ================= THEME & COLORS TAB ================= */}
            {activeTab === "theme" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-foreground">Theme & Color Palette</h3>
                  <p className="text-xs text-muted-foreground">Select an accent color palette for your entire portfolio</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {(Object.keys(THEME_PRESETS) as ThemePresetKey[]).map((key) => {
                    const preset = THEME_PRESETS[key];
                    const isSelected = portfolio.theme?.preset === key;

                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => {
                          setThemePreset(key);
                          triggerSaveNotice();
                        }}
                        className={`group relative p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between h-36 ${
                          isSelected
                            ? "border-primary bg-primary/10 shadow-lg shadow-primary/20 scale-[1.02]"
                            : "border-border bg-card/60 hover:border-primary/40 hover:bg-card"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div
                            className="h-8 w-8 rounded-xl shadow-md border border-white/20 flex items-center justify-center transition-transform group-hover:scale-110"
                            style={{ backgroundColor: preset.previewColor }}
                          >
                            {isSelected && <Check size={16} className="text-white drop-shadow" />}
                          </div>
                          {isSelected && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary text-primary-foreground">
                              Active
                            </span>
                          )}
                        </div>

                        <div>
                          <h4 className="font-bold text-sm text-foreground">{preset.name}</h4>
                          <p className="text-[11px] text-muted-foreground mt-0.5">
                            Gradients & primary accents
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="p-4 rounded-xl border border-border bg-card/50 text-xs text-muted-foreground">
                  💡 <strong>Tip:</strong> Selecting a color immediately updates all buttons, gradient text headlines, glowing borders, and section cards across your entire portfolio in both Dark and Light modes.
                </div>
              </div>
            )}

            {/* ================= SETTINGS & PASSCODE TAB ================= */}
            {activeTab === "settings" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-foreground">Passcode & Data Management</h3>
                  <p className="text-xs text-muted-foreground">Change your admin passcode, export/backup your portfolio, or restore defaults</p>
                </div>

                {/* Change Passcode */}
                <div className="p-5 rounded-2xl border border-border bg-card/60 space-y-4">
                  <div className="flex items-center gap-2 font-semibold text-foreground text-sm">
                    <Lock size={16} className="text-primary" />
                    <span>Change Admin Passcode</span>
                  </div>
                  <form onSubmit={handleChangePasscode} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-muted-foreground mb-1">Current Passcode</label>
                        <input
                          type="password"
                          required
                          value={oldPass}
                          placeholder="Enter current passcode"
                          onChange={(e) => setOldPass(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-card border border-border focus:border-primary outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-muted-foreground mb-1">New Passcode (min 4 characters)</label>
                        <input
                          type="password"
                          required
                          value={newPass}
                          placeholder="Enter new secret code"
                          onChange={(e) => setNewPass(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-card border border-border focus:border-primary outline-none"
                        />
                      </div>
                    </div>
                    {passMsg && (
                      <p className={`text-xs ${passMsg.type === "success" ? "text-emerald-500" : "text-destructive"}`}>
                        {passMsg.text}
                      </p>
                    )}
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors"
                    >
                      Update Passcode
                    </button>
                  </form>
                </div>

                {/* MongoDB Atlas Sync */}
                <div className="p-5 rounded-2xl border border-border bg-card/60 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <Database size={16} className="text-primary" />
                        MongoDB Atlas Cloud Database
                      </h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Your edits are connected to MongoDB Atlas. Changes automatically sync to your remote database for all visitors.
                      </p>
                    </div>
                    <button
                      onClick={async () => {
                        const success = await saveToMongoDB();
                        if (success) {
                          triggerSaveNotice();
                        }
                      }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-teal text-teal-foreground text-xs font-bold shadow-md hover:scale-105 transition-all"
                    >
                      <Cloud size={14} /> Sync Now to MongoDB
                    </button>
                  </div>
                </div>

                {/* Backup & Export */}
                <div className="p-5 rounded-2xl border border-border bg-card/60 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <Download size={16} className="text-primary" />
                        Download JSON Backup
                      </h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Download your customized portfolio configuration as a JSON file to keep safe or transfer to another browser.
                      </p>
                    </div>
                    <button
                      onClick={handleDownloadBackup}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-muted border border-border text-xs font-semibold text-foreground hover:bg-primary hover:text-primary-foreground transition-all"
                    >
                      <Download size={14} /> Download File
                    </button>
                  </div>

                  <div className="pt-3 border-t border-border/60">
                    <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-1">
                      <Upload size={16} className="text-primary" />
                      Import / Restore from JSON
                    </h4>
                    <p className="text-xs text-muted-foreground mb-2">Paste previously backed-up JSON data here to restore your portfolio</p>
                    <textarea
                      rows={3}
                      placeholder="Paste JSON content here..."
                      value={importJsonText}
                      onChange={(e) => setImportJsonText(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-card border border-border focus:border-primary outline-none font-mono"
                    />
                    {importMsg && (
                      <p className={`text-xs mt-1 ${importMsg.type === "success" ? "text-emerald-500" : "text-destructive"}`}>
                        {importMsg.text}
                      </p>
                    )}
                    <button
                      onClick={handleImportJSON}
                      disabled={!importJsonText.trim()}
                      className="mt-2 px-4 py-2 rounded-lg bg-muted border border-border text-xs font-semibold hover:bg-primary hover:text-primary-foreground transition-all disabled:opacity-40"
                    >
                      Apply Imported Data
                    </button>
                  </div>
                </div>

                {/* Reset to Default */}
                <div className="p-5 rounded-2xl border border-destructive/20 bg-destructive/5 space-y-3">
                  <div className="flex items-center gap-2 text-destructive font-semibold text-sm">
                    <AlertCircle size={16} />
                    <span>Danger Zone</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Reset all sections and themes back to the original source code defaults.
                  </p>
                  <button
                    onClick={handleResetDefaults}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-xs font-semibold hover:bg-destructive/90 transition-colors"
                  >
                    <RotateCcw size={14} /> Reset to Defaults
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-border bg-card/90">
          <button
            onClick={lockAdmin}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive px-3 py-1.5 rounded-lg transition-colors"
          >
            <Lock size={14} /> Lock & Exit Admin
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            className="flex items-center gap-2 px-6 py-2 rounded-xl bg-gradient-teal text-teal-foreground text-xs font-bold shadow-md hover:scale-105 transition-all"
          >
            <Check size={16} /> Done Editing
          </button>
        </div>
      </div>
    </div>
  );
}
