import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { FormProvider, useForm } from "react-hook-form";
import Select from "./Select";

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
    name: "pokemon",
    placeholder: "Choose a Pokemon",
    options: [
      { label: "Test", value: "test" },
      { label: "Test2", value: "test2" },
      { label: "Test3", value: "test3" },
      { label: "Test4", value: "test4" },
      { label: "Test5", value: "test5" },
    ],
    dropDownHeight: "200px",
    disabled: false,
    maxSelected: 3,
    isError: false,
    // filter: {
    //   onClearFilterList: () => {
    //     console.log("Add you logic here)";
    //   },
    //   onFilterSelect: (value) => {
    //     const filteredOptions = options.filter((option) =>
    //       option.label.toLowerCase().includes(value.toLowerCase())
    //     );
    //     setPokemonList(filteredOptions);
    //   },
    //   filter: "",
    //   filterList: ["Filter 1", "Filter 2", "Filter 3"],
    // },
  },
};

export const WithPlaceholder = {
  args: {
    name: "pokemon",
    placeholder: "Custom placeholder",
    options: [
      { label: "Test", value: "test" },
      { label: "Test2", value: "test2" },
      { label: "Test3", value: "test3" },
      { label: "Test4", value: "test4" },
      { label: "Test5", value: "test5" },
    ],
  },
};

export const WithDropDownHeight = {
  args: {
    name: "pokemon",
    placeholder: "Select a Pokemon",
    dropDownHeight: "200px",
    options: [
      { label: "Test", value: "test" },
      { label: "Test2", value: "test2" },
      { label: "Test3", value: "test3" },
      { label: "Test4", value: "test4" },
      { label: "Test5", value: "test5" },
    ],
  },
};

export const WithDisabled = {
  args: {
    name: "pokemon",
    placeholder: "Choose a Pokemon",
    options: [
      { label: "Test", value: "test" },
      { label: "Test2", value: "test2" },
      { label: "Test3", value: "test3" },
      { label: "Test4", value: "test4" },
      { label: "Test5", value: "test5" },
    ],
    disabled: true,
  },
};

export const WithMaxSelected = {
  args: {
    name: "pokemon",
    placeholder: "Choose a Pokemon",
    options: [
      { label: "Test", value: "test" },
      { label: "Test2", value: "test2" },
      { label: "Test3", value: "test3" },
      { label: "Test4", value: "test4" },
      { label: "Test5", value: "test5" },
    ],
    maxSelected: 2,
  },
};

export const WithError = {
  args: {
    name: "pokemon",
    placeholder: "Choose a Pokemon",
    options: [
      { label: "Test", value: "test" },
      { label: "Test2", value: "test2" },
      { label: "Test3", value: "test3" },
      { label: "Test4", value: "test4" },
      { label: "Test5", value: "test5" },
    ],
    isError: true,
  },
};

export const WithCustomOptions: Story = {
  args: {
    name: "pokemon",
    placeholder: "Choose a Pokemon",
    options: [
      { label: "Your option 1", value: "Your value 1" },
      { label: "Your option 2", value: "Your value 2" },
      { label: "Your option 3", value: "Your value 3" },
      { label: "Your option 4", value: "Your value 4" },
      { label: "Your option 5", value: "Your value 5" },
    ],
  },
};
