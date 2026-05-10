import { Github, Linkedin, Twitter, Mail, MapPin, Heart, ArrowUp } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export default function FooterSection() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-card border-t border-border">
      {/* Gradient top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="section-padding mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <h3 className="text-2xl font-extrabold text-gradient">Portfolio</h3>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                Full Stack Developer passionate about building scalable web applications
                and delivering exceptional user experiences.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg text-foreground">Quick Links</h4>
              <div className="mt-4 flex flex-col gap-2">
                {["Home", "About", "Services", "Projects"].map((l) => (
                  <a
                    key={l}
                    href={`#${l.toLowerCase()}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {l}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg text-foreground">Get in Touch</h4>
              <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                <p className="flex items-center gap-2"><Mail size={14} className="text-primary" /> rohitkumbhar956@gmail.com</p>
                <p className="flex items-center gap-2"><MapPin size={14} className="text-primary" /> Kolhapur, Maharashtra</p>
              </div>
              <div className="mt-6 flex gap-3">
                {[
                  { icon: Twitter, href: "https://twitter.com" },
                  { icon: Github, href: "https://github.com" },
                  { icon: Linkedin, href: "https://linkedin.com" },
                ].map(({ icon: Icon, href }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:bg-primary hover:border-primary hover:text-primary-foreground hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-12 flex items-center justify-between border-t border-border pt-6">
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            Made with <Heart size={12} className="text-primary" /> by Rohit Kumbhar &copy; 2025
          </p>
          <a
            href="#home"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all hover:shadow-lg hover:shadow-primary/20"
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
