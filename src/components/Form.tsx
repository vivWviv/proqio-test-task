import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Select from "./Select";

import { InformationCircleIcon } from "@heroicons/react/24/solid";

const Form: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [nameTooltipVisible, setNameTooltipVisible] = useState(false);
    const [surnameTooltipVisible, setSurnameTooltipVisible] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

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

    const handleMouseMove = (e: React.MouseEvent) => {
        setTooltipPosition({ x: e.clientX, y: e.clientY });
    };

    return (
        <form className="max-w-md mx-auto mt-4" onSubmit={handleSubmit(onSubmit)} onMouseMove={handleMouseMove}>
            <div className="mb-4">
                <label htmlFor="name" className="mb-2 flex items-center gap-1">
                    Name
                    <InformationCircleIcon
                        className="fill-gray-600 h-4 w-4 cursor-pointer"
                        onMouseEnter={() => setNameTooltipVisible(true)}
                        onMouseLeave={() => setNameTooltipVisible(false)}
                    />
                </label>
                <input
                    type="text"
                    id="name"
                    placeholder="Enter Name"
                    className={`w-full p-2 border rounded-md focus:outline-none ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    {...register('name', {
                        required: true,
                        minLength: 2,
                        maxLength: 12,
                        pattern: /^[a-zA-Z]+$/,
                    })}
                />
                <p className={`${errors.name ? 'text-red-500' : 'text-gray-500'} text-sm mt-2`}>
                    {errors.name ? "Name must be between 2 and 12 characters long" : "Name is required"}
                </p>
                {nameTooltipVisible && (
                    <div
                        className="absolute p-2 bg-gray-100 text-gray-600 rounded mt-1 text-xs max-w-xs whitespace-pre-wrap"
                        style={{ top: tooltipPosition.y - 60, left: tooltipPosition.x - 25 }}
                    >
                        First name must be between 2 and 12 characters long. Only characters from a-z and A-Z are accepted.
                    </div>
                )}
            </div>
            <div className="mb-4">
                <label htmlFor="surname" className="mb-2 flex items-center gap-1">
                    Surname
                    <InformationCircleIcon
                        className="fill-gray-600 h-4 w-4 cursor-pointer"
                        onMouseEnter={() => setSurnameTooltipVisible(true)}
                        onMouseLeave={() => setSurnameTooltipVisible(false)}
                    />
                </label>
                <input
                    type="text"
                    id="surname"
                    placeholder="Enter Surname"
                    className={`w-full p-2 border rounded-md focus:outline-none ${
                        errors.surname ? 'border-red-500' : 'border-gray-300'
                    }`}
                    {...register('surname', {
                        required: true,
                        minLength: 2,
                        maxLength: 12,
                        pattern: /^[a-zA-Z]+$/,
                    })}
                />
                <p className={`${errors.surname ? 'text-red-500' : 'text-gray-500'} text-sm mt-2`}>
                    {errors.surname ? "Surname must be between 2 and 12 characters long" : "Surname is required"}
                </p>
                {surnameTooltipVisible && (
                    <div
                        className="absolute p-2 bg-gray-100 text-gray-600 rounded mt-1 text-xs max-w-xs whitespace-pre-wrap"
                        style={{ top: tooltipPosition.y - 60, left: tooltipPosition.x - 25 }}
                    >
                        Last name must be between 2 and 12 characters long. Only characters from a-z and A-Z are accepted.
                    </div>
                )}
            </div>
            <Select onChange={handleSelectChange} options={options} />
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
