import React from 'react';
import { ExternalLink } from 'lucide-react';
import { PatentCardProps } from '../types';

// Update the PatentCardProps interface to include productIntegration
interface EnhancedPatentCardProps extends PatentCardProps {
  productIntegration?: {
    name: string;
    logo: string;
    description: string;
  };
}

export function PatentCard({ 
  title, 
  number, 
  description, 
  status, 
  productIntegration 
}: EnhancedPatentCardProps) {
  return (
    <div className="bg-white p-5 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group h-full flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-colors line-clamp-2">{title}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-2 ${
          status === 'Granted' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
        }`}>
          {status}
        </span>
      </div>
      <p className="text-gray-500 text-xs mb-3">{number}</p>
      <p className="text-gray-700 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">{description}</p>
      
      {/* Product Integration Section */}
      {productIntegration && (
        <div className="mt-auto mb-3 border-t border-gray-100 pt-3">
          <div className="flex items-center">
            <img 
              src={productIntegration.logo} 
              alt={productIntegration.name}
              className="h-5 mr-2"
            />
            <p className="text-xs font-medium text-gray-700">
              Integrated in {productIntegration.name}
            </p>
          </div>
        </div>
      )}
      
      <div className="flex items-center text-blue-600 font-medium text-sm mt-auto">
        <span className="mr-1">View details</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </div>
    </div>
  );
} 