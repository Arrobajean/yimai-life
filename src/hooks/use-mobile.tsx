import * as React from "react";

const MOBILE_BREAKPOINT = 1024;
const SMALL_MOBILE_BREAKPOINT = 375; // iPhone SE, iPhone 14, etc.

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < MOBILE_BREAKPOINT;
  });

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };
    mql.addEventListener("change", onChange, {
      passive: true,
    } as AddEventListenerOptions);
    setIsMobile(mql.matches);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}

export function useIsSmallMobile() {
  const [isSmallMobile, setIsSmallMobile] = React.useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < SMALL_MOBILE_BREAKPOINT;
  });

  React.useEffect(() => {
    const mql = window.matchMedia(
      `(max-width: ${SMALL_MOBILE_BREAKPOINT - 1}px)`
    );
    const onChange = (e: MediaQueryListEvent) => {
      setIsSmallMobile(e.matches);
    };
    mql.addEventListener("change", onChange, {
      passive: true,
    } as AddEventListenerOptions);
    setIsSmallMobile(mql.matches);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isSmallMobile;
}
