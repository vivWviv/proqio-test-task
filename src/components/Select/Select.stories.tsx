import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import { FormProvider, useForm } from "react-hook-form";

import Select from "./Select";
import { OptionsType } from "../../types/types";

const meta = {
  component: (args: any) => {
    const methods = useForm();

    const [filter, setFilter] = useState<string>(args.filter || "");
    const [options, setOptions] = useState<OptionsType[]>(args.options || []);

    const onClearFilterList = () => {
      setFilter("");
      setOptions(args.options);
    };

    const onFilterSelect = (value: string) => {
      const filtredArray = Array.from(Array(4).keys()).map((el) => {
        return { label: value + el, value: el };
      });
      setFilter(value);
      setOptions(filtredArray);
    };

    return (
      <FormProvider {...methods}>
        <form className="mt-10">
          {filter === "" || filter ? (
            <Select
              {...args}
              options={options}
              filter={{
                filter: filter,
                onClearFilterList,
                onFilterSelect,
                filterList: args.filterList,
              }}
            />
          ) : (
            <Select {...args} options={options} />
          )}
        </form>
      </FormProvider>
    );
  },
};

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
    filterList: ["Filter 1", "Filter 2", "Filter 3"],
    filter: "",
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

export const WithFilter: Story = {
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
    filterList: ["Filter 1", "Filter 2", "Filter 3"],
    filter: "Some Default Filter",
  },
};
