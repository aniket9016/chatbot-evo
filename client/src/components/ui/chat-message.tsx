import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Bot, User, Copy, Check, ThumbsUp, ThumbsDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface ChatMessageProps {
  isBot: boolean;
  message: string;
  className?: string;
}

export default function ChatMessage({ isBot, message, className }: ChatMessageProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [reaction, setReaction] = useState<"like" | "dislike" | null>(null);
  
  // Parse message to handle lists if present
  const hasList = message.includes("\n- ") || message.includes("\n1. ") || message.includes("<li>");
  
  let formattedMessage = message;
  let listItems: string[] = [];
  
  if (hasList && !message.includes("<ul>")) {
    // Extract list items
    const parts = message.split(/\n- |\n1\. /);
    formattedMessage = parts[0];
    
    // Get list items, skipping the first part which is the intro text
    listItems = parts.slice(1).map(item => item.trim()).filter(Boolean);
  }
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(message);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  return (
    <motion.div 
      className={cn("flex mb-4", isBot ? "" : "justify-end", className)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {isBot && (
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          <Avatar className="h-8 w-8 bg-primary-100 mr-2 flex-shrink-0">
            <AvatarFallback className="bg-primary-100 text-primary">
              <Bot className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </motion.div>
      )}
      
      <div className="relative">
        <motion.div 
          className={cn(
            "p-3 rounded-lg shadow-sm max-w-[80%]",
            isBot ? "bg-white rounded-tl-none border border-gray-100" : "bg-primary text-white rounded-tr-none"
          )}
          whileHover={{ 
            scale: 1.01,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
          }}
        >
          {/* If message has HTML formatting, use dangerouslySetInnerHTML */}
          {message.includes("<") && message.includes(">") ? (
            <div dangerouslySetInnerHTML={{ __html: message }} />
          ) : (
            <>
              <p>{formattedMessage}</p>
              
              {listItems.length > 0 && (
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  {listItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
            </>
          )}
          
          {/* Actions for bot messages */}
          {isBot && (
            <AnimatePresence>
              {isHovered && (
                <motion.div 
                  className="absolute -top-3 right-0 flex space-x-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.button 
                    className="p-1 bg-white rounded-md shadow-md border border-gray-100 text-gray-500 hover:text-primary hover:border-primary focus:outline-none"
                    onClick={copyToClipboard}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title="Copy message"
                  >
                    {isCopied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </motion.div>
        
        {/* Feedback options for bot messages */}
        {isBot && (
          <AnimatePresence>
            {isHovered && (
              <motion.div 
                className="flex space-x-1 mt-1 justify-end"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <motion.button
                  className={`p-1 rounded-md text-xs flex items-center ${
                    reaction === "like" 
                      ? "text-green-500 bg-green-50" 
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                  onClick={() => setReaction(reaction === "like" ? null : "like")}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Helpful"
                >
                  <ThumbsUp className="h-3 w-3 mr-1" />
                  <span className="text-[10px]">Helpful</span>
                </motion.button>
                
                <motion.button
                  className={`p-1 rounded-md text-xs flex items-center ${
                    reaction === "dislike" 
                      ? "text-red-500 bg-red-50" 
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                  onClick={() => setReaction(reaction === "dislike" ? null : "dislike")}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Not helpful"
                >
                  <ThumbsDown className="h-3 w-3 mr-1" />
                  <span className="text-[10px]">Not helpful</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
      
      {!isBot && (
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          <Avatar className="h-8 w-8 bg-gray-200 ml-2 flex-shrink-0">
            <AvatarFallback className="bg-gray-200 text-gray-500">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </motion.div>
      )}
    </motion.div>
  );
}
