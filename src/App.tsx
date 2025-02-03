import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Heart, ExternalLink, Coffee, Smartphone, Tablet, Laptop, X } from 'lucide-react';

// Import all images from the public/images directory
const imageFiles = import.meta.glob('/public/images/*.(jpg|jpeg|png|gif|webp)', {
  eager: true,
  as: 'url'
});

const GALLERY_IMAGES = Object.entries(imageFiles).map(([path, url], index) => ({
  id: index + 1,
  url: url,
  alt: `Gallery image ${index + 1}`,
  author: 'Lawrence',
  date: new Date(path.split('/').pop()?.split('.')[0] || '')
}));

interface ImageCardProps {
  url: string;
  alt: string;
  author: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ url, alt, author }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isEnlarged, setIsEnlarged] = useState(false);

  const handleImageClick = () => {
    setIsEnlarged(!isEnlarged);
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEnlarged(false);
  };

  return (
    <div 
      ref={ref}
      className={`relative group overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ${isEnlarged ? 'fixed inset-0 z-50 flex items-center justify-center' : 'hover:scale-[1.02]'}`}
      onClick={handleImageClick}
    >
      {isEnlarged && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      )}
      {inView && (
        <>
          <img
            src={url}
            alt={alt}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-white text-sm">{author}</p>
          </div>
          {isEnlarged && (
            <button 
              className="absolute top-4 right-4 z-50 text-white bg-black bg-opacity-50 rounded-full p-2"
              onClick={handleCloseClick}
            >
              <X size={24} />
            </button>
          )}
        </>
      )}
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 w-full bg-white dark:bg-gray-900 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <a 
            href="https://lawrence.lat" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <Heart size={16} />
            <span>Made by Lawrence</span>
            <ExternalLink size={14} />
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Smartphone size={16} />
            <span>iPhone 16 Pro Max</span>
          </div>
          <div className="flex items-center space-x-2">
            <Tablet size={16} />
            <span>iPad Air M1</span>
          </div>
          <div className="flex items-center space-x-2">
            <Laptop size={16} />
            <span>MacBook Pro M1 Pro 24GB</span>
          </div>
        </div>
        <a 
          href="https://ko-fi.com/lawrencemillard"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <Coffee 
            size={20} 
            className="transform transition-all duration-300 group-hover:fill-current"
          />
          <span>Support me</span>
        </a>
      </div>
    </footer>
  );
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sortedImages, setSortedImages] = useState(GALLERY_IMAGES);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener('change', handleChange);

    return () => darkModeMediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-16">
        <header className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center">
            Lawrence's Images
          </h1>
        </header>

        <main className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {sortedImages.map((image) => (
              <ImageCard
                key={image.id}
                url={image.url}
                alt={image.alt}
                author={image.author}
              />
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
