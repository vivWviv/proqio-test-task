import React, { useEffect } from "react";
import { Meta, StoryObj } from "@storybook/react";
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

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: (args: any) => {
    const methods = useForm();

    return (
      <FormProvider {...methods}>
        <form className="h-60">
          <Select {...args} />
        </form>
      </FormProvider>
    );
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      type: {
        required: true,
      },
      control: {
        type: "text",
      },
      description: "Name of the field for register",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    options: {
      type: {
        required: true,
      },
      table: {
        type: {
          summary: "OptionsType[]",
        },
      },
      description: "Options for the display in select",
    },
    placeholder: {
      control: {
        type: "text",
      },
      table: {
        defaultValue: {
          summary: "Select...",
        },
        type: {
          summary: "string",
        },
      },
      description: "A text placeholder to be shown in select",
    },
    dropDownHeight: {
      table: {
        defaultValue: {
          summary: "150px",
        },
        type: {
          summary: "string",
        },
      },
      description: "Indicates the height of the dropdown",
      control: {
        type: "text",
      },
    },
    disabled: {
      table: {
        defaultValue: {
          summary: false,
        },
        type: {
          summary: "boolean",
        },
      },
      description: "If true, select will be disabled",
      control: {
        type: "boolean",
      },
    },
    limit: {
      table: {
        type: {
          summary: "number",
        },
      },
      description: "Maximum allowable number of selected options",
      control: {
        type: "number",
      },
    },
    registerOptions: {
      table: {
        type: {
          summary: "RegisterOptions",
        },
      },
      defaultValue: {
        summary: "{}",
      },
      description: "Optional configuration for initial 'register'",
    },
    isLoading: {
      table: {
        defaultValue: {
          summary: false,
        },
        type: {
          summary: "boolean",
        },
      },
      description: "Disables interaction with the select and displays loading.",
      control: {
        type: "boolean",
      },
    },
    isSearchable: {
      table: {
        defaultValue: {
          summary: false,
        },
        type: {
          summary: "boolean",
        },
      },
      description: "Provides the ability to search within the list of options.",
      control: {
        type: "boolean",
      },
    },
    onOptionClick: {
      table: {
        type: {
          summary:
            "(e:React.MouseEvent<HTMLLIElement, MouseEvent>, option: OptionsType) => void",
        },
      },
      description:
        "Triggered upon clicking on an option within the dropdown list.",
    },
    onSelectedOptionClick: {
      table: {
        type: {
          summary:
            "(e:React.MouseEvent<HTMLSpanElement, MouseEvent>, option: OptionsType) => void",
        },
      },
      description:
        "Triggered upon clicking on one of the already selected options.",
    },
    onRemoveOptionClick: {
      table: {
        type: {
          summary:
            "(e:React.MouseEvent<HTMLButtonElement, MouseEvent>, option: OptionsType) => void",
        },
      },
      description:
        "Triggered when removing one of the options from the selected ones.",
    },
  },
};

export default meta;

/** Default Select just to show how it works */
export const Default: StoryObj<typeof meta> = {
  args: {
    name: "select",
    options: defaultOptions,
    placeholder: "Select...",
  },
};

/** An example of a disabled select. */
export const WithDisabled: StoryObj<typeof Select> = {
  args: { ...Default.args, disabled: true },
};

/** An example of using a custom dropdown height. */
export const WithDropdownHeight: StoryObj<typeof Select> = {
  args: { ...Default.args, dropDownHeight: "200px" },
};

/** An example of using a custom placeholder. */
export const WithPlaceholder: StoryObj<typeof Select> = {
  args: { ...Default.args, placeholder: "Custom placeholder" },
};

/** An example of using a limit for a select. */
export const WithLimit: StoryObj<typeof Select> = {
  args: { ...Default.args, limit: 3 },
};

/** An example of how the isLoading property works. */
export const WithLoading: StoryObj<typeof Select> = {
  args: { ...Default.args, isLoading: true },
};

/** An example of how a filter works. */
export const WithFilter: StoryObj<typeof Select> = {
  args: { ...Default.args, isSearchable: true },
};
export const Error: StoryObj<typeof Select> = {
  render: () => {
    const methods = useForm();
    const {
      handleSubmit,
      formState: { errors },
    } = methods;
    const NAME = "example";
    const LIMIT = 2;

    useEffect(() => {
      handleSubmit(() => {})();
    }, []);

    return (
      <FormProvider {...methods}>
        <form className="h-60">
          <Select
            name={NAME}
            options={defaultOptions}
            registerOptions={{
              validate: (value) =>
                value?.length === LIMIT ||
                `There must be ${LIMIT} items selected`,
            }}
            limit={2}
          />
          <p
            className={`${
              errors?.[NAME] ? "text-red-500" : "text-gray-500"
            } text-sm mt-2`}
          >
            {errors?.[NAME]
              ? errors?.[NAME].message!.toString()
              : "Pokemons is required"}
          </p>
        </form>
      </FormProvider>
    );
  },
};
