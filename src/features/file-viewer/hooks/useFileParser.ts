import { useState, useCallback } from "react";
import Papa from "papaparse";
import type { ParsedData, FileUploadError } from "../../../types";
import { validateFile, getFileType } from "../../../utils/fileValidation";

export function useFileParser() {
  const [data, setData] = useState<ParsedData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<FileUploadError | null>(null);

  const parseCSV = useCallback((file: File): Promise<ParsedData> => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        complete: (results) => {
          if (results.errors.length > 0) {
            reject(new Error(results.errors[0].message));
            return;
          }

          const rows = results.data as string[][];
          if (rows.length === 0) {
            reject(new Error("File is empty"));
            return;
          }

          const headers = rows[0];
          const dataRows = rows
            .slice(1)
            .filter((row) =>
              row.some(
                (cell) => cell !== null && cell !== undefined && cell !== ""
              )
            );

          resolve({
            headers,
            rows: dataRows,
            fileName: file.name,
            totalRows: dataRows.length,
          });
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }, []);

  const parseTSV = useCallback((file: File): Promise<ParsedData> => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        delimiter: "\t",
        complete: (results) => {
          if (results.errors.length > 0) {
            reject(new Error(results.errors[0].message));
            return;
          }

          const rows = results.data as string[][];
          if (rows.length === 0) {
            reject(new Error("File is empty"));
            return;
          }

          const headers = rows[0];
          const dataRows = rows
            .slice(1)
            .filter((row) =>
              row.some(
                (cell) => cell !== null && cell !== undefined && cell !== ""
              )
            );

          resolve({
            headers,
            rows: dataRows,
            fileName: file.name,
            totalRows: dataRows.length,
          });
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }, []);

  const parseJSON = useCallback(async (file: File): Promise<ParsedData> => {
    const text = await file.text();
    const json = JSON.parse(text);

    if (!Array.isArray(json)) {
      throw new Error("JSON must be an array of objects");
    }

    if (json.length === 0) {
      throw new Error("JSON array is empty");
    }

    const headers = Object.keys(json[0]);
    const rows = json.map((obj) => headers.map((key) => obj[key]));

    return {
      headers,
      rows,
      fileName: file.name,
      totalRows: rows.length,
    };
  }, []);

  const parseFile = useCallback(
    async (file: File) => {
      setLoading(true);
      setError(null);

      const validation = validateFile(file);
      if (!validation.valid) {
        setError({ message: validation.error!, fileName: file.name });
        setLoading(false);
        return;
      }

      try {
        const fileType = getFileType(file.name);

        let parsedData: ParsedData;

        switch (fileType) {
          case "csv":
            parsedData = await parseCSV(file);
            break;
          case "tsv":
            parsedData = await parseTSV(file);
            break;
          case "json":
            parsedData = await parseJSON(file);
            break;
          default:
            throw new Error("Unsupported file type");
        }

        setData(parsedData);
      } catch (err) {
        setError({
          message: err instanceof Error ? err.message : "Failed to parse file",
          fileName: file.name,
        });
      } finally {
        setLoading(false);
      }
    },
    [parseCSV, parseTSV, parseJSON]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, parseFile, reset };
}
