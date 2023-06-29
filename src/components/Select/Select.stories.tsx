import React from "react";
import { StoryObj } from "@storybook/react";
import { FormProvider, useForm } from "react-hook-form";

import Select from "./Select";

function generateArray(value: number) {
  let array = [];

  for (let i = 1; i <= value; i++) {
    let option = {
      label: "Option " + i,
      value: "option" + i,
    };
    array.push(option);
  }

  return array;
}

const defaultOptions = generateArray(5);

const meta = {
  component: (args: any) => {
    const methods = useForm();

    return (
      <FormProvider {...methods}>
        <form>
          {args.title && args.description && (
            <div className=" mb-3 flex flex-col gap-2">
              <p className="text-xl text-semibold">{args.title}</p>
              <p className="text-md">{args.description}</p>
            </div>
          )}

          {args.description && <hr className="mb-4" />}

          <p className="text-lg text-semibold mb-3">{args.label}</p>
          <Select {...args} />
        </form>
      </FormProvider>
    );
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Select",
    description:
      "Select components are used to select a single option from a list of options.",
    label: "Default",

    name: "select",
    placeholder: "Select...",
    options: defaultOptions,
    dropDownHeight: "150px",
    disabled: false,
    limit: 3,
    isSearchable: true,
  },
};

const stories: Story[] = [
  {
    name: "With Dropdown Height",
    args: {
      name: "select",
      placeholder: "Select...",
      options: generateArray(7),
      dropDownHeight: "200px",
    },
  },
  {
    name: "With Placeholder",
    args: {
      name: "select",
      placeholder: "Custom placeholder",
      options: defaultOptions,
    },
  },
  {
    name: "WithDisabled",
    args: {
      name: "select",
      placeholder: "Select...",
      options: defaultOptions,
      disabled: true,
    },
  },
  {
    name: "With Limit",
    args: {
      name: "select",
      placeholder: "Select...",
      options: defaultOptions,
      limit: 3,
    },
  },
  {
    name: "With Loading",
    args: {
      name: "select",
      placeholder: "Select...",
      options: defaultOptions,
      isLoading: true,
    },
  },
  {
    name: "With Filter",
    args: {
      name: "select",
      placeholder: "Select...",
      options: defaultOptions,
      isSearchable: true,
    },
  },
];

export const WithDropdownHeight = stories[0];
export const WithPlaceholder = stories[1];
export const WithDisabled = stories[2];
export const WithLimit = stories[3];
export const WithLoading = stories[4];
export const WithFilter = stories[5];
