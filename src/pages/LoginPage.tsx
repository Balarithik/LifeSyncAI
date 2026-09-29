import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Ambulance, Building2, UserRound, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { cn } from '@/utils/helpers';

export function LoginPage() {
  const [role, setRole] = useState<'ambulance' | 'hospital'>('ambulance');
  const navigate = useNavigate();

  const handleLogin = (selectedRole: 'ambulance' | 'hospital') => {
    setRole(selectedRole);
    localStorage.setItem('ambusense-role', selectedRole);
    navigate(selectedRole === 'ambulance' ? '/ambulance/dashboard' : '/hospital/dashboard');
  };

  const savedRole = localStorage.getItem('ambusense-role') as 'ambulance' | 'hospital' | null;
  if (savedRole) {
    navigate(savedRole === 'ambulance' ? '/ambulance/dashboard' : '/hospital/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-700 mx-auto mb-4">
            <Ambulance className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">AmbuSense AI</h1>
          <p className="mt-2 text-gray-600">Ambulance-to-Hospital Alert System</p>
        </div>

        <Card className="p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Select Your Role</h2>
          <p className="text-gray-500 mb-6">Choose how you'll be using the system</p>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleLogin('ambulance')}
              className={cn(
                'relative p-6 rounded-xl border-2 transition-all',
                role === 'ambulance' 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-200 hover:border-gray-300'
              )}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary-100">
                  <UserRound className="w-5 h-5 text-primary-700" />
                </div>
                <span className="font-semibold text-gray-900">Ambulance Attender</span>
              </div>
              <p className="text-sm text-gray-500">Monitor patient vitals and send emergency alerts</p>
              {role === 'ambulance' && (
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center">
                  <Stethoscope className="w-4 h-4 text-white" />
                </div>
              )}
            </button>

            <button
              onClick={() => handleLogin('hospital')}
              className={cn(
                'relative p-6 rounded-xl border-2 transition-all',
                role === 'hospital' 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-200 hover:border-gray-300'
              )}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary-100">
                  <Building2 className="w-5 h-5 text-primary-700" />
                </div>
                <span className="font-semibold text-gray-900">Hospital Management</span>
              </div>
              <p className="text-sm text-gray-500">Receive alerts and coordinate emergency response</p>
              {role === 'hospital' && (
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center">
                  <Stethoscope className="w-4 h-4 text-white" />
                </div>
              )}
            </button>
          </div>

          <Button 
            className="w-full mt-6" 
            size="lg"
            onClick={() => handleLogin(role)}
          >
            Continue as {role === 'ambulance' ? 'Ambulance Attender' : 'Hospital Management'}
          </Button>
        </Card>

        <p className="text-center text-xs text-gray-400 mt-6">
          Demo mode — Mock data only. Not for clinical use.
        </p>
      </div>
    </div>
  );
}