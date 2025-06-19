
import React from 'react';
import { Search, Plus, Settings, X } from 'lucide-react';

interface TopBarProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  searchPlaceholder: string;
  onNewConversation: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  searchValue,
  setSearchValue,
  searchPlaceholder,
  onNewConversation
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700 bg-[#252526]">
      {/* Left: Search */}
      <div className="relative flex-1 max-w-xs">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full pl-8 pr-2 py-1 bg-[#3c3c3c] border border-gray-600 rounded text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Right: Action Icons */}
      <div className="flex items-center space-x-2 ml-4">
        <button
          onClick={onNewConversation}
          className="p-1.5 text-gray-400 hover:text-gray-200 hover:bg-gray-600 rounded transition-colors"
          title="New conversation"
        >
          <Plus className="w-4 h-4" />
        </button>
        
        <button
          className="p-1.5 text-gray-400 hover:text-gray-200 hover:bg-gray-600 rounded transition-colors"
          title="Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
        
        <button
          className="p-1.5 text-gray-400 hover:text-gray-200 hover:bg-gray-600 rounded transition-colors"
          title="Close panel"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
