import FeatureCard from "@/components/ui/feature-card";
import ProcessStep from "@/components/ui/process-step";
import AnimatedText from "@/components/ui/animated-text";
import { MessageSquare, Database, Brain, MessagesSquare, Languages, Search, MessageCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function FunctionalitySection() {
  return (
    <section id="functionality" className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <AnimatedText 
            text="How Chatbots Work" 
            tag="h2"
            className="text-3xl font-bold mb-2"
            colorClassName="text-indigo-600 font-bold"
            highlightIndices={[0, 4, 13]} // H, C, W
            delayMultiplier={0.04}
          />
          
          <motion.p 
            className="text-gray-600 max-w-2xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Understanding the core functionality and technology behind modern chatbots
          </motion.p>
        </motion.div>
        
        {/* Functionality Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <FeatureCard
              icon={MessageSquare}
              title="Natural Language Processing"
              description="NLP enables chatbots to understand, interpret, and respond to human language in a valuable way. It involves text parsing, intent recognition, and context understanding."
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <FeatureCard
              icon={Database}
              title="Knowledge Base"
              description="Chatbots access information from various sources including predefined responses, APIs, and databases to provide accurate and relevant information to user queries."
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <FeatureCard
              icon={Brain}
              title="Machine Learning"
              description="Advanced chatbots utilize machine learning to improve their responses over time. They learn from user interactions to provide better, more personalized experiences."
            />
          </motion.div>
        </motion.div>
        
        {/* Process Flow */}
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <Sparkles className="text-primary h-5 w-5" />
            <AnimatedText 
              text="Chatbot Processing Flow" 
              tag="h3"
              className="text-2xl font-bold text-center"
              colorClassName="text-primary font-bold"
              highlightIndices={[0, 8, 19]} // C, P, F
              delayMultiplier={0.03}
            />
            <Sparkles className="text-primary h-5 w-5" />
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center max-w-4xl mx-auto">
            <ProcessStep 
              icon={MessagesSquare} 
              title="User Input" 
              delay={0}
            />
            
            <ProcessStep 
              icon={Languages} 
              title="NLP Analysis" 
              delay={0.1}
            />
            
            <ProcessStep 
              icon={Search} 
              title="Information Retrieval" 
              delay={0.2}
            />
            
            <ProcessStep 
              icon={MessageCircle} 
              title="Response Generation" 
              isLast 
              delay={0.3}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
