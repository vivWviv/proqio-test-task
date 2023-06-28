import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useFormContext, UseFormRegisterReturn } from 'react-hook-form';

import InfiniteScroll from './InfiniteScroll';

import { firstLetterCapitalize } from '../../helpers/string';
import Filter from './Filter';

import {
  XMarkIcon,
  ChevronDownIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/solid';

export interface PokemonSelectProps {
  label: string;
  placeholder: string;
  dropDownHeight?: string;
  name: string;
  options: any[];
  helpfultext: string;
  tooltipInfo?: string;
  register: UseFormRegisterReturn<string>;
  disabled?: boolean;
  maxSelected?: number;
  onOptionClick?: (option: unknown) => void;
  filterOptions?: {
    filter: string;
    setFilter: (value: string) => void;
    filterList: string[];
    onFilterOptionClick: () => void;
  };
  async?: {
    isLoading: boolean;
    onLoadMore: () => void;
    hasMore: boolean;
  };
  onSelectedOptionClick?: (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    option: unknown
  ) => void;
  onRemoveOptionClick?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    option: unknown
  ) => void;
  onClearFilterClick?: () => void;
}

const Select: React.FC<PokemonSelectProps> = ({
  dropDownHeight,
  label,
  placeholder,
  name,
  options,
  helpfultext,
  tooltipInfo,
  register,
  disabled,
  maxSelected,
  onOptionClick,
  onSelectedOptionClick,
  onRemoveOptionClick,
  onClearFilterClick,
  async: { isLoading, onLoadMore, hasMore },
  filterOptions: { filter, setFilter, filterList, onFilterOptionClick },
}) => {
  const methods = useFormContext();

  const {
    watch,
    formState: { errors },
    setValue,
  } = methods;

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isToolTipVisible, setIsToolTipVisible] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const isMaxSelected = () => {
    if (maxSelected) {
      return watch(name)?.length >= maxSelected;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const handleDropdownOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleDropdownOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleDropdownOutsideClick);
    };
  }, []);

  const handleOptionSelectClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    option: unknown
  ) => {
    if (isMaxSelected()) return;

    if (onOptionClick) {
      onOptionClick(option);
      setIsDropdownVisible(false);
      return;
    }

    setValue(name, [...(watch(name) || []), option]);
    setIsDropdownVisible(false);
  };

  const handleRemoveOption = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, option: unknown) => {
      if (onRemoveOptionClick) {
        onRemoveOptionClick(e, option);
        return;
      }

      const currentSelectedOptionList = watch(name) || [];

      setValue(
        name,
        currentSelectedOptionList.filter(
          (p: unknown) => p.name !== option.name
        ),
        { shouldValidate: true }
      );
    },
    [watch, setValue, name, onRemoveOptionClick]
  );

  const handleInputClick = () => {
    if (isMaxSelected()) return;
    setIsDropdownVisible(prev => !prev);
  };

  const handleWheelScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const container = e.currentTarget;
    const scrollAmount = e.deltaY;
    container.scrollLeft += scrollAmount;
  };

  const handleSelectedOptionClick = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    option
  ) => {
    if (onSelectedOptionClick) {
      onSelectedOptionClick(e, option);
    }
    return;
  };

  return (
    <>
      <div className="relative">
        <select className="absolute hidden" {...register}>
          {options.map(item => (
            <option key={item.name} value={item.value}>
              {item.name}
            </option>
          ))}
        </select>

        <div className="mb-2 flex items-center gap-1 relative">
          {label}
          {tooltipInfo && (
            <>
              <InformationCircleIcon
                className="fill-gray-600 h-4 w-4 cursor-pointer"
                onMouseEnter={() => setIsToolTipVisible(true)}
                onMouseLeave={() => setIsToolTipVisible(false)}
              />
              {isToolTipVisible && (
                <div className="absolute p-2 bg-gray-100 text-gray-600 rounded mt-1 text-xs max-w-xs whitespace-pre-wrap top-[-45px]">
                  {tooltipInfo}
                </div>
              )}
            </>
          )}
        </div>

        <div>
          <div
            className={`w-full rounded-md text-gray-400 border border-gray-300 cursor-pointer px-3 py-2 flex items-center justify-between bg-white show-outline ${
              errors[name] ? 'show-error-outline' : 'border-gray-300'
            } ${
              disabled &&
              ' hover:outline-none bg-[#F0F2FE] pointer-events-none border-[#EBEDFD] text-[#CDD2FA]'
            }`}
            onClick={handleInputClick}
            tabIndex={0}
          >
            {watch(name)?.length ? (
              <div
                className="flex gap-1 hide-scrollbar overflow-x-scroll"
                onWheel={e => handleWheelScroll(e)}
              >
                {watch(name)?.map(option => (
                  <div
                    key={option.name}
                    className="flex items-center space-x-1 text-sm text-black bg-gray-100 rounded-xl py-0.5 px-2.5"
                  >
                    <span onClick={e => handleSelectedOptionClick(e, option)}>
                      {firstLetterCapitalize(option.name)}
                    </span>
                    <button
                      onClick={e => handleRemoveOption(e, option)}
                      className="mt-0.5"
                    >
                      <XMarkIcon className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <>{placeholder}</>
            )}
            <div className="flex items-center gap-1.5 p-1">
              <div className="h-4 w-4">
                {watch(name)?.length > 0 && (
                  <XMarkIcon
                    className="h-4 w-4"
                    onClick={() => setValue(name, [])}
                    stroke={'black'}
                  />
                )}
              </div>
              <ChevronDownIcon
                className="h-4 w-4"
                stroke={disabled ? '#CDD2FA' : 'black'}
              />
            </div>
          </div>
        </div>

        {isDropdownVisible && (
          <div
            ref={dropdownRef}
            className="mt-2 p-2 absolute z-10 bg-white w-full border border-gray-300 rounded-md shadow-lg"
          >
            {filterList &&
              filter === '' &&
              setFilter &&
              onFilterOptionClick && (
                <div>
                  <Filter
                    onClearFilterClick={onClearFilterClick}
                    filter={filter}
                    setFilter={setFilter}
                    filterList={filterList}
                    onFilterOptionClick={onFilterOptionClick}
                  />
                </div>
              )}
            <InfiniteScroll
              isLoading={isLoading}
              height={
                dropDownHeight ||
                (options.length < 5 ? 'fit-content' : 'calc(100vh - 580px)')
              }
              hasMore={hasMore}
              next={onLoadMore}
            >
              <ul>
                {options.map((option, index) => {
                  const isWatched = watch(name);
                  const isOptionSelected =
                    isWatched &&
                    !watch(name)?.some(p => p.name === option.name);

                  if (!isWatched || isOptionSelected) {
                    return (
                      <li
                        key={option.name + index}
                        onClick={e => handleOptionSelectClick(e, option)}
                        className="cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                      >
                        {firstLetterCapitalize(option.name)}
                      </li>
                    );
                  }

                  return null;
                })}
              </ul>
            </InfiniteScroll>
          </div>
        )}

        <p
          className={`${
            errors[name] ? 'text-red-500' : 'text-gray-500'
          } text-sm mt-2`}
        >
          {errors[name] ? errors[name]?.message!.toString() : helpfultext}
        </p>
      </div>
    </>
  );
};

export default Select;
