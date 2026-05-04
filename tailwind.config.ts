import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1400px",
    },
    extend: {
      fontFamily: {
        serif: ["Source Serif 4", "serif"],
        sans: ["Montserrat", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      fontSize: {
        xs: ["0.6875rem", { lineHeight: "1.3" }],
        sm: ["0.75rem", { lineHeight: "1.4" }],
        base: ["0.8125rem", { lineHeight: "1.4" }],
        lg: ["0.875rem", { lineHeight: "1.4" }],
        xl: ["0.9375rem", { lineHeight: "1.4" }],
        "2xl": ["1.125rem", { lineHeight: "1.2" }],
        "3xl": ["1.375rem", { lineHeight: "1.2" }],
        "4xl": ["1.5rem", { lineHeight: "1.2" }],
        "5xl": ["1.625rem", { lineHeight: "1.2" }],
        "6xl": ["1.75rem", { lineHeight: "1.2" }],
        "7xl": ["1.875rem", { lineHeight: "1.2" }],
        "8xl": ["2rem", { lineHeight: "1.2" }],
        "9xl": ["2.5rem", { lineHeight: "1.1" }],
      },

    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
