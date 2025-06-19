
import React from 'react';
import { Message } from './ChatPanel';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.type === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[80%] ${isUser ? 'order-2' : 'order-1'}`}>
        {/* Avatar */}
        <div className={`flex items-center mb-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
            isUser 
              ? 'bg-blue-600 text-white' 
              : 'bg-green-600 text-white'
          }`}>
            {isUser ? 'U' : 'AI'}
          </div>
          <span className="ml-2 text-xs text-gray-400">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        {/* Message Content */}
        <div className={`px-3 py-2 rounded-lg ${
          isUser 
            ? 'bg-blue-600 text-white' 
            : 'bg-[#2d2d30] text-gray-200 border border-gray-600'
        }`}>
          <div className="whitespace-pre-wrap break-words">
            {message.content}
          </div>
        </div>
      </div>
    </div>
  );
};
