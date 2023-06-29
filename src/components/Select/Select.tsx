import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  forwardRef,
} from "react";
import { useFormContext, UseFormRegisterReturn } from "react-hook-form";

import { firstLetterCapitalize } from "../../helpers/string";
import { OptionsType } from "../../types/types";

import { XMarkIcon, ChevronDownIcon, SunIcon } from "@heroicons/react/24/solid";

export interface SelectProps {
  name: string;
  options: OptionsType[];
  placeholder?: string;
  register?: UseFormRegisterReturn<string>;
  dropDownHeight?: string;
  disabled?: boolean;
  limit?: number;
  isLoading?: boolean;
  isSearchable?: boolean;

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
      dropDownHeight = "150px",
      placeholder,
      options,
      register,
      disabled,
      limit,
      onOptionClick,
      onSelectedOptionClick,
      onRemoveOptionClick,
      isLoading,
      isSearchable,
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
    const [filterValue, setFilterValue] = useState("");
    const [optionList, setOptionList] = useState<OptionsType[]>([]);
    const [isShaking, setIsShaking] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const isMaxSelected = limit ? watch(name)?.length >= limit : false;

    useEffect(() => {
      setOptionList(options);
    }, [options]);

    useEffect(() => {
      const handleDropdownOutsideClick = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node) &&
          isDropdownVisible
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
      }

      setValue(name, [...(watch(name) || []), option]);
      setIsDropdownVisible(false);
    };

    const handleRemoveOption = useCallback(
      (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        option: OptionsType
      ) => {
        e.stopPropagation();

        if (onRemoveOptionClick) {
          onRemoveOptionClick(e, option);
        }

        const currentSelectedOptionList = watch(name) || [];

        setValue(
          name,
          currentSelectedOptionList.filter(
            (op: OptionsType) => op.label !== option.label
          )
        );
      },
      [watch, setValue, name, onRemoveOptionClick]
    );

    const handleInputClick = () => {
      if (isMaxSelected) {
        setIsShaking(true);
        setTimeout(() => {
          setIsShaking(false);
        }, 500);
        return;
      }
      setIsDropdownVisible((prev) => !prev);
    };

    const handleWheelScroll = (e: React.WheelEvent<HTMLDivElement>) => {
      const container = e.currentTarget;
      const scrollAmount = e.deltaY;
      container.scrollLeft += scrollAmount;
    };

    const handleSelectedOptionClick = (
      e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
      option: OptionsType
    ) => {
      e.stopPropagation();
      if (onSelectedOptionClick) onSelectedOptionClick(e, option);
    };

    const handleFilterValueChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      setFilterValue(e.target.value);

      setOptionList(
        options.filter((op) =>
          op.label.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
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
              isLoading ? "pointer-events-none" : ""
            } ${isShaking ? "shake" : ""} ${
              errors[name] ? "show-error-outline" : "show-outline"
            } ${
              disabled
                ? "bg-[#F0F2FE] pointer-events-none border-[#EBEDFD] text-[#CDD2FA] cursor-not-allowed"
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
            ) : isLoading ? (
              <span>Loading...</span>
            ) : (
              <span>{placeholder || "Select..."}</span>
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
              {isLoading && (
                <div className="animate-spin">
                  <SunIcon className="h-4 w-4" />
                </div>
              )}
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
              {isSearchable && (
                <div className="mb-3 mt-1">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full p-2 border rounded-md outline-none"
                    value={filterValue}
                    onChange={handleFilterValueChange}
                  />
                </div>
              )}

              <div
                className="overflow-y-auto"
                style={{ height: dropDownHeight }}
              >
                <ul>
                  {optionList.map((option) => {
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
