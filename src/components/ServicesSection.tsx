import { Monitor, Server, Layers, Cpu } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { usePortfolio } from "@/context/PortfolioContext";
import EditSectionBadge from "./admin/EditSectionBadge";

function getServiceIcon(index: number, title: string) {
  const lower = title.toLowerCase();
  if (lower.includes("front") || lower.includes("ui") || lower.includes("web")) return Monitor;
  if (lower.includes("back") || lower.includes("api") || lower.includes("server")) return Server;
  if (lower.includes("mern") || lower.includes("full") || lower.includes("stack")) return Layers;
  const icons = [Monitor, Server, Layers, Cpu];
  return icons[index % icons.length];
}

export default function ServicesSection() {
  const { portfolio } = usePortfolio();
  const { services } = portfolio;

  return (
    <section id="services" className="section-padding relative overflow-hidden">
      <EditSectionBadge sectionTab="services" title="Services" />

      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="text-center text-3xl font-extrabold text-foreground md:text-4xl">
            My <span className="text-gradient">Services</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
            I offer professional web development services to bring your ideas to life.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {services.map((s, i) => {
            const Icon = getServiceIcon(i, s.title);
            const gradient = s.gradient || "from-[oklch(0.72_0.17_185)] to-[oklch(0.60_0.15_200)]";

            return (
              <ScrollReveal key={s.id || s.title} delay={i * 120}>
                <div className="group gradient-border-card glass-card rounded-3xl p-8 text-center hover-lift cursor-default relative overflow-hidden h-full flex flex-col justify-between">
                  <div className="p-2">
                    {/* Hover glow */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    />
                    <div className="relative">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-teal text-teal-foreground shadow-lg shadow-primary/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-xl group-hover:shadow-primary/30">
                        <Icon size={28} />
                      </div>
                      <h3 className="mt-6 text-lg font-bold text-foreground">{s.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
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
