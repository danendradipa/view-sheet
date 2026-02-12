import { useMemo } from "react";
import { Columns, Check } from "lucide-react";
import { cn } from "../../../utils/cn";

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
      <details className="group relative">
        <summary className="flex items-center gap-2 cursor-pointer select-none text-slate-700 dark:text-slate-200 px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400">
          <Columns className="w-4 h-4" />
          <span className="text-sm font-medium">View Options</span>
        </summary>

        <div className="absolute right-0 mt-2 z-20 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl animate-in fade-in zoom-in-95 duration-200 origin-top-right ring-1 ring-slate-900/5">
          <div className="p-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Display
              </span>
              <button
                type="button"
                onClick={() => onToggleAll(!allSelected)}
                className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                {allSelected ? "Hide All" : "Show All"}
              </button>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-3 p-1.5 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={wrapEnabled}
                  onChange={onToggleWrap}
                  className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:focus:ring-offset-slate-900 accent-slate-900"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  Wrap Text
                </span>
              </label>

              <label className="flex items-center gap-3 p-1.5 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={showIndex}
                  onChange={onToggleIndex}
                  className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:focus:ring-offset-slate-900 accent-slate-900"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  Show Row Numbers
                </span>
              </label>
            </div>
          </div>

          <div className="p-2 max-h-64 overflow-y-auto custom-scrollbar">
            <div className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Columns
            </div>
            {headers.map((h, i) => (
              <label
                key={i}
                className="flex items-center gap-3 p-1.5 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors group/item"
              >
                <div
                  className={cn(
                    "flex items-center justify-center w-4 h-4 rounded border transition-all",
                    visibleColumns[i]
                      ? "bg-slate-900 border-slate-900 dark:bg-slate-100 dark:border-slate-100 text-white dark:text-slate-900"
                      : "border-slate-300 dark:border-slate-600 bg-transparent"
                  )}
                >
                  {visibleColumns[i] && (
                    <Check className="w-3 h-3" strokeWidth={3} />
                  )}
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={visibleColumns[i] ?? true}
                    onChange={() => onToggleColumn(i)}
                  />
                </div>
                <span className="text-sm text-slate-700 dark:text-slate-300 truncate group-hover/item:text-slate-900 dark:group-hover/item:text-white">
                  {h || `Column ${i + 1}`}
                </span>
              </label>
            ))}
          </div>
        </div>
      </details>
    </div>
  );
}
