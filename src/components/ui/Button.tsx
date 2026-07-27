import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className = "", ...props }, ref) => {
    const baseStyles = "px-4 py-2 rounded-md font-medium text-sm focus:outline-none transition-colors duration-200 flex items-center gap-2";

    const variantStyles = {
      primary: "bg-blue-950 text-white hover:bg-blue-900",
      secondary: "border border-slate-300 text-gray-700 hover:bg-gray-50",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
