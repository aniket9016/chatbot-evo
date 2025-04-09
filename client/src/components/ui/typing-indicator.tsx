import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot } from "lucide-react";
import { motion } from "framer-motion";

export default function TypingIndicator() {
  return (
    <motion.div 
      className="flex mb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Avatar className="h-8 w-8 bg-primary-100 mr-2 flex-shrink-0">
        <AvatarFallback className="bg-primary-100 text-primary">
          <Bot className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
      
      <div className="p-3 rounded-lg rounded-tl-none shadow-sm bg-white">
        <div className="flex space-x-1">
          <motion.span 
            className="w-2 h-2 bg-gray-400 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ 
              duration: 1,
              repeat: Infinity,
              repeatType: "loop",
              times: [0, 0.5, 1] 
            }}
          />
          <motion.span 
            className="w-2 h-2 bg-gray-400 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ 
              duration: 1,
              repeat: Infinity,
              repeatType: "loop",
              times: [0, 0.5, 1],
              delay: 0.2
            }}
          />
          <motion.span 
            className="w-2 h-2 bg-gray-400 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ 
              duration: 1,
              repeat: Infinity,
              repeatType: "loop",
              times: [0, 0.5, 1],
              delay: 0.4
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
