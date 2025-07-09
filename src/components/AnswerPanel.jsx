
import React from 'react';
import Citation from './Citation';

function AnswerPanel({ answer, citations, onCitationClick }) {
  if (!answer) {
    return (
      <div className="p-5 rounded-lg bg-gray-50 min-h-[100px] flex items-center justify-center text-gray-500">
        <p>Enter a query to see the answer and citations.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full text-base">
      {/* Main Answer Content */}
      <div className="mb-4">
        <p className="m-0 leading-relaxed text-gray-800">
          {answer}
        </p>
      </div>

      {citations && citations.length > 0 && (
        <div className="mt-4 border-t border-gray-200 pt-4">
          <h4 className="m-0 mb-2 text-gray-600 text-sm font-normal">Citations:</h4>
          {citations.map((citation, index) => (
            <Citation
              key={index}
              text={citation.text}
              source={citation.source}
              link={citation.link}
              onClick={onCitationClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default AnswerPanel;