
import React, { useState } from 'react';
import { Image } from 'lucide-react';

interface BottomControlsProps {
  chatMode: string;
  setChatMode: (mode: string) => void;
  modelMode: string;
  setModelMode: (mode: string) => void;
}

export const BottomControls: React.FC<BottomControlsProps> = ({
  chatMode,
  setChatMode,
  modelMode,
  setModelMode
}) => {
  const [imageUploading, setImageUploading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageUploading(true);
      // Simulate upload
      setTimeout(() => {
        setImageUploading(false);
        console.log('Image uploaded:', file.name);
      }, 1000);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length > 0) {
      setImageUploading(true);
      setTimeout(() => {
        setImageUploading(false);
        console.log('Images dropped:', imageFiles.map(f => f.name));
      }, 1000);
    }
  };

  return (
    <div 
      className="flex items-center justify-between px-4 py-2 border-t border-gray-700"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Left: Mode Dropdowns */}
      <div className="flex items-center space-x-3">
        <select
          value={chatMode}
          onChange={(e) => setChatMode(e.target.value)}
          className="px-2 py-1 bg-[#3c3c3c] border border-gray-600 rounded text-sm text-gray-200 focus:outline-none focus:border-blue-500"
        >
          <option value="chat">chat</option>
          <option value="write">write</option>
          <option value="agent">agent</option>
        </select>

        <select
          value={modelMode}
          onChange={(e) => setModelMode(e.target.value)}
          className="px-2 py-1 bg-[#3c3c3c] border border-gray-600 rounded text-sm text-gray-200 focus:outline-none focus:border-blue-500"
        >
          <option value="yl pro">yl pro</option>
          <option value="yl excellence">yl excellence</option>
          <option value="yl master">yl master</option>
        </select>
      </div>

      {/* Right: Image Upload */}
      <div className="flex items-center">
        <label 
          htmlFor="image-upload" 
          className={`p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-600 rounded cursor-pointer transition-colors ${
            imageUploading ? 'animate-pulse' : ''
          }`}
          title="Upload image"
        >
          <Image className="w-4 h-4" />
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          multiple
        />
      </div>
    </div>
  );
};
