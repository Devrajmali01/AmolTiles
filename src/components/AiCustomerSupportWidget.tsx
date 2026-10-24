import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  User, 
  Sparkles, 
  PhoneCall, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  Clock,
  MapPin,
  HelpCircle,
  Phone
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AiCustomerSupportWidgetProps {
  currentUser?: { name: string; phone: string; email: string } | null;
  onOpenAppointmentTab?: () => void;
  onOpenContactModal?: () => void;
}

export const AiCustomerSupportWidget: React.FC<AiCustomerSupportWidgetProps> = ({
  currentUser,
  onOpenAppointmentTab,
  onOpenContactModal
}) => {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [handoffMode, setHandoffMode] = useState(false);
  const [handoffPhone, setHandoffPhone] = useState(currentUser?.phone || '');
  const [handoffName, setHandoffName] = useState(currentUser?.name || '');
  const [handoffDone, setHandoffDone] = useState(false);

  const [messages, setMessages] = useState<Array<{
    sender: 'user' | 'assistant' | 'system';
    text: string;
    isHandoff?: boolean;
    appointmentData?: any;
  }>>([
    {
      sender: 'assistant',
      text: t.aiSupportWelcome
    }
  ]);

  // Update initial message when language changes if no conversation started
  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1 && prev[0].sender === 'assistant') {
        return [{ sender: 'assistant', text: t.aiSupportWelcome }];
      }
      return prev;
    });
  }, [t.aiSupportWelcome]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (overrideText?: string) => {
    const textToSend = overrideText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg = textToSend.trim();
    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch('/api/ai-support/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          customerName: currentUser?.name || handoffName || undefined,
          customerPhone: currentUser?.phone || handoffPhone || undefined
        })
      });

      const data = await res.json();
      setLoading(false);

      if (data.success) {
        setMessages(prev => [...prev, {
          sender: 'assistant',
          text: data.reply,
          isHandoff: data.needsHandoff,
          appointmentData: data.appointmentFound
        }]);

        if (data.needsHandoff && !currentUser?.phone && !handoffPhone) {
          setHandoffMode(true);
        }
      } else {
        setMessages(prev => [...prev, {
          sender: 'assistant',
          text: "I'm not sure about that. I'll forward your question to our team. Please provide your phone number so Pro. Ajit Shinde / Pro. Niraj Shinde can contact you.",
          isHandoff: true
        }]);
        setHandoffMode(true);
      }
    } catch (err) {
      setLoading(false);
      setMessages(prev => [...prev, {
        sender: 'assistant',
        text: "You can reach Amol Tiles directly at Satara Road, Jath or call our proprietors at 9822090345 / 9822309345."
      }]);
    }
  };

  // Human Handoff Dispatch
  const handleHandoffSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!handoffPhone) return;

    setLoading(true);
    try {
      const lastUserMsg = [...messages].reverse().find(m => m.sender === 'user')?.text || 'Customer requested human assistance';

      const res = await fetch('/api/ai-support/handoff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: handoffName || 'Website Customer',
          customerPhone: handoffPhone,
          customerMessage: lastUserMsg
        })
      });

      setLoading(false);
      setHandoffDone(true);
      setHandoffMode(false);

      setMessages(prev => [...prev, {
        sender: 'system',
        text: `🚨 **Human Assistance Request Sent!**\nBoth Amol Tiles administrators (8421001308 & 9822309345) have been alerted. Someone will get back to you shortly on ${handoffPhone}.`
      }]);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-black text-white p-3.5 shadow-2xl hover:scale-105 transition-transform flex items-center space-x-2.5 border border-amber-500/40"
        title={t.aiSupportTitle}
      >
        <div className="relative">
          <Bot className="w-5 h-5 text-amber-400" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full" />
        </div>
        <div className="text-left hidden sm:block">
          <span className="text-[11px] font-bold uppercase tracking-wider block leading-tight">
            {t.aiSupportTitle}
          </span>
          <span className="text-[9px] text-amber-400 block font-serif italic">
            {language === 'mr' ? 'अपॉइंटमेंट ट्रॅक • प्रश्नोत्तरे • थेट कॉल' : language === 'hi' ? 'अपॉइंटमेंट ट्रैक • प्रश्नोत्तरी • कॉल अनुरोध' : 'Track APT • FAQs • Human Handoff'}
          </span>
        </div>
      </button>

      {/* Support Dialog Drawer */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[95vw] sm:w-[420px] h-[550px] bg-white border border-gray-300 shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
          
          {/* Header */}
          <div className="bg-black text-white p-3.5 px-4 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 bg-amber-500 text-black flex items-center justify-center font-bold">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                  {t.aiSupportTitle}
                </h3>
                <p className="text-[10px] text-amber-400 font-mono">
                  {language === 'mr' ? 'अमोल टाईल्स, सांगली रोड, जत' : language === 'hi' ? 'अमोल टाइल्स, सांगली रोड, जत' : 'Grounded AI • Jath Experience Center'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick FAQ Chips Bar */}
          <div className="bg-gray-50 border-b border-gray-200 p-2 flex overflow-x-auto space-x-1.5 shrink-0 text-[10px] font-bold uppercase tracking-wider">
            <button
              onClick={() => handleSend(t.aiSupportAskHours)}
              className="px-2.5 py-1 bg-white border border-gray-300 hover:border-black whitespace-nowrap"
            >
              🕒 {language === 'mr' ? 'शोरूम वेळ' : language === 'hi' ? 'शोरूम समय' : 'Opening Hours'}
            </button>
            <button
              onClick={() => handleSend(language === 'mr' ? 'शोरूमचा पत्ता काय आहे?' : language === 'hi' ? 'शोरूम का पता क्या है?' : 'Where is your showroom located?')}
              className="px-2.5 py-1 bg-white border border-gray-300 hover:border-black whitespace-nowrap"
            >
              📍 {language === 'mr' ? 'पत्ता / लोकेशन' : language === 'hi' ? 'पता / लोकेशन' : 'Location'}
            </button>
            <button
              onClick={() => handleSend(t.aiSupportAskBooking)}
              className="px-2.5 py-1 bg-white border border-gray-300 hover:border-black whitespace-nowrap"
            >
              📅 {language === 'mr' ? 'भेट बुक करा' : language === 'hi' ? 'विजिट बुक करें' : 'Book Visit'}
            </button>
            <button
              onClick={() => handleSend(t.aiSupportCallAjit)}
              className="px-2.5 py-1 bg-white border border-gray-300 hover:border-black whitespace-nowrap text-amber-900 font-bold"
            >
              📞 {language === 'mr' ? 'कॉलबॅक विनंती' : language === 'hi' ? 'कॉलबैक अनुरोध' : 'Request Callback'}
            </button>
          </div>

          {/* Message Stream */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3.5 text-xs bg-[#f9fafb]">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex items-start space-x-2 ${m.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                <div className={`w-6 h-6 shrink-0 flex items-center justify-center text-[10px] font-bold ${
                  m.sender === 'user' 
                    ? 'bg-black text-white' 
                    : m.sender === 'system'
                    ? 'bg-red-600 text-white'
                    : 'bg-amber-500 text-black'
                }`}>
                  {m.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>

                <div className={`p-3 max-w-[85%] leading-relaxed ${
                  m.sender === 'user' 
                    ? 'bg-black text-white font-medium' 
                    : m.sender === 'system'
                    ? 'bg-red-50 text-red-900 border border-red-200'
                    : 'bg-white text-gray-800 border border-gray-200 shadow-xs'
                }`}>
                  <div 
                    className="whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{
                      __html: m.text
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\n/g, '<br/>')
                    }}
                  />

                  {/* Appointment Details Highlight */}
                  {m.appointmentData && (
                    <div className="mt-2.5 pt-2 border-t border-gray-200 space-y-1 text-[11px] font-mono bg-gray-50 p-2">
                      <p><strong>Appointment ID:</strong> {m.appointmentData.id}</p>
                      <p><strong>Date & Time:</strong> {m.appointmentData.appointmentDate} ({m.appointmentData.appointmentTime})</p>
                      <p><strong>Status:</strong> <span className="uppercase text-amber-700 font-bold">{m.appointmentData.status}</span></p>
                    </div>
                  )}

                  {/* Trigger Human Assistance Button if AI is unsure */}
                  {m.isHandoff && !handoffDone && (
                    <div className="mt-3 pt-2 border-t border-gray-200">
                      <button
                        onClick={() => setHandoffMode(true)}
                        className="w-full py-1.5 bg-amber-500 text-black text-[10px] uppercase font-bold tracking-wider hover:bg-amber-600 flex items-center justify-center space-x-1"
                      >
                        <PhoneCall className="w-3 h-3" />
                        <span>{language === 'mr' ? 'थेट कॉलबॅकची विनंती करा' : language === 'hi' ? 'सीधे कॉलबैक का अनुरोध करें' : 'Request Human Callback'}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center space-x-2 text-gray-400 text-xs italic">
                <Bot className="w-4 h-4 animate-bounce text-amber-500" />
                <span>{language === 'mr' ? 'माहिती शोधत आहे...' : language === 'hi' ? 'जानकारी खोजी जा रही है...' : 'Amol Tiles AI is looking up information...'}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Human Handoff Contact Request Form */}
          {handoffMode && (
            <form onSubmit={handleHandoffSubmit} className="p-3 bg-amber-50 border-t border-amber-200 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-900">
                  🚨 {language === 'mr' ? 'प्रो. अजित / निरज शिंदेशी संपर्क' : language === 'hi' ? 'प्रो. अजित / नीरज शिंदे से संपर्क' : 'Request Call from Pro. Ajit / Niraj Shinde'}
                </span>
                <button type="button" onClick={() => setHandoffMode(false)} className="text-gray-400 hover:text-black">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder={t.fullName}
                  value={handoffName}
                  onChange={(e) => setHandoffName(e.target.value)}
                  className="p-1.5 bg-white border border-gray-300 text-xs focus:outline-none focus:border-black"
                />
                <input
                  type="tel"
                  required
                  placeholder={`${t.mobileNumber} *`}
                  value={handoffPhone}
                  onChange={(e) => setHandoffPhone(e.target.value)}
                  className="p-1.5 bg-white border border-gray-300 text-xs focus:outline-none focus:border-black"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-1.5 bg-black text-white text-[10px] uppercase font-bold tracking-wider hover:bg-gray-800"
              >
                {language === 'mr' ? 'संचालकांना सूचना पाठवा (९८२२०९०३४५)' : language === 'hi' ? 'संचालकों को सूचना भेजें (९८२२०९०३४५)' : 'Alert Administrators (8421001308 & 9822309345)'}
              </button>
            </form>
          )}

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-2.5 bg-white border-t border-gray-200 flex items-center space-x-2 shrink-0"
          >
            <input
              type="text"
              placeholder={t.aiSupportPlaceholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 border border-gray-300 text-xs focus:outline-none focus:border-black font-devanagari"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2 bg-black text-white hover:bg-gray-800 disabled:opacity-40 transition-colors flex items-center space-x-1"
              title={t.aiSupportSend}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
