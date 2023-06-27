import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import InputField from './InputField';
import PokemonSelect from './PokemonSelect';
import {FormData} from "../types/types";

interface FormProps {
    submitForm: (data: FormData) => void;
}

const pokemonTypes: string[] = [
    'fire',
    'water',
    'electric',
    'grass',
    'ice',
    'fighting',
    'poison',
    'ground',
    'flying',
    'psychic',
    'bug',
    'rock',
    'ghost',
    'dragon',
    'dark',
    'steel',
    'fairy',
];

const Form: React.FC<FormProps> = ({ submitForm }) => {
    const [nameTooltipVisible, setNameTooltipVisible] = useState(false);
    const [surnameTooltipVisible, setSurnameTooltipVisible] = useState(false);

    const methods = useForm<FormData>();
    const { handleSubmit } = methods;

    const onSubmit = ({name, surname, pokemon}: FormData) => {
        const updatedData = {
            name: name.trim(),
            surname: surname.trim(),
            pokemon
        };

        submitForm(updatedData);
    };

    return (
        <FormProvider {...methods}>
            <form className="max-w-md mx-auto mt-4 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <InputField
                    label="Name"
                    name="name"
                    tooltipVisible={nameTooltipVisible}
                    setTooltipVisible={setNameTooltipVisible}
                />
                <InputField
                    label="Surname"
                    name="surname"
                    tooltipVisible={surnameTooltipVisible}
                    setTooltipVisible={setSurnameTooltipVisible}
                />

                <PokemonSelect filterList={pokemonTypes}  />

                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 mx-auto mt-3 rounded hover:bg-blue-600 transition-colors duration-300 w-16 flex items-center justify-center md:w-32 md:text-lg focus:outline-blue-700"
                >
                    Submit
                </button>
            </form>
        </FormProvider>
    );
};

export default Form;
