import { Menu, Bell, Search, Settings, LogOut, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

interface HeaderProps {
  onMenuClick: () => void;
}

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': { title: 'Dashboard', subtitle: 'Overview of your HR operations' },
  '/employees': { title: 'Employee Management', subtitle: 'Add, view, and manage employee records' },
  '/attendance': { title: 'Attendance Tracking', subtitle: 'Record and monitor daily attendance' },
  '/reports': { title: 'Reports & Analytics', subtitle: 'View insights and generate reports' },
};

export default function Header({ onMenuClick }: HeaderProps) {
  const { pathname } = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  const page = pageTitles[pathname] || { title: 'HRMS Lite', subtitle: '' };
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <header className="fixed top-0 left-0 right-0 lg:left-72 h-20 z-40">
      {/* Glossy background */}
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 shadow-2xl" />
      
      {/* Animated gradient line - now visible */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 via-50% to-transparent z-10" />
      
      {/* Content */}
      <div className="relative h-full flex items-center px-4 lg:px-8 gap-4 z-20">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden relative group p-2"
        >
          <div className="absolute inset-0 bg-white/10 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all">
            <Menu size={22} />
          </div>
        </button>

        {/* Title section */}
        <div className="flex-1 min-w-0">
          <h1 className="text-xl lg:text-2xl font-bold text-white truncate drop-shadow-lg">
            {page.title}
          </h1>
          <p className="text-xs lg:text-sm text-white/50 hidden sm:block truncate">
            {page.subtitle}
          </p>
        </div>

        {/* Search bar */}
        <div className="hidden md:flex items-center relative group">
          <div className="absolute inset-0 bg-indigo-500/10 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative flex items-center bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 px-4 py-2 group-hover:bg-white/10 transition-all w-64">
            <Search size={18} className="text-white/40 group-hover:text-white/60" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none text-sm text-white placeholder-white/40 focus:outline-none w-full ml-3"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          {/* Date */}
          <div className="hidden lg:block relative group">
            <div className="absolute inset-0 bg-white/5 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative px-4 py-2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <span className="text-xs text-white/70 flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                {today}
              </span>
            </div>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative group p-2"
            >
              <div className="absolute inset-0 bg-white/10 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all">
                <Bell size={20} />
              </div>
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-400 rounded-full animate-ping" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 rounded-full border border-white/20" />
            </button>

            {/* Notifications dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 p-2 bg-slate-800/90 backdrop-blur-xl rounded-xl border border-white/20 shadow-2xl z-50">
                <div className="p-3 border-b border-white/10">
                  <p className="text-sm font-semibold text-white">Notifications</p>
                </div>
                <div className="py-2">
                  <div className="px-3 py-3 hover:bg-white/5 rounded-lg transition-colors">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
                        <User size={14} className="text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-white">New employee added</p>
                        <p className="text-xs text-white/40">2 minutes ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="relative group flex items-center gap-2 p-1.5"
            >
              <div className="absolute inset-0 bg-indigo-500/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 pr-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-indigo-500 rounded-full blur-md opacity-50" />
                  <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-xl m-1">
                    <span className="text-xs font-bold text-white">AD</span>
                  </div>
                </div>
                <span className="text-sm text-white hidden lg:block">Admin</span>
              </div>
            </button>

            {/* Profile dropdown */}
            {showProfile && (
              <div className="absolute right-0 mt-2 w-56 p-2 bg-slate-800/90 backdrop-blur-xl rounded-xl border border-white/20 shadow-2xl z-50">
                <div className="p-3 border-b border-white/10">
                  <p className="text-sm font-semibold text-white">Admin User</p>
                  <p className="text-xs text-white/40">admin@hrms.com</p>
                </div>
                <div className="py-2">
                  <button className="w-full px-3 py-2 text-left text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors flex items-center gap-2">
                    <Settings size={14} />
                    Settings
                  </button>
                  <button className="w-full px-3 py-2 text-left text-sm text-rose-400/70 hover:text-rose-400 hover:bg-white/5 rounded-lg transition-colors flex items-center gap-2">
                    <LogOut size={14} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}