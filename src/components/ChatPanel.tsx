
import React, { useState, useRef, useEffect } from 'react';
import { Search, Plus, Settings, X, Image } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { TopBar } from './TopBar';
import { BottomControls } from './BottomControls';

export interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const ChatPanel = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your AI coding assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [chatMode, setChatMode] = useState('chat');
  const [modelMode, setModelMode] = useState('yl pro');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `I understand you want help with: "${content}". Let me assist you with that.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const handleNewConversation = () => {
    setMessages([{
      id: Date.now().toString(),
      type: 'ai',
      content: 'Hello! I\'m your AI coding assistant. How can I help you today?',
      timestamp: new Date()
    }]);
    setInputValue('');
    setSearchValue('');
  };

  const getSearchPlaceholder = () => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.type === 'user') {
      return lastMessage.content.substring(0, 7) + (lastMessage.content.length > 7 ? '...' : '');
    }
    return 'Search...';
  };

  return (
    <div className="flex flex-col h-screen bg-[#1e1e1e] text-gray-200 font-mono text-sm">
      <TopBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchPlaceholder={getSearchPlaceholder()}
        onNewConversation={handleNewConversation}
      />

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-700 bg-[#252526]">
        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSendMessage}
        />
        
        <BottomControls
          chatMode={chatMode}
          setChatMode={setChatMode}
          modelMode={modelMode}
          setModelMode={setModelMode}
        />
      </div>
    </div>
  );
};

export default ChatPanel;
