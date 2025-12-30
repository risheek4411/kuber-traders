import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@shared/schema";
import { Flame } from "lucide-react";

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  // Determine spice level color
  const getSpiceColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "high": return "bg-red-600";
      case "medium": return "bg-orange-500";
      default: return "bg-yellow-500";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50 hover:border-primary/20 flex flex-col h-full"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {/* Placeholder for dynamic product image */}
        <img
          src={product.image || "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800&auto=format&fit=crop"} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3">
          <Badge className={`${getSpiceColor(product.spiceLevel)} text-white hover:bg-opacity-90`}>
            {product.spiceLevel} Spice
          </Badge>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <Badge variant="outline" className="text-xs uppercase tracking-wider text-muted-foreground">
            {product.type}
          </Badge>
        </div>
        
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow">
          {product.description}
        </p>

        {product.features && product.features.length > 0 && (
          <div className="pt-4 border-t border-border/50">
            <ul className="grid grid-cols-2 gap-2">
              {product.features.map((feature, i) => (
                <li key={i} className="flex items-center text-xs text-foreground/80 font-medium">
                  <Flame className="w-3 h-3 text-secondary mr-1.5" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
}
