import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

declare global {
  interface Window {
    kofiwidget2: {
      init: (text: string, color: string, id: string) => void;
      draw: () => void;
    };
  }
}

function Donate() {
  useEffect(() => {
    // Load Ko-fi widget script
    const script = document.createElement('script');
    script.src = 'https://storage.ko-fi.com/cdn/widget/Widget_2.js';
    script.async = true;
    script.onload = () => {
      // Initialize Ko-fi widget after script loads
      window.kofiwidget2.init('Support me', '#000000', 'E1E6MUWJU');
      window.kofiwidget2.draw();
    };
    document.body.appendChild(script);

    // Cleanup
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <Link 
          to="/"
          className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back to Gallery</span>
        </Link>

        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Support This Project
          </h1>
          
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            If you enjoy this gallery and would like to support its development, consider buying me a coffee!
          </p>

          <div className="flex justify-center">
            {/* Ko-fi button will be inserted here by the widget script */}
            <div id="kofi-button-container"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Donate;