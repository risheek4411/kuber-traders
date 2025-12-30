import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}

export function Section({ children, className, id, delay = 0 }: SectionProps) {
  return (
    <section id={id} className={cn("py-20 md:py-28 px-4", className)}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
        className="max-w-7xl mx-auto"
      >
        {children}
      </motion.div>
    </section>
  );
}

export function SectionHeader({ title, subtitle, centered = false }: { title: string; subtitle?: string; centered?: boolean }) {
  return (
    <div className={cn("mb-12", centered && "text-center")}>
      <motion.h2 
        className="text-3xl md:text-5xl font-bold text-primary mb-4"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className={cn("h-1 w-24 bg-secondary mt-6 rounded-full", centered && "mx-auto")} />
    </div>
  );
}
