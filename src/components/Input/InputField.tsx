import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

import { InformationCircleIcon } from "@heroicons/react/24/solid";

interface InputFieldProps {
  label: string;
  name: string;
  tooltipInfo?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  tooltipInfo,
}) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const methods = useFormContext();

  const {
    formState: { errors },
    register,
  } = methods;

  return (
    <div className="mb-4">
      <label className="mb-2 flex items-center gap-1 relative">
        {label}
        <InformationCircleIcon
          className="fill-gray-600 h-4 w-4 cursor-pointer"
          onMouseEnter={() => setTooltipVisible(true)}
          onMouseLeave={() => setTooltipVisible(false)}
        />
        {tooltipVisible && (
          <div className="absolute p-2 bg-gray-100 text-gray-600 rounded mt-1 text-xs max-w-xs whitespace-pre-wrap top-[-60px]">
            {tooltipInfo ||
              `${label} must be between 2 and 12 characters long. Only characters from a-z and A-Z are accepted.`}
          </div>
        )}
      </label>
      <input
        type="text"
        placeholder={`Enter ${label}`}
        className={`w-full p-2 border rounded-md show-outline  ${
          errors[name] ? "show-error-outline" : "border-gray-300"
        }`}
        {...register(name, {
          required: true,
          minLength: 2,
          maxLength: 12,
          pattern: /^[a-zA-Z]+$/,
        })}
      />
      <p
        className={`${
          errors[name] ? "text-red-500" : "text-gray-500"
        } text-sm mt-2`}
      >
        {errors[name]
          ? `${label} must be 2 - 12 characters long`
          : `${label} is required`}
      </p>
    </div>
  );
};

export default InputField;
