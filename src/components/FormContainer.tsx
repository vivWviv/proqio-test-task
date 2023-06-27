import React from 'react';
import Form from './Form';
import { XMarkIcon } from '@heroicons/react/24/solid';

const FormContainer = () => {
    return (
        <div className="w-full sm:w-1/2 lg:w-1/3 rounded-lg bg-blue-100 p-4 shadow-md max-h-[470px]">
            <div className="flex justify-between items-center px-2">
                <p className="font-bold text-lg text-gray-700 lg:text-xl">Modal title</p>
                <XMarkIcon className="cursor-pointer text-gray-700 hover:text-red-500 h-6 w-6" />
            </div>
            <Form />
        </div>
    );
};

export default FormContainer;
