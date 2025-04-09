import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface ApplicationCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  examples: string;
}

export default function ApplicationCard({ icon: Icon, title, description, examples }: ApplicationCardProps) {
  return (
    <motion.div 
      className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.3)" }}
    >
      <div className="w-12 h-12 bg-primary-900 bg-opacity-50 rounded-lg flex items-center justify-center mb-4">
        <Icon className="text-primary-300 h-5 w-5" />
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-gray-300 mb-4">{description}</p>
      <div className="flex items-center text-sm text-gray-400">
        <span className="font-semibold mr-2">Examples:</span>
        <span>{examples}</span>
      </div>
    </motion.div>
  );
}
