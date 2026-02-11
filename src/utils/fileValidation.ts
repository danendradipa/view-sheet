import type { SupportedFileType } from '../types';

const SUPPORTED_EXTENSIONS: Record<SupportedFileType, string[]> = {
  csv: ['.csv'],
  tsv: ['.tsv', '.tab'],
  json: ['.json'],
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; 

export function validateFile(file: File): { valid: boolean; error?: string } {
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size exceeds 10MB limit. Current size: ${(file.size / 1024 / 1024).toFixed(2)}MB`,
    };
  }

  const fileName = file.name.toLowerCase();
  const isSupported = Object.values(SUPPORTED_EXTENSIONS)
    .flat()
    .some((ext) => fileName.endsWith(ext));

  if (!isSupported) {
    return {
      valid: false,
      error: 'Unsupported file type. Please upload CSV, TSV, or JSON files.',
    };
  }

  return { valid: true };
}

export function getFileType(fileName: string): SupportedFileType | null {
  const name = fileName.toLowerCase();
  
  if (name.endsWith('.csv')) return 'csv';
  if (name.endsWith('.tsv') || name.endsWith('.tab')) return 'tsv';
  if (name.endsWith('.json')) return 'json';
  
  return null;
}