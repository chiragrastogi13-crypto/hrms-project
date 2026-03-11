import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="lg:pl-72">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="pt-16 p-4 lg:p-6">
          <div className="max-w-7xl mx-auto mt-12 pt-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}