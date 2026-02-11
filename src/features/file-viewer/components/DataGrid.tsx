import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, FileText } from "lucide-react";
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
  const [wrapEnabled, setWrapEnabled] = useState(true);

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
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white border border-slate-200 p-4 rounded-lg">
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-slate-600" />
          <div>
            <h2 className="font-semibold text-slate-900">{data.fileName}</h2>
            <p className="text-sm text-slate-600">
              {data.totalRows} rows × {data.headers.length} columns
            </p>
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
          <Button variant="secondary" size="sm" onClick={onReset}>
            Upload New File
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <Table
          headers={data.headers}
          rows={paginatedRows}
          showIndex={showIndex}
          visibleColumns={visibleColumns}
          startIndex={startIndex}
          wrapEnabled={wrapEnabled}
        />
      </div>

      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between bg-white border border-slate-200 p-4 rounded-lg">
          <p className="text-sm text-slate-600">
            Page {pagination.currentPage} of {pagination.totalPages}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={pagination.prevPage}
              disabled={!pagination.hasPrevPage}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={pagination.nextPage}
              disabled={!pagination.hasNextPage}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
