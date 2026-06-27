import { motion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useMousePosition } from "../../../hooks/useMousePosition";
import { cn } from "../../../utils/cn";
import { isTouchDevice } from "../../../utils/viewportHelpers";

export interface ImageFollowCursorProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  offset?: { x: number; y: number };
  size?: number;
}

export function ImageFollowCursor({
  src,
  alt,
  className,
  imageClassName,
  offset = { x: 20, y: 20 },
  size = 120,
}: ImageFollowCursorProps) {
  const { x, y } = useMousePosition();
  const springX = useSpring(0, { stiffness: 200, damping: 25 });
  const springY = useSpring(0, { stiffness: 200, damping: 25 });
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    setTouch(isTouchDevice());
  }, []);

  useEffect(() => {
    springX.set(x + offset.x);
    springY.set(y + offset.y);
  }, [x, y, offset.x, offset.y, springX, springY]);

  if (touch) {
    return (
      <img
        src={src}
        alt={alt}
        className={cn("rounded-xl object-cover shadow-lg", imageClassName)}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <motion.img
      src={src}
      alt={alt}
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-50 rounded-xl object-cover shadow-lg",
        className,
        imageClassName,
      )}
      style={{ x: springX, y: springY, width: size, height: size }}
    />
  );
}
