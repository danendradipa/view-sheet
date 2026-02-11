import { CheckCircle2, XCircle, Info } from "lucide-react";
import { cn } from "../../utils/cn";

interface AlertProps {
  type: "error" | "success" | "info";
  message: string;
  onClose?: () => void;
  className?: string;
}

export default function Alert({
  type,
  message,
  onClose,
  className,
}: AlertProps) {
  const configs = {
    error: {
      icon: XCircle,
      styles: "bg-red-50 border-red-200 text-red-700",
      iconColor: "text-red-600",
    },
    success: {
      icon: CheckCircle2,
      styles: "bg-emerald-50 border-emerald-200 text-emerald-700",
      iconColor: "text-emerald-600",
    },
    info: {
      icon: Info,
      styles: "bg-slate-50 border-slate-200 text-slate-700",
      iconColor: "text-slate-500",
    },
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div
      role="alert"
      className={cn(
        "flex items-start gap-3 p-4 rounded-lg border shadow-sm transition-all duration-300 animate-in fade-in slide-in-from-top-2",
        config.styles,
        className
      )}
    >
      <Icon className={cn("w-5 h-5 shrink-0 mt-0.5", config.iconColor)} />
      <div className="flex-1 text-sm font-medium leading-relaxed">
        {message}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className={cn(
            "shrink-0 rounded-md p-1 opacity-70 hover:opacity-100 hover:bg-black/5 transition-all",
            config.iconColor
          )}
          aria-label="Close alert"
        >
          <span className="sr-only">Close</span>
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
