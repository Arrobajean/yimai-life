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
      xs: "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1400px",
      "3xl": "1920px",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        ohanna: {
          pink: "hsl(var(--ohanna-pink))",
          lime: "hsl(var(--ohanna-lime))",
          mint: "hsl(var(--ohanna-mint))",
          turquoise: "hsl(var(--ohanna-turquoise))",
        },
      },
      backgroundImage: {
        "gradient-soft": "var(--gradient-soft)",
        "gradient-calm": "var(--gradient-calm)",
        "gradient-hero": "var(--gradient-hero)",
        "gradient-gift": "var(--gradient-gift)",
        "gradient-products": "var(--gradient-products)",
        "gradient-trust": "var(--gradient-trust)",
        "gradient-how": "var(--gradient-how)",
        "gradient-brands": "var(--gradient-brands)",
        "gradient-newsletter": "var(--gradient-newsletter)",
        // Gradientes simples para alternar blanco y pastel
        "gradient-hero-simple": "var(--gradient-hero-simple)",
        "gradient-gift-simple": "var(--gradient-gift-simple)",
        "gradient-categories-simple": "var(--gradient-categories-simple)",
        "gradient-featuredproducts-simple":
          "var(--gradient-featuredproducts-simple)",
        "gradient-trust-simple": "var(--gradient-trust-simple)",
        "gradient-how-simple": "var(--gradient-how-simple)",
        "gradient-brands-simple": "var(--gradient-brands-simple)",
        "gradient-newsletter-simple": "var(--gradient-newsletter-simple)",
        "gradient-brands-to-white-simple":
          "linear-gradient(180deg, #fff 0%, hsl(var(--ohanna-turquoise)) 100%)",
        "gradient-mint-to-white-simple":
          "linear-gradient(180deg, hsl(var(--ohanna-mint) / 0.28) 0%, hsl(var(--background)) 100%)",
        "gradient-mint-to-dark-simple":
          "linear-gradient(180deg, hsl(210, 20%, 20%) 0%, hsl(var(--background)) 100%)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        elegant: "var(--shadow-elegant)",
      },
      transitionTimingFunction: {
        smooth: "var(--transition-smooth)",
      },
      transitionDuration: {
        "300": "300ms",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        scroll: {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(-50%)",
          },
        },
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
        "10xl": ["3rem", { lineHeight: "1.1" }],
        "11xl": ["3.5rem", { lineHeight: "1.1" }],
        "12xl": ["4rem", { lineHeight: "1.1" }],
        "13xl": ["4.5rem", { lineHeight: "1.1" }],
        "14xl": ["5rem", { lineHeight: "1.1" }],
        "15xl": ["5.5rem", { lineHeight: "1.1" }],
        "16xl": ["6rem", { lineHeight: "1.1" }],
        "17xl": ["6.5rem", { lineHeight: "1.1" }],
        "18xl": ["7rem", { lineHeight: "1.1" }],
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        scroll: "scroll 30s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
