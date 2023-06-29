import React from "react";
import PokemonForm from "../Form/PokemonForm";

import { FormData } from "../../types/types";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { createPortal } from "react-dom";

interface FormContainerProps {
  handleSubmit: (data: FormData) => void;
  closeModal: () => void;
}

const CreateTeamModal: React.FC<FormContainerProps> = ({
  handleSubmit,
  closeModal,
}) => {
  return createPortal(
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="w-full sm:w-1/2 lg:w-1/3 rounded-lg bg-blue-100 p-4 shadow-md max-h-[470px] mx-auto">
        <div className="flex justify-between items-center px-2">
          <p className="font-bold text-lg text-gray-700 lg:text-xl">
            Create your team
          </p>
          <XMarkIcon
            className="cursor-pointer text-gray-700 hover:text-red-500 h-6 w-6"
            onClick={() => closeModal()}
          />
        </div>
        <PokemonForm submitForm={handleSubmit} closeModal={closeModal} />
      </div>
    </div>,
    document.body
  );
};

export default CreateTeamModal;
