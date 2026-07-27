import React, { useState, useRef, useEffect } from 'react';

interface JoyBotChatWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
  onOpenGiftFinder: () => void;
}

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export const JoyBotChatWidget: React.FC<JoyBotChatWidgetProps> = ({
  isOpen,
  onToggle,
  onOpenGiftFinder
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: "Hello! I'm JoyBot, your AI Shopping Assistant at ToyJoy! 🧸 How can I help you find magical toys, gift ideas, or coupon deals today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, history: messages })
      });
      const data = await res.json();

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: data.reply || "I'm here to help! Let me know if you want gift ideas, coupons, or product details.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: "I'm JoyBot! I can help you find STEM toys, wooden stackers, plush friends, check delivery, or apply coupon JOY15 for 15% off!",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceInput = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (err) {
        console.warn('Microphone permission:', err);
      }
    }

    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Voice input: Listening simulated! Query sent to JoyBot.');
      handleSend("Show me top educational toys under 3000");
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = true;
      
      setIsListening(true);
      recognition.start();

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        if (event.results[0].isFinal) {
          setIsListening(false);
          handleSend(transcript);
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    } catch {
      handleSend("Find dinosaur toys with rechargeable battery");
      setIsListening(false);
    }
  };

  return (
    <>
      {/* Floating FAB Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={onToggle}
          className="w-16 h-16 bg-[#aa3000] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer group relative"
          aria-label="AI Assistant JoyBot"
        >
          <span className="material-symbols-filled text-3xl">chat</span>

          {/* Tooltip */}
          <span className="absolute right-20 bg-white text-[#1b1c17] px-4 py-2 rounded-xl shadow-lg font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-[#c3c6d7]">
            Need help? Chat with JoyBot! 🧸
          </span>
        </button>
      </div>

      {/* Chat Drawer Widget */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 md:right-8 z-50 w-[92vw] sm:w-[380px] h-[520px] bg-white rounded-3xl shadow-2xl border border-[#c3c6d7] flex flex-col overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#ea580c] to-[#e11d48] text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold">
                🧸
              </div>
              <div>
                <h3 className="font-extrabold text-base leading-tight">JoyBot AI</h3>
                <p className="text-xs text-orange-100 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping" />
                  Online • Smart Shopping Assistant
                </p>
              </div>
            </div>

            <button
              onClick={onToggle}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          {/* Quick Suggestion Chips */}
          <div className="bg-[#f0eee6] p-2 flex gap-2 overflow-x-auto text-xs whitespace-nowrap no-scrollbar border-b border-[#e4e3db]">
            <button
              onClick={() => handleSend("Best educational toys under ₹2,000")}
              className="px-2.5 py-1 bg-white hover:bg-[#ffedd5] rounded-full text-[#ea580c] font-bold border border-[#c3c6d7]"
            >
              🎓 STEM &lt; ₹2k
            </button>
            <button
              onClick={onOpenGiftFinder}
              className="px-2.5 py-1 bg-[#ffe16d] text-[#221b00] rounded-full font-bold shadow-xs"
            >
              🎁 Gift Finder
            </button>
            <button
              onClick={() => handleSend("Soft toys for 3-year-old")}
              className="px-2.5 py-1 bg-white hover:bg-[#ffdbd0] rounded-full text-[#aa3000] font-semibold border border-[#c3c6d7]"
            >
              🧸 Soft Toys
            </button>
            <button
              onClick={() => handleSend("Coupon codes & discounts")}
              className="px-2.5 py-1 bg-white hover:bg-[#e4e3db] rounded-full text-[#434655] font-semibold border border-[#c3c6d7]"
            >
              🏷️ Coupons
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#fbf9f1]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#ea580c] text-white rounded-br-none'
                      : 'bg-white text-[#1b1c17] shadow-xs border border-[#c3c6d7] rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-[#737686] mt-1 px-1">
                  {msg.time}
                </span>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-[#737686] bg-white px-3 py-2 rounded-2xl w-max shadow-xs border border-[#c3c6d7]">
                <span className="w-2 h-2 bg-[#ea580c] rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-[#aa3000] rounded-full animate-bounce delay-100" />
                <span className="w-2 h-2 bg-[#705d00] rounded-full animate-bounce delay-200" />
                JoyBot is thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-[#e4e3db] flex items-center gap-2">
            <button
              onClick={handleVoiceInput}
              className={`p-2 rounded-full transition-colors ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-[#f0eee6] text-[#ea580c] hover:bg-[#ffedd5]'
              }`}
              title="Speak to JoyBot"
            >
              <span className="material-symbols-outlined text-xl">mic</span>
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask JoyBot anything about toys..."
              className="flex-1 bg-[#f0eee6] rounded-full px-4 py-2 text-sm text-[#1b1c17] focus:outline-none focus:ring-2 focus:ring-[#ea580c]"
            />

            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || loading}
              className="w-9 h-9 bg-[#ea580c] text-white rounded-full flex items-center justify-center disabled:opacity-40 hover:bg-[#c8452a] cursor-pointer shrink-0"
            >
              <span className="material-symbols-outlined text-lg">send</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
