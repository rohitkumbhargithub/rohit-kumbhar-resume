import { Monitor, Server, Layers } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const services = [
  {
    icon: Monitor,
    title: "Frontend Development",
    desc: "Develop user-facing features using HTML, CSS, and JavaScript with responsive and adaptive design.",
    gradient: "from-[oklch(0.72_0.17_185)] to-[oklch(0.60_0.15_200)]",
  },
  {
    icon: Server,
    title: "Backend Development",
    desc: "Develop and maintain server-side applications using Node.js and Express.js with RESTful APIs.",
    gradient: "from-[oklch(0.65_0.18_280)] to-[oklch(0.55_0.15_260)]",
  },
  {
    icon: Layers,
    title: "MERN Development",
    desc: "Full-stack web applications using the MERN stack with React.js interfaces and MongoDB databases.",
    gradient: "from-[oklch(0.70_0.18_30)] to-[oklch(0.60_0.16_15)]",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="section-padding relative overflow-hidden">
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
          {services.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 120}>
              <div className="group gradient-border-card glass-card rounded-3xl p-8 text-center hover-lift cursor-default relative overflow-hidden">
                <div className="p-2">
                  {/* Hover glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${s.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  <div className="relative">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-teal text-teal-foreground shadow-lg shadow-primary/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-xl group-hover:shadow-primary/30">
                      <s.icon size={28} />
                    </div>
                    <h3 className="mt-6 text-lg font-bold text-foreground">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
