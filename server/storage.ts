import { 
  users, type User, type InsertUser,
  chatbotResponses, type ChatbotResponse, type InsertChatbotResponse,
  timelineItems, type TimelineItem, type InsertTimelineItem
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Chatbot methods
  getChatbotResponses(): Promise<ChatbotResponse[]>;
  getChatbotResponsesByCategory(category: string): Promise<ChatbotResponse[]>;
  getChatbotResponseByQuery(query: string): Promise<ChatbotResponse | undefined>;
  createChatbotResponse(response: InsertChatbotResponse): Promise<ChatbotResponse>;
  
  // Timeline methods
  getTimelineItems(): Promise<TimelineItem[]>;
  createTimelineItem(item: InsertTimelineItem): Promise<TimelineItem>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private chatbotResponses: Map<number, ChatbotResponse>;
  private timelineItems: Map<number, TimelineItem>;
  currentUserId: number;
  currentChatbotResponseId: number;
  currentTimelineItemId: number;

  constructor() {
    this.users = new Map();
    this.chatbotResponses = new Map();
    this.timelineItems = new Map();
    this.currentUserId = 1;
    this.currentChatbotResponseId = 1;
    this.currentTimelineItemId = 1;
    
    // Initialize with default chatbot responses
    this.initializeDefaultData();
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async getChatbotResponses(): Promise<ChatbotResponse[]> {
    return Array.from(this.chatbotResponses.values());
  }
  
  async getChatbotResponsesByCategory(category: string): Promise<ChatbotResponse[]> {
    return Array.from(this.chatbotResponses.values()).filter(
      (response) => response.category === category
    );
  }
  
  async getChatbotResponseByQuery(query: string): Promise<ChatbotResponse | undefined> {
    const normalizedQuery = query.toLowerCase().trim();
    // Find the most relevant response based on keyword matching
    const responses = Array.from(this.chatbotResponses.values());
    
    // Exact match
    const exactMatch = responses.find(
      (response) => response.query.toLowerCase() === normalizedQuery
    );
    
    if (exactMatch) return exactMatch;
    
    // Partial match
    const partialMatches = responses.filter(
      (response) => normalizedQuery.includes(response.query.toLowerCase()) || 
                    response.query.toLowerCase().includes(normalizedQuery)
    );
    
    if (partialMatches.length > 0) {
      // Sort by relevance (length of match)
      partialMatches.sort((a, b) => {
        const aMatch = a.query.toLowerCase();
        const bMatch = b.query.toLowerCase();
        
        // If query contains the response query, prioritize longer matches
        if (normalizedQuery.includes(aMatch) && normalizedQuery.includes(bMatch)) {
          return bMatch.length - aMatch.length;
        }
        
        // If response query contains the query, prioritize shorter matches
        if (aMatch.includes(normalizedQuery) && bMatch.includes(normalizedQuery)) {
          return aMatch.length - bMatch.length;
        }
        
        // Mix of the above cases
        return 0;
      });
      
      return partialMatches[0];
    }
    
    // Fallback - return general info about chatbots
    return responses.find(
      (response) => response.category === "general"
    );
  }
  
  async createChatbotResponse(insertResponse: InsertChatbotResponse): Promise<ChatbotResponse> {
    const id = this.currentChatbotResponseId++;
    const response: ChatbotResponse = { ...insertResponse, id };
    this.chatbotResponses.set(id, response);
    return response;
  }
  
  async getTimelineItems(): Promise<TimelineItem[]> {
    return Array.from(this.timelineItems.values())
      .sort((a, b) => a.order - b.order);
  }
  
  async createTimelineItem(insertItem: InsertTimelineItem): Promise<TimelineItem> {
    const id = this.currentTimelineItemId++;
    const item: TimelineItem = { ...insertItem, id };
    this.timelineItems.set(id, item);
    return item;
  }
  
  private initializeDefaultData() {
    // Add default timeline items
    const timelineData: InsertTimelineItem[] = [
      {
        year: "1966",
        title: "1960s: ELIZA",
        description: "ELIZA was one of the first chatbots, developed at MIT by Joseph Weizenbaum. It used pattern matching and substitution methodology to simulate conversation.",
        order: 1
      },
      {
        year: "1995",
        title: "1990s: A.L.I.C.E.",
        description: "Artificial Linguistic Internet Computer Entity (A.L.I.C.E.) introduced more sophisticated pattern matching using AIML (Artificial Intelligence Markup Language).",
        order: 2
      },
      {
        year: "2011",
        title: "2010s: Virtual Assistants",
        description: "Siri (2011), Google Now (2012), Alexa (2014), and Cortana (2014) revolutionized the way we interact with technology through natural language.",
        order: 3
      },
      {
        year: "2016",
        title: "2016: Business Chatbots",
        description: "The rise of Facebook Messenger bots and other business chatbots. Companies began implementing chatbots for customer service and engagement.",
        order: 4
      },
      {
        year: "Now",
        title: "2020s: Advanced AI Chatbots",
        description: "GPT-3, ChatGPT, and other large language models enable unprecedented natural language understanding and generation capabilities.",
        order: 5
      }
    ];
    
    timelineData.forEach((item) => {
      const id = this.currentTimelineItemId++;
      this.timelineItems.set(id, { ...item, id });
    });
    
    // Add default chatbot responses
    const responseData: InsertChatbotResponse[] = [
      {
        query: "what is a chatbot",
        response: "A chatbot is a computer program designed to simulate conversation with human users, especially over the Internet. Chatbots use natural language processing (NLP) and artificial intelligence to understand and respond to user queries in a human-like manner.",
        category: "general"
      },
      {
        query: "how do chatbots work",
        response: "Chatbots work by using natural language processing (NLP) to understand user input, then applying algorithms to determine the appropriate response. Modern chatbots use machine learning to improve their responses over time. The process typically involves tokenizing input, analyzing intent, extracting entities, and then generating appropriate responses.",
        category: "functionality"
      },
      {
        query: "what is nlp",
        response: "Natural Language Processing (NLP) is a branch of artificial intelligence that helps computers understand, interpret, and generate human language. NLP enables chatbots to process text or voice data and respond in a way that mimics human conversation. It involves techniques like tokenization, part-of-speech tagging, entity recognition, and sentiment analysis.",
        category: "technology"
      },
      {
        query: "types of chatbots",
        response: "There are several types of chatbots: 1) Rule-based chatbots that follow predefined paths, 2) AI-powered chatbots that use machine learning, 3) Hybrid chatbots that combine both approaches, 4) Voice-enabled chatbots like virtual assistants, and 5) Domain-specific chatbots optimized for particular industries like healthcare or finance.",
        category: "general"
      },
      {
        query: "chatbot applications",
        response: "Chatbots have diverse applications across industries: 1) Customer service for answering FAQs and troubleshooting, 2) E-commerce for product recommendations and order processing, 3) Healthcare for symptom checking and appointment scheduling, 4) Banking for account inquiries and transactions, 5) Travel for booking assistance and recommendations, and 6) Education for tutoring and administrative support.",
        category: "applications"
      },
      {
        query: "customer service chatbots",
        response: "Customer service chatbots help businesses handle customer inquiries efficiently. They can answer frequently asked questions 24/7, troubleshoot common problems, process returns and exchanges, collect customer feedback, and escalate complex issues to human agents. They reduce wait times, handle multiple conversations simultaneously, and free up human agents for more complex issues. Companies like Airbnb, Sephora, and Bank of America use customer service chatbots successfully.",
        category: "applications"
      },
      {
        query: "how do chatbots use nlp",
        response: "Chatbots use NLP through several processes: 1) Tokenization - breaking text into words or phrases, 2) Entity Recognition - identifying key elements like names or dates, 3) Intent Classification - determining what the user wants, 4) Sentiment Analysis - understanding the user's emotion, and 5) Response Generation - creating appropriate replies. Advanced models like BERT and GPT integrate machine learning to understand context and generate more natural responses.",
        category: "technology"
      },
      {
        query: "what are the benefits of chatbots",
        response: "The benefits of chatbots include: 1) 24/7 availability for customer support, 2) Cost reduction by automating repetitive tasks, 3) Scalability to handle multiple conversations simultaneously, 4) Consistency in responses and service quality, 5) Personalization based on user data and history, 6) Faster response times compared to human agents, and 7) Data collection for business insights.",
        category: "general"
      },
      {
        query: "what industries use chatbots",
        response: "Chatbots are used across numerous industries including: 1) Retail and E-commerce for product recommendations and order support, 2) Banking and Finance for account management and financial advice, 3) Healthcare for symptom assessment and appointment scheduling, 4) Travel and Hospitality for bookings and travel information, 5) Education for student support and learning assistance, 6) Real Estate for property searches and inquiries, and 7) Insurance for claims processing and policy information.",
        category: "applications"
      },
      {
        query: "future of chatbots",
        response: "The future of chatbots looks promising with several emerging trends: 1) More sophisticated AI with deeper contextual understanding, 2) Voice-enabled interfaces becoming mainstream, 3) Integration with IoT devices and smart homes, 4) Enhanced personalization through better data analysis, 5) Emotional intelligence to recognize and respond to user emotions, 6) Multilingual capabilities for global reach, and 7) Seamless handoff between bots and human agents when needed.",
        category: "general"
      }
    ];
    
    responseData.forEach((item) => {
      const id = this.currentChatbotResponseId++;
      this.chatbotResponses.set(id, { ...item, id });
    });
  }
}

export const storage = new MemStorage();
