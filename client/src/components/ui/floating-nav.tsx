import { motion } from "framer-motion";
import { useState } from "react";
import { MessageSquare, Bot, Brain, Building2, Code, ChevronUp } from "lucide-react";

export default function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const sections = [
    { id: "overview", icon: <Bot size={20} />, label: "Overview" },
    { id: "evolution", icon: <ChevronUp size={20} />, label: "Evolution" },
    { id: "functionality", icon: <Brain size={20} />, label: "Functionality" },
    { id: "demo", icon: <MessageSquare size={20} />, label: "Demo" },
    { id: "applications", icon: <Building2 size={20} />, label: "Applications" },
    { id: "nlp", icon: <Code size={20} />, label: "NLP" },
  ];

  return (
    <motion.div
      className="fixed bottom-5 right-5 z-50"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      {/* Menu Items */}
      <motion.div
        className="mb-2"
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isOpen ? 1 : 0,
          height: isOpen ? "auto" : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col gap-2">
          {sections.map((section, index) => (
            <motion.a
              key={section.id}
              href={`#${section.id}`}
              className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-primary-600 hover:bg-primary-50 transition-colors relative group"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : 50 }}
              transition={{ duration: 0.3, delay: isOpen ? index * 0.05 : 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(false)}
            >
              {section.icon}
              <motion.span
                className="absolute left-0 transform -translate-x-full -translate-y-1/2 top-1/2 bg-gray-800 text-white px-2 py-1 rounded whitespace-nowrap opacity-0 pointer-events-none"
                initial={{ opacity: 0, x: 10 }}
                whileHover={{ opacity: 1, x: -5 }}
                transition={{ duration: 0.2 }}
              >
                {section.label}
              </motion.span>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Toggle Button */}
      <motion.button
        className="w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center focus:outline-none"
        onClick={toggleNav}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ 
          rotate: isOpen ? 45 : 0,
          backgroundColor: isOpen ? "var(--primary-700)" : "var(--primary)"
        }}
        transition={{ duration: 0.2 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </motion.button>
    </motion.div>
  );
}