import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import InputField from './InputField';
import PokemonSelect from './PokemonSelect';

const Form: React.FC = () => {
    const [nameTooltipVisible, setNameTooltipVisible] = useState(false);
    const [surnameTooltipVisible, setSurnameTooltipVisible] = useState(false);

    const methods = useForm();
    const { handleSubmit } = methods;

    const onSubmit = (data: any) => {
        console.log(data);
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

                <PokemonSelect />

                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 mt-3 rounded hover:bg-blue-600 transition-colors duration-300"
                >
                    Submit
                </button>
            </form>
        </FormProvider>
    );
};

export default Form;
