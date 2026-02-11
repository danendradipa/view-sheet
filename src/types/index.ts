export interface ParsedData {
  headers: string[];
  rows: (string | number)[][];
  fileName: string;
  totalRows: number;
}

export interface FileUploadError {
  message: string;
  fileName?: string;
}

export type SupportedFileType = 'csv' | 'tsv' | 'json';