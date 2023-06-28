import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant: 'primary' | 'secondary';
  type: 'button' | 'submit';
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant,
  type,
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
        variant === 'primary'
          ? 'bg-blue-500 border-transparent text-white  hover:bg-blue-600 focus:outline-blue-600'
          : 'bg-transparent border-transparent text-black hover:border-gray-300 focus:outline-gray-300'
      }  py-2 px-4 border mx-auto rounded mt-3 transition-colors duration-300 w-16 flex items-center justify-center md:w-32 md:text-lg :`}
    >
      {children}
    </button>
  );
};

export default Button;
