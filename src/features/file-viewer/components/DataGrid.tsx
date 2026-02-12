import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, FileText, RotateCcw } from "lucide-react";
import Table from "../../../components/ui/Table";
import Button from "../../../components/ui/Button";
import { usePagination } from "../hooks/usePagination";
import type { ParsedData } from "../../../types";
import ColumnSelector from "./ColumnSelector";

interface DataGridProps {
  data: ParsedData;
  onReset: () => void;
}

export default function DataGrid({ data, onReset }: DataGridProps) {
  const pagination = usePagination({
    totalItems: data.totalRows,
    itemsPerPage: 50,
  });

  const [visibleColumns, setVisibleColumns] = useState<boolean[]>(() =>
    data.headers.map(() => true)
  );
  const [showIndex, setShowIndex] = useState(true);
  const [wrapEnabled, setWrapEnabled] = useState(false);

  useEffect(() => {
    setVisibleColumns(data.headers.map(() => true));
    pagination.reset();
  }, [data.headers]);

  const paginatedRows = useMemo(
    () =>
      data.rows.slice(
        pagination.paginatedRange.start,
        pagination.paginatedRange.end
      ),
    [data.rows, pagination.paginatedRange]
  );

  const startIndex = pagination.paginatedRange.start;

  const toggleColumn = (index: number) => {
    setVisibleColumns((prev) => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
  };

  const toggleAll = (value: boolean) => {
    setVisibleColumns(data.headers.map(() => value));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="hidden md:flex h-12 w-12 items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
              {data.fileName}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-1 text-xs font-medium text-slate-600 dark:text-slate-400 ring-1 ring-inset ring-slate-500/10">
                {data.totalRows.toLocaleString()} rows
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500">
                •
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {data.headers.length} columns
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ColumnSelector
            headers={data.headers}
            visibleColumns={visibleColumns}
            showIndex={showIndex}
            wrapEnabled={wrapEnabled}
            onToggleColumn={toggleColumn}
            onToggleIndex={() => setShowIndex((s) => !s)}
            onToggleAll={toggleAll}
            onToggleWrap={() => setWrapEnabled((s) => !s)}
          />
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block"></div>
          <Button variant="secondary" onClick={onReset} className="shrink-0">
            <RotateCcw className="w-4 h-4 mr-2" />
            New File
          </Button>
        </div>
      </div>

      <Table
        headers={data.headers}
        rows={paginatedRows}
        showIndex={showIndex}
        visibleColumns={visibleColumns}
        startIndex={startIndex}
        wrapEnabled={wrapEnabled}
      />

      {pagination.totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Showing{" "}
            <span className="font-medium text-slate-900 dark:text-white">
              {startIndex + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium text-slate-900 dark:text-white">
              {Math.min(pagination.paginatedRange.end, data.totalRows)}
            </span>{" "}
            of {data.totalRows} entries
          </p>

          <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
            <Button
              variant="secondary"
              size="sm"
              onClick={pagination.prevPage}
              disabled={!pagination.hasPrevPage}
              className="w-10 h-10 px-0"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            <div className="min-w-16 text-center text-sm font-medium text-slate-700 dark:text-slate-300">
              Page {pagination.currentPage}
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={pagination.nextPage}
              disabled={!pagination.hasNextPage}
              className="w-10 h-10 px-0"
              aria-label="Next page"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
