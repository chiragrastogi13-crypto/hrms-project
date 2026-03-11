import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  Building2,
  X,
  BarChart3
} from 'lucide-react';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/employees', label: 'Employees', icon: Users },
  { to: '/attendance', label: 'Attendance', icon: CalendarCheck },
];

export default function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-72
          bg-gradient-to-b from-slate-900 to-slate-800
          border-r border-white/10
          transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:z-40
        `}
      >
        {/* Brand */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10 my-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold">HRMS Portal</span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-3">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-all
                 ${isActive 
                   ? 'bg-indigo-600 text-white' 
                   : 'text-white/70 hover:text-white hover:bg-white/10'
                 }`
              }
            >
              <Icon size={18} />
              <span className="text-sm">{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-sm text-white">A</span>
            </div>
            <div>
              <p className="text-sm text-white">Admin User</p>
              <p className="text-xs text-white/50">admin@hrms.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}