"use client";

import { ReactNode } from "react";

interface ButtonProps {
  variant: "primary" | "outlined"
  className?: string;
  onClick?: ()=> void;
  size:"lg"|"sm";
  children:ReactNode;
}

export const Button = ({ size,variant, className, onClick,children }: ButtonProps) => {
  return (
    <button
      className={`${className} ${variant === "primary" ? "inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-md font-medium transition-all shadow-md":"inline-flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white rounded-xl text-md font-medium transition-all shadow-md"} ${size === "lg" ? "px-6 py-3":"px-4 py-2"}`} onClick={onClick}
    >
      {children}
    </button>
  );
};
