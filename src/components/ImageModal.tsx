import React from 'react';
import Modal from 'react-modal';

interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void; // 
  imageUrl: string;
  imageAlt: string;
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0',
    border: 'none',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
};

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onRequestClose, imageUrl, imageAlt }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Image Modal"
    >
      <div className="relative">
        <button
          onClick={onRequestClose}
          className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
        >
          &times;
        </button>
        <img src={imageUrl} alt={imageAlt} className="w-full h-full object-cover" />
      </div>
    </Modal>
  );
};

export default ImageModal;
