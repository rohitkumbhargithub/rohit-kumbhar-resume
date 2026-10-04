import { ThemePresetKey } from "@/types/portfolio";

export interface ColorPresetDef {
  id: ThemePresetKey;
  name: string;
  previewColor: string; // CSS color string for UI dot
  light: {
    primary: string;
    teal: string;
    tealLight: string;
    tealDark: string;
    ring: string;
    accent: string;
  };
  dark: {
    primary: string;
    teal: string;
    tealLight: string;
    tealDark: string;
    ring: string;
    accent: string;
  };
}

export const THEME_PRESETS: Record<ThemePresetKey, ColorPresetDef> = {
  teal: {
    id: "teal",
    name: "Cyber Teal",
    previewColor: "#14b8a6",
    light: {
      primary: "oklch(0.72 0.17 185)",
      teal: "oklch(0.72 0.17 185)",
      tealLight: "oklch(0.85 0.12 185)",
      tealDark: "oklch(0.55 0.15 185)",
      ring: "oklch(0.72 0.17 185)",
      accent: "oklch(0.92 0.04 185)",
    },
    dark: {
      primary: "oklch(0.78 0.15 175)",
      teal: "oklch(0.78 0.15 175)",
      tealLight: "oklch(0.85 0.12 175)",
      tealDark: "oklch(0.60 0.15 180)",
      ring: "oklch(0.72 0.15 185)",
      accent: "oklch(0.25 0.04 185)",
    },
  },
  emerald: {
    id: "emerald",
    name: "Emerald Mint",
    previewColor: "#10b981",
    light: {
      primary: "oklch(0.70 0.18 155)",
      teal: "oklch(0.70 0.18 155)",
      tealLight: "oklch(0.84 0.13 155)",
      tealDark: "oklch(0.52 0.16 155)",
      ring: "oklch(0.70 0.18 155)",
      accent: "oklch(0.92 0.05 155)",
    },
    dark: {
      primary: "oklch(0.78 0.16 150)",
      teal: "oklch(0.78 0.16 150)",
      tealLight: "oklch(0.86 0.13 150)",
      tealDark: "oklch(0.60 0.15 150)",
      ring: "oklch(0.72 0.16 150)",
      accent: "oklch(0.25 0.05 150)",
    },
  },
  violet: {
    id: "violet",
    name: "Electric Violet",
    previewColor: "#8b5cf6",
    light: {
      primary: "oklch(0.66 0.23 290)",
      teal: "oklch(0.66 0.23 290)",
      tealLight: "oklch(0.80 0.17 290)",
      tealDark: "oklch(0.50 0.20 290)",
      ring: "oklch(0.66 0.23 290)",
      accent: "oklch(0.92 0.05 290)",
    },
    dark: {
      primary: "oklch(0.74 0.20 290)",
      teal: "oklch(0.74 0.20 290)",
      tealLight: "oklch(0.82 0.15 290)",
      tealDark: "oklch(0.58 0.19 290)",
      ring: "oklch(0.70 0.20 290)",
      accent: "oklch(0.26 0.06 290)",
    },
  },
  blue: {
    id: "blue",
    name: "Ocean Azure",
    previewColor: "#3b82f6",
    light: {
      primary: "oklch(0.66 0.20 250)",
      teal: "oklch(0.66 0.20 250)",
      tealLight: "oklch(0.80 0.15 250)",
      tealDark: "oklch(0.50 0.18 250)",
      ring: "oklch(0.66 0.20 250)",
      accent: "oklch(0.92 0.04 250)",
    },
    dark: {
      primary: "oklch(0.74 0.18 250)",
      teal: "oklch(0.74 0.18 250)",
      tealLight: "oklch(0.82 0.13 250)",
      tealDark: "oklch(0.58 0.17 250)",
      ring: "oklch(0.70 0.18 250)",
      accent: "oklch(0.26 0.05 250)",
    },
  },
  rose: {
    id: "rose",
    name: "Neon Rose",
    previewColor: "#f43f5e",
    light: {
      primary: "oklch(0.66 0.23 15)",
      teal: "oklch(0.66 0.23 15)",
      tealLight: "oklch(0.80 0.16 15)",
      tealDark: "oklch(0.50 0.20 15)",
      ring: "oklch(0.66 0.23 15)",
      accent: "oklch(0.92 0.05 15)",
    },
    dark: {
      primary: "oklch(0.74 0.20 15)",
      teal: "oklch(0.74 0.20 15)",
      tealLight: "oklch(0.82 0.15 15)",
      tealDark: "oklch(0.58 0.19 15)",
      ring: "oklch(0.70 0.20 15)",
      accent: "oklch(0.26 0.06 15)",
    },
  },
  amber: {
    id: "amber",
    name: "Sunset Amber",
    previewColor: "#f59e0b",
    light: {
      primary: "oklch(0.72 0.19 55)",
      teal: "oklch(0.72 0.19 55)",
      tealLight: "oklch(0.84 0.14 55)",
      tealDark: "oklch(0.56 0.17 55)",
      ring: "oklch(0.72 0.19 55)",
      accent: "oklch(0.92 0.05 55)",
    },
    dark: {
      primary: "oklch(0.78 0.17 55)",
      teal: "oklch(0.78 0.17 55)",
      tealLight: "oklch(0.85 0.13 55)",
      tealDark: "oklch(0.60 0.16 55)",
      ring: "oklch(0.72 0.17 55)",
      accent: "oklch(0.26 0.05 55)",
    },
  },
  cyan: {
    id: "cyan",
    name: "Hyper Cyan",
    previewColor: "#06b6d4",
    light: {
      primary: "oklch(0.72 0.18 215)",
      teal: "oklch(0.72 0.18 215)",
      tealLight: "oklch(0.84 0.13 215)",
      tealDark: "oklch(0.54 0.16 215)",
      ring: "oklch(0.72 0.18 215)",
      accent: "oklch(0.92 0.04 215)",
    },
    dark: {
      primary: "oklch(0.78 0.16 215)",
      teal: "oklch(0.78 0.16 215)",
      tealLight: "oklch(0.85 0.12 215)",
      tealDark: "oklch(0.60 0.15 215)",
      ring: "oklch(0.72 0.16 215)",
      accent: "oklch(0.25 0.04 215)",
    },
  },
};

let customStyleTag: HTMLStyleElement | null = null;

export function applyThemePreset(presetKey: ThemePresetKey) {
  const preset = THEME_PRESETS[presetKey] || THEME_PRESETS.teal;

  const css = `
    :root {
      --primary: ${preset.light.primary};
      --teal: ${preset.light.teal};
      --teal-light: ${preset.light.tealLight};
      --teal-dark: ${preset.light.tealDark};
      --ring: ${preset.light.ring};
      --accent: ${preset.light.accent};
      --sidebar-primary: ${preset.light.primary};
    }
    .dark {
      --primary: ${preset.dark.primary};
      --teal: ${preset.dark.teal};
      --teal-light: ${preset.dark.tealLight};
      --teal-dark: ${preset.dark.tealDark};
      --ring: ${preset.dark.ring};
      --accent: ${preset.dark.accent};
      --sidebar-primary: ${preset.dark.primary};
    }
  `;

  if (typeof document !== "undefined") {
    if (!customStyleTag) {
      customStyleTag = document.getElementById("portfolio-dynamic-theme") as HTMLStyleElement;
      if (!customStyleTag) {
        customStyleTag = document.createElement("style");
        customStyleTag.id = "portfolio-dynamic-theme";
        document.head.appendChild(customStyleTag);
      }
    }
    customStyleTag.textContent = css;
  }
}
