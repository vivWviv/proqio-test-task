import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import InputField from './InputField';
import Select from './Select/Select';
import { FormData } from '../types/types';
import { POKEMON_TYPES_LIST } from '../constants/constants';
import Button from './Button';

interface FormProps {
  submitForm: (data: FormData) => void;
  closeModal: () => void;
}

const Form: React.FC<FormProps> = ({ submitForm, closeModal }) => {
  const methods = useForm<FormData>();
  const { handleSubmit } = methods;

  const onSubmit = ({ name, surname, pokemon }: FormData) => {
    const updatedData = {
      name: name.trim(),
      surname: surname.trim(),
      pokemon,
    };

    submitForm(updatedData);
  };

  return (
    <FormProvider {...methods}>
      <form
        className="max-w-md mx-auto mt-4 flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputField label="Name" name="name" />
        <InputField label="Surname" name="surname" />

        <Select filterList={POKEMON_TYPES_LIST} />

        <div className="flex gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => closeModal()}
          >
            Cancel
          </Button>

          <Button type="submit" variant="primary">
            Save
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default Form;
