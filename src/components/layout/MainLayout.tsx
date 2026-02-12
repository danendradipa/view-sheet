import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans antialiased text-slate-900 dark:text-slate-100 transition-colors duration-300 selection:bg-slate-900 selection:text-white dark:selection:bg-slate-100 dark:selection:text-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-7xl isolate">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
          <Outlet />
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-slate-400 dark:text-slate-600">
        © 2026 SheetView
      </footer>
    </div>
  );
}
