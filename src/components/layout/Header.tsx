import { FileSpreadsheet, Moon, Sun, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeProvider";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/75 dark:bg-slate-950/75 backdrop-blur-xl transition-all duration-300">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 group focus:outline-none rounded-lg"
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 rounded-lg blur opacity-50 transition-opacity group-hover:opacity-100"></div>
            <div className="relative p-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 rounded-lg shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10 transition-transform group-hover:scale-105 duration-200">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-none tracking-tight">
              SheetView
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          <a
            href="#"
            className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Github className="w-5 h-5" />
          </a>

          <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-1"></div>

          <button
            onClick={toggleTheme}
            className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-700"
            aria-label="Toggle theme"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
