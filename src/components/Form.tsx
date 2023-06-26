import React from 'react';
import { useForm } from 'react-hook-form';

import Select from "./Select";

const Form: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const options = [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
        { value: "3", label: "Option 3" },
    ];

    const handleSelectChange = (selectedValues: string[]) => {
        console.log("Selected values:", selectedValues);
    };

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <form className="max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label htmlFor="name" className="block mb-2">
                    Name:
                </label>
                <input
                    type="text"
                    id="name"
                    className={`w-full p-2 border rounded focus:outline-none ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    {...register('name', {
                        required: true,
                        minLength: 2,
                        maxLength: 12,
                        pattern: /^[a-zA-Z]+$/,
                    })}
                />
                {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                        First name must be between 2 and 12 characters long. Only characters from a-z and A-Z are accepted.
                    </p>
                )}
            </div>
            <div className="mb-4">
                <label htmlFor="surname" className="block mb-2">
                    Surname:
                </label>
                <input
                    type="text"
                    id="surname"
                    className={`w-full p-2 border rounded focus:outline-none ${
                        errors.surname ? 'border-red-500' : 'border-gray-300'
                    }`}
                    {...register('surname', {
                        required: true,
                        minLength: 2,
                        maxLength: 12,
                        pattern: /^[a-zA-Z]+$/,
                    })}
                />
                {errors.surname && (
                    <p className="text-red-500 text-sm mt-1">
                        Surname must be between 2 and 12 characters long. Only characters from a-z and A-Z are accepted.
                    </p>
                )}
            </div>
            <Select onChange={handleSelectChange} options={options}/>
            <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
            >
                Submit
            </button>
        </form>
    );
};

export default Form;
