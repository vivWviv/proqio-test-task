import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import PokemonSelect from '../components/PokemonSelect';

const meta = {
    component: (args:any) => {
        const methods = useForm();

        if (!methods.formState) {
            return null;
        }

        return (
            <FormProvider {...methods}>
                <form className="mt-10">
                    <PokemonSelect {...args} />
                </form>
            </FormProvider>
        );
    },
} satisfies Meta<typeof PokemonSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
    label: 'Select Pokemon',
    labelInfo: 'You can choose up to 4 pokemons',
    placeholder: 'Choose a Pokemon',
    filterList: ['Fire', 'Water', 'Electric'],
    dropDownHeight: '200px',
}
}

export const WithLabel = {
    args: {
        label:"Select Pokemon"
}
}

export const WithLabelInfo = {
    args: {
        label:"Select Pokemon",
            labelInfo:"You can choose up to 4 pokemons"
    }
}

export const WithPlaceholder = {
    args: {
        placeholder: "Choose a Pokemon"
    }
}

export const WithFilterList = {
    args: {
       filterList: ['Fire', 'Water', 'Electric']
    }
}

export const WithDropDownHeight = {
    args: {
        dropDownHeight: "200px"
    }
}

