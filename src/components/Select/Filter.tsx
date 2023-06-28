import React, { useState } from "react";

import { firstLetterCapitalize } from "../../helpers/string";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface FilterProps {
  onFilterSelect?: (value: string) => void;
  filter: string;
  filterList: string[];
  onClearFilterList?: () => void;
}

const Filter: React.FC<FilterProps> = ({
  onFilterSelect,
  filter,
  filterList,
  onClearFilterList,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleClearFilter = async () => {
    if (onClearFilterList) onClearFilterList();
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleOptionClick = async (type: string) => {
    if (onFilterSelect) onFilterSelect(type);

    setIsDropdownOpen(false);
  };

  return (
    <div className="relative flex items-center justify-between px-2">
      <div className="relative w-full">
        <div className="py-2 pr-8 bg-transparent focus:outline-none ">
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={handleDropdownToggle}
          >
            <div className="text-gray-900">
              {filter ? firstLetterCapitalize(filter) : "Filter By"}
            </div>
            <ChevronDownIcon className="w-4 h-4 text-gray-400" />
          </div>
          {isDropdownOpen && (
            <div className="absolute top-0 left-24 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto">
              {filterList.map((value) => (
                <div
                  key={value}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleOptionClick(value)}
                >
                  {firstLetterCapitalize(value)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {filter && (
        <button
          className="flex items-center gap-1 text-gray-500 hover:text-gray-700 focus:outline-none w-fit flex-nowrap"
          onClick={handleClearFilter}
        >
          <span className="whitespace-nowrap">Clear Filter</span>
          <XMarkIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Filter;
