import React from 'react';

const Logo = ({ size = 32, isDark = false }) => {
  const fluffyColor = isDark ? '#FFFFFF' : '#991B1B';
  const friendsColor = isDark ? '#FECACA' : '#EF4444';
  const pawColor = isDark ? '#FCA5A5' : '#EF4444';

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 380 60" 
      width={size} 
    >
      <defs>
        <style>
          {`
            .wordmark {
              font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
              font-weight: 700;
              font-size: 34px;
              letter-spacing: -0.5px;
            }
            .fluffy {
              fill: ${fluffyColor};
            }
            .friends {
              fill: ${friendsColor};
            }
            .paw-heart {
              fill: ${pawColor};
            }
          `}
        </style>
      </defs>
      <g transform="translate(10, 0)">
        {/* Icon: Paw Print with Heart Center */}
        <g className="paw-heart">
          {/* Heart-shaped main pad */}
          <path d="M 30 38 
                   C 28 35, 18 27, 18 22 
                   A 5.5 5.5 0 0 1 27.5 18.5 
                   A 5.5 5.5 0 0 1 30 21 
                   A 5.5 5.5 0 0 1 32.5 18.5 
                   A 5.5 5.5 0 0 1 42 22 
                   C 42 27, 32 35, 30 38 Z" />
          
          {/* Toe Beans */}
          <ellipse cx="17" cy="15" rx="3.5" ry="5" transform="rotate(-25 17 15)" />
          <ellipse cx="25.5" cy="10.5" rx="3.5" ry="5" transform="rotate(-8 25.5 10.5)" />
          <ellipse cx="34.5" cy="10.5" rx="3.5" ry="5" transform="rotate(8 34.5 10.5)" />
          <ellipse cx="43" cy="15" rx="3.5" ry="5" transform="rotate(25 43 15)" />
        </g>
        {/* Wordmark */}
        <text x="58" y="38" className="wordmark">
          <tspan className="fluffy">fluffy</tspan>
          <tspan className="friends">Friends</tspan>
        </text>
      </g>
    </svg>
  );
};

export default Logo;