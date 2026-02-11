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

  return (
    <div className={cn("overflow-auto border border-slate-200", className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            {showIndex && (
              <th
                style={{ width: 56 }}
                className="px-4 py-3 text-left text-sm font-semibold text-slate-900 whitespace-nowrap"
              >
                #
              </th>
            )}
            {headers.map((header, index) =>
              visible[index] ? (
                <th
                  key={index}
                  className="px-4 py-3 text-left text-sm font-semibold text-slate-900 min-w-[12ch] whitespace-normal"
                >
                  {header || `Column ${index + 1}`}
                </th>
              ) : null
            )}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-slate-100 hover:bg-slate-50 transition-colors align-top"
            >
              {showIndex && (
                <td className="px-4 py-3 text-sm text-slate-700 whitespace-nowrap">
                  {startIndex + rowIndex + 1}
                </td>
              )}

              {row.map((cell, cellIndex) =>
                visible[cellIndex] ? (
                  <td
                    key={cellIndex}
                    className={
                      wrapEnabled
                        ? "px-4 py-3 text-sm text-slate-700 whitespace-normal wrap-break-word min-w-[12ch]"
                        : "px-4 py-3 text-sm text-slate-700 whitespace-nowrap min-w-[12ch]"
                    }
                  >
                    {String(cell ?? "")}
                  </td>
                ) : null
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
