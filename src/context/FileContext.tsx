import { createContext, useContext, type ReactNode } from "react";
import { useFileParser } from "../features/file-viewer/hooks/useFileParser";
import type { ParsedData, FileUploadError } from "../types";

interface FileContextType {
  data: ParsedData | null;
  loading: boolean;
  error: FileUploadError | null;
  parseFile: (file: File) => Promise<void>;
  reset: () => void;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export function FileProvider({ children }: { children: ReactNode }) {
  const fileParser = useFileParser();

  return (
    <FileContext.Provider value={fileParser}>{children}</FileContext.Provider>
  );
}

export function useFile() {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("useFile must be used within FileProvider");
  }
  return context;
}
