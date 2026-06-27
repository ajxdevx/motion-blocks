import { motion } from "framer-motion";
import { ScrollReveal } from "../../ScrollReveal";
import { cn } from "../../../utils/cn";
import { staggerContainer } from "../../../utils/motionPresets";

export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export interface TeamProps {
  members: TeamMember[];
  className?: string;
  title?: string;
}

export function Team({ members, className, title }: TeamProps) {
  return (
    <section className={cn("mx-auto max-w-6xl", className)}>
      {title && (
        <ScrollReveal animation="slide-up" className="mb-12 text-center">
          <h2 className="text-3xl font-bold">{title}</h2>
        </ScrollReveal>
      )}
      <motion.div
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        {members.map((member, index) => (
          <motion.div
            key={index}
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
            className="text-center"
          >
            <img
              src={member.image}
              alt={member.name}
              className="mx-auto h-32 w-32 rounded-full object-cover"
            />
            <h3 className="mt-4 font-semibold">{member.name}</h3>
            <p className="text-sm text-neutral-500">{member.role}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
