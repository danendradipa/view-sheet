import { cn } from "../../utils/cn";

interface TableProps {
  headers: string[];
  rows: (string | number)[][];
  className?: string;
  showIndex?: boolean;
  visibleColumns?: boolean[];
  startIndex?: number;
  wrapEnabled?: boolean;
}

export default function Table({
  headers,
  rows,
  className,
  showIndex = true,
  visibleColumns,
  startIndex = 0,
  wrapEnabled = true,
}: TableProps) {
  const visible = visibleColumns ?? headers.map(() => true);

  if (rows.length === 0) {
    return (
      <div className="p-8 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 dark:text-slate-400">
        No data available to display.
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm",
        className
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
              {showIndex && (
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 whitespace-nowrap w-[50px]">
                  #
                </th>
              )}
              {headers.map((header, index) =>
                visible[index] ? (
                  <th
                    key={index}
                    className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 whitespace-nowrap min-w-[150px]"
                  >
                    {header || `Column ${index + 1}`}
                  </th>
                ) : null
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="group transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                {showIndex && (
                  <td className="px-4 py-3 text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap tabular-nums font-mono">
                    {startIndex + rowIndex + 1}
                  </td>
                )}

                {row.map((cell, cellIndex) =>
                  visible[cellIndex] ? (
                    <td
                      key={cellIndex}
                      className={cn(
                        "px-4 py-3 text-sm text-slate-700 dark:text-slate-300 tabular-nums",
                        wrapEnabled
                          ? "whitespace-normal wrap-break-word min-w-[150px] max-w-[400px]"
                          : "whitespace-nowrap"
                      )}
                    >
                      {cell === "" || cell === null || cell === undefined ? (
                        <span className="text-slate-300 dark:text-slate-700">
                          -
                        </span>
                      ) : (
                        String(cell)
                      )}
                    </td>
                  ) : null
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
