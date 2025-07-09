
import React, { useState, useRef, useEffect } from 'react';

function InputPanel({ onQuerySubmit, isLoading }) {
  const [query, setQuery] = useState('');
  const textareaRef = useRef(null); // ref for the textarea

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; 
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'; 
    }
  }, [query]); 

  useEffect(() => {
    if (!query && textareaRef.current) { // If query is empty
      textareaRef.current.style.height = 'auto';
    }
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query.trim()) {
      console.error('Please enter a legal query.');
      return;
    }

    onQuerySubmit(query);
    setQuery('');
  };

  return (
    <div className="flex flex-col items-center w-full ">
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full ">
        <textarea
          ref={textareaRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a question..."
          rows="1"
          className="w-full p-4 mb-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none overflow-hidden text-lg placeholder-gray-400 transition-all duration-200 ease-in-out h-auto min-h-[56px]"
          disabled={isLoading}
        ></textarea>
        <button
          type="submit"
          className={`w-full py-3 px-6 rounded-full text-white font-semibold transition-all duration-200 ease-in-out text-lg ${
            isLoading
              ? 'bg-blue-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 cursor-pointer'
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}

export default InputPanel;