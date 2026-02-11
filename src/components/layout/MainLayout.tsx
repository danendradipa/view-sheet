import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Outlet />
        </div>
      </main>
    </div>
  );
}