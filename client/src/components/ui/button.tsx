"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "cta" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  motion?: boolean;
}

const variantClasses = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  accent: "btn-accent",
  cta: "btn-cta",
  outline: "btn-outline",
  ghost: "bg-transparent hover:bg-secondary/50 text-foreground"
};

const sizeClasses = {
  default: "btn",
  sm: "btn btn-sm",
  lg: "btn btn-lg"
};

export const buttonVariants = ({ variant = "primary", size = "default", className = "" }: {
  variant?: keyof typeof variantClasses;
  size?: keyof typeof sizeClasses;
  className?: string;
} = {}) => {
  return cn(
    variantClasses[variant],
    sizeClasses[size],
    className
  );
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  variant = "primary",
  size = "default",
  isLoading = false,
  icon,
  iconPosition = "left",
  motion: useMotion = false,
  children,
  ...props
}, ref) => {
  if (useMotion) {
    return <motion.button ref={ref as React.Ref<HTMLButtonElement>} className={cn(variantClasses[variant], sizeClasses[size], "relative flex items-center justify-center gap-2", className)} disabled={isLoading || props.disabled} whileHover={{
      scale: 1.03
    }} whileTap={{
      scale: 0.97
    }} transition={{
      duration: 0.2
    }} {...props as any} data-unique-id="78e9a485-94d6-4512-b634-b3aaa0b2950f" data-file-name="components/ui/button.tsx" data-dynamic-text="true">
        {isLoading && <span className="absolute inset-0 flex items-center justify-center" data-unique-id="a0c77d6d-03b0-4d53-a232-bb699b0f343a" data-file-name="components/ui/button.tsx">
            <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-unique-id="968ed73f-d6ab-49ec-bd91-92e2559487f4" data-file-name="components/ui/button.tsx">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>}
        <span className={cn("flex items-center gap-2", isLoading ? "invisible" : "visible")} data-unique-id="dee4d202-2902-44ac-bfe0-a0df429143f5" data-file-name="components/ui/button.tsx" data-dynamic-text="true">
          {icon && iconPosition === "left" && icon}
          {children}
          {icon && iconPosition === "right" && icon}
        </span>
        {isLoading && <span className="absolute inset-0 flex items-center justify-center" data-unique-id="73544331-96e4-4b34-825e-31a9a5fd4238" data-file-name="components/ui/button.tsx">
            <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-unique-id="3ae14065-072c-4817-8c42-d395db53b48d" data-file-name="components/ui/button.tsx">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>}
      </motion.button>;
  }
  return <button ref={ref} className={cn(variantClasses[variant], sizeClasses[size], "relative flex items-center justify-center gap-2", className)} disabled={isLoading || props.disabled} {...props} data-unique-id="9378d17c-fd94-45c6-9917-a7363ac3f013" data-file-name="components/ui/button.tsx" data-dynamic-text="true">
      {isLoading && <span className="absolute inset-0 flex items-center justify-center" data-unique-id="32df8939-d1db-472b-b701-02c12b09f8ba" data-file-name="components/ui/button.tsx">
          <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-unique-id="30943a52-6a56-4333-9fcf-d6526a32f8c2" data-file-name="components/ui/button.tsx">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>}
      <span className={cn("flex items-center gap-2", isLoading ? "invisible" : "visible")} data-unique-id="a0d425a8-fb3f-4238-97ec-f2325ed9abd2" data-file-name="components/ui/button.tsx" data-dynamic-text="true">
        {icon && iconPosition === "left" && icon}
        {children}
        {icon && iconPosition === "right" && icon}
      </span>
    </button>;
});

Button.displayName = "Button";
export { Button };