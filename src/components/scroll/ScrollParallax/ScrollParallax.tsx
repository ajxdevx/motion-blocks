import { motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { useElementParallax } from "../../../hooks/useParallax";
import { cn } from "../../../utils/cn";

export interface ScrollParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export function ScrollParallax({
  children,
  className,
  speed = 0.5,
}: ScrollParallaxProps) {
  const [ref, framerOffset] = useElementParallax<HTMLDivElement>(speed);
  const [gsapActive, setGsapActive] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    async function initGsap() {
      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

        if (cancelled || !ref.current) return;

        gsap.registerPlugin(ScrollTrigger);
        setGsapActive(true);

        ctx = gsap.context(() => {
          gsap.to(ref.current, {
            y: speed * -100,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }, ref);
      } catch {
        setGsapActive(false);
      }
    }

    initGsap();

    return () => {
      cancelled = true;
      ctx?.revert();
      setGsapActive(false);
    };
  }, [speed]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <motion.div ref={ref} style={gsapActive ? undefined : { y: framerOffset }}>
        {children}
      </motion.div>
    </div>
  );
}
