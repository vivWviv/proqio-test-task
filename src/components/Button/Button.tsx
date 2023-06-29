import React from "react";

const getSize = (size?: string): string => {
  switch (size) {
    case "xs": {
      return `text-xs h-5`;
    }
    case "sm": {
      return `text-sm h-6`;
    }
    case "lg": {
      return `h-10`;
    }
    case "xl": {
      return `h-12`;
    }
    default: {
      return `h-8`;
    }
  }
};

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant: "primary" | "secondary";
  type?: "button" | "submit";
  size?: "xs" | "sm" | "base" | "lg" | "xl";
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant,
  type,
  size,
}) => {
  const handleOnButtonClick = () => {
    if (onClick) {
      onClick();
    }
    return;
  };

  return (
    <button
      type={type}
      onClick={handleOnButtonClick}
      className={`${
        variant === "primary"
          ? "bg-blue-500 text-white hover:bg-blue-600 focus:outline-blue-600"
          : "bg-transparent text-black hover:border-gray-300 focus:outline-gray-300"
      } ${getSize(
        size
      )} py-2 px-4 border-transparent border mx-auto rounded mt-3 transition-colors duration-300 w-16 flex items-center justify-center md:w-32 md:text-lg :`}
    >
      {children}
    </button>
  );
};

export default Button;
