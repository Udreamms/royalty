"use client";
import { useState, useEffect, useCallback } from 'react';
import Picker from 'emoji-picker-react';

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  onClose: () => void;
}

export default function EmojiPicker({ onSelect, onClose }: EmojiPickerProps) {
    const handleEmojiClick = useCallback((emojiData: any) => {
        onSelect(emojiData.emoji);
    }, [onSelect]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!(event.target as HTMLElement).closest('.emoji-picker-react')) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    return (
        <div className="absolute z-50 bottom-full mb-2">
            <Picker onEmojiClick={handleEmojiClick} />
        </div>
    );
}