import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useParams } from 'react-router-dom';
import { Github, Linkedin, Mail, FileText, Award, GraduationCap, Calendar, ExternalLink, X, LinkIcon, Menu, ChevronDown, Loader2, Briefcase } from 'lucide-react';

import { ProjectCard } from './components/ProjectCard';
import { AchievementCard } from './components/AchievementCard';
import { PatentCard } from './components/PatentCard';
import { TypewriterText } from './components/TypewriterText';
import { GithubRepoCard } from './components/GithubRepoCard';

// Import data and styles
import { projects, experiences, patents } from './data';
import { highlightStyles } from './styles';

// Import types and services
import { Patent, Experience, Project, RoleProgression, GithubRepo } from './types';
import { fetchGitHubRepos } from './services/github';

function App() {
  // Set the document title
  React.useEffect(() => {
    document.title = "animesh.";
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/project/:id" element={<ProjectPage />} />
      <Route path="/company/:id" element={<CompanyPage />} />
    </Routes>
  );
}

function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);
  
  const openContactModal = () => {
    setShowContactModal(true);
    document.body.style.overflow = 'hidden';
  };
  
  const closeContactModal = () => {
    setShowContactModal(false);
    document.body.style.overflow = 'auto';
  };
  
  // Add scroll event listener
  React.useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;
      
      // Show header at the top, or when scrolling up
      if (currentScrollY < 50 || currentScrollY < lastScrollY) {
        setIsHeaderVisible(true);
      } else {
        setIsHeaderVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', controlHeader);
    return () => {
      window.removeEventListener('scroll', controlHeader);
    };
  }, [lastScrollY]);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    
    // In a real application, this would send the email via API
    console.log(`Sending email to pausethismoment@gmail.com from ${name} (${email}): ${message}`);
    
    // Show success message
    setFormSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false);
      closeContactModal();
    }, 3000);
  };
  
  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-transform duration-300 ${
        isHeaderVisible ? 'transform-none' : '-translate-y-full'
      }`}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-black hover:text-blue-600 transition-colors">
            animesh.
          </Link>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#experience" className="text-black hover:text-blue-600 transition-colors font-medium">
              Experience
            </a>
            <a href="#projects" className="text-black hover:text-blue-600 transition-colors font-medium">
              Projects
            </a>
            <button 
              onClick={openContactModal}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Contact
            </button>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              className="text-black hover:text-blue-600 transition-colors"
              onClick={toggleMobileMenu}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* Mobile navigation */}
        {showMobileMenu && (
          <div className="md:hidden bg-black/80 backdrop-blur-md mt-4 rounded-xl p-6 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <a 
                href="#experience" 
                className="text-white hover:text-blue-400 transition-colors font-medium"
                onClick={() => setShowMobileMenu(false)}
              >
                Experience
              </a>
              <a 
                href="#projects" 
                className="text-white hover:text-blue-400 transition-colors font-medium"
                onClick={() => setShowMobileMenu(false)}
              >
                Projects
              </a>
              <button 
                onClick={() => {
                  setShowMobileMenu(false);
                  openContactModal();
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors font-medium text-left"
              >
                Contact
              </button>
            </nav>
          </div>
        )}
      </header>
      
      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-auto animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full animate-scale-up">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900">Get in Touch</h3>
              <button 
                onClick={closeContactModal} 
                className="text-gray-500 hover:text-gray-800 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              {formSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h4>
                  <p className="text-gray-600">Thank you for reaching out. I'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function HomePage() {
  const [selectedPatent, setSelectedPatent] = useState<Patent | null>(null);
  const [expandedProgressions, setExpandedProgressions] = useState<{[key: string]: boolean}>({});
  const [showGithubRepos, setShowGithubRepos] = useState(false);
  const [githubRepos, setGithubRepos] = useState<GithubRepo[]>([]);
  const [isLoadingRepos, setIsLoadingRepos] = useState(false);
  const [repoError, setRepoError] = useState<string | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllAchievements, setShowAllAchievements] = useState(false);
  const [showEducation, setShowEducation] = useState(false);

  const openPatentModal = (patent: Patent) => {
    setSelectedPatent(patent);
    document.body.style.overflow = 'hidden';
  };

  const closePatentModal = () => {
    setSelectedPatent(null);
    document.body.style.overflow = 'auto';
  };

  const toggleProgression = (experienceId: string) => {
    setExpandedProgressions(prev => ({
      ...prev,
      [experienceId]: !prev[experienceId]
    }));
  };

  const toggleGithubRepos = () => {
    setShowGithubRepos(!showGithubRepos);
    
    // Fetch repos if they haven't been loaded yet
    if (!showGithubRepos && githubRepos.length === 0 && !isLoadingRepos) {
      loadGithubRepos();
    }
  };
  
  const loadGithubRepos = async () => {
    setIsLoadingRepos(true);
    setRepoError(null);
    
    try {
      const repos = await fetchGitHubRepos('anixane');
      setGithubRepos(repos);
    } catch (error) {
      setRepoError('Failed to load GitHub repositories. Please try again later.');
      console.error('Error loading repos:', error);
    } finally {
      setIsLoadingRepos(false);
    }
  };
  
  // Move the style injection logic inside the HomePage component
  React.useEffect(() => {
    // Create a style element for the highlight animations
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(highlightStyles));
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      {/* Header */}
      <Header />
      
      {/* Hero Section - Updated background overlay to be darker */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Background"
            className="w-full h-full object-cover opacity-20 scale-105 animate-slowly-pulse"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-blue-900/80 to-gray-900/90" />
          
          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <div className="particle particle-1"></div>
            <div className="particle particle-2"></div>
            <div className="particle particle-3"></div>
            <div className="particle particle-4"></div>
          </div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto animate-fade-in">
          <div className="mb-10">
            <div className="flex flex-col md:flex-row items-center justify-center mb-8">
              <img 
                src="public/images/image.png"
                alt="Animesh Kumar"
                className="w-40 h-40 rounded-full border-4 border-white shadow-xl mb-6 md:mb-0 md:mr-10 backlit-profile"
              />
              <div className="text-left">
                <h1 className="text-5xl md:text-7xl font-bold text-black mb-4 animate-slide-up">
                  animesh.
                </h1>
                <p className="text-xl md:text-2xl text-gray-800 font-light tracking-wide animate-slide-up-delay-1">
                  <TypewriterText text="Computer Scientist 2 (SDE3)" />
                </p>
              </div>
            </div>
            
            <div className="max-w-2xl mx-auto mb-8 text-lg text-black leading-relaxed animate-slide-up-delay-2">
              <p>AI/ML specialist with <span className="highlight-bg">6+ years of experience building innovative solutions</span> at Big Tech organizations. I'm passionate about <span className="highlight-rect">leveraging artificial intelligence</span> to solve <span className="highlight-bg">complex problems</span> and enhance human creativity. My expertise spans from software development to design. Together, we <span className="highlight-underline">can create remarkable experiences</span> that <span className="highlight-rect">transform how people interact with technology.</span></p>
            </div>
            
            <div className="flex justify-center items-center mb-10 animate-slide-up-delay-2">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_Logo.png"
                alt="Adobe"
                className="h-10 md:h-12 hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <div className="flex justify-center mb-10 animate-slide-up-delay-3">
              <a 
                href="/resume.pdf" 
                download 
                className="flex items-center px-6 py-3 bg-black text-cyan-400 rounded-lg hover:bg-black/90 transition-all duration-300 font-medium backlit-button group"
              >
                <FileText className="w-5 h-5 mr-2 group-hover:text-cyan-300 transition-colors" />
                Read CV →
              </a>
            </div>
          </div>
          <div className="flex justify-center space-x-8 animate-slide-up-delay-4">
            <a href="#" className="text-black hover:text-blue-600 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1">
              <Github className="w-8 h-8 md:w-10 md:h-10" />
            </a>
            <a href="https://www.linkedin.com/in/animeshkumar27/" target='_blank' className="text-black hover:text-blue-600 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1">
              <Linkedin className="w-8 h-8 md:w-10 md:h-10" />
            </a>
            <a href="#" className="text-black hover:text-blue-600 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1">
              <Mail className="w-8 h-8 md:w-10 md:h-10" />
            </a>
          </div>
        </div>
      </header>

      {/* Patent Section - Updated background */}
      <section id="patents" className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Innovations</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 text-gray-900">Patent Filings</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {patents.map((patent) => (
              <div 
                key={patent.id}
                onClick={() => openPatentModal(patent)}
                className="cursor-pointer h-full"
              >
                <PatentCard
                  title={patent.title}
                  number={patent.number}
                  description={patent.description}
                  status={patent.status}
                  productIntegration={patent.productIntegration}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline Section */}
      <section id="experience" className="py-16 px-6 bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Career Path</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 text-gray-900">Experience</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
          </div>
          
          {/* Desktop Timeline (hidden on mobile) */}
          <div className="hidden md:block relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 rounded-full"></div>
            
            {/* Timeline items */}
            <div className="space-y-16">
              {experiences.map((exp, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-10' : 'pl-10'} ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div 
                      className={`bg-white p-6 rounded-lg shadow-md transform transition-all duration-500 
                        hover:shadow-lg hover:-translate-y-1 relative overflow-hidden border border-gray-100`}
                    >
                      {/* Main Card Content */}
                      <div className="relative">
                        {/* Hover overlay that doesn't cover the progression section */}
                        <Link to={`/company/${exp.id}`} className="block relative group">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-95 
                            transition-opacity duration-500 rounded-lg flex items-center justify-center">
                            <div className="text-white text-center p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <p className="text-base mb-2">{exp.description}</p>
                              <div className="flex justify-center items-center">
                                <span className="mr-2 text-sm">View Details</span>
                                <ExternalLink className="w-4 h-4" />
                              </div>
                            </div>
                          </div>
                          <div className={`${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                            <img 
                              src={exp.logo} 
                              alt={exp.company} 
                              className={`h-8 mb-4 ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'}`} 
                            />
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{exp.company}</h3>
                            <p className="text-blue-600 font-semibold text-base mb-1">{exp.role}</p>
                            <p className={`text-gray-600 text-sm flex items-center ${index % 2 === 0 ? 'justify-end' : 'justify-start'} mb-4`}>
                              <Calendar className="w-4 h-4 mr-2" />
                              {exp.duration}
                            </p>
                          </div>
                        </Link>
                      </div>
                      
                      {/* Career Progression Section (outside of hover effect) */}
                      {(exp.roleProgression?.length ?? 0) > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-200 relative z-10">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleProgression(exp.id);
                            }}
                            className={`flex items-center ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'} text-blue-600 hover:text-blue-800 transition-colors text-sm`}
                          >
                            <span className="font-medium mr-1">Career Progression</span>
                            <ChevronDown 
                              className={`w-4 h-4 transform transition-transform duration-300 ${
                                expandedProgressions[exp.id] ? 'rotate-180' : ''
                              }`} 
                            />
                          </button>
                          
                          {/* Role Progression Timeline - Collapsible */}
                          <div 
                            className={`overflow-hidden transition-all duration-500 ease-in-out ${
                              expandedProgressions[exp.id] 
                                ? 'max-h-96 opacity-100' 
                                : 'max-h-0 opacity-0'
                            }`}
                          >
                            <div className="relative pt-2">
                              {exp.roleProgression?.map((role: RoleProgression, idx: number) => (
                                <div key={idx} className={`mb-8 relative ${idx === (exp.roleProgression?.length ?? 0) - 1 ? 'mb-2' : ''}`}>
                                  <div className={`flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'} items-start relative`}>
                                    <div className={`w-full ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                                      <div className="flex items-center mb-2 w-full">
                                        {index % 2 === 0 ? (
                                          <>
                                            <div className="flex-grow"></div>
                                            <p className="text-md font-semibold text-gray-800 mr-3">{role.title}</p>
                                            <div className={`w-4 h-4 rounded-full ${idx === 0 ? 'bg-blue-600' : 'bg-blue-400'} flex-shrink-0 shadow-md border-2 border-white`}></div>
                                          </>
                                        ) : (
                                          <>
                                            <div className={`w-4 h-4 rounded-full ${idx === 0 ? 'bg-blue-600' : 'bg-blue-400'} flex-shrink-0 shadow-md border-2 border-white`}></div>
                                            <p className="text-md font-semibold text-gray-800 ml-3">{role.title}</p>
                                            <div className="flex-grow"></div>
                                          </>
                                        )}
                                      </div>
                                      <div className={`${index % 2 === 0 ? 'mr-7' : 'ml-7'}`}>
                                        <p className="text-sm text-gray-500 mb-2">{role.period}</p>
                                        <ul className={`text-xs text-gray-600 ${index % 2 === 0 ? 'text-right' : 'text-left'} list-none space-y-1`}>
                                          {role.achievements.map((achievement: string, i: number) => (
                                            <li key={i} className="mb-0.5">{achievement}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                  {idx < (exp.roleProgression?.length ?? 0) - 1 && (
                                    <div className={`absolute ${index % 2 === 0 ? 'right-2' : 'left-2'} top-4 bottom-0 w-0.5 bg-blue-100`}></div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-md"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile Experience Cards (visible only on mobile) */}
          <div className="md:hidden space-y-8 relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200 z-0"></div>
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                <div className="bg-gray-50 rounded-xl shadow-lg p-6 ml-7 relative z-10 border border-gray-200
                  transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="absolute -left-10 top-8 w-4 h-4 bg-blue-600 rounded-full border-4 border-white"></div>
                  
                  {/* Main Card Content */}
                  <Link to={`/company/${exp.id}`} className="block">
                    <img src={exp.logo} alt={exp.company} className="h-8 mb-3" />
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{exp.company}</h3>
                    <p className="text-blue-700 font-semibold mb-1">{exp.role}</p>
                    <p className="text-gray-600 text-sm mb-3 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {exp.duration}
                    </p>
                    <p className="text-gray-700 text-sm mb-4">{exp.description}</p>
                  </Link>
                  
                  {/* Mobile Career Progression Toggle Button */}
                  {(exp.roleProgression?.length ?? 0) > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <button
                        onClick={(e) => {
                          e.preventDefault(); // Prevent link navigation
                          e.stopPropagation();
                          toggleProgression(exp.id);
                        }}
                        className="flex items-center justify-between w-full text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <span className="text-xs font-medium">Career Progression</span>
                        <ChevronDown 
                          className={`w-4 h-4 transform transition-transform duration-300 ${
                            expandedProgressions[exp.id] ? 'rotate-180' : ''
                          }`} 
                        />
                      </button>
                      
                      {/* Mobile Role Progression Timeline - Collapsible */}
                      <div 
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${
                          expandedProgressions[exp.id] 
                            ? 'max-h-96 opacity-100 mt-3' 
                            : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="relative pl-6">
                          <div className="absolute left-0 top-4 bottom-0 w-1 bg-blue-100 rounded-full"></div>
                          
                          {exp.roleProgression?.map((role: RoleProgression, idx: number) => (
                            <div key={idx} className={`mb-4 ${idx === (exp.roleProgression?.length ?? 0) - 1 ? 'mb-1' : ''} relative`}>
                              <div className="absolute left-0 top-1.5 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500 shadow-md border-2 border-white"></div>
                              <div>
                                <p className="text-sm font-semibold text-gray-800 mb-1">{role.title}</p>
                                <p className="text-xs text-gray-500 mb-2">{role.period}</p>
                                <ul className="text-xs text-gray-600 list-disc ml-4 space-y-1">
                                  {role.achievements.map((achievement: string, i: number) => (
                                    <li key={i}>{achievement}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section - Updated background */}
      <section id="projects" className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Featured Work</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 text-gray-900">Projects</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, showAllProjects ? projects.length : 3).map((project) => {
              if (project.company === 'Microsoft') {
                project.company = 'MAQ Software';
              }
              return (
                <ProjectCard key={project.id} {...project} />
              );
            })}
          </div>
          
          {projects.length > 3 && (
            <div className="text-center mt-8">
              <button 
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="px-5 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 font-medium transition-colors inline-flex items-center group"
              >
                <span>{showAllProjects ? 'Show Less' : 'See More'}</span>
                <ChevronDown className={`ml-2 w-4 h-4 transition-transform duration-300 ${
                  showAllProjects ? 'rotate-180' : ''
                }`} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* GitHub Repositories Section */}
      <section id="github-repos" className="py-16 px-6 bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="max-w-6xl mx-auto">
          <div 
            onClick={toggleGithubRepos}
            className="cursor-pointer group"
          >
            <div className="flex items-center justify-center">
              <div className="border-b border-gray-300 flex-grow mr-4"></div>
              <div className="flex items-center">
                <Github className="w-5 h-5 mr-2 text-gray-700" />
                <h2 className="text-2xl font-bold text-gray-900 mr-2">Open Source Projects</h2>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 group-hover:text-blue-600 ${
                    showGithubRepos ? 'rotate-180' : ''
                  }`} 
                />
              </div>
              <div className="border-b border-gray-300 flex-grow ml-4"></div>
            </div>
            <div className="text-center mt-2">
              <a 
                href="https://github.com/anixane" 
                target="_blank" 
                rel="noopener noreferrer" 
                onClick={(e) => e.stopPropagation()}
                className="text-sm text-gray-500 hover:text-blue-600 transition-colors inline-flex items-center"
              >
                <span>@anixane</span>
              </a>
            </div>
          </div>
          
          {/* Collapsible Repository Grid */}
          <div 
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              showGithubRepos 
                ? 'max-h-[2000px] opacity-100 mt-8' 
                : 'max-h-0 opacity-0'
            }`}
          >
            {isLoadingRepos ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                <span className="ml-3 text-gray-600 text-sm">Loading repositories...</span>
              </div>
            ) : repoError ? (
              <div className="text-center py-8">
                <div className="bg-red-50 text-red-700 p-4 rounded-lg inline-block text-sm">
                  <p>{repoError}</p>
                  {!process.env.REACT_APP_GITHUB_TOKEN && (
                    <div className="mt-4 p-4 bg-gray-100 rounded-lg max-w-lg mx-auto text-left">
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>Note:</strong> To display your pinned repositories, you need to:
                      </p>
                      <ol className="text-sm text-gray-700 list-decimal pl-5 space-y-1">
                        <li>Create a GitHub Personal Access Token with <code className="bg-gray-200 px-1 rounded">public_repo</code> scope</li>
                        <li>Add it to your <code className="bg-gray-200 px-1 rounded">.env</code> file as <code className="bg-gray-200 px-1 rounded">REACT_APP_GITHUB_TOKEN</code></li>
                        <li>Restart your development server</li>
                      </ol>
                    </div>
                  )}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      loadGithubRepos();
                    }}
                    className="mt-4 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-xs"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {githubRepos.length > 0 ? (
                  githubRepos.map((repo) => (
                    <GithubRepoCard 
                      key={repo.id}
                      name={repo.name}
                      description={repo.description}
                      language={repo.language}
                      languageColor={repo.languageColor}
                      stars={repo.stars}
                      forks={repo.forks}
                      size={repo.size}
                      url={repo.url}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-8 text-gray-500 text-sm">
                    No pinned repositories found. 
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        loadGithubRepos();
                      }}
                      className="ml-2 text-blue-600 hover:text-blue-800 underline text-sm"
                    >
                      Refresh
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Education Section - Updated to be collapsible */}
      <section id="education" className="py-16 px-6 bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="max-w-6xl mx-auto">
          <div 
            onClick={() => setShowEducation(!showEducation)}
            className="cursor-pointer group"
          >
            <div className="flex items-center justify-center">
              <div className="border-b border-gray-300 flex-grow mr-4"></div>
              <div className="flex items-center">
                <GraduationCap className="w-5 h-5 mr-2 text-gray-700" />
                <h2 className="text-2xl font-bold text-gray-900 mr-2">Education</h2>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 group-hover:text-blue-600 ${
                    showEducation ? 'rotate-180' : ''
                  }`} 
                />
              </div>
              <div className="border-b border-gray-300 flex-grow ml-4"></div>
            </div>
            <div className="text-center mt-2">
              <span className="text-sm text-gray-500">
                SJB Institute of Technology, Bangalore (SJBIT)
              </span>
            </div>
          </div>
          
          {/* Collapsible Education Content */}
          <div 
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              showEducation 
                ? 'max-h-[2000px] opacity-100 mt-8' 
                : 'max-h-0 opacity-0'
            }`}
          >
            <div className="bg-white rounded-lg shadow-md border border-gray-100 transform hover:shadow-lg transition-all duration-300">
              <div className="p-6">
                <div className="flex flex-col md:flex-row items-center md:items-start">
                  <div className="text-blue-600 mr-0 md:mr-6 mb-4 md:mb-0 bg-blue-50 p-3 rounded-md">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 text-center md:text-left">SJB Institute of Technology, Bangalore (SJBIT)</h3>
                    <p className="text-blue-600 mb-2 text-center md:text-left font-medium">B.Tech in Computer Science and Engineering</p>
                    <p className="text-gray-600 flex items-center justify-center md:justify-start mb-3 text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      2014 - 2018
                    </p>
                    <p className="text-gray-700 leading-relaxed text-center md:text-left mb-4">
                      Graduated with first class, specializing in Machine Learning and Backend Development.
                      Activities and societies: led and be the part of the college Quiz Team, Basketball Team, Handball Team, Volleyball Team, Fashion Team.
                    </p>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <h4 className="text-sm font-medium text-gray-800 mb-2 text-center md:text-left">Achievements</h4>
                      <ul className="text-sm text-gray-600 list-disc pl-5 mb-3 space-y-1">
                        <li>Started a Linux Enthusiast club</li>
                        <li>Secured Rank 3 in NASSCOM Smart City Hackathon, NMIT Region</li>
                        <li>Led Quiz team in inter-college competitions</li>
                      </ul>
                      <a 
                        href="https://sjbit.edu.in/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition-colors text-sm inline-flex items-center md:justify-start"
                      >
                        <span className="mr-1">Visit college website</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section - Updated background */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Recognition</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 text-gray-900">Achievements</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FileText className="w-7 h-7" />,
                title: "2+ Patents Filed",
                year: "2021-2024"
              },
              {
                icon: <Award className="w-7 h-7" />,
                title: "4 Technical Excellence Awards",
                year: "2018-Present"
              },
              {
                icon: <Award className="w-7 h-7" />,
                title: "NASSCOM Smart City Hackathon (Rank: 3)",
                year: "2014-2018"
              },
              {
                icon: <Award className="w-7 h-7" />,
                title: "National Cyber Olympiad (State Rank: 4, National Rank: 5514)",
                year: "2014-2018"
              },
              {
                icon: <Award className="w-7 h-7" />,
                title: "National Mathematics Olympiad (State Rank: 11, National Rank: 364)",
                year: "2014-2018"
              }
            ].slice(0, showAllAchievements ? 5 : 3).map((achievement, index) => (
              <AchievementCard
                key={index}
                icon={achievement.icon}
                title={achievement.title}
                year={achievement.year}
              />
            ))}
          </div>
          
          {/* Show More button for achievements */}
          {[
            {
              icon: <FileText className="w-7 h-7" />,
              title: "2+ Patents Filed",
              year: "2021-2024"
            },
            {
              icon: <Award className="w-7 h-7" />,
              title: "4 Technical Excellence Awards",
              year: "2018-Present"
            },
            {
              icon: <Award className="w-7 h-7" />,
              title: "NASSCOM Smart City Hackathon (Rank: 3)",
              year: "2014-2018"
            },
            {
              icon: <Award className="w-7 h-7" />,
              title: "National Cyber Olympiad (State Rank: 4, National Rank: 5514)",
              year: "2014-2018"
            },
            {
              icon: <Award className="w-7 h-7" />,
              title: "National Mathematics Olympiad (State Rank: 11, National Rank: 364)",
              year: "2014-2018"
            }
          ].length > 3 && (
            <div className="text-center mt-8">
              <button 
                onClick={() => setShowAllAchievements(!showAllAchievements)}
                className="px-5 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 font-medium transition-colors inline-flex items-center"
              >
                <span>{showAllAchievements ? 'Show Less' : 'See More'}</span>
                <ChevronDown className={`ml-2 w-4 h-4 transition-transform duration-300 ${
                  showAllAchievements ? 'rotate-180' : ''
                }`} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer - Enhanced with darker background gradient */}
      <footer className="bg-gradient-to-r from-gray-900 to-blue-950 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-lg mb-4 md:mb-0">© 2025 Animesh. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="text-white opacity-75 hover:opacity-100 transition-opacity">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="text-white opacity-75 hover:opacity-100 transition-opacity">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="text-white opacity-75 hover:opacity-100 transition-opacity">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Patent Modal - Updated background */}
      {selectedPatent && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-auto animate-fade-in">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-auto animate-scale-up">
            <div className="sticky top-0 bg-white p-5 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedPatent.title}</h3>
                <p className="text-gray-500 text-xs">{selectedPatent.number}</p>
              </div>
              <button 
                onClick={closePatentModal} 
                className="text-gray-500 hover:text-gray-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5">
              <div className="mb-5">
                <div className="flex flex-wrap justify-between mb-5">
                  <div className="mb-3 mr-5">
                    <h4 className="text-xs font-semibold text-gray-500 mb-1">Status</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedPatent.status === 'Granted' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {selectedPatent.status}
                    </span>
                  </div>
                  <div className="mb-3">
                    <h4 className="text-xs font-semibold text-gray-500 mb-1">Filing Date</h4>
                    <p className="text-gray-900 text-sm">{selectedPatent.filingDate}</p>
                  </div>
                </div>
                
                <h4 className="text-base font-semibold text-gray-900 mb-2">Abstract</h4>
                <p className="text-gray-700 text-sm mb-5 leading-relaxed">{selectedPatent.abstract}</p>
                
                <h4 className="text-base font-semibold text-gray-900 mb-2">Inventors</h4>
                <div className="flex flex-wrap mb-5">
                  {selectedPatent.inventors.map((inventor: string, index: number) => (
                    <span key={index} className="bg-gray-100 rounded-full px-2 py-1 text-xs text-gray-700 mr-2 mb-2">
                      {inventor}
                    </span>
                  ))}
                </div>
                
                <h4 className="text-base font-semibold text-gray-900 mb-2">Key Benefits</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm mb-5 space-y-1">
                  {selectedPatent.benefits.map((benefit: string, index: number) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
                
                {/* Product Integration Section */}
                {selectedPatent.productIntegration && (
                  <div className="mb-5">
                    <h4 className="text-base font-semibold text-gray-900 mb-2">Product Integration</h4>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <div className="flex items-center mb-2">
                        <img 
                          src={selectedPatent.productIntegration.logo} 
                          alt={selectedPatent.productIntegration.name}
                          className="h-6 mr-2"
                        />
                        <h5 className="text-sm font-semibold text-gray-800">
                          {selectedPatent.productIntegration.name}
                        </h5>
                      </div>
                      <p className="text-gray-700 text-xs">
                        {selectedPatent.productIntegration.description}
                      </p>
                    </div>
                  </div>
                )}
                
                {selectedPatent.relatedDocuments && selectedPatent.relatedDocuments.length > 0 && (
                  <>
                    <h4 className="text-base font-semibold text-gray-900 mb-2">Related Documents</h4>
                    <div className="space-y-1 mb-5">
                      {selectedPatent.relatedDocuments.map((doc: { title: string, url: string }, index: number) => (
                        <a 
                          key={index}
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors text-sm"
                        >
                          <LinkIcon className="w-3.5 h-3.5 mr-2" />
                          <span>{doc.title}</span>
                        </a>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="sticky bottom-0 bg-gray-50 p-4 border-t border-gray-200">
              <button 
                onClick={closePatentModal}
                className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CompanyPage() {
  const { id } = useParams<{ id: string }>();
  const exp = experiences.find(e => e.id === id) as Experience;
  const companyProjects = projects.filter(p => p.company === exp?.company);
  const [isProgressionExpanded, setIsProgressionExpanded] = useState(false);
  const [isProjectsExpanded, setIsProjectsExpanded] = useState(false);
  const [expandedContributions, setExpandedContributions] = useState<{[key: string]: boolean}>({});

  const toggleProgression = () => {
    setIsProgressionExpanded(!isProgressionExpanded);
  };

  const toggleProjects = () => {
    setIsProjectsExpanded(!isProjectsExpanded);
  };

  const toggleContributions = (roleId: string) => {
    setExpandedContributions(prev => ({
      ...prev,
      [roleId]: !prev[roleId]
    }));
  };

  if (!exp) {
    return <div>Company not found</div>;
  }

  // Check if this is the current company (first in the experiences array)
  const isCurrentCompany = experiences[0].id === exp.id;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-64">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <img 
              src={exp.logo} 
              alt={exp.company} 
              className="h-16 mb-4 mx-auto bg-white p-2 rounded-md" 
            />
            <h1 className="text-4xl font-bold mb-2">{exp.company}</h1>
            <p className="text-xl">{exp.role}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
          <span className="mr-2">←</span> Back to Portfolio
        </Link>

        <div className="bg-gray-50 rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Overview</h2>
          <p className="text-gray-700 mb-6">{exp.longDescription}</p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Location</h3>
              <p className="text-gray-700">{exp.location}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Team Size</h3>
              <p className="text-gray-700">{exp.teamSize}</p>
            </div>
          </div>

          {/* Update the Role Progression Timeline in the Company Page - Make it collapsible */}
          {(exp.roleProgression?.length ?? 0) > 0 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-full text-blue-600 mr-3">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-semibold">Role Progression</h3>
                </div>
                <button 
                  onClick={toggleProgression}
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <span className="text-sm mr-1">{isProgressionExpanded ? 'Hide' : 'Show'}</span>
                  <ChevronDown 
                    className={`w-5 h-5 transform transition-transform duration-300 ${
                      isProgressionExpanded ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
              </div>
              
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isProgressionExpanded ? 'max-h-[1500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="relative pl-8 border-l-2 border-blue-200 rounded-l">
                  {exp.roleProgression?.map((role: RoleProgression, idx: number) => {
                    const roleId = `${exp.id}-role-${idx}`;
                    return (
                    <div key={idx} className={`mb-5 relative ${idx === (exp.roleProgression?.length ?? 0) - 1 ? 'mb-2' : ''}`}>
                      <div className="absolute left-0 top-0 -translate-x-1/2 w-5 h-5 bg-blue-600 rounded-full border-2 border-white shadow-md flex items-center justify-center">
                        {idx === 0 ? (
                          <div className="w-1.5 h-1.5 bg-white rounded-full" />
                        ) : null}
                      </div>
                      <div className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden">
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex items-start">
                              {idx === 0 ? (
                                <div className="text-yellow-500 mr-2 mt-1">
                                  <Award className="w-4 h-4" />
                                </div>
                              ) : (
                                <div className="text-blue-500 mr-2 mt-1">
                                  <Briefcase className="w-4 h-4" />
                                </div>
                              )}
                              <div>
                                <p className="text-base font-semibold text-gray-900">{role.title}</p>
                                <p className="text-xs text-gray-500">{role.period}</p>
                              </div>
                            </div>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex items-center ${
                              (isCurrentCompany && idx === 0) ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700'
                            }`}>
                              {(isCurrentCompany && idx === 0) ? (
                                <>
                                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-1 animate-pulse"></span>
                                  Current
                                </>
                              ) : 'Previous'}
                            </span>
                          </div>
                          
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <button
                              onClick={() => toggleContributions(roleId)}
                              className="flex items-center justify-between w-full text-sm text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              <div className="flex items-center">
                                <FileText className="w-3.5 h-3.5 mr-1.5" />
                                <span className="font-medium">Key Contributions</span>
                              </div>
                              <ChevronDown 
                                className={`w-4 h-4 transform transition-transform duration-300 ${
                                  expandedContributions[roleId] ? 'rotate-180' : ''
                                }`}
                              />
                            </button>
                            
                            <div 
                              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                expandedContributions[roleId] 
                                  ? 'max-h-96 opacity-100 mt-3' 
                                  : 'max-h-0 opacity-0'
                              }`}
                            >
                              <ul className="text-gray-700 list-disc ml-5 space-y-1">
                                {role.achievements.map((achievement: string, i: number) => (
                                  <li key={i} className="text-xs">{achievement}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )})}
                </div>
              </div>
            </div>
          )}

          <h3 className="text-xl font-semibold mb-3">Tech Stack</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {exp.techStack.map((tech: string) => (
              <span key={tech} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>

          <h3 className="text-xl font-semibold mb-3">Key Achievements</h3>
          <ul className="list-disc list-inside text-gray-700">
            {exp.achievements.map((achievement: string, index: number) => (
              <li key={index} className="mb-2">{achievement}</li>
            ))}
          </ul>
        </div>

        {companyProjects.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Related Projects</h2>
              <button 
                onClick={toggleProjects}
                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                <span className="text-sm mr-1">{isProjectsExpanded ? 'Hide' : 'Show'}</span>
                <ChevronDown 
                  className={`w-5 h-5 transform transition-transform duration-300 ${
                    isProjectsExpanded ? 'rotate-180' : ''
                  }`} 
                />
              </button>
            </div>
            
            <div 
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isProjectsExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="grid md:grid-cols-2 gap-8">
                {companyProjects.map((project) => (
                  <ProjectCard key={project.id} {...project} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.id === id) as Project;

  if (!project) {
    return <div>Project not found</div>;
  }

  // Check if impact is an array or a string
  const impactItems = Array.isArray(project.impact) 
    ? project.impact 
    : [project.impact as string];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-96">
        <img 
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
            <p className="text-xl">{project.role}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
          <span className="mr-2">←</span> Back to Portfolio
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-2 rounded-md mr-3">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold">Project Overview</h2>
            </div>
            <p className="text-gray-700 mb-6 pl-10">{project.longDescription}</p>
          </div>

          <div className="mb-6 border-t border-gray-100 pt-6">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-2 rounded-md mr-3">
                <Award className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-xl font-bold">Impact</h2>
            </div>
            <div className="pl-10">
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {impactItems.map((item: string, index: number) => (
                  <li key={index} className="text-gray-700">{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-6 border-t border-gray-100 pt-6">
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 p-2 rounded-md mr-3">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold">Duration</h3>
            </div>
            <p className="text-gray-700 pl-10">{project.duration}</p>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-2 rounded-md mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-bold">Technologies Used</h3>
            </div>
            <div className="flex flex-wrap gap-2 pl-10">
              {project.technologies.map((tech: string) => (
                <span key={tech} className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;