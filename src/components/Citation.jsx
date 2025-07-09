
import React from 'react';

function Citation({ text, source, link, onClick }) {
  const handleClick = () => {
    if (onClick && link) {
      onClick(link);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`mb-2 text-sm text-blue-600 hover:text-blue-800 cursor-pointer transition-colors duration-150 ${
        link ? 'underline' : ''
      }`}
    >
      <p className="m-0">
        "{text}" <span className="text-gray-500 text-xs">[{source}]</span>
      </p>
    </div>
  );
}

export default Citation;