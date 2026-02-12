import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "../../utils/cn";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-200",
          "rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",

          "focus-visible:ring-slate-400 dark:focus-visible:ring-slate-600 dark:focus-visible:ring-offset-slate-900",

          {
            "bg-slate-900 text-white hover:bg-slate-800 shadow-sm hover:shadow dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-white":
              variant === "primary",

            "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:text-slate-900 shadow-sm dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-white":
              variant === "secondary",

            "border border-slate-200 bg-transparent text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800":
              variant === "outline",

            "hover:bg-slate-100 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100":
              variant === "ghost",

            "bg-red-600 text-white hover:bg-red-700 shadow-sm dark:bg-red-900/80 dark:hover:bg-red-900":
              variant === "danger",
          },

          {
            "h-9 px-3 text-xs": size === "sm",
            "h-10 px-5 text-sm": size === "md",
            "h-12 px-6 text-base": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export default Button;
