import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  forwardRef,
} from "react";
import { useFormContext, UseFormRegisterReturn } from "react-hook-form";

import InfiniteScroll from "../InfiniteScroll";
import Filter from "./Filter";

import { firstLetterCapitalize } from "../../helpers/string";
import { OptionsType } from "../../types/types";

import { XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

export interface SelectProps {
  name: string;
  placeholder: string;
  register?: UseFormRegisterReturn<string>;
  options: OptionsType[];
  dropDownHeight?: string;
  disabled?: boolean;
  isError?: boolean;
  limit: number;
  //
  // async?: {
  //   isLoading: boolean;
  //   onLoadMore: () => void;
  //   hasMore: boolean;
  // };

  onOptionClick?: (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    option: OptionsType
  ) => void;
  onSelectedOptionClick?: (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    option: OptionsType
  ) => void;
  onRemoveOptionClick?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    option: OptionsType
  ) => void;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      name,
      dropDownHeight,
      placeholder,
      options,
      register,
      disabled,
      isError,
      limit,
      // async,
      onOptionClick,
      onSelectedOptionClick,
      onRemoveOptionClick,
      // filter,
    },
    ref
  ) => {
    const methods = useFormContext();

    const {
      watch,
      formState: { errors },
      setValue,
    } = methods;

    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const isMaxSelected = watch(name)?.length >= limit;

    useEffect(() => {
      const handleDropdownOutsideClick = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsDropdownVisible(false);
        }
      };

      document.addEventListener("mousedown", handleDropdownOutsideClick);

      return () => {
        document.removeEventListener("mousedown", handleDropdownOutsideClick);
      };
    }, []);

    const handleOptionSelectClick = (
      e: React.MouseEvent<HTMLLIElement, MouseEvent>,
      option: OptionsType
    ) => {
      if (isMaxSelected) return;

      if (onOptionClick) {
        onOptionClick(e, option);
        setIsDropdownVisible(false);
        return;
      }

      setValue(name, [...(watch(name) || []), option]);
      setIsDropdownVisible(false);
    };

    const handleRemoveOption = useCallback(
      (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        option: OptionsType
      ) => {
        if (onRemoveOptionClick) {
          onRemoveOptionClick(e, option);
          return;
        }

        const currentSelectedOptionList = watch(name) || [];

        setValue(
          name,
          currentSelectedOptionList.filter(
            (op: OptionsType) => op.label !== option.label
          ),
          { shouldValidate: true }
        );
      },
      [watch, setValue, name, onRemoveOptionClick]
    );

    const handleInputClick = () => {
      if (isMaxSelected) return;
      setIsDropdownVisible((prev) => !prev);
    };

    const handleWheelScroll = (e: React.WheelEvent<HTMLDivElement>) => {
      e.preventDefault();
      const container = e.currentTarget;
      const scrollAmount = e.deltaY;
      container.scrollLeft += scrollAmount;
    };

    const handleSelectedOptionClick = (
      e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
      option: OptionsType
    ) => {
      if (onSelectedOptionClick) onSelectedOptionClick(e, option);
      return;
    };

    return (
      <>
        <div className="relative">
          <select className="absolute hidden" multiple ref={ref} name={name}>
            {options.map((item) => (
              <option key={item.label} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <div
            className={`w-full rounded-md px-3 py-2 border flex items-center justify-between ${
              isError || errors[name] ? "show-error-outline" : "show-outline"
            } ${
              disabled
                ? "bg-[#F0F2FE] pointer-events-none border-[#EBEDFD] text-[#CDD2FA]"
                : "text-gray-400 bg-white border-gray-300"
            }`}
            onClick={handleInputClick}
            tabIndex={0}
          >
            {watch(name)?.length ? (
              <div
                className="flex gap-1 hide-scrollbar overflow-x-scroll"
                onWheel={(e) => handleWheelScroll(e)}
              >
                {watch(name)?.map((option: OptionsType) => (
                  <div
                    key={option.label}
                    className="flex items-center space-x-1 text-sm text-black bg-gray-100 rounded-xl py-0.5 px-2.5"
                  >
                    <span
                      onClick={(e) => handleSelectedOptionClick(e, option)}
                      className="whitespace-nowrap"
                    >
                      {firstLetterCapitalize(option.label)}
                    </span>
                    <button
                      onClick={(e) => handleRemoveOption(e, option)}
                      className="mt-0.5"
                    >
                      <XMarkIcon className="h-4 w-4 text-gray-500 cursor-pointer hover:text-black hover:scale-105" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              placeholder
            )}
            <div className="flex items-center gap-1.5 p-1">
              <div className="h-4 w-4">
                {watch(name)?.length > 0 && (
                  <XMarkIcon
                    className="h-4 w-4 cursor-pointer"
                    onClick={() => setValue(name, [])}
                    stroke={"black"}
                  />
                )}
              </div>
              <ChevronDownIcon
                className="h-4 w-4 cursor-pointer"
                stroke={disabled ? "#CDD2FA" : "black"}
              />
            </div>
          </div>

          {isDropdownVisible && (
            <div
              ref={dropdownRef}
              className="mt-2 p-2 absolute z-10 bg-white w-full border border-gray-300 rounded-md shadow-lg"
            >
              <div className="h-[200px] overflow-y-auto">
                <ul>
                  {options.map((option) => {
                    if (
                      !watch(name)?.some(
                        (el: OptionsType) => el.label === option.label
                      )
                    ) {
                      return (
                        <li
                          key={option.label}
                          onClick={(e) => handleOptionSelectClick(e, option)}
                          className="cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                        >
                          {firstLetterCapitalize(option.label)}
                        </li>
                      );
                    }
                    return null;
                  })}
                </ul>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
);

export default Select;
