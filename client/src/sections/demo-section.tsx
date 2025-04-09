import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ChatMessage from "@/components/ui/chat-message";
import TypingIndicator from "@/components/ui/typing-indicator";
import { Bot, User, RefreshCcw, Settings, SendIcon, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AnimatePresence, motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import AnimatedText from "@/components/ui/animated-text";

type Message = {
  content: string;
  isBot: boolean;
};

type WebSocketMessage = {
  type: 'response' | 'typing' | 'error';
  message?: string;
  typing?: boolean;
};

export default function DemoSection() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [wsReady, setWsReady] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Connect to WebSocket
  useEffect(() => {
    // Create WebSocket connection
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    // Connect using the host, current port, and the specific WebSocket path
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    console.log("Connecting to WebSocket at:", wsUrl);
    const ws = new WebSocket(wsUrl);
    
    ws.onopen = () => {
      console.log('WebSocket connection established');
      setWsReady(true);
    };
    
    ws.onmessage = (event) => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);
        
        if (data.type === 'response' && data.message) {
          setIsTyping(false);
          setMessages(prev => [...prev, { content: data.message!, isBot: true }]);
        } else if (data.type === 'typing') {
          setIsTyping(!!data.typing);
        } else if (data.type === 'error') {
          toast({
            title: "Error",
            description: data.message || "Something went wrong",
            variant: "destructive",
          });
        }
      } catch (err) {
        console.error('Error parsing WebSocket message:', err);
      }
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      toast({
        title: "Connection Error",
        description: "Failed to connect to chat service",
        variant: "destructive",
      });
    };
    
    ws.onclose = () => {
      console.log('WebSocket connection closed');
      setWsReady(false);
    };
    
    wsRef.current = ws;
    
    // Clean up WebSocket on unmount
    return () => {
      ws.close();
    };
  }, [toast]);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim() || !wsReady) return;
    
    // Add user message to chat
    setMessages(prev => [...prev, { content: inputMessage, isBot: false }]);
    
    // Send message to server
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'query',
        message: inputMessage
      }));
    }
    
    // Clear input
    setInputMessage('');
  };
  
  const resetChat = () => {
    // Close current connection and open a new one
    if (wsRef.current) {
      wsRef.current.close();
    }
    
    setMessages([]);
    
    // Create new WebSocket connection
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    // Connect using the host, current port, and the specific WebSocket path
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    console.log("Reconnecting to WebSocket at:", wsUrl);
    const ws = new WebSocket(wsUrl);
    
    ws.onopen = () => {
      console.log('WebSocket connection established');
      setWsReady(true);
    };
    
    ws.onmessage = (event) => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);
        
        if (data.type === 'response' && data.message) {
          setIsTyping(false);
          setMessages(prev => [...prev, { content: data.message!, isBot: true }]);
        } else if (data.type === 'typing') {
          setIsTyping(!!data.typing);
        }
      } catch (err) {
        console.error('Error parsing WebSocket message:', err);
      }
    };
    
    wsRef.current = ws;
  };

  return (
    <section id="demo" className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <AnimatedText 
            text="Interactive Demo" 
            tag="h2"
            className="text-3xl font-bold mb-2"
            colorClassName="text-rose-500 font-bold"
            highlightIndices={[0, 3, 11]} // I, e, D
            delayMultiplier={0.05}
          />
          
          <motion.p 
            className="text-gray-600 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Experience a chatbot conversation firsthand with our interactive demonstration
          </motion.p>
        </motion.div>
        
        {/* Chat Demo */}
        <Card className="rounded-xl shadow-lg border border-gray-200 overflow-hidden max-w-3xl mx-auto">
          {/* Chat Header */}
          <motion.div 
            className="border-b border-gray-200 px-4 py-3 flex items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -5, 5, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <Avatar className="h-10 w-10 bg-primary-100">
                <AvatarFallback className="bg-primary-100 text-primary">
                  <Bot className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            </motion.div>
            <div className="ml-3">
              <h3 className="font-semibold">AI Assistant</h3>
              <motion.p 
                className="text-xs flex items-center"
                animate={{ 
                  color: wsReady ? "#10b981" : "#f59e0b"
                }}
              >
                <motion.span 
                  className="w-2 h-2 rounded-full inline-block mr-1"
                  animate={{ 
                    backgroundColor: wsReady ? "#10b981" : "#f59e0b",
                    scale: wsReady ? [1, 1.3, 1] : 1
                  }}
                  transition={{ 
                    repeat: wsReady ? Infinity : 0, 
                    duration: 1.5,
                    repeatDelay: 1
                  }}
                />
                {wsReady ? "Online" : "Connecting..."}
              </motion.p>
            </div>
            <div className="ml-auto flex space-x-2">
              <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                  onClick={resetChat}
                >
                  <RefreshCcw className="h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Chat Messages */}
          <motion.div 
            className="h-96 overflow-y-auto p-4 bg-gray-50" 
            ref={chatContainerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {messages.length === 0 && (
              <motion.div 
                className="flex flex-col items-center justify-center h-full text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <MessageSquare className="h-12 w-12 text-gray-300 mb-3" />
                <p className="text-gray-400 text-sm max-w-xs">
                  Start a conversation with the chatbot to learn about NLP, chatbot evolution, or applications in various industries
                </p>
              </motion.div>
            )}
            
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                isBot={message.isBot}
                message={message.content}
              />
            ))}
            
            <AnimatePresence>
              {isTyping && <TypingIndicator />}
            </AnimatePresence>
          </motion.div>
          
          {/* Chat Input */}
          <motion.div 
            className="border-t border-gray-200 p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="flex items-center">
              <motion.div className="flex-1 relative" whileHover={{ scale: 1.01 }}>
                <Input
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg pr-10 transition-shadow focus:shadow-md"
                />
                {inputMessage.length > 0 && (
                  <motion.span 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {inputMessage.length}
                  </motion.span>
                )}
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  type="submit"
                  size="icon"
                  className="ml-2 bg-primary text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                  disabled={!wsReady}
                >
                  <SendIcon className="h-4 w-4" />
                </Button>
              </motion.div>
            </form>
            <motion.div 
              className="flex flex-wrap gap-2 mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <motion.span 
                className="text-xs text-gray-500 mb-1 w-full"
                animate={{ opacity: [0.5, 0.7, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Try asking:
              </motion.span>
              
              {["How do chatbots use NLP?", "What industries use chatbots?", "Explain the evolution of chatbots"].map((suggestion, index) => (
                <motion.button
                  key={index}
                  className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors"
                  onClick={() => setInputMessage(suggestion)}
                  whileHover={{ scale: 1.05, backgroundColor: "var(--primary-100)" }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + (index * 0.1) }}
                >
                  {suggestion}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </Card>
      </div>
    </section>
  );
}
