
import { MessageCircle, CheckCircle, Clock, DollarSign, ArrowRight } from 'lucide-react';

const WebsiteOrderSection = () => {
  const handleWhatsAppRedirect = () => {
    const phoneNumber = "9779843681979"; // Nepal country code + your number
    const message = encodeURIComponent("Hi! I'm interested in ordering a personal website. Can you tell me more about your services?");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="order-website" className="py-20 px-4 sm:px-6 relative bg-gradient-to-br from-neon-blue/5 to-neon-purple/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Want Your Own Website?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Do you want your own personal website? I will create a simple, beautiful website just for you — perfect for students, job seekers, freelancers, or anyone who wants to look professional online.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Features */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <CheckCircle className="text-neon-green" size={20} />
                  What you get:
                </h3>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-neon-green mt-0.5 flex-shrink-0" size={16} />
                    <span className="text-gray-700">Personal portfolio website</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-neon-green mt-0.5 flex-shrink-0" size={16} />
                    <span className="text-gray-700">About, skills, contact, and project sections</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-neon-green mt-0.5 flex-shrink-0" size={16} />
                    <span className="text-gray-700">Mobile-friendly and fast</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-neon-green mt-0.5 flex-shrink-0" size={16} />
                    <span className="text-gray-700">Free hosting included</span>
                  </li>
                </ul>
              </div>

              {/* Pricing & CTA */}
              <div className="text-center lg:text-left">
                <div className="mb-6">
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
                    <DollarSign className="text-neon-purple" size={20} />
                    <span className="text-3xl font-bold text-neon-purple">Only Rs. 500</span>
                  </div>
                  
                  <div className="flex items-center justify-center lg:justify-start gap-2 text-gray-600">
                    <Clock size={16} />
                    <span>Ready in 2–3 days</span>
                  </div>
                </div>

                <button
                  onClick={handleWhatsAppRedirect}
                  className="w-full lg:w-auto px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center gap-3 group shadow-lg hover:shadow-xl transform hover:translate-y-[-2px]"
                >
                  <MessageCircle size={20} className="group-hover:animate-pulse" />
                  Message me now to get started!
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                
                <p className="text-sm text-gray-500 mt-3">
                  Let's build your online presence together
                </p>
              </div>
            </div>
          </div>
          
          {/* Decorative bottom border */}
          <div className="h-2 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green"></div>
        </div>

        {/* Additional call-to-action */}
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">Ready to stand out online?</p>
          <button
            onClick={handleWhatsAppRedirect}
            className="inline-flex items-center px-6 py-3 rounded-md bg-neon-green/20 hover:bg-neon-green/30 border border-neon-green transition-all duration-300 gap-2 group hover:translate-y-[-3px] hover:shadow-lg"
          >
            <MessageCircle size={18} className="group-hover:animate-bounce" />
            Contact via WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
};

export default WebsiteOrderSection;
