import React from 'react';
import { Message, MessageType } from '../types';
import { Icons } from './IconComponents';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  // Render System Messages (The Green Boxes)
  if (message.type === MessageType.SYSTEM_GREEN) {
    let Icon = Icons.Wallet; // Default
    if (message.content.includes("Combine")) Icon = Icons.Truck;
    if (message.content.includes("conta OLX Pay")) Icon = Icons.Truck; // Using truck for visual similarity to screenshot "shipping/status" icons

    return (
      <div className="w-full px-4 mb-3">
        <div className="bg-[#1e5a2d] rounded-lg p-4 flex items-start gap-3 shadow-sm border border-[#266e38]">
          <div className="mt-0.5 flex-shrink-0">
            <Icon />
          </div>
          <p className="text-green-50 text-sm leading-relaxed font-normal">
            {message.content}
          </p>
        </div>
      </div>
    );
  }

  // Render Date Separator
  if (message.isDateSeparator) {
    return (
      <div className="w-full flex justify-center py-4">
        <span className="text-slate-400 text-xs font-medium bg-[#13151f] px-3">
          {message.content}
        </span>
      </div>
    );
  }

  // Render User/Partner Messages
  const isUser = message.type === MessageType.USER;

  return (
    <div className={`w-full px-4 mb-2 flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
          isUser 
            ? 'bg-[#6e44ff] text-white rounded-tr-none' 
            : 'bg-[#2a2f3e] text-white rounded-tl-none'
        }`}
      >
        {message.content}
        <div className={`text-[10px] mt-1 text-right opacity-70`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};