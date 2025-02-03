import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Heart, ExternalLink, Coffee } from 'lucide-react';
import ImageModal from './components/ImageModal';

// Import all images from the public/images directory
const imageFiles = import.meta.glob('/public/images/*.(jpg|jpeg|png|gif|webp)', {
  eager: true,
  as: 'url'
});

const GALLERY_IMAGES = Object.entries(imageFiles).map(([path, url], index) => ({
  id: index + 1,
  url: url,
  alt: `Gallery image ${index + 1}`,
  author: 'Lawrence'
}));

interface ImageCardProps {
  url: string;
  alt: string;
  author: string;
  onClick: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ url, alt, author, onClick }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div 
      ref={ref}
      className="relative group overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-[1.02]"
      onClick={onClick}
    >
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener('change', handleChange);

    return () => darkModeMediaQuery.removeEventListener('change', handleChange);
  }, []);

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

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
            {GALLERY_IMAGES.map((image) => (
              <ImageCard
                key={image.id}
                url={image.url}
                alt={image.alt}
                author={image.author}
                onClick={() => openModal(image.url)}
              />
            ))}
          </div>
        </main>

        <Footer />
      </div>

      <ImageModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        imageUrl={selectedImage || ''}
        imageAlt="Selected image"
      />
    </div>
  );
}

export default App;
