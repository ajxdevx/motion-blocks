import {
  cloneElement,
  isValidElement,
  useCallback,
  useRef,
  type MouseEvent,
  type ReactElement,
} from "react";
import { motion, useSpring } from "framer-motion";
import { cn } from "../../utils/cn";
import type { MagneticButtonProps } from "./MagneticButton.types";

export function MagneticButton({
  children,
  strength = 0.3,
  className,
  disabled = false,
  asChild = false,
  onClick,
}: MagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
  const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      if (disabled) return;

      const element = asChild ? containerRef.current : buttonRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      x.set((event.clientX - centerX) * strength);
      y.set((event.clientY - centerY) * strength);
    },
    [asChild, disabled, strength, x, y],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const sharedClassName = cn(
    "inline-flex items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    disabled && "pointer-events-none opacity-50",
    className,
  );

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{
      className?: string;
      onClick?: MagneticButtonProps["onClick"];
    }>;

    return (
      <motion.div
        ref={containerRef}
        style={disabled ? undefined : { x, y }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
      >
        {cloneElement(child, {
          className: cn(child.props.className, sharedClassName),
          onClick: onClick ?? child.props.onClick,
        })}
      </motion.div>
    );
  }

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      disabled={disabled}
      style={disabled ? undefined : { x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={sharedClassName}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.button>
  );
}
