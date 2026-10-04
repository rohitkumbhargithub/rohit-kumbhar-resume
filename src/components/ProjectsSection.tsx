import { ExternalLink, Github } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { usePortfolio } from "@/context/PortfolioContext";
import EditSectionBadge from "./admin/EditSectionBadge";

export default function ProjectsSection() {
  const { portfolio } = usePortfolio();
  const { projects } = portfolio;

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      <EditSectionBadge sectionTab="projects" title="Projects" />

      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="text-center text-3xl font-extrabold text-foreground md:text-4xl">
            Latest <span className="text-gradient">Projects</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
            A selection of projects showcasing my full-stack development skills.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {projects.map((p, i) => {
            const gradient = p.gradient || "from-[oklch(0.72_0.17_185)] to-[oklch(0.55_0.15_200)]";
            return (
              <ScrollReveal key={p.id || p.title} delay={i * 100}>
                <div className="group gradient-border-card glass-card rounded-3xl overflow-hidden hover-lift h-full flex flex-col justify-between">
                  <div>
                    {/* Gradient header */}
                    <div className={`h-44 bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent_70%)]" />
                      {/* Floating shapes */}
                      <div className="absolute top-4 right-4 w-20 h-20 border border-white/20 rounded-2xl rotate-12 group-hover:rotate-45 transition-transform duration-700" />
                      <div className="absolute bottom-4 left-4 w-12 h-12 border border-white/15 rounded-full group-hover:scale-150 transition-transform duration-700" />
                      <div className="relative flex flex-col items-center gap-2">
                        <span className="text-4xl">{p.emoji || "🚀"}</span>
                        <span className="text-2xl font-extrabold text-white/90 tracking-tight">
                          {p.title.split(" ")[0]}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-foreground">{p.title}</h3>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full bg-accent/80 backdrop-blur-sm border border-primary/10 px-3 py-1 text-xs font-medium text-accent-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Project Links */}
                  <div className="p-6 pt-0">
                    <div className="relative z-10 mt-2 flex items-center gap-4 pt-4 border-t border-primary/10">
                      {p.liveLink && (
                        <a
                          href={p.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary px-4 py-1.5 text-xs font-bold transition-all duration-200 hover:scale-105"
                        >
                          <ExternalLink size={13} />
                          Live Demo
                        </a>
                      )}
                      {p.githubLink && (
                        <a
                          href={p.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 rounded-full bg-accent hover:bg-accent/80 text-accent-foreground px-4 py-1.5 text-xs font-bold transition-all duration-200 hover:scale-105"
                        >
                          <Github size={13} />
                          Source Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
