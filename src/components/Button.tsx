import React from "react";

interface ButtonProps {
  id?: string;
  title: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClass?: string;
}

export const Button = ({
  id,
  title,
  leftIcon,
  rightIcon,
  containerClass,
}: ButtonProps) => {
  return (
    <button
      id={id}
      className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-5 py-3 text-black ${containerClass}`}
    >
      {leftIcon}
      <span className="relative incline-flex overflow-hidden font-general text-xs uppercase">{title}</span>
      {rightIcon}
    </button>
  );
};
