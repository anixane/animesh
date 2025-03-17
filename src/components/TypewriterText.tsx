import React from 'react';
import { TypewriterTextProps } from '../types';

export function TypewriterText({ text }: TypewriterTextProps) {
  const characters = text.split('');
  
  return (
    <span className="inline-block whitespace-pre">
      {characters.map((char, index) => (
        <span 
          key={index}
          className="inline-block opacity-0 animate-letter-appear"
          style={{ 
            animationDelay: `${index * 0.08}s`,
            animationFillMode: 'forwards'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
} 