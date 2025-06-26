import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  List,
  BarChart3,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isCollapsed: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, isCollapsed }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  const linkClasses = cn(
    'flex items-center justify-start gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
    {
      'bg-muted text-primary': isActive,
      'justify-center': isCollapsed,
    }
  );

  const content = (
    <>
      <Icon className="h-5 w-5" />
      <span className={cn('truncate', { 'sr-only': isCollapsed })}>{label}</span>
    </>
  );

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <NavLink to={to} className={linkClasses}>
          {content}
        </NavLink>
      </TooltipTrigger>
      {isCollapsed && (
        <TooltipContent side="right">
          <p>{label}</p>
        </TooltipContent>
      )}
    </Tooltip>
  );
};

const LeftSidebar: React.FC = () => {
  console.log('LeftSidebar loaded');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/r-f-p-list', icon: List, label: 'RFP List' },
    { to: '/reports', icon: BarChart3, label: 'Reports' },
  ];

  return (
    <aside
      className={cn(
        'hidden border-r bg-muted/40 md:flex md:flex-col transition-all duration-300 ease-in-out',
        isCollapsed ? 'w-20' : 'w-64'
      )}
    >
      <div className="flex-grow pt-20"> {/* pt-20 to offset fixed header */}
        <nav className="grid items-start gap-2 px-2 lg:px-4">
          {navItems.map((item) => (
            <NavItem key={item.to} {...item} isCollapsed={isCollapsed} />
          ))}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <Button
          variant="outline"
          size="icon"
          className="w-full"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </div>
    </aside>
  );
};

export default LeftSidebar;