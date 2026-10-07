import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import {
  PortfolioData,
  HeroData,
  AboutData,
  ServiceItem,
  ProjectItem,
  FooterData,
  CustomSection,
  SectionVisibility,
  ThemeConfig,
  ThemePresetKey,
} from "@/types/portfolio";
import { defaultPortfolioData } from "@/data/defaultPortfolio";
import { applyThemePreset } from "@/lib/themePresets";

interface PortfolioContextType {
  portfolio: PortfolioData;
  updatePortfolio: (updater: (prev: PortfolioData) => PortfolioData) => void;
  updateHero: (hero: Partial<HeroData>) => void;
  updateAbout: (about: Partial<AboutData>) => void;
  updateServices: (services: ServiceItem[]) => void;
  updateProjects: (projects: ProjectItem[]) => void;
  updateFooter: (footer: Partial<FooterData>) => void;
  updateCustomSections: (sections: CustomSection[]) => void;
  addCustomSection: (section: CustomSection) => void;
  deleteCustomSection: (sectionId: string) => void;
  updateSectionVisibility: (visibility: Partial<SectionVisibility>) => void;
  updateTheme: (theme: Partial<ThemeConfig>) => void;
  setThemePreset: (preset: ThemePresetKey) => void;
  resetPortfolio: () => void;
  exportPortfolioJSON: () => string;
  importPortfolioJSON: (jsonStr: string) => { success: boolean; message: string };
  isEditMode: boolean;
  setIsEditMode: (val: boolean) => void;
  isAdminUnlocked: boolean;
  setIsAdminUnlocked: (val: boolean) => void;
  isModalOpen: boolean;
  setIsModalOpen: (val: boolean) => void;
  activeSectionTab: string;
  setActiveSectionTab: (tab: string) => void;
  openEditorToSection: (sectionTab: string) => void;
  verifyPasscode: (code: string) => boolean;
  changePasscode: (oldCode: string, newCode: string) => boolean;
  lockAdmin: () => void;
  // MongoDB sync features
  syncStatus: "synced" | "saving" | "error" | "offline";
  saveToMongoDB: (dataToSave?: PortfolioData) => Promise<boolean>;
}

const STORAGE_KEY = "rohit_portfolio_custom_data_v1";
const PASSCODE_KEY = "rohit_portfolio_admin_passcode_v1";
const DEFAULT_PASSCODE = "rohit123";

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [portfolio, setPortfolio] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          hero: { ...defaultPortfolioData.hero, ...parsed.hero },
          about: { ...defaultPortfolioData.about, ...parsed.about },
          services: parsed.services || defaultPortfolioData.services,
          projects: parsed.projects || defaultPortfolioData.projects,
          footer: { ...defaultPortfolioData.footer, ...parsed.footer },
          customSections: parsed.customSections || defaultPortfolioData.customSections || [],
          visibility: { ...defaultPortfolioData.visibility, ...(parsed.visibility || {}) },
          theme: { ...defaultPortfolioData.theme, ...(parsed.theme || {}) },
        };
      }
    } catch (e) {
      console.error("Error loading portfolio from localStorage:", e);
    }
    return defaultPortfolioData;
  });

  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSectionTab, setActiveSectionTab] = useState("hero");
  const [syncStatus, setSyncStatus] = useState<"synced" | "saving" | "error" | "offline">("synced");

  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isInitialMount = useRef(true);

  // Fetch initial portfolio data from MongoDB on mount
  useEffect(() => {
    async function fetchFromMongoDB() {
      try {
        const res = await fetch("/api/portfolio");
        if (res.ok) {
          const json = await res.json();
          if (json.exists && json.data) {
            const dbData = json.data;
            const merged: PortfolioData = {
              hero: { ...defaultPortfolioData.hero, ...dbData.hero },
              about: { ...defaultPortfolioData.about, ...dbData.about },
              services: dbData.services || defaultPortfolioData.services,
              projects: dbData.projects || defaultPortfolioData.projects,
              footer: { ...defaultPortfolioData.footer, ...dbData.footer },
              customSections: dbData.customSections || [],
              visibility: { ...defaultPortfolioData.visibility, ...(dbData.visibility || {}) },
              theme: { ...defaultPortfolioData.theme, ...(dbData.theme || {}) },
            };
            setPortfolio(merged);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
            setSyncStatus("synced");
          }
        }
      } catch (err) {
        console.warn("Unable to reach backend /api/portfolio, using cached storage:", err);
        setSyncStatus("offline");
      }
    }

    fetchFromMongoDB();
  }, []);

  // Dynamically apply current theme preset
  useEffect(() => {
    if (portfolio.theme?.preset) {
      applyThemePreset(portfolio.theme.preset);
    }
  }, [portfolio.theme?.preset]);

  // Save changes to localStorage & sync to MongoDB
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolio));
    } catch (e) {
      console.error("Error saving portfolio to localStorage:", e);
    }

    // Skip auto-sync on very first render
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Only auto-sync to MongoDB if admin is active or editing
    if (isAdminUnlocked) {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      setSyncStatus("saving");
      saveTimeoutRef.current = setTimeout(() => {
        saveToMongoDB(portfolio);
      }, 1200);
    }
  }, [portfolio, isAdminUnlocked]);

  const saveToMongoDB = async (dataToSave?: PortfolioData): Promise<boolean> => {
    const payload = dataToSave || portfolio;
    const currentPass = localStorage.getItem(PASSCODE_KEY) || DEFAULT_PASSCODE;
    try {
      setSyncStatus("saving");
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: payload,
          passcode: currentPass,
        }),
      });

      if (res.ok) {
        setSyncStatus("synced");
        return true;
      } else {
        console.error("MongoDB save returned error status:", res.status);
        setSyncStatus("error");
        return false;
      }
    } catch (err) {
      console.error("MongoDB save request failed:", err);
      setSyncStatus("offline");
      return false;
    }
  };

  const updatePortfolio = (updater: (prev: PortfolioData) => PortfolioData) => {
    setPortfolio((prev) => updater(prev));
  };

  const updateHero = (hero: Partial<HeroData>) => {
    setPortfolio((prev) => ({
      ...prev,
      hero: { ...prev.hero, ...hero },
    }));
  };

  const updateAbout = (about: Partial<AboutData>) => {
    setPortfolio((prev) => ({
      ...prev,
      about: { ...prev.about, ...about },
    }));
  };

  const updateServices = (services: ServiceItem[]) => {
    setPortfolio((prev) => ({
      ...prev,
      services,
    }));
  };

  const updateProjects = (projects: ProjectItem[]) => {
    setPortfolio((prev) => ({
      ...prev,
      projects,
    }));
  };

  const updateFooter = (footer: Partial<FooterData>) => {
    setPortfolio((prev) => ({
      ...prev,
      footer: { ...prev.footer, ...footer },
    }));
  };

  const updateCustomSections = (sections: CustomSection[]) => {
    setPortfolio((prev) => ({
      ...prev,
      customSections: sections,
    }));
  };

  const addCustomSection = (section: CustomSection) => {
    setPortfolio((prev) => ({
      ...prev,
      customSections: [...(prev.customSections || []), section],
    }));
  };

  const deleteCustomSection = (sectionId: string) => {
    setPortfolio((prev) => ({
      ...prev,
      customSections: (prev.customSections || []).filter((s) => s.id !== sectionId),
    }));
  };

  const updateSectionVisibility = (visibility: Partial<SectionVisibility>) => {
    setPortfolio((prev) => ({
      ...prev,
      visibility: { ...prev.visibility, ...visibility },
    }));
  };

  const updateTheme = (theme: Partial<ThemeConfig>) => {
    setPortfolio((prev) => ({
      ...prev,
      theme: { ...prev.theme, ...theme },
    }));
  };

  const setThemePreset = (preset: ThemePresetKey) => {
    updateTheme({ preset });
    applyThemePreset(preset);
  };

  const resetPortfolio = () => {
    setPortfolio(defaultPortfolioData);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
    applyThemePreset("teal");
    saveToMongoDB(defaultPortfolioData);
  };

  const exportPortfolioJSON = () => {
    return JSON.stringify(portfolio, null, 2);
  };

  const importPortfolioJSON = (jsonStr: string) => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (!parsed.hero || !parsed.about || !parsed.services || !parsed.projects) {
        return { success: false, message: "Invalid JSON format: missing required portfolio sections." };
      }
      const newPortfolio: PortfolioData = {
        hero: { ...defaultPortfolioData.hero, ...parsed.hero },
        about: { ...defaultPortfolioData.about, ...parsed.about },
        services: parsed.services,
        projects: parsed.projects,
        footer: { ...defaultPortfolioData.footer, ...parsed.footer },
        customSections: parsed.customSections || [],
        visibility: { ...defaultPortfolioData.visibility, ...(parsed.visibility || {}) },
        theme: { ...defaultPortfolioData.theme, ...(parsed.theme || {}) },
      };
      setPortfolio(newPortfolio);
      if (parsed.theme?.preset) {
        applyThemePreset(parsed.theme.preset);
      }
      saveToMongoDB(newPortfolio);
      return { success: true, message: "Portfolio data successfully imported and synced to MongoDB!" };
    } catch (e) {
      return { success: false, message: "Invalid JSON syntax. Please verify." };
    }
  };

  const verifyPasscode = (code: string): boolean => {
    const stored = localStorage.getItem(PASSCODE_KEY) || DEFAULT_PASSCODE;
    if (code === stored) {
      setIsAdminUnlocked(true);
      setIsEditMode(true);
      return true;
    }
    return false;
  };

  const changePasscode = (oldCode: string, newCode: string): boolean => {
    const current = localStorage.getItem(PASSCODE_KEY) || DEFAULT_PASSCODE;
    if (oldCode !== current) {
      return false;
    }
    if (!newCode || newCode.trim().length < 4) {
      return false;
    }
    localStorage.setItem(PASSCODE_KEY, newCode.trim());

    // Sync new passcode to backend
    fetch("/api/portfolio/passcode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPasscode: oldCode, newPasscode: newCode.trim() }),
    }).catch(console.error);

    return true;
  };

  const lockAdmin = () => {
    setIsAdminUnlocked(false);
    setIsEditMode(false);
    setIsModalOpen(false);
  };

  const openEditorToSection = (sectionTab: string) => {
    setActiveSectionTab(sectionTab);
    setIsModalOpen(true);
  };

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        updatePortfolio,
        updateHero,
        updateAbout,
        updateServices,
        updateProjects,
        updateFooter,
        updateCustomSections,
        addCustomSection,
        deleteCustomSection,
        updateSectionVisibility,
        updateTheme,
        setThemePreset,
        resetPortfolio,
        exportPortfolioJSON,
        importPortfolioJSON,
        isEditMode,
        setIsEditMode,
        isAdminUnlocked,
        setIsAdminUnlocked,
        isModalOpen,
        setIsModalOpen,
        activeSectionTab,
        setActiveSectionTab,
        openEditorToSection,
        verifyPasscode,
        changePasscode,
        lockAdmin,
        syncStatus,
        saveToMongoDB,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
