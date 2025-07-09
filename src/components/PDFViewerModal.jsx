
import React from 'react';

function PDFViewerModal({ pdfUrl, onClose }) {
  if (!pdfUrl) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-2xl w-11/12 max-w-5xl h-5/6 flex flex-col relative" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-4xl leading-none focus:outline-none bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-200" // Styled as a rounded button
          aria-label="Close"
        >
          &times;
        </button>

        {/* Modal Title */}
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Legal Document Viewer</h2>

        {/* PDF Iframe */}
        <iframe
          src={pdfUrl}
          title="Legal Document"
          className="w-full h-full border border-gray-200 rounded-lg"
        ></iframe>
      </div>
    </div>
  );
}

export default PDFViewerModal;