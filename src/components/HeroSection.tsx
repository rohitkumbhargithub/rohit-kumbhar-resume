import { useState, useEffect } from "react";
import { Github, Linkedin, Twitter, ArrowDown } from "lucide-react";
import heroImage from "@/assets/hero-developer-removebg-preview.png";

const titles = ["Full Stack Developer", "MERN Stack Engineer", "React Developer", "Backend Developer"];

export default function HeroSection() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = titles[titleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, titleIndex]);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl animate-morph" />
        <div className="absolute top-1/2 -left-20 w-[400px] h-[400px] bg-teal-light/10 rounded-full blur-3xl animate-morph" style={{ animationDelay: "-4s" }} />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-accent/20 rounded-full blur-3xl animate-float" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col-reverse items-center gap-12 px-6 md:flex-row md:gap-16">
        {/* Text */}
        <div className="flex-1 animate-slide-in-left">
          {/* <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            Available for work
          </div> */}
          <h1 className="mt-6 text-5xl font-extrabold leading-tight text-foreground md:text-7xl">
            Rohit<br />
            <span className="text-gradient">Kumbhar</span>
          </h1>
          <div className="mt-4 h-8 text-xl font-medium text-muted-foreground md:text-2xl">
            <span className="text-gradient">{displayed}</span>
            <span className="ml-0.5 inline-block w-0.5 h-6 bg-primary animate-blink" />
          </div>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
            I am eager to leverage my skills to contribute to innovative web projects
            and deliver exceptional user experiences.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <a
              href="https://drive.google.com/file/d/1WW2zE0fO963wrPom-wa6vNHvE-y2bvxw/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-full bg-gradient-teal px-8 py-3 text-sm font-bold text-teal-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/25 overflow-hidden"
            >
              <span className="relative z-10">View CV</span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-light to-teal opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a
              href="#projects"
              className="rounded-full border-2 border-primary/50 px-8 py-3 text-sm font-bold text-primary transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-lg hover:shadow-primary/20"
            >
              Projects
            </a>
          </div>

          <div className="mt-8 flex gap-4">
            {[
              { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
              { icon: Github, href: "https://github.com", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/50 backdrop-blur-sm text-muted-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:scale-110 hover:border-primary hover:shadow-lg hover:shadow-primary/20"
                aria-label={label}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="flex-1 flex justify-center animate-slide-in-right">
          <div className="relative">
            {/* Rotating gradient ring */}
            <div className="absolute inset-[-20px] rounded-full border-2 border-dashed border-primary/20 animate-spin-slow" />
            <div className="absolute inset-[-40px] rounded-full border border-primary/10 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "30s" }} />
            <div className="absolute inset-0 rounded-full bg-gradient-teal-light opacity-15 blur-3xl scale-125 animate-morph" />
            <img
              src={heroImage}
              alt="Rohit Kumbhar — Full Stack Developer"
              width={800}
              height={800}
              className="relative z-10 w-72 md:w-96 animate-float drop-shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ArrowDown size={16} className="animate-bounce" />
      </a>
    </section>
  );
}
