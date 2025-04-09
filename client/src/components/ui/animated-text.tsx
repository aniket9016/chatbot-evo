import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  colorClassName?: string;
  highlightIndices?: number[];
  delayMultiplier?: number;
  once?: boolean;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  onHoverHighlight?: boolean;
}

export default function AnimatedText({
  text,
  className = "",
  colorClassName = "text-primary",
  highlightIndices = [],
  delayMultiplier = 0.03,
  once = true,
  tag = 'h2',
  onHoverHighlight = true
}: AnimatedTextProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const letters = text.split("");
  
  const handleMouseEnter = (index: number) => {
    if (onHoverHighlight) {
      setHoveredIndex(index);
    }
  };
  
  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };
  
  // Map HTML tags to their React components
  const Tag = tag;
  
  return (
    <Tag className={cn("flex flex-wrap", className)}>
      {letters.map((letter, index) => {
        // Check if current letter should be highlighted
        const isHighlighted = 
          highlightIndices.includes(index) || 
          hoveredIndex === index;
          
        // Special animation for spaces
        if (letter === " ") {
          return <span key={index} className="mr-[0.2em]"></span>;
        }
        
        return (
          <motion.span
            key={index}
            initial={{ 
              opacity: 0,
              y: 20,
            }}
            whileInView={{ 
              opacity: 1,
              y: 0,
            }}
            viewport={{ once }}
            transition={{ 
              duration: 0.3,
              delay: index * delayMultiplier,
              ease: "easeOut"
            }}
            whileHover={{ 
              scale: 1.3,
              rotate: Math.random() > 0.5 ? 5 : -5,
              transition: { duration: 0.2 }
            }}
            className={cn(
              "inline-block transition-colors cursor-default mx-[0.01em]",
              isHighlighted ? colorClassName : ""
            )}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {letter}
          </motion.span>
        );
      })}
    </Tag>
  );
}