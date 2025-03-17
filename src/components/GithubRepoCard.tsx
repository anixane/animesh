import React from 'react';
import { ExternalLink, Star, GitFork } from 'lucide-react';

export interface GithubRepoProps {
  name: string;
  description: string;
  language: string;
  languageColor?: string | null;
  stars: number;
  forks: number;
  size: number;
  url: string;
}

export function GithubRepoCard({ name, description, language, languageColor, stars, forks, size, url }: GithubRepoProps) {
  // Helper function to format language display with the correct dot color
  const getLanguageColor = (lang: string, customColor: string | null | undefined) => {
    if (customColor) return `bg-[${customColor}]`;
    
    const colors: {[key: string]: string} = {
      JavaScript: 'bg-yellow-400',
      TypeScript: 'bg-blue-600',
      Python: 'bg-blue-500',
      HTML: 'bg-red-500',
      CSS: 'bg-purple-500',
      Java: 'bg-orange-500',
      C: 'bg-gray-500',
      'C++': 'bg-pink-500',
      'C#': 'bg-green-600',
      Ruby: 'bg-red-600',
      PHP: 'bg-indigo-400',
      Swift: 'bg-orange-600',
      Go: 'bg-cyan-500',
      Kotlin: 'bg-purple-600',
      Rust: 'bg-brown-500',
    };
    
    return colors[lang] || 'bg-gray-400';
  };

  // Format file size
  const formatSize = (sizeInKB: number) => {
    if (sizeInKB < 1024) {
      return `${sizeInKB.toFixed(1)} KB`;
    } else {
      return `${(sizeInKB / 1024).toFixed(1)} MB`;
    }
  };
  
  return (
    <div className="bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 overflow-hidden h-full border border-gray-200">
      <div className="p-4 flex flex-col h-full">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="text-base font-semibold text-gray-900 hover:text-blue-600 transition-colors truncate flex-1">
            <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center">
              {name}
              <ExternalLink className="w-3.5 h-3.5 ml-1.5 text-gray-400" />
            </a>
          </h3>
        </div>
        
        {description && (
          <p className="text-xs text-gray-600 mb-2 line-clamp-2">{description}</p>
        )}
        
        <div className="flex items-center text-xs text-gray-600 mt-auto pt-2">
          {language && language !== 'Not specified' && (
            <div className="flex items-center mr-3">
              <span className={`w-2.5 h-2.5 rounded-full ${getLanguageColor(language, languageColor)} mr-1`}></span>
              <span>{language}</span>
            </div>
          )}
          
          {stars > 0 && (
            <div className="flex items-center mr-3">
              <Star className="w-3.5 h-3.5 mr-1 text-yellow-500" />
              <span>{stars}</span>
            </div>
          )}
          
          {forks > 0 && (
            <div className="flex items-center">
              <GitFork className="w-3.5 h-3.5 mr-1 text-gray-500" />
              <span>{forks}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 