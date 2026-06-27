import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface PinnedSectionProps {
  children: ReactNode;
  className?: string;
  pinClassName?: string;
  pinSpacing?: boolean;
  minHeight?: number | string;
}

export function PinnedSection({
  children,
  className,
  pinClassName,
  pinSpacing = true,
  minHeight = "100vh",
}: PinnedSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current || !pinRef.current) {
      return;
    }

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    async function initGsap() {
      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

        if (cancelled || !sectionRef.current || !pinRef.current) return;

        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: "+=100%",
            pin: pinRef.current,
            pinSpacing,
            onToggle: (self) => setPinned(self.isActive),
          });
        }, sectionRef);
      } catch {
        setPinned(false);
      }
    }

    initGsap();

    return () => {
      cancelled = true;
      ctx?.revert();
      setPinned(false);
    };
  }, [pinSpacing]);

  return (
    <section
      ref={sectionRef}
      className={cn(className)}
      style={{ minHeight }}
      data-pinned={pinned || undefined}
    >
      <div
        ref={pinRef}
        className={cn(
          !pinned && "sticky top-0",
          pinClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}
