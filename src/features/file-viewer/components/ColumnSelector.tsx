import { useMemo } from "react";
import { Columns } from "lucide-react";

interface ColumnSelectorProps {
  headers: string[];
  visibleColumns: boolean[];
  showIndex: boolean;
  wrapEnabled: boolean;
  onToggleColumn: (index: number) => void;
  onToggleIndex: () => void;
  onToggleAll: (value: boolean) => void;
  onToggleWrap: () => void;
}

export default function ColumnSelector({
  headers,
  visibleColumns,
  showIndex,
  wrapEnabled,
  onToggleColumn,
  onToggleIndex,
  onToggleAll,
  onToggleWrap,
}: ColumnSelectorProps) {
  const allSelected = useMemo(
    () => visibleColumns.length > 0 && visibleColumns.every(Boolean),
    [visibleColumns]
  );

  return (
    <div className="relative">
      <details className="group">
        <summary className="flex items-center gap-2 cursor-pointer text-slate-700 px-3 py-2 border rounded bg-white hover:bg-slate-50">
          <Columns className="w-4 h-4" />
          <span className="text-sm">Columns</span>
        </summary>

        <div className="mt-2 z-10 bg-white border border-slate-200 rounded p-3 shadow-sm w-64">
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={() => onToggleAll(!allSelected)}
              className="text-sm text-slate-600 hover:text-slate-800"
            >
              {allSelected ? "Deselect All" : "Select All"}
            </button>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={wrapEnabled}
                  onChange={onToggleWrap}
                  className="w-4 h-4"
                />
                Wrap Text
              </label>

              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={showIndex}
                  onChange={onToggleIndex}
                  className="w-4 h-4"
                />
                Row #
              </label>
            </div>
          </div>

          <div className="space-y-2 max-h-56 overflow-auto">
            {headers.map((h, i) => (
              <label
                key={i}
                className="flex items-center gap-2 text-sm text-slate-700"
              >
                <input
                  type="checkbox"
                  checked={visibleColumns[i] ?? true}
                  onChange={() => onToggleColumn(i)}
                  className="w-4 h-4"
                />
                <span className="truncate">{h || `Column ${i + 1}`}</span>
              </label>
            ))}
          </div>
        </div>
      </details>
    </div>
  );
}
