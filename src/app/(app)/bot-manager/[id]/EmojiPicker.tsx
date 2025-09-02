"use client";

import { useState, useEffect, useCallback } from 'react';
import Picker from 'emoji-picker-react';

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  onClose: () => void;
}

export default function EmojiPicker({ onSelect, onClose }: EmojiPickerProps) {
  const [isOpen, setIsOpen] = useState(true);

  const handleEmojiClick = useCallback((emojiData: any) => {
    onSelect(emojiData.emoji);
  }, [onSelect]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest('.emoji-picker-react')) {
        setIsOpen(false);
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="absolute z-10 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
      <Picker onEmojiClick={handleEmojiClick} />
    </div>
  );
}