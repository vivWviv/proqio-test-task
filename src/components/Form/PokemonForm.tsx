import React from "react";
import { FormProvider, useForm } from "react-hook-form";

import InputField from "../Input";
import Button from "../Button";
import { PokemonSelect } from "../Select";

import { FormData } from "../../types/types";

interface FormProps {
  submitForm: (data: FormData) => void;
  closeModal: () => void;
}

const PokemonForm: React.FC<FormProps> = ({ submitForm, closeModal }) => {
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

        <PokemonSelect />

        <div className="flex gap-2">
          <Button variant="secondary" size="lg" onClick={() => closeModal()}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="lg">
            Save
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default PokemonForm;
