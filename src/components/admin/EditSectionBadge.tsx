import React from "react";
import { Edit3 } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

interface EditSectionBadgeProps {
  sectionTab: "hero" | "about" | "services" | "projects" | "footer";
  title: string;
}

export default function EditSectionBadge({ sectionTab, title }: EditSectionBadgeProps) {
  const { isEditMode, openEditorToSection } = usePortfolio();

  if (!isEditMode) return null;

  return (
    <div className="absolute top-4 right-4 z-30 animate-pulse-glow">
      <button
        onClick={() => openEditorToSection(sectionTab)}
        className="flex items-center gap-2 rounded-full bg-primary/95 text-primary-foreground px-4 py-2 text-xs font-bold shadow-xl backdrop-blur-md border border-white/20 transition-all hover:scale-105 hover:bg-primary active:scale-95"
      >
        <Edit3 size={14} />
        <span>Edit {title}</span>
      </button>
    </div>
  );
}
