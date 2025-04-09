import { motion } from "framer-motion";
import { ArrowDownIcon } from "lucide-react";

interface NlpStepProps {
  title: string;
  content: React.ReactNode;
  step: number;
  isLast?: boolean;
}

export default function NlpStep({ title, content, step, isLast = false }: NlpStepProps) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.4, delay: step * 0.1 }}
    >
      <div className={`${
        step === 1 
          ? "bg-white" 
          : step === 2 
            ? "bg-primary-50 border-primary-100" 
            : step === 3 
              ? "bg-secondary-50 border-secondary-100" 
              : "bg-white"
      } rounded-lg p-4 shadow-sm border border-gray-200 mb-10 relative z-10`}>
        <h4 className={`font-bold text-sm ${
          step === 2 
            ? "text-primary-700" 
            : step === 3 
              ? "text-secondary-700" 
              : "text-gray-500"
        } mb-2`}>{title}</h4>
        
        {content}
        
        {/* Arrow down */}
        {!isLast && (
          <div className="absolute left-1/2 -bottom-8 transform -translate-x-1/2 text-gray-300">
            <ArrowDownIcon className="h-6 w-6" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
