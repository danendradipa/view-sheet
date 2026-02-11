import { useCallback, useState, useRef } from 'react';
import { Upload, FileSpreadsheet } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

export default function FileUploader({ onFileSelect, disabled }: FileUploaderProps) {
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
        'relative group cursor-pointer flex flex-col items-center justify-center w-full min-h-[300px]',
        'rounded-xl border-2 border-dashed transition-all duration-300 ease-in-out',
        
        isDragging && !disabled
          ? 'border-slate-900 bg-slate-50 scale-[0.99]'
          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50',
          
        disabled && 'opacity-60 cursor-not-allowed bg-slate-50'
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
      
      <div className={cn(
        "mb-6 p-4 rounded-full transition-all duration-300",
        isDragging ? "bg-white shadow-md" : "bg-slate-50 group-hover:bg-slate-100"
      )}>
        {isDragging ? (
          <FileSpreadsheet className="w-10 h-10 text-slate-900 animate-bounce" />
        ) : (
          <Upload className="w-10 h-10 text-slate-400 group-hover:text-slate-600 transition-colors" />
        )}
      </div>

      <div className="text-center space-y-2 px-6">
        <h3 className={cn(
          "text-lg font-semibold transition-colors",
          isDragging ? "text-slate-900" : "text-slate-700 group-hover:text-slate-900"
        )}>
          {isDragging ? "Drop to upload" : "Click or drag file here"}
        </h3>
        <p className="text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">
          Support for CSV, TSV, and JSON. 
          <br /> 
          Maximize your data visibility instantly.
        </p>
      </div>

      <div className="absolute top-4 right-4">
        <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-500/10">
          Max 10MB
        </span>
      </div>
    </div>
  );
}