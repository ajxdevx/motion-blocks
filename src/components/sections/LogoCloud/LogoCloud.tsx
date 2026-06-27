import { motion } from "framer-motion";
import { ScrollReveal } from "../../ScrollReveal";
import { cn } from "../../../utils/cn";

export interface LogoItem {
  src: string;
  alt: string;
}

export interface LogoCloudProps {
  logos: LogoItem[];
  className?: string;
  title?: string;
}

export function LogoCloud({ logos, className, title }: LogoCloudProps) {
  return (
    <section className={cn("mx-auto max-w-5xl", className)}>
      {title && (
        <ScrollReveal animation="fade" className="mb-8 text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-neutral-500">
            {title}
          </p>
        </ScrollReveal>
      )}
      <ScrollReveal animation="fade">
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {logos.map((logo, index) => (
            <motion.img
              key={index}
              src={logo.src}
              alt={logo.alt}
              className="h-8 w-auto opacity-50 grayscale transition-all hover:opacity-100 hover:grayscale-0"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 0.5, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ opacity: 1 }}
            />
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
