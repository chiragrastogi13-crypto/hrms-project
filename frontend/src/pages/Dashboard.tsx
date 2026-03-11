import { useState, useEffect } from 'react';
import {
  Users, CheckCircle2, XCircle, Clock, Building2,
  RefreshCw, TrendingUp, CalendarDays,
  UserPlus, BarChart3, Activity, ChevronRight,
  Award, Sparkles, Zap, Shield, Star
} from 'lucide-react';
import { dashboardApi } from '../api/dashboard';
import { LoadingPage } from '../components/ui/LoadingSpinner';
import { ErrorState } from '../components/ui/ErrorState';
import type { DashboardStats } from '../types';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

interface StatCardProps {
  label: string;
  value: number | string;
  icon: React.ElementType;
  gradient: string;
}

function StatCard({ label, value, icon: Icon, gradient }: StatCardProps) {
  return (
    <div className="group relative">
      {/* Glossy background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/5 rounded-2xl backdrop-blur-xl shadow-2xl" />
      
      {/* Gradient glow */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500`} />
      
      {/* Main card */}
      <div className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 shadow-2xl hover:shadow-3xl transition-all duration-300">
        {/* Animated background */}
        <div className={`absolute top-0 right-0 w-64 h-64 -mr-16 -mt-16 bg-gradient-to-br ${gradient} rounded-full opacity-20 group-hover:opacity-30 blur-2xl transition-opacity duration-500 animate-pulse`} />
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
              <Icon size={22} className="text-white drop-shadow-lg" />
            </div>
          </div>
          
          <div>
            <p className="text-3xl font-bold text-white mb-1 drop-shadow-lg">{value}</p>
            <p className="text-sm text-white/70">{label}</p>
          </div>
        </div>
        
        {/* Shine effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
    </div>
  );
}

interface RecentEmployeeProps {
  employee: {
    id: number;
    full_name: string;
    department: string;
    employee_id: string;
    total_present_days: number;
  };
  index: number;
}

function RecentEmployee({ employee, index }: RecentEmployeeProps) {
  const gradients = [
    'from-blue-500 to-indigo-600',
    'from-emerald-500 to-teal-600',
    'from-amber-500 to-orange-600',
    'from-rose-500 to-pink-600',
    'from-purple-500 to-violet-600',
  ];
  
  const gradientClass = gradients[index % gradients.length];
  
  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-white/5 rounded-xl backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-300">
        <div className={`relative w-10 h-10 rounded-xl bg-gradient-to-br ${gradientClass} flex items-center justify-center flex-shrink-0 shadow-xl`}>
          <span className="text-sm font-bold text-white drop-shadow-md">{employee.full_name.charAt(0)}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate">{employee.full_name}</p>
          <p className="text-xs text-white/60">{employee.department} · {employee.employee_id}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="flex items-center gap-1.5">
            <Award size={14} className="text-amber-400 drop-shadow-lg" />
            <span className="text-sm font-bold text-white">{employee.total_present_days}</span>
          </div>
          <p className="text-xs text-white/50">days present</p>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const load = async (showRefreshing = false) => {
    if (showRefreshing) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError('');
    
    try {
      const data = await dashboardApi.getStats();
      setStats(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { load(); }, []);

  if (loading) return <LoadingPage />;
  if (error || !stats) return <ErrorState message={error || 'Failed to load dashboard'} onRetry={load} />;

  const today = format(new Date(), 'EEEE, MMMM d, yyyy');
  const greeting = new Date().getHours() < 12 ? 'Good morning' : 
                   new Date().getHours() < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="min-h-screen relative">
      {/* Animated background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }} />
        
        {/* Animated orbs */}
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-white drop-shadow-lg">Dashboard</h1>
              <span className="relative px-3 py-1 bg-white/10 backdrop-blur-md text-white text-xs font-medium rounded-full border border-white/20 shadow-lg flex items-center gap-1">
                <Shield size={12} className="text-indigo-300" />
                Admin
              </span>
            </div>
            <p className="text-white/70 flex items-center gap-2">
              <span>{greeting}, welcome back!</span>
              <span className="w-1 h-1 bg-white/30 rounded-full" />
              <span>{today}</span>
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative group">
              <div className="absolute inset-0 bg-white/20 rounded-xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative px-4 py-2 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-xl">
                    <Activity size={16} className="text-white drop-shadow-md" />
                  </div>
                  <div>
                    <p className="text-xs text-white/60">Today's attendance</p>
                    <div className="flex items-baseline gap-1">
                      <p className="text-sm font-semibold text-white">{stats.present_today}</p>
                      <span className="text-xs text-white/40">/ {stats.total_employees}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard
            label="Total Employees"
            value={stats.total_employees}
            icon={Users}
            gradient="from-indigo-500 to-indigo-600"
          />
          <StatCard
            label="Present Today"
            value={stats.present_today}
            icon={CheckCircle2}
            gradient="from-emerald-500 to-emerald-600"
          />
          <StatCard
            label="Absent Today"
            value={stats.absent_today}
            icon={XCircle}
            gradient="from-rose-500 to-rose-600"
          />
          <StatCard
            label="Late / This Week"
            value={`${stats.late_today} / ${stats.attendance_this_week}`}
            icon={Clock}
            gradient="from-amber-500 to-amber-600"
          />
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          {/* Attendance Overview */}
          <div className="lg:col-span-3 relative group">
            <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
            <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <Activity size={18} className="text-indigo-400" />
                  Attendance Overview
                </h3>
                <Link to="/attendance" className="group/link">
                  <div className="flex items-center gap-1 text-sm text-white/70 hover:text-white transition-all">
                    View details 
                    <ChevronRight size={16} className="group-hover/link:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/70">Today's attendance</span>
                  <span className="font-semibold text-white">
                    {stats.present_today} / {stats.total_employees}
                  </span>
                </div>
                <div className="relative h-4">
                  <div className="absolute inset-0 bg-white/10 rounded-full backdrop-blur-sm border border-white/10" />
                  <div
                    className="relative h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-700 overflow-hidden"
                    style={{ width: `${stats.attendance_rate_today}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  </div>
                </div>
                <p className="text-xs text-white/60 mt-2 flex items-center gap-1">
                  <Zap size={12} className="text-indigo-400" />
                  {stats.attendance_rate_today}% attendance rate today
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
            <div className="relative bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl p-6 shadow-2xl border border-white/20 overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-400 rounded-full blur-3xl opacity-30 animate-pulse" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-600 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }} />
              
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <Sparkles size={24} className="text-white/80 drop-shadow-lg" />
                  <Star size={20} className="text-amber-300 drop-shadow-lg" />
                </div>
                
                <p className="text-3xl font-bold text-white mb-1 drop-shadow-lg">
                  {stats.attendance_this_week}
                </p>
                <p className="text-indigo-200 text-sm mb-4">Total attendance this week</p>
                
                <div className="border-t border-white/20 pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-indigo-200 flex items-center gap-1">
                      <CalendarDays size={14} />
                      Average daily
                    </span>
                    <span className="font-semibold text-white text-lg">
                      {Math.round(stats.attendance_this_week / 7)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent employees */}
          <div className="lg:col-span-2 relative group">
            <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
            <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    <Users size={18} className="text-indigo-400" />
                    Recent Employees
                  </h3>
                  <p className="text-xs text-white/60 mt-0.5">Latest team members</p>
                </div>
                <Link 
                  to="/employees" 
                  className="relative group/btn"
                >
                  <div className="absolute inset-0 bg-indigo-500/20 rounded-xl blur-md group-hover/btn:blur-xl transition-all" />
                  <div className="relative px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-xl text-sm font-medium hover:bg-white/20 transition-all border border-white/20 flex items-center gap-2 shadow-xl">
                    View all <UserPlus size={16} />
                  </div>
                </Link>
              </div>
              
              {stats.recent_employees.length === 0 ? (
                <div className="text-center py-12">
                  <Users size={40} className="mx-auto text-white/30 mb-3" />
                  <p className="text-sm text-white/50">No employees yet</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {stats.recent_employees.map((emp, index) => (
                    <RecentEmployee key={emp.id} employee={emp} index={index} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick actions */}
          <div className="relative group">
            <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
            <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl">
              <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
                <Zap size={18} className="text-amber-400" />
                Quick Actions
              </h3>
              
              <div className="space-y-3">
                <Link
                  to="/employees"
                  className="relative block group/action"
                >
                  <div className="absolute inset-0 bg-indigo-500/20 rounded-xl blur-md group-hover/action:blur-xl transition-all" />
                  <div className="relative flex items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all">
                    <div className="relative w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-xl">
                      <Users size={18} className="text-white drop-shadow-md" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">Manage Employees</p>
                      <p className="text-xs text-white/60">Add or update records</p>
                    </div>
                    <ChevronRight size={16} className="text-white/60 group-hover/action:translate-x-0.5 transition-transform" />
                  </div>
                </Link>

                <Link
                  to="/attendance"
                  className="relative block group/action"
                >
                  <div className="absolute inset-0 bg-emerald-500/20 rounded-xl blur-md group-hover/action:blur-xl transition-all" />
                  <div className="relative flex items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all">
                    <div className="relative w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-xl">
                      <CalendarDays size={18} className="text-white drop-shadow-md" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">Mark Attendance</p>
                      <p className="text-xs text-white/60">Daily check-in</p>
                    </div>
                    <ChevronRight size={16} className="text-white/60 group-hover/action:translate-x-0.5 transition-transform" />
                  </div>
                </Link>

                <Link
                  to="/reports"
                  className="relative block group/action"
                >
                  <div className="absolute inset-0 bg-amber-500/20 rounded-xl blur-md group-hover/action:blur-xl transition-all" />
                  <div className="relative flex items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all">
                    <div className="relative w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-xl">
                      <BarChart3 size={18} className="text-white drop-shadow-md" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">View Reports</p>
                      <p className="text-xs text-white/60">Analytics & insights</p>
                    </div>
                    <ChevronRight size={16} className="text-white/60 group-hover/action:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60 flex items-center gap-2">
                    <Building2 size={14} className="text-indigo-400" />
                    Total Departments
                  </span>
                  <span className="font-semibold text-white bg-white/10 px-3 py-1 rounded-full text-sm border border-white/20">
                    {stats.total_departments}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}