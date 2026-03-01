import { ReactNode } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { 
  LayoutDashboard, 
  User, 
  FileText, 
  Users, 
  Calendar, 
  BarChart3, 
  Target,
  LogOut,
} from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const studentMenuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/student' },
    { label: 'Meu Perfil', icon: User, path: '/student/profile' },
    { label: 'Relatórios', icon: FileText, path: '/student/reports' },
  ];

  const managementMenuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/management' },
    { label: 'Alunos', icon: Users, path: '/management/students' },
    { label: 'Eventos', icon: Calendar, path: '/management/events' },
    { label: 'Relatórios', icon: BarChart3, path: '/management/reports' },
  ];

  const menuItems = user?.role === 'student' ? studentMenuItems : managementMenuItems;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link to={user?.role === 'student' ? '/student' : '/management'} className="flex items-center gap-2">
                <Target className="w-8 h-8 text-blue-600" />
                <span className="font-bold text-xl text-gray-900">Edge Academy</span>
              </Link>
              
              <nav className="hidden md:flex gap-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user?.photo} alt={user?.name} />
                    <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline text-sm font-medium">{user?.name}</span>
                  <LogOut onClick={handleLogout} className="w-4 h-4 mr-2" />
                </div>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
