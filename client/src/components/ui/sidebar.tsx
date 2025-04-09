import { Chrome, HomeIcon, HistoryIcon, FunctionSquareIcon, MessageSquareTextIcon, AppWindow, BrainIcon, InfoIcon, User, Github, Linkedin } from "lucide-react";
import GradientText from "@/components/ui/gradient-text";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState("overview");
  const [isHovered, setIsHovered] = useState<string | null>(null);
  
  // Update active section based on scroll position
  const handleScroll = useCallback(() => {
    const sections = document.querySelectorAll("section[id]");
    
    let current = "";
    
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      
      if (sectionTop <= 100) {
        current = section.getAttribute("id") || "";
      }
    });
    
    if (current) {
      setActiveSection(current);
    }
  }, []);
  
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const navItems = [
    { id: "overview", icon: <HomeIcon className="h-4 w-4" />, label: "Overview", color: "from-blue-500 to-cyan-400" },
    { id: "evolution", icon: <HistoryIcon className="h-4 w-4" />, label: "Evolution", color: "from-green-500 to-teal-400" },
    { id: "functionality", icon: <FunctionSquareIcon className="h-4 w-4" />, label: "Functionality", color: "from-purple-500 to-indigo-400" },
    { id: "demo", icon: <MessageSquareTextIcon className="h-4 w-4" />, label: "Interactive Demo", color: "from-orange-500 to-amber-400" },
    { id: "applications", icon: <AppWindow className="h-4 w-4" />, label: "Applications", color: "from-pink-500 to-rose-400" },
    { id: "nlp", icon: <BrainIcon className="h-4 w-4" />, label: "NLP & AI", color: "from-violet-500 to-purple-400" },
  ];

  return (
    <motion.div 
      className="lg:w-64 bg-gradient-to-b from-gray-50 to-white border-r border-gray-200 shadow-lg lg:min-h-screen z-10"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div 
        className="p-5 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-indigo-50"
        whileHover={{ backgroundColor: "rgba(var(--primary-50), 0.8)" }}
      >
        <motion.h1 
          className="font-bold text-xl flex items-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Chrome className="text-primary mr-2 h-5 w-5" />
          <GradientText>ChatbotEvo</GradientText>
        </motion.h1>
        <p className="text-xs text-gray-500 mt-1">Exploring AI Conversations</p>
        <motion.div 
          className="mt-2 text-xs font-medium text-gray-600 flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <User className="h-3 w-3 mr-1 text-primary" />
          <span>Developed by Aniket Dubey</span>
        </motion.div>
      </motion.div>
      
      <nav className="p-4">
        <motion.ul 
          className="space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
        >
          {navItems.map((item) => (
            <motion.li 
              key={item.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              onHoverStart={() => setIsHovered(item.id)}
              onHoverEnd={() => setIsHovered(null)}
            >
              <motion.a 
                href={`#${item.id}`}
                className={`flex items-center p-2 rounded-lg transition-all relative overflow-hidden ${
                  activeSection === item.id 
                    ? "text-white font-medium shadow-md" 
                    : "text-gray-700 hover:text-gray-900"
                }`}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Background gradient for active item */}
                {activeSection === item.id && (
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-r ${item.color} -z-10`}
                    layoutId="activeBackground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
                
                {/* Hover highlight */}
                {isHovered === item.id && activeSection !== item.id && (
                  <motion.div 
                    className="absolute inset-0 bg-gray-100 -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
                
                <motion.span 
                  className="mr-3 flex items-center justify-center"
                  animate={{ 
                    rotate: isHovered === item.id ? [0, -10, 10, -5, 5, 0] : 0 
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {item.icon}
                </motion.span>
                <span>{item.label}</span>
              </motion.a>
            </motion.li>
          ))}
        </motion.ul>
      </nav>
      
      <motion.div 
        className="p-4 mt-auto border-t border-gray-200 hidden lg:block bg-gradient-to-r from-gray-50 to-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="flex items-center justify-between mb-3">
          <motion.a 
            href="https://github.com/aniket9016" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-primary flex items-center"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="h-4 w-4" />
          </motion.a>
          <motion.a 
            href="https://www.linkedin.com/in/aniket0638/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-primary flex items-center"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Linkedin className="h-4 w-4" />
          </motion.a>
          <motion.a 
            href="#"
            className="text-gray-500 hover:text-primary flex items-center"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <InfoIcon className="h-4 w-4" />
          </motion.a>
        </div>
        <a href="#" className="text-xs text-gray-500 hover:text-primary block text-center">
          <motion.span 
            className="inline-block"
            whileHover={{ color: "#6366f1", letterSpacing: "0.05em" }}
          >
            Aniket Dubey © {new Date().getFullYear()}
          </motion.span>
        </a>
      </motion.div>
    </motion.div>
  );
}
