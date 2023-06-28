import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import Select from './Select';

const meta = {
  component: (args: any) => {
    const methods = useForm();

    if (!methods.formState) {
      return null;
    }

    return (
      <FormProvider {...methods}>
        <form className="mt-10">
          <Select {...args} />
        </form>
      </FormProvider>
    );
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Choose a Pokemon',
    filterList: ['Fire', 'Water', 'Electric'],
    dropDownHeight: '200px',
    name: 'pokemon',
  },
};

export const WithPlaceholder = {
  args: {
    placeholder: 'Custom placeholder',
    name: 'pokemon',
  },
};

export const WithFilterList = {
  args: {
    filterList: ['Fire', 'Water', 'Electric'],
    name: 'pokemon',
    placeholder: 'Select a Pokemon',
  },
};

export const WithDropDownHeight = {
  args: {
    dropDownHeight: '200px',
    name: 'pokemon',
    placeholder: 'Select a Pokemon',
  },
};

export const WithDisabled = {
  args: {
    disabled: true,
    name: 'pokemon',
    placeholder: 'Select a Pokemon',
  },
};

export const WithMaxSelected = {
  args: {
    maxSelected: 10,
    name: 'pokemon',
    placeholder: 'Select a Pokemon',
  },
};

export const WithError = {
  args: {
    error: true,
    name: 'pokemon',
    placeholder: 'Select a Pokemon',
  },
};
