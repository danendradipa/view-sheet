import { useCallback, useState, useRef } from "react";
import { Upload, FileSpreadsheet } from "lucide-react";
import { cn } from "../../../utils/cn";

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

export default function FileUploader({
  onFileSelect,
  disabled,
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (disabled) return;

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        onFileSelect(files[0]);
      }
    },
    [onFileSelect, disabled]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        onFileSelect(e.target.files[0]);
      }
    },
    [onFileSelect]
  );

  const handleClick = () => {
    if (!disabled && inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={handleClick}
      className={cn(
        "relative group cursor-pointer flex flex-col items-center justify-center w-full min-h-[320px]",
        "rounded-2xl border-2 border-dashed transition-all duration-300 ease-in-out",

        "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50",

        "dark:bg-slate-900/50 dark:border-slate-700 dark:hover:border-slate-500 dark:hover:bg-slate-800/50",

        isDragging &&
          !disabled && [
            "border-slate-900 bg-slate-50 scale-[0.99]",
            "dark:border-slate-400 dark:bg-slate-800",
          ],

        disabled && "opacity-60 cursor-not-allowed"
      )}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept=".csv,.tsv,.tab,.json"
        onChange={handleFileInput}
        disabled={disabled}
      />

      <div
        className={cn(
          "mb-6 p-5 rounded-full transition-all duration-300 shadow-sm",
          "bg-slate-50 text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-600",
          "dark:bg-slate-800 dark:text-slate-500 dark:group-hover:bg-slate-700 dark:group-hover:text-slate-300",
          isDragging && "bg-white dark:bg-slate-700 shadow-md scale-110"
        )}
      >
        {isDragging ? (
          <FileSpreadsheet className="w-10 h-10 animate-bounce text-slate-900 dark:text-white" />
        ) : (
          <Upload className="w-10 h-10" />
        )}
      </div>

      <div className="text-center space-y-2 px-6">
        <h3
          className={cn(
            "text-lg font-bold transition-colors",
            "text-slate-900 dark:text-white",
            isDragging && "text-slate-700 dark:text-slate-200"
          )}
        >
          {isDragging ? "Drop file now" : "Click or drag file here"}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
          Support for CSV, TSV, and JSON.
          <br />
          <span className="opacity-75">
            Maximize your data visibility instantly.
          </span>
        </p>
      </div>

      <div className="absolute top-4 right-4">
        <span className="inline-flex items-center rounded-md bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300 ring-1 ring-inset ring-slate-500/10 dark:ring-slate-400/20">
          Max 10MB
        </span>
      </div>
    </div>
  );
}
