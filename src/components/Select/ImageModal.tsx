import React from 'react';
import { createPortal } from 'react-dom';

import useEscapeKey from '../../helpers/EscapeKey';

import { XMarkIcon } from '@heroicons/react/24/solid';

interface PokemonSpriteProps {
  closeModal: () => void;
  image: string;
}

const ImageModal: React.FC<PokemonSpriteProps> = ({ closeModal, image }) => {
  useEscapeKey(closeModal);

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
      <div className="w-3/4 h-3/4 flex items-center justify-center relative">
        <div className="max-w-72 max-h-72">
          <img
            src={image}
            alt="Pokemon Sprite"
            className="w-80 h-80 object-contain"
          />
        </div>
        <button
          onClick={closeModal}
          className="absolute top-8 right-8 w-12 h-12 bg-transparent border-none outline-none flex items-center justify-center"
        >
          <XMarkIcon className="w-8 h-8 text-white" />
        </button>
      </div>
    </div>,
    document.body
  );
};

export default ImageModal;
