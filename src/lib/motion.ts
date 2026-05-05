export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const, delay },
  }),
};

export const iconHover = {
  whileHover: { scale: 1.18, y: -3 },
  transition: { type: "spring" as const, stiffness: 380, damping: 15 },
};
