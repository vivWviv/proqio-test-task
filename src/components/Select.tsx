import React, { ChangeEvent, useState } from "react";

interface Option {
    value: string;
    label: string;
}

interface SelectProps {
    options: Option[];
    onChange: (selectedValues: string[]) => void;
}

const Select: React.FC<SelectProps> = ({ options, onChange }) => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(event.target.options)
            .filter((option) => option.selected)
            .map((option) => option.value);

        setSelectedValues(selectedOptions);
        onChange(selectedOptions);
    };

    return (
        <select
            multiple
            className="border border-gray-300 p-2 rounded-md"
            value={selectedValues}
            onChange={handleSelectChange}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Select;
