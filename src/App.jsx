// src/App.jsx
import React, { useState, useRef, useEffect } from 'react';
import InputPanel from './components/InputPanel';
import AnswerPanel from './components/AnswerPanel';
import PDFViewerModal from './components/PDFViewerModal';

function App() {
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [pdfToDisplay, setPdfToDisplay] = useState('');
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  const chatEndRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    setShowScrollToBottom(false);
  }, [conversation]);

  // Effect to manage the visibility of the scroll-to-bottom button
  useEffect(() => {
    const handleScroll = () => {
      // Check if the user is at the very bottom of the window (with a buffer)
      const isAtBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 100); // 100px buffer
      setShowScrollToBottom(!isAtBottom); // Show if NOT at bottom
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array, effect runs only once on mount


  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  };

  const simulatedResponse = {
    answer: "Yes, under Section 166 of the Motor Vehicles Act, 1988, the claimants are entitled to an addition for future prospects even when the deceased was self-employed and aged 54–55 years at the time of the accident. In Dani Devi v. Pritam Singh, the Court held that 10% of the deceased’s annual income should be added as future prospects.",
    citations: [
      {
        text: "“as the age of the deceased at the time of accident was held to be about 54-55 years by the learned Tribunal, being self-employed, as such, 10% of annual income should have been awarded on account of future prospects.” (Para 7 of the document)",
        source: "Dani Vs Pritam (Future 10 at age 54-55).pdf",
        link: "https://lexisingapore-my.sharepoint.com/:b:/g/personal/harshit_lexi_sg/EdDegeiR_gdBVqXdyW4xEoBCdGj5E4Bo5wjvhPHpqqIuQ?e=TeU4vz"
      },
    ],
  };

  const handleQuerySubmit = async (query) => {
    setIsLoading(true);
    const userDocumentCard = {
      title: "Dani Vs Pritam (Future 10 at age 54-55)",
      type: "PDF",
      link: "https://lexisingapore-my.sharepoint.com/:b:/g/personal/harshit_lexi_sg/EdDegeiR_gdBVqXdyW4xEoBCdGj5E4Bo5wjvhPHpqqIuQ?e=TeU4vz"
    };
    setConversation(prev => [...prev, { type: 'user', content: query, documentCard: userDocumentCard }]);

    await new Promise(resolve => setTimeout(resolve, 1500));

    setConversation(prev => [
      ...prev,
      {
        type: 'lexi',
        content: simulatedResponse.answer,
        citations: simulatedResponse.citations,
      }
    ]);
    setIsLoading(false);
  };

  const handleCitationClick = (pdfUrl) => {
    setPdfToDisplay(pdfUrl);
    setShowPdfModal(true);
  };

  const handleClosePdfModal = () => {
    setShowPdfModal(false);
    setPdfToDisplay('');
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-gray-800">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-20 bg-white py-4 px-6 border-b border-gray-100 shadow-sm flex justify-between items-center">
        <h1 className="text-xl font-medium text-gray-700">Lexi Legal Assistant</h1>
      </div>

      {/* Main chat history area */}
      <div
        className="pt-[72px] pb-[170px] px-6 max-w-3xl mx-auto w-full box-border flex flex-col"
      >
        {conversation.length === 0 && (
          <div className="text-center text-gray-500 mt-20 text-lg">
            <p>Welcome! Ask a legal question to get started.</p>
          </div>
        )}

        {conversation.map((message, index) => (
          <div key={index} className={`mb-8 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            {message.type === 'user' ? (
              <div className="flex flex-col items-end max-w-[80%]">
                {message.documentCard && (
                  <div className="bg-gray-100 border border-gray-200 rounded-lg p-3 mb-2 flex items-center space-x-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-200 transition-colors duration-150"
                       onClick={() => handleCitationClick(message.documentCard.link)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM6 20V4h7v5h5v11H6z"/></svg>
                    <span className="truncate">{message.documentCard.title} ({message.documentCard.type})</span>
                  </div>
                )}
                <div className="bg-gray-100 p-4 rounded-xl shadow-sm break-words text-base text-gray-800">
                  <p className="m-0">{message.content}</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-start w-full">
                <AnswerPanel
                  answer={message.content}
                  citations={message.citations}
                  onCitationClick={handleCitationClick}
                />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start mb-6">
            <div className="bg-white p-4 rounded-2xl max-w-[85%] shadow-md">
              <p className="m-0 italic text-gray-500 text-base">Lexi is thinking...</p>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Scroll to bottom button */}
      {showScrollToBottom && (
        <button
          onClick={scrollToBottom}
          className="fixed bottom-[170px] right-1/2 translate-x-1/2 bg-white p-3 rounded-full shadow-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition-all duration-200 z-10"
          aria-label="Scroll to bottom"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
          </svg>
        </button>
      )}

      {/* Input panel */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-white p-4 border-t border-gray-100 shadow-lg max-w-3xl mx-auto w-full box-border flex-shrink-0 rounded-t-xl">
        <InputPanel onQuerySubmit={handleQuerySubmit} isLoading={isLoading} />
      </div>

      <PDFViewerModal pdfUrl={pdfToDisplay} onClose={handleClosePdfModal} />
    </div>
  );
}

export default App;