import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

interface ProcessStepProps {
  icon: LucideIcon;
  title: string;
  isLast?: boolean;
  delay?: number;
}

export default function ProcessStep({ 
  icon: Icon, 
  title, 
  isLast = false,
  delay = 0
}: ProcessStepProps) {
  return (
    <motion.div 
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.4, delay }}
    >
      <Card className="p-5 shadow-sm border border-gray-100 text-center mb-4 md:mb-0 w-full md:w-auto">
        <CardContent className="p-0">
          <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon className="text-primary h-5 w-5" />
          </div>
          <h4 className="font-bold">{title}</h4>
        </CardContent>
      </Card>
      
      {!isLast && (
        <>
          <div className="hidden md:block text-primary-300">
            <ArrowRight className="h-6 w-6" />
          </div>
          <div className="block md:hidden text-primary-300 -my-2">
            <ArrowDown className="h-6 w-6" />
          </div>
        </>
      )}
    </motion.div>
  );
}
