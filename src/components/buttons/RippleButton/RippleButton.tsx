import { AnimatePresence, motion } from "framer-motion";
import {
  useCallback,
  useRef,
  useState,
  type MouseEvent,
  type MouseEventHandler,
  type ReactNode,
} from "react";
import { cn } from "../../../utils/cn";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export interface RippleButtonProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function RippleButton({
  children,
  className,
  disabled = false,
  onClick,
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleId = useRef(0);

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;

      const rect = buttonRef.current?.getBoundingClientRect();
      if (rect) {
        const id = rippleId.current++;
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        setRipples((current) => [...current, { id, x, y }]);
      }

      onClick?.(event);
    },
    [disabled, onClick],
  );

  const removeRipple = useCallback((id: number) => {
    setRipples((current) => current.filter((ripple) => ripple.id !== id));
  }, []);

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      whileTap={disabled ? undefined : { scale: 0.98 }}
    >
      <span className="relative z-10">{children}</span>
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="pointer-events-none absolute rounded-full bg-white/30"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 10,
              height: 10,
              marginLeft: -5,
              marginTop: -5,
            }}
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 20, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onAnimationComplete={() => removeRipple(ripple.id)}
            aria-hidden="true"
          />
        ))}
      </AnimatePresence>
    </motion.button>
  );
}
