import { useEffect, useState } from "react";
import TimelineItem from "@/components/ui/timeline-item";
import AnimatedText from "@/components/ui/animated-text";
import { useQuery } from "@tanstack/react-query";
import type { TimelineItem as TimelineItemType } from "@shared/schema";
import { motion } from "framer-motion";

export default function EvolutionSection() {
  // Fetch timeline data from API
  const { data: timelineItems, isLoading } = useQuery<TimelineItemType[]>({
    queryKey: ["/api/timeline"],
  });

  return (
    <section id="evolution" className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <AnimatedText 
            text="Evolution of Chatbots" 
            tag="h2"
            className="text-3xl font-bold mb-2"
            colorClassName="text-primary font-bold"
            highlightIndices={[0, 9, 13]} // E, o, C
            delayMultiplier={0.03}
          />
          
          <motion.p 
            className="text-gray-600 mb-10 max-w-xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            From simple rule-based systems to sophisticated AI-powered assistants,
            explore the journey of conversational technology
          </motion.p>
        </motion.div>

        {/* Timeline Component */}
        <div className="relative">
          {/* Vertical line with animation */}
          <motion.div 
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-indigo-400 to-purple-500 transform md:translate-x-px"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          ></motion.div>

          {isLoading ? (
            // Loading state with skeletons
            Array(5).fill(0).map((_, index) => (
              <div key={index} className="animate-pulse mb-16">
                <div className="flex flex-col md:flex-row items-start">
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-10 order-2 md:order-1' : 'md:pr-10 order-2'}`}>
                    {index % 2 === 0 && (
                      <div className="h-32 bg-gray-200 rounded-lg"></div>
                    )}
                  </div>
                  <div className="absolute md:left-1/2 left-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-gray-200 border-4 border-white"></div>
                  </div>
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:pl-10 md:order-2 order-1' : 'md:pl-10 order-1 md:order-2'}`}>
                    {index % 2 !== 0 && (
                      <div className="h-32 bg-gray-200 rounded-lg"></div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Actual timeline items
            timelineItems?.map((item, index) => (
              <TimelineItem
                key={item.id}
                year={item.year}
                title={item.title}
                description={item.description}
                isLast={index === timelineItems.length - 1}
                isRight={index % 2 === 0}
                isPresent={item.year === "Now"}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
