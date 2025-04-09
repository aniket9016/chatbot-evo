import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState } from "react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      whileHover={{ 
        y: -8, 
        boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.15)",
        scale: 1.02
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="cursor-pointer"
    >
      <Card className="border border-gray-100 h-full overflow-hidden">
        <CardContent className="p-6 relative">
          <motion.div 
            className={`absolute inset-0 bg-primary-50 opacity-0 z-0 rounded-lg`}
            animate={{ opacity: isHovered ? 0.5 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          <motion.div 
            className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 relative z-10"
            animate={{ 
              rotate: isHovered ? 5 : 0,
              scale: isHovered ? 1.1 : 1,
              backgroundColor: isHovered ? 'var(--primary-200)' : 'var(--primary-100)'
            }}
            transition={{ duration: 0.3 }}
          >
            <Icon className="text-primary h-6 w-6" />
          </motion.div>
          
          <motion.h3 
            className="text-xl font-bold mb-3 relative z-10"
            animate={{ 
              color: isHovered ? 'var(--primary)' : 'var(--foreground)',
              x: isHovered ? 3 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h3>
          
          <motion.p 
            className="text-gray-600 relative z-10"
            animate={{ opacity: isHovered ? 0.9 : 0.7 }}
            transition={{ duration: 0.3 }}
          >
            {description}
          </motion.p>
          
          <motion.div 
            className="absolute bottom-2 right-2 h-12 w-12 rounded-full bg-primary"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: isHovered ? 6 : 0,
              opacity: isHovered ? 0.03 : 0
            }}
            transition={{ duration: 0.5 }}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}
