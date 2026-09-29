import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/utils/helpers';
import { 
  LayoutDashboard, 
  UserRound, 
  HeartPulse, 
  Activity, 
  History, 
  Settings, 
  LogOut,
  Ambulance,
  Users,
  Bell,
  AlertTriangle,
  MapPin,
  Database,
} from 'lucide-react';

interface SidebarProps {
  role: 'ambulance' | 'hospital';
  className?: string;
}

const ambulanceNavItems = [
  { path: '/ambulance/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/ambulance/patient', label: 'Patient', icon: UserRound },
  { path: '/ambulance/monitor', label: 'Live Monitoring', icon: HeartPulse },
  { path: '/ambulance/history', label: 'Emergency History', icon: History },
];

const hospitalNavItems = [
  { path: '/hospital/dashboard', label: 'Overview', icon: LayoutDashboard },
  { path: '/hospital/alerts', label: 'Emergency Alerts', icon: AlertTriangle },
  { path: '/hospital/ambulances', label: 'Ambulances', icon: Ambulance },
  { path: '/hospital/patient/:id', label: 'Incoming Patients', icon: Users, hidden: true },
  { path: '/hospital/history', label: 'History', icon: History },
];

export function Sidebar({ role, className }: SidebarProps) {
  const location = useLocation();
  const navItems = role === 'ambulance' ? ambulanceNavItems : hospitalNavItems;
  const brandName = role === 'ambulance' ? 'AmbuSense AI' : 'AmbuSense AI';
  const brandIcon = role === 'ambulance' ? Ambulance : Database;

  return (
    <aside className={cn('fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col z-30 lg:static lg:h-auto', className)}>
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary-700 text-white">
            <brandIcon className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-gray-900">{brandName}</span>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto" aria-label="Main navigation">
        {navItems.map(item => {
          if (item.hidden) return null;
          const isActive = location.pathname.startsWith(item.path.replace(':id', ''));
          const Icon = item.icon;
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-gray-200 p-4 space-y-1">
        <button className={cn(
          'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors'
        )}>
          <Settings className="w-5 h-5" />
          Settings
        </button>
        <button className={cn(
          'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors'
        )}>
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}