import React from 'react';
import Form from './Form';

import { FormData } from '../types/types';

import { XMarkIcon } from '@heroicons/react/24/solid';

interface FormContainerProps {
  handleSubmit: (data: FormData) => void;
  closeModal: () => void;
}

const FormContainer: React.FC<FormContainerProps> = ({
  handleSubmit,
  closeModal,
}) => {
  return (
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
      <Form submitForm={handleSubmit} closeModal={closeModal} />
    </div>
  );
};

export default FormContainer;
