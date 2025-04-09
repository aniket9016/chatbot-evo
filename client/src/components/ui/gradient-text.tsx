import { ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
}

export default function GradientText({ children, className = "" }: GradientTextProps) {
  return (
    <span className={`text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary-500 ${className}`}>
      {children}
    </span>
  );
}
