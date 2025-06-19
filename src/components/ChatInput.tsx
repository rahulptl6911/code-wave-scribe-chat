
import React, { useState, useRef, useEffect } from 'react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: (content: string) => void;
}

interface MentionOption {
  id: string;
  label: string;
  description: string;
}

const mentionOptions: MentionOption[] = [
  { id: 'code-gen', label: 'Code Generation', description: 'Generate new code' },
  { id: 'code-review', label: 'Code Review', description: 'Review existing code' },
  { id: 'code-refactor', label: 'Code Refactor', description: 'Refactor and improve code' },
  { id: 'code-explain', label: 'Code Explanation', description: 'Explain how code works' },
  { id: 'error-explain', label: 'Error Explanation', description: 'Help with errors and bugs' },
  { id: 'optimization', label: 'Code Optimization', description: 'Optimize code performance' },
  { id: 'testing', label: 'Testing', description: 'Help with unit testing' },
];

export const ChatInput: React.FC<ChatInputProps> = ({ value, onChange, onSend }) => {
  const [showMentions, setShowMentions] = useState(false);
  const [mentionQuery, setMentionQuery] = useState('');
  const [selectedMentionIndex, setSelectedMentionIndex] = useState(0);
  const [cursorPosition, setCursorPosition] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const mentionRef = useRef<HTMLDivElement>(null);

  const filteredMentions = mentionOptions.filter(option =>
    option.label.toLowerCase().includes(mentionQuery.toLowerCase())
  );

  useEffect(() => {
    if (showMentions && mentionRef.current) {
      const selectedElement = mentionRef.current.children[selectedMentionIndex] as HTMLElement;
      selectedElement?.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedMentionIndex, showMentions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    const cursorPos = e.target.selectionStart;
    onChange(newValue);
    setCursorPosition(cursorPos);

    // Check for @ mention
    const beforeCursor = newValue.substring(0, cursorPos);
    const lastAtIndex = beforeCursor.lastIndexOf('@');
    
    if (lastAtIndex !== -1) {
      const afterAt = beforeCursor.substring(lastAtIndex + 1);
      if (!afterAt.includes(' ') && !afterAt.includes('\n')) {
        setMentionQuery(afterAt);
        setShowMentions(true);
        setSelectedMentionIndex(0);
        return;
      }
    }
    
    setShowMentions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (showMentions) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedMentionIndex(prev => 
          prev < filteredMentions.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedMentionIndex(prev => 
          prev > 0 ? prev - 1 : filteredMentions.length - 1
        );
      } else if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        insertMention(filteredMentions[selectedMentionIndex]);
      } else if (e.key === 'Escape') {
        setShowMentions(false);
      }
    } else {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        onSend(value);
      }
    }
  };

  const insertMention = (mention: MentionOption) => {
    const beforeCursor = value.substring(0, cursorPosition);
    const afterCursor = value.substring(cursorPosition);
    const lastAtIndex = beforeCursor.lastIndexOf('@');
    
    const newValue = 
      beforeCursor.substring(0, lastAtIndex) + 
      `@${mention.label} ` + 
      afterCursor;
    
    onChange(newValue);
    setShowMentions(false);
    
    // Focus back to textarea
    setTimeout(() => {
      textareaRef.current?.focus();
      const newCursorPos = lastAtIndex + mention.label.length + 2;
      textareaRef.current?.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  return (
    <div className="relative px-4 py-3">
      {/* Mention Dropdown */}
      {showMentions && filteredMentions.length > 0 && (
        <div 
          ref={mentionRef}
          className="absolute bottom-full left-4 right-4 mb-2 bg-[#2d2d30] border border-gray-600 rounded-lg shadow-lg max-h-48 overflow-y-auto z-50"
        >
          {filteredMentions.map((mention, index) => (
            <div
              key={mention.id}
              className={`px-3 py-2 cursor-pointer border-b border-gray-700 last:border-b-0 ${
                index === selectedMentionIndex 
                  ? 'bg-blue-600/20 border-l-2 border-l-blue-500' 
                  : 'hover:bg-gray-700'
              }`}
              onClick={() => insertMention(mention)}
            >
              <div className="font-medium text-gray-200">{mention.label}</div>
              <div className="text-xs text-gray-400">{mention.description}</div>
            </div>
          ))}
        </div>
      )}

      {/* Text Input */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type @ for commands, Enter to send, Shift+Enter for new line..."
        className="w-full min-h-[40px] max-h-32 px-3 py-2 bg-[#3c3c3c] border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 resize-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        rows={1}
        style={{
          height: 'auto',
          minHeight: '40px'
        }}
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement;
          target.style.height = 'auto';
          target.style.height = Math.min(target.scrollHeight, 128) + 'px';
        }}
      />
    </div>
  );
};
