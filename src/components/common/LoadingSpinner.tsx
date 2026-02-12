import { Loader2 } from "lucide-react";
import { cn } from "../../utils/cn";

interface LoadingSpinnerProps {
  className?: string;
  text?: string;
}

export default function LoadingSpinner({
  className,
  text = "Loading data...",
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-[200px] p-8",
        className
      )}
    >
      <div className="relative">
        <div className="absolute inset-0 rounded-full blur-md bg-slate-200 dark:bg-slate-800 opacity-50 animate-pulse"></div>

        <Loader2 className="relative w-10 h-10 text-slate-900 dark:text-white animate-spin" />
      </div>

      <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400 animate-pulse">
        {text}
      </p>
    </div>
  );
}
