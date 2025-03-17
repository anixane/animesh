import React from 'react';
import { Link } from 'react-router-dom';
import { ProjectCardProps } from '../types';
import { Calendar, Briefcase, ArrowRight } from 'lucide-react';

interface EnhancedProjectProps extends ProjectCardProps {
  company?: string;
  duration?: string;
  technologies?: string[];
}

export function ProjectCard({ 
  id, 
  title, 
  description, 
  image, 
  company, 
  duration, 
  technologies 
}: EnhancedProjectProps) {
  return (
    <Link to={`/project/${id}`} className="block h-full">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 h-full flex flex-col transform hover:-translate-y-1 group border border-gray-100">
        <div className="h-40 overflow-hidden relative">
          <img 
            src={image}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          {company && (
            <div className="absolute top-0 right-0 mt-2 mr-2">
              <div className="bg-white/90 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-md shadow-sm flex items-center">
                <Briefcase className="w-3 h-3 mr-1 text-blue-600" />
                {company}
              </div>
            </div>
          )}
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-semibold mb-1.5 line-clamp-1 group-hover:text-blue-600 transition-colors">{title}</h3>
          <p className="text-gray-600 text-xs flex-1 leading-relaxed line-clamp-2 mb-2">{description}</p>
          
          {/* Additional details section */}
          <div className="mt-auto">
            {duration && (
              <div className="flex items-center text-xs text-gray-500 mb-2">
                <Calendar className="w-3.5 h-3.5 mr-1.5" />
                <span>{duration}</span>
              </div>
            )}
            
            {technologies && technologies.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {technologies.slice(0, 3).map(tech => (
                  <span key={tech} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                    {tech}
                  </span>
                ))}
                {technologies.length > 3 && (
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                    +{technologies.length - 3}
                  </span>
                )}
              </div>
            )}
            
            <div className="text-blue-600 flex items-center text-xs font-medium mt-2 group">
              <span>View details</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 transform group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
} 