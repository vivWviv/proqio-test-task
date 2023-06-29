import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import modal from "./index";
import PokemonForm from "../Form/PokemonForm";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Do something with the submitted value
    console.log(inputValue);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="w-full sm:w-1/2 lg:w-1/3 rounded-lg bg-blue-100 p-4 shadow-md max-h-[470px] mx-auto">
        <div className="flex justify-between items-center px-2">
          <p className="font-bold text-lg text-gray-700 lg:text-xl">
            Create your team
          </p>
          <XMarkIcon
            className="cursor-pointer text-gray-700 hover:text-red-500 h-6 w-6"
            // onClick={() => closeModal()}
          />
        </div>
        {/*<PokemonForm submitForm={handleSubmit} closeModal={closeModal} />*/}
      </div>
    </div>
  );
};

export default Modal;
