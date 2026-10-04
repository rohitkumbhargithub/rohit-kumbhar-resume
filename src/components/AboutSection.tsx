import { useState } from "react";
import { Code, Server, Database, Briefcase, GraduationCap, BookOpen, Layers } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { usePortfolio } from "@/context/PortfolioContext";
import EditSectionBadge from "./admin/EditSectionBadge";

const tabs = [
  { id: "skills", label: "Tech Stack", icon: Code },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "courses", label: "Courses", icon: BookOpen },
] as const;

function getCategoryIcon(category: string) {
  const lower = category.toLowerCase();
  if (lower.includes("backend") || lower.includes("server") || lower.includes("api")) return Server;
  if (lower.includes("data") || lower.includes("sql") || lower.includes("mongo")) return Database;
  if (lower.includes("tool") || lower.includes("devops") || lower.includes("cloud")) return Layers;
  return Code;
}

export default function AboutSection() {
  const [active, setActive] = useState<typeof tabs[number]["id"]>("skills");
  const { portfolio } = usePortfolio();
  const { about } = portfolio;

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <EditSectionBadge sectionTab="about" title="About & Experience" />

      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="text-center text-3xl font-extrabold text-foreground md:text-4xl">
            {about.heading}{" "}
            <span className="text-gradient">{about.highlightedText}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            {about.bio}
          </p>
        </ScrollReveal>

        {/* Tabs */}
        <ScrollReveal delay={100}>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActive(id)}
                className={`flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  active === id
                    ? "bg-gradient-teal text-teal-foreground shadow-lg shadow-primary/25 scale-105"
                    : "bg-card text-muted-foreground hover:text-foreground border border-border hover:border-primary/30"
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Content */}
        <div className="mt-10" key={active}>
          {active === "skills" && (
            <div className="grid gap-6 md:grid-cols-3">
              {about.skills.map((s, i) => {
                const IconComponent = getCategoryIcon(s.category);
                return (
                  <ScrollReveal key={s.id || s.category} delay={i * 100}>
                    <div className="gradient-border-card glass-card rounded-2xl p-8 hover-lift h-full">
                      <div className="flex items-center gap-4 mb-6 m-2">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-teal text-teal-foreground shadow-lg shadow-primary/20">
                          <IconComponent size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-foreground">{s.category}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {s.items.map((item) => (
                          <span
                            key={item}
                            className="rounded-full bg-accent/80 backdrop-blur-sm px-4 py-1.5 text-xs font-medium text-accent-foreground border border-primary/10"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          )}

          {active === "experience" && (
            <div className="relative ml-4 border-l-2 border-primary/30 pl-8 space-y-8 ">
              {about.experiences.map((e, i) => (
                <ScrollReveal key={e.id || i} delay={i * 150}>
                  <div className="relative">
                    <div className="absolute -left-[41px] top-1 h-4 w-4 rounded-full bg-gradient-teal border-4 border-background shadow-lg shadow-primary/30" />
                    <div className="gradient-border-card glass-card rounded-2xl p-8 hover-lift">
                      <div className="p-2">
                        <h3 className="font-bold text-foreground">{e.role}</h3>
                        <p className="text-sm text-primary font-medium">{e.company}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {e.location} · {e.period}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}

          {active === "education" && (
            <div className="grid gap-6 md:grid-cols-2">
              {about.educations.map((e, i) => (
                <ScrollReveal key={e.id || i} delay={i * 100}>
                  <div className="gradient-border-card glass-card rounded-2xl p-8 hover-lift">
                    <div className="p-2">
                      <GraduationCap className="text-primary mb-3" size={28} />
                      <h3 className="font-bold text-foreground">{e.degree}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{e.institution}</p>
                      <p className="text-xs text-primary font-semibold mt-2">{e.year}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}

          {active === "courses" && (
            <div className="grid gap-6 md:grid-cols-2">
              {about.courses.map((c, i) => (
                <ScrollReveal key={c.id || i} delay={i * 100}>
                  <div className="gradient-border-card glass-card rounded-2xl p-8 hover-lift">
                    <div className="p-2">
                      <BookOpen className="text-primary mb-3" size={28} />
                      <h3 className="font-bold text-foreground">{c.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{c.provider}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
