import { cn } from '@/utils/helpers';
import { Bell, UserRound, Wifi, WifiOff, Menu, ChevronDown, ShieldCheck } from 'lucide-react';
import { useState, Fragment } from 'react';

interface TopbarProps {
  role: 'ambulance' | 'hospital';
  title: string;
  subtitle?: string;
  onMenuClick?: () => void;
  showConnection?: boolean;
  isConnected?: boolean;
  notifications?: number;
  userName?: string;
  userRole?: string;
}

export function Topbar({ 
  role, 
  title, 
  subtitle, 
  onMenuClick, 
  showConnection = true, 
  isConnected = true,
  notifications = 0,
  userName = 'John Doe',
  userRole = 'Paramedic',
}: TopbarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          )}
          <div>
            <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
            {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {showConnection && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50">
              <span className={cn('w-2 h-2 rounded-full', isConnected ? 'bg-success-500' : 'bg-critical-500')} />
              <span className="text-xs font-medium text-gray-600">
                {isConnected ? 'LIVE' : 'OFFLINE'}
              </span>
            </div>
          )}

          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              aria-label={`Notifications${notifications > 0 ? `, ${notifications} unread` : ''}`}
              aria-expanded={showNotifications}
            >
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-critical-500 text-white text-xs font-medium rounded-full flex items-center justify-center">
                  {notifications > 9 ? '9+' : notifications}
                </span>
              )}
            </button>
            
            {showNotifications && (
              <Fragment>
                <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                    {notifications > 0 && (
                      <button className="text-xs text-primary-600 hover:text-primary-700">Mark all read</button>
                    )}
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications === 0 ? (
                      <div className="px-4 py-8 text-center text-gray-500 text-sm">No notifications</div>
                    ) : (
                      <>
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm text-gray-600">New emergency alert received</p>
                          <p className="text-xs text-gray-400">2 minutes ago</p>
                        </div>
                        <div className="px-4 py-3">
                          <p className="text-sm text-gray-600">Patient vitals updated</p>
                          <p className="text-xs text-gray-400">5 minutes ago</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </Fragment>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 pr-2 pl-3 py-1.5 rounded-lg hover:bg-gray-100"
              aria-expanded={showUserMenu}
              aria-label="User menu"
            >
              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                <UserRound className="w-5 h-5 text-primary-700" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-gray-900">{userName}</p>
                <p className="text-xs text-gray-500">{userRole}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
            </button>
            
            {showUserMenu && (
              <Fragment>
                <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{userName}</p>
                    <p className="text-xs text-gray-500">{userRole}</p>
                  </div>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                    Profile
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                    Settings
                  </button>
                  <hr className="my-2 border-gray-100" />
                  <button className="w-full px-4 py-2 text-left text-sm text-critical-600 hover:bg-gray-50">
                    Logout
                  </button>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}