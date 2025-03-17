// CSS for the hand-drawn highlight animations
export const highlightStyles = `
  /* Purple underline style */
  .highlight-underline {
    position: relative;
    display: inline;
    white-space: nowrap;
  }
  
  .highlight-underline::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    right: 0;
    height: 8px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 8' width='100' height='8'%3E%3Cpath d='M0,5 Q10,3 20,5 T40,5 T60,5 T80,5 T100,5' fill='none' stroke='%237c3aed' stroke-width='2'/%3E%3C/svg%3E");
    background-size: 100px 8px;
    background-repeat: repeat-x;
    background-position: bottom;
    z-index: -1;
  }
  
  /* Blue rectangle (software dev) style */
  .highlight-rect {
    position: relative;
    display: inline;
    border-radius: 1px;
    padding: 2px 4px;
    margin: 0 -2px;
    background-color: rgba(59, 130, 246, 0.15);
    border: 2px solid rgba(59, 130, 246, 0.3);
    white-space: nowrap;
  }
  
  /* Orange box outline style */
  .highlight-box {
    position: relative;
    display: inline;
    padding: 2px 4px;
    margin: 0 -2px;
    white-space: nowrap;
  }
  
  .highlight-box::before {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'%3E%3Crect x='5' y='5' width='90' height='90' fill='none' stroke='%23f97316' stroke-width='2' rx='3' stroke-dasharray='4,3' /%3E%3C/svg%3E");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    z-index: -1;
  }
  
  /* Yellow background highlight style */
  .highlight-bg {
    position: relative;
    display: inline;
    white-space: nowrap;
  }
  
  .highlight-bg::before {
    content: '';
    position: absolute;
    top: 0;
    left: -2px;
    right: -2px;
    bottom: 0;
    background-color: rgba(250, 204, 21, 0.4);
    transform: rotate(-1deg) skewX(-1deg);
    z-index: -1;
  }

  /* Backlit button effect */
  .backlit-button {
    position: relative;
    box-shadow: 0 0 15px 2px rgba(45, 212, 191, 0.5), 
                0 0 30px 5px rgba(45, 212, 191, 0.25);
    border: 1px solid rgba(45, 212, 191, 0.3);
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .backlit-button:hover {
    box-shadow: 0 0 20px 5px rgba(45, 212, 191, 0.6),
                0 0 40px 8px rgba(165, 60, 255, 0.35);
    text-shadow: 0 0 8px rgba(45, 212, 191, 0.8);
  }

  .backlit-button::after {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 30%;
    height: 100%;
    background: linear-gradient(
      to right,
      transparent,
      rgba(45, 212, 191, 0.3),
      transparent
    );
    transform: skewX(-25deg);
    animation: backlit-shimmer 3s infinite;
  }

  @keyframes backlit-shimmer {
    0% { left: -100%; }
    100% { left: 200%; }
  }

  /* Backlit profile picture effect */
  .backlit-profile {
    box-shadow: 0 0 25px 5px rgba(45, 212, 191, 0.4),
                0 0 40px 10px rgba(139, 92, 246, 0.2);
    transition: all 0.5s ease;
    animation: pulse-glow 3s infinite alternate;
  }

  @keyframes pulse-glow {
    0% {
      box-shadow: 0 0 25px 5px rgba(45, 212, 191, 0.4),
                  0 0 40px 10px rgba(139, 92, 246, 0.2);
    }
    100% {
      box-shadow: 0 0 15px 8px rgba(45, 212, 191, 0.5),
                  0 0 50px 15px rgba(139, 92, 246, 0.3);
    }
  }

  /* Letter-by-letter animation */
  @keyframes letter-appear {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-letter-appear {
    animation: letter-appear 0.5s ease forwards;
  }
`; 