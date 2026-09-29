import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { cn } from '@/utils/helpers';

interface DashboardLayoutProps {
  role: 'ambulance' | 'hospital';
  title: string;
  subtitle?: string;
  showConnection?: boolean;
  isConnected?: boolean;
  notifications?: number;
  userName?: string;
  userRole?: string;
}

export function DashboardLayout({ 
  role, 
  title, 
  subtitle, 
  showConnection = true, 
  isConnected = true,
  notifications = 0,
  userName = 'John Doe',
  userRole = role === 'ambulance' ? 'Paramedic' : 'Charge Nurse',
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar role={role} className={cn('lg:translate-x-0', sidebarOpen ? 'translate-x-0' : '-translate-x-full')} />
      
      <div className={cn('lg:pl-64', sidebarOpen ? 'pl-64' : 'pl-0')}>
        <Topbar
          role={role}
          title={title}
          subtitle={subtitle}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          showConnection={showConnection}
          isConnected={isConnected}
          notifications={notifications}
          userName={userName}
          userRole={userRole}
        />
        
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
      
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}