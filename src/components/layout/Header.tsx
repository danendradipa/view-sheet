import { FileSpreadsheet } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md supports-backdrop-filter:bg-white/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 rounded-md px-1"
        >
          <div className="p-1.5 bg-slate-900 text-white rounded-lg group-hover:bg-slate-800 transition-colors shadow-sm">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <span className="text-lg font-semibold text-slate-900 tracking-tight">
            SheetView
          </span>
        </Link>

        <nav className="flex items-center gap-4"></nav>
      </div>
    </header>
  );
}
