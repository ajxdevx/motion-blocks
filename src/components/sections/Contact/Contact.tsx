import { motion } from "framer-motion";
import { ScrollReveal } from "../../ScrollReveal";
import { cn } from "../../../utils/cn";
import type { FormEvent, ReactNode } from "react";

export interface ContactField {
  name: string;
  label: string;
  type?: "text" | "email" | "textarea";
  placeholder?: string;
}

export interface ContactProps {
  fields?: ContactField[];
  children?: ReactNode;
  className?: string;
  title?: string;
  onSubmit?: (data: Record<string, string>) => void;
}

export function Contact({ fields, children, className, title, onSubmit }: ContactProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!onSubmit || !fields) return;

    const formData = new FormData(event.currentTarget);
    const data: Record<string, string> = {};
    fields.forEach((field) => {
      data[field.name] = (formData.get(field.name) as string) ?? "";
    });
    onSubmit(data);
  };

  return (
    <ScrollReveal animation="slide-up" className={cn("mx-auto max-w-xl", className)}>
      {title && <h2 className="mb-8 text-center text-3xl font-bold">{title}</h2>}
      {children ?? (
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {fields?.map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name} className="mb-1 block text-sm font-medium">
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  rows={4}
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-violet-500"
                />
              ) : (
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type ?? "text"}
                  placeholder={field.placeholder}
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-violet-500"
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-700"
          >
            Send message
          </button>
        </motion.form>
      )}
    </ScrollReveal>
  );
}
