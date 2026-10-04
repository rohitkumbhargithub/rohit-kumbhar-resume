import React, { useState, useEffect } from "react";
import {
  Lock,
  Unlock,
  Edit,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  Shield,
  Key,
  X,
  SlidersHorizontal,
} from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function AdminAccessButton() {
  const {
    isAdminUnlocked,
    isEditMode,
    setIsEditMode,
    setIsModalOpen,
    openEditorToSection,
    verifyPasscode,
    lockAdmin,
  } = usePortfolio();

  const [showPassModal, setShowPassModal] = useState(false);
  const [passInput, setPassInput] = useState("");
  const [passError, setPassError] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const [isHiddenCompletely, setIsHiddenCompletely] = useState(false);

  // Keyboard shortcut: Ctrl + Shift + E to toggle admin
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "e" || e.key === "E")) {
        e.preventDefault();
        setIsHiddenCompletely(false);
        if (!isAdminUnlocked) {
          setShowPassModal(true);
        } else {
          setIsModalOpen(true);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAdminUnlocked, setIsModalOpen]);

  const handleUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyPasscode(passInput)) {
      setPassInput("");
      setPassError("");
      setShowPassModal(false);
    } else {
      setPassError("Incorrect passcode. Please try again.");
    }
  };

  return (
    <>
      {/* Discreet floating widget */}
      {!isHiddenCompletely && (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 animate-fadeIn select-none">
          {/* If unlocked, show floating admin control dock */}
          {isAdminUnlocked ? (
            <div className="flex flex-col items-end gap-2">
              {!isMinimized ? (
                <div className="flex flex-wrap items-center gap-2 p-2 rounded-2xl bg-card/95 border border-primary/30 shadow-2xl backdrop-blur-xl glass-card">
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 rounded-xl text-primary text-xs font-bold">
                    <Shield size={14} />
                    <span>Edit Mode</span>
                  </div>

                  {/* Main button to open modal */}
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-teal text-teal-foreground text-xs font-bold shadow-md hover:scale-105 transition-all"
                  >
                    <SlidersHorizontal size={14} />
                    <span>Customize All</span>
                  </button>

                  {/* Quick section jumps */}
                  <div className="hidden sm:flex items-center gap-1 border-l border-border pl-2">
                    {(
                      [
                        { id: "hero", label: "Hero" },
                        { id: "about", label: "About" },
                        { id: "services", label: "Services" },
                        { id: "projects", label: "Projects" },
                        { id: "sections", label: "+Sections" },
                        { id: "theme", label: "Theme" },
                        { id: "footer", label: "Footer" },
                      ] as const
                    ).map((s) => (
                      <button
                        key={s.id}
                        onClick={() => openEditorToSection(s.id)}
                        className="px-2 py-1 text-[11px] rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted font-medium transition-colors"
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>

                  {/* Preview toggle (hide/show edit badges on page) */}
                  <button
                    onClick={() => setIsEditMode(!isEditMode)}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    title={isEditMode ? "Hide edit badges" : "Show edit badges"}
                  >
                    {isEditMode ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>

                  {/* Minimize dock */}
                  <button
                    onClick={() => setIsMinimized(true)}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    title="Minimize toolbar"
                  >
                    <ChevronDown size={16} />
                  </button>

                  {/* Lock button */}
                  <button
                    onClick={lockAdmin}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    title="Lock and exit admin"
                  >
                    <Lock size={16} />
                  </button>
                </div>
              ) : (
                /* Minimized state when unlocked */
                <button
                  onClick={() => setIsMinimized(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-teal text-teal-foreground text-xs font-bold shadow-xl hover:scale-105 transition-all"
                  title="Expand Admin Bar"
                >
                  <Unlock size={14} />
                  <span>Admin Active</span>
                  <ChevronUp size={14} />
                </button>
              )}
            </div>
          ) : (
            /* Locked state: discreet button */
            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowPassModal(true)}
                className="group flex items-center gap-2 px-3 py-2 rounded-full bg-card/80 hover:bg-card border border-border hover:border-primary/40 text-muted-foreground hover:text-primary shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 text-xs font-medium"
                title="Portfolio Owner / Admin Access (or press Ctrl+Shift+E)"
              >
                <Lock size={14} className="group-hover:text-primary transition-colors" />
                <span className="opacity-0 group-hover:opacity-100 max-w-0 group-hover:max-w-xs overflow-hidden transition-all duration-300 whitespace-nowrap">
                  Admin Edit
                </span>
              </button>

              {/* Little close button if owner wants to completely hide it from view */}
              <button
                onClick={() => setIsHiddenCompletely(true)}
                className="p-1 rounded-full text-muted-foreground/40 hover:text-muted-foreground text-[10px]"
                title="Hide button (Press Ctrl+Shift+E anytime to reveal)"
              >
                <X size={12} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Secret Passcode Modal */}
      {showPassModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-sm rounded-2xl bg-card border border-primary/30 p-6 shadow-2xl glass-card">
            <button
              onClick={() => {
                setShowPassModal(false);
                setPassError("");
                setPassInput("");
              }}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-1"
            >
              <X size={18} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-teal text-teal-foreground shadow-lg mb-3">
                <Key size={22} />
              </div>
              <h3 className="text-lg font-bold text-foreground">Owner / Admin Access</h3>
              <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                Enter your secret passcode to edit and customize all sections directly from the app.
              </p>
            </div>

            <form onSubmit={handleUnlockSubmit} className="mt-5 space-y-3">
              <div>
                <input
                  type="password"
                  autoFocus
                  placeholder="Enter passcode..."
                  value={passInput}
                  onChange={(e) => {
                    setPassInput(e.target.value);
                    setPassError("");
                  }}
                  className="w-full px-4 py-2.5 text-sm rounded-xl bg-card border border-border focus:border-primary focus:outline-none text-foreground text-center tracking-wider"
                />
                {passError && (
                  <p className="text-xs text-destructive mt-1.5 text-center font-medium">
                    {passError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-teal text-teal-foreground text-xs font-bold shadow-md hover:scale-[1.02] transition-transform"
              >
                Unlock & Edit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
