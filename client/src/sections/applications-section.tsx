import ApplicationCard from "@/components/ui/application-card";
import { HeadphonesIcon, ShoppingBagIcon, HeartPulseIcon, Landmark, PlaneIcon, GraduationCapIcon } from "lucide-react";

export default function ApplicationsSection() {
  return (
    <section id="applications" className="py-16 px-4 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold mb-2">Real-World Applications</h2>
        <p className="text-gray-300 mb-12">How chatbots are transforming industries and improving experiences</p>
        
        {/* Application Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ApplicationCard
            icon={HeadphonesIcon}
            title="Customer Service"
            description="Automated support handling common queries, troubleshooting, and issue resolution, available 24/7."
            examples="Zendesk, Intercom, Drift"
          />
          
          <ApplicationCard
            icon={ShoppingBagIcon}
            title="E-Commerce"
            description="Product recommendations, order tracking, and personalized shopping assistance for online stores."
            examples="Shopify, Alibaba, Amazon"
          />
          
          <ApplicationCard
            icon={HeartPulseIcon}
            title="Healthcare"
            description="Symptom checking, appointment scheduling, medication reminders, and health information."
            examples="Ada Health, Your.MD, Babylon"
          />
          
          <ApplicationCard
            icon={Landmark}
            title="Banking & Finance"
            description="Account information, transaction history, spending insights, and financial advice."
            examples="Bank of America Erica, Capital One Eno"
          />
          
          <ApplicationCard
            icon={PlaneIcon}
            title="Travel & Hospitality"
            description="Booking assistance, travel recommendations, itinerary management, and local information."
            examples="Kayak, Expedia, Booking.com"
          />
          
          <ApplicationCard
            icon={GraduationCapIcon}
            title="Education"
            description="Learning assistance, tutoring, administrative support, and educational content delivery."
            examples="Duolingo, Rosetta Stone, CourseBot"
          />
        </div>
      </div>
    </section>
  );
}
