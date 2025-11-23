import React, { useState, useEffect, useRef } from 'react';
import { Header } from './Header';
import { MessageBubble } from './MessageBubble';
import { Icons } from './IconComponents';
import { Message, MessageType, ProductDetails } from '../types';
import { getGeminiResponse } from '../services/geminiService';

const PRODUCT_DATA: ProductDetails = {
  title: 'carregador',
  price: 'R$ 10',
  imageUrl: 'https://picsum.photos/200/200',
  sellerName: 'Eliza Alves',
  sellerSince: 'Na OLX desde novembro de 2025',
};

// Initial state matching the screenshot exactly
const INITIAL_MESSAGES: Message[] = [
  {
    id: 'date-sep',
    type: MessageType.SYSTEM_GREEN, // Abuse type for logic, but handle content differently
    content: 'Hoje, 22 de novembro de 2025',
    timestamp: new Date(),
    isDateSeparator: true
  },
  {
    id: 'sys-1',
    type: MessageType.SYSTEM_GREEN,
    content: 'Venda realizada! Recebemos a confirmação do pagamento no valor de R$ 10,00. A quantia será liberada em até 48h após a entrega ao destinatário.',
    timestamp: new Date(),
  },
  {
    id: 'sys-2',
    type: MessageType.SYSTEM_GREEN,
    content: 'Combine com o comprador o melhor local, data e horário para entregar o produto.',
    timestamp: new Date(),
  },
  {
    id: 'sys-3',
    type: MessageType.SYSTEM_GREEN,
    content: 'Seu pagamento será liberado na sua conta OLX Pay em 24/11 às 17h40m caso o comprador não sinalize um problema.',
    timestamp: new Date(),
  },
];

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      type: MessageType.USER,
      content: inputText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Call Gemini
    const aiResponse = await getGeminiResponse(inputText);

    const partnerMsg: Message = {
      id: (Date.now() + 1).toString(),
      type: MessageType.PARTNER,
      content: aiResponse,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, partnerMsg]);
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#13151f] relative">
      <Header product={PRODUCT_DATA} />

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isTyping && (
           <div className="w-full px-4 mb-2 flex justify-start">
             <div className="bg-[#2a2f3e] text-slate-300 rounded-2xl rounded-tl-none px-4 py-2 text-sm italic">
               Digitando...
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Floating Action Button (Sticky overlay inside the list area visually in screenshot, but structurally fixed here) */}
      <div className="absolute bottom-[80px] w-full flex justify-center pointer-events-none">
        <button className="bg-[#f08920] hover:bg-[#d97818] text-[#13151f] font-semibold text-sm py-2.5 px-6 rounded-full shadow-lg pointer-events-auto transition-colors">
          Detalhes da Venda
        </button>
      </div>

      {/* Input Area */}
      <div className="bg-[#13151f] px-4 py-3 border-t border-slate-800 absolute bottom-0 w-full">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Digite uma mensagem..."
              className="w-full bg-[#1E232E] text-white border border-slate-600 rounded-xl py-3 pl-4 pr-4 focus:outline-none focus:border-slate-500 placeholder-slate-400 text-base"
            />
          </div>
          <button 
            onClick={inputText ? handleSendMessage : undefined}
            className="p-2 flex-shrink-0"
          >
             {inputText ? (
                 <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center">
                    <Icons.Back className="rotate-180 w-4 h-4" /> {/* Send icon hack */}
                 </div>
             ) : (
                <Icons.Mic />
             )}
          </button>
        </div>
      </div>
    </div>
  );
};