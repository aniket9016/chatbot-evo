import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  isLast: boolean;
  isRight: boolean;
  isPresent?: boolean;
}

export default function TimelineItem({ 
  year, 
  title, 
  description, 
  isLast, 
  isRight, 
  isPresent = false 
}: TimelineItemProps) {
  return (
    <motion.div 
      className="relative mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: isRight ? 0.2 : 0 }}
    >
      <div className="flex flex-col md:flex-row items-start">
        {/* Left side content */}
        <div className={`flex-1 ${isRight ? 'md:text-right md:pr-10 order-2 md:order-1' : 'md:pr-10 order-2'}`}>
          {!isRight && <div className="md:hidden text-sm font-semibold text-primary mb-2">{year}</div>}
          {isRight && (
            <Card className={`
              p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100
              ${isPresent ? 'bg-primary-50 border-primary-100' : 'bg-gray-50'}
            `}>
              <h3 className="font-bold text-lg mb-2">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </Card>
          )}
        </div>
        
        {/* Center timeline point */}
        <div className="absolute md:left-1/2 left-0 flex items-center justify-center">
          <div className={`
            w-10 h-10 rounded-full border-4 border-white flex items-center justify-center z-10 shadow
            ${isPresent ? 'bg-primary' : 'bg-primary-100'}
          `}>
            <span className={`text-xs font-bold ${isPresent ? 'text-white' : 'text-primary'}`}>{year}</span>
          </div>
        </div>
        
        {/* Right side content */}
        <div className={`flex-1 ${isRight ? 'md:pl-10 md:order-2 order-1 pb-4 md:pb-0' : 'md:pl-10 order-1 md:order-2'}`}>
          {isRight && <div className="md:hidden text-sm font-semibold text-primary mb-2">{year}</div>}
          {!isRight && (
            <Card className={`
              p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100
              ${isPresent ? 'bg-primary-50 border-primary-100' : 'bg-gray-50'}
            `}>
              <h3 className="font-bold text-lg mb-2">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </Card>
          )}
        </div>
      </div>
      
      {/* Vertical line extending to next item */}
      {!isLast && (
        <div className="absolute left-0 md:left-1/2 top-10 bottom-0 w-0.5 h-[calc(100%+4rem)] bg-gray-200 transform md:translate-x-px"></div>
      )}
    </motion.div>
  );
}
