import { Button } from "@/components/ui/button";
import GradientText from "@/components/ui/gradient-text";
import ParticleBackground from "@/components/ui/particle-background";
import { motion } from "framer-motion";
import { MessageSquare, Zap, ArrowDown, Sparkles } from "lucide-react";
import { useState } from "react";

export default function HeroSection() {
  const [cursorPosition, setCursorPosition] = useState<{ x: number, y: number } | null>(null);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    setCursorPosition({ x: clientX, y: clientY });
  };
  
  return (
    <section 
      id="overview" 
      className="relative overflow-hidden min-h-[90vh] flex items-center"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary-500" />
      
      {/* Particle Background */}
      <ParticleBackground 
        color="rgba(255, 255, 255, 0.5)" 
        quantity={50}
      />
      
      {/* Light effect that follows cursor */}
      {cursorPosition && (
        <motion.div 
          className="absolute w-[500px] h-[500px] rounded-full bg-white opacity-5 pointer-events-none"
          style={{
            left: cursorPosition.x - 250,
            top: cursorPosition.y - 250,
          }}
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      )}
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10 text-white">
        <motion.div 
          className="max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="inline-flex items-center bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="h-5 w-5 mr-2 text-primary-200" />
            <span className="text-sm font-medium">Interactive Chatbot Demonstration</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="block"
            >
              The Evolution and
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="block"
            >
              Functionality of <GradientText>Chatbots</GradientText>
            </motion.span>
          </h1>
          
          <motion.p 
            className="text-xl opacity-90 mb-8 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            Exploring how AI-powered conversations are transforming digital interactions across industries
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                asChild
                size="lg"
                variant="default"
                className="bg-white text-primary hover:bg-gray-100 flex items-center gap-2 shadow-lg"
              >
                <a href="#demo">
                  <Zap className="h-4 w-4" />
                  Try Demo
                </a>
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-primary-700 bg-opacity-30 backdrop-blur-sm text-white border-white border-opacity-20 hover:bg-opacity-40 shadow-lg"
              >
                <a href="#evolution">Learn More</a>
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Added floating messages */}
          <motion.div 
            className="absolute -right-4 sm:right-10 md:right-20 top-20 md:top-40 bg-white bg-opacity-10 backdrop-blur-sm p-3 rounded-lg shadow-lg text-sm max-w-[200px] border border-white border-opacity-20"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
            transition={{ 
              delay: 1.5, 
              duration: 0.8,
              y: {
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }
            }}
          >
            <p>Natural language processing enables human-like interactions</p>
          </motion.div>
          
          <motion.div 
            className="absolute -left-4 sm:left-10 md:left-20 bottom-20 md:bottom-40 bg-white bg-opacity-10 backdrop-blur-sm p-3 rounded-lg shadow-lg text-sm max-w-[200px] border border-white border-opacity-20"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0, y: [0, 10, 0] }}
            transition={{ 
              delay: 1.8, 
              duration: 0.8,
              y: {
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
              }
            }}
          >
            <p>Chatbots are revolutionizing customer service experiences</p>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white opacity-80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8, y: [0, 10, 0] }}
        transition={{
          y: {
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          },
          opacity: { delay: 1.5, duration: 1 }
        }}
        whileHover={{ scale: 1.1, opacity: 1 }}
      >
        <a href="#evolution" className="flex flex-col items-center">
          <span className="text-sm mb-1">Scroll Down</span>
          <ArrowDown className="h-5 w-5" />
        </a>
      </motion.div>
    </section>
  );
}
