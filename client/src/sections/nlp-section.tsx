import { Card, CardContent } from "@/components/ui/card";
import NlpStep from "@/components/ui/nlp-step";
import { motion } from "framer-motion";

export default function NlpSection() {
  return (
    <section id="nlp" className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold mb-2">NLP & AI in Chatbots</h2>
        <p className="text-gray-600 mb-12">Understanding the technology that powers modern conversational interfaces</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left column - Explanation */}
          <div>
            <h3 className="text-2xl font-bold mb-6">How NLP Works in Chatbots</h3>
            
            <div className="space-y-6">
              <motion.div 
                className="bg-gray-50 p-5 rounded-lg border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4 }}
              >
                <h4 className="font-bold text-lg mb-2 flex items-center">
                  <span className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0">1</span>
                  Tokenization & Parsing
                </h4>
                <p className="text-gray-600">Breaking down user input into tokens (words, phrases) and analyzing sentence structure to understand syntax and grammar.</p>
              </motion.div>
              
              <motion.div 
                className="bg-gray-50 p-5 rounded-lg border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <h4 className="font-bold text-lg mb-2 flex items-center">
                  <span className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0">2</span>
                  Entity Recognition
                </h4>
                <p className="text-gray-600">Identifying key elements in text such as names, dates, locations, organizations, and other important data points.</p>
              </motion.div>
              
              <motion.div 
                className="bg-gray-50 p-5 rounded-lg border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <h4 className="font-bold text-lg mb-2 flex items-center">
                  <span className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0">3</span>
                  Intent Classification
                </h4>
                <p className="text-gray-600">Determining the purpose or goal of the user's message to provide relevant responses (e.g., asking a question, making a request).</p>
              </motion.div>
              
              <motion.div 
                className="bg-gray-50 p-5 rounded-lg border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <h4 className="font-bold text-lg mb-2 flex items-center">
                  <span className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0">4</span>
                  Response Generation
                </h4>
                <p className="text-gray-600">Creating human-like responses using natural language generation techniques, trained on vast amounts of text data.</p>
              </motion.div>
            </div>
          </div>
          
          {/* Right column - Diagram */}
          <Card className="bg-gray-50 rounded-xl border border-gray-100">
            <CardContent className="p-6 flex items-center justify-center">
              <div className="w-full max-w-md">
                <h3 className="text-xl font-bold mb-6 text-center">NLP Processing Pipeline</h3>
                
                <div className="relative">
                  {/* User Input */}
                  <NlpStep
                    title="USER INPUT"
                    content={
                      <p className="text-gray-800">"I'd like to book a flight to London for next Friday"</p>
                    }
                    step={1}
                  />
                  
                  {/* Tokenization */}
                  <NlpStep
                    title="TOKENIZATION"
                    content={
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-white px-2 py-1 rounded text-sm border border-gray-200">"I'd"</span>
                        <span className="bg-white px-2 py-1 rounded text-sm border border-gray-200">"like"</span>
                        <span className="bg-white px-2 py-1 rounded text-sm border border-gray-200">"to"</span>
                        <span className="bg-white px-2 py-1 rounded text-sm border border-gray-200">"book"</span>
                        <span className="bg-white px-2 py-1 rounded text-sm border border-gray-200">"a"</span>
                        <span className="bg-white px-2 py-1 rounded text-sm border border-gray-200">"flight"</span>
                        <span className="bg-white px-2 py-1 rounded text-sm border border-gray-200">"to"</span>
                        <span className="bg-white px-2 py-1 rounded text-sm border border-gray-200">"London"</span>
                        <span className="bg-white px-2 py-1 rounded text-sm border border-gray-200">"for"</span>
                        <span className="bg-white px-2 py-1 rounded text-sm border border-gray-200">"next"</span>
                        <span className="bg-white px-2 py-1 rounded text-sm border border-gray-200">"Friday"</span>
                      </div>
                    }
                    step={2}
                  />
                  
                  {/* Entity Recognition */}
                  <NlpStep
                    title="ENTITY RECOGNITION"
                    content={
                      <>
                        <p className="text-gray-800">
                          I'd like to book a 
                          <span className="bg-blue-100 px-1 rounded">flight</span> 
                          to 
                          <span className="bg-green-100 px-1 rounded">London</span> 
                          for 
                          <span className="bg-yellow-100 px-1 rounded">next Friday</span>
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2 text-xs">
                          <div className="flex items-center">
                            <span className="w-3 h-3 bg-blue-100 rounded mr-1"></span>
                            <span>Service Type</span>
                          </div>
                          <div className="flex items-center">
                            <span className="w-3 h-3 bg-green-100 rounded mr-1"></span>
                            <span>Location</span>
                          </div>
                          <div className="flex items-center">
                            <span className="w-3 h-3 bg-yellow-100 rounded mr-1"></span>
                            <span>Date</span>
                          </div>
                        </div>
                      </>
                    }
                    step={3}
                  />
                  
                  {/* Intent Classification */}
                  <NlpStep
                    title="INTENT CLASSIFICATION"
                    content={
                      <div className="flex justify-between items-center">
                        <span className="font-bold">Intent: BOOKING REQUEST</span>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">96% Confidence</span>
                      </div>
                    }
                    step={4}
                    isLast
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
