import React from "react";
import { ExternalLink, Calendar, Tag, Sparkles } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { usePortfolio } from "@/context/PortfolioContext";
import { CustomSection } from "@/types/portfolio";

export default function CustomSectionsRenderer() {
  const { portfolio, isEditMode, openEditorToSection } = usePortfolio();
  const customSections = portfolio.customSections || [];

  if (customSections.length === 0) return null;

  return (
    <>
      {customSections.map((section: CustomSection) => {
        if (!section.visible && !isEditMode) return null;

        return (
          <section
            key={section.id}
            id={section.slug || `section-${section.id}`}
            className={`section-padding relative overflow-hidden ${
              !section.visible && isEditMode ? "opacity-60 border-2 border-dashed border-amber-500/30" : ""
            }`}
          >
            {/* Edit badge if edit mode is active */}
            {isEditMode && (
              <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
                {!section.visible && (
                  <span className="text-[11px] font-semibold bg-amber-500/20 text-amber-500 px-3 py-1 rounded-full border border-amber-500/30">
                    Hidden from visitors
                  </span>
                )}
                <button
                  onClick={() => openEditorToSection("sections")}
                  className="flex items-center gap-1.5 rounded-full bg-primary/95 text-primary-foreground px-4 py-2 text-xs font-bold shadow-xl backdrop-blur-md border border-white/20 transition-all hover:scale-105 hover:bg-primary active:scale-95"
                >
                  <Sparkles size={13} />
                  <span>Edit {section.title}</span>
                </button>
              </div>
            )}

            {/* Background decoration */}
            <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative mx-auto max-w-6xl">
              <ScrollReveal>
                <h2 className="text-center text-3xl font-extrabold text-foreground md:text-4xl">
                  {section.title}{" "}
                  {section.highlightWord && (
                    <span className="text-gradient">{section.highlightWord}</span>
                  )}
                </h2>
                {section.description && (
                  <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
                    {section.description}
                  </p>
                )}
              </ScrollReveal>

              {/* Items */}
              {section.items && section.items.length > 0 && (
                <div
                  className={`mt-14 ${
                    section.layout === "list"
                      ? "max-w-3xl mx-auto space-y-6"
                      : "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                  }`}
                >
                  {section.items.map((item, idx) => (
                    <ScrollReveal key={item.id || idx} delay={idx * 100}>
                      <div className="group gradient-border-card glass-card rounded-2xl p-6 sm:p-7 hover-lift h-full flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                              {item.title}
                            </h3>
                            {item.date && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full shrink-0">
                                <Calendar size={11} /> {item.date}
                              </span>
                            )}
                          </div>

                          {item.subtitle && (
                            <p className="text-xs font-medium text-primary mb-3">
                              {item.subtitle}
                            </p>
                          )}

                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>

                          {item.tags && item.tags.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-1.5">
                              {item.tags.map((tag, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="inline-flex items-center gap-1 text-[11px] font-medium text-accent-foreground bg-accent/80 px-2.5 py-0.5 rounded-full border border-primary/10"
                                >
                                  <Tag size={10} /> {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {item.link && (
                          <div className="mt-6 pt-4 border-t border-primary/10">
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline hover:scale-105 transition-transform"
                            >
                              <span>{item.linkText || "Learn More"}</span>
                              <ExternalLink size={12} />
                            </a>
                          </div>
                        )}
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              )}
            </div>
          </section>
        );
      })}
    </>
  );
}
