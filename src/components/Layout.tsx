
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Home, Users, Bell, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [notificationCount, setNotificationCount] = React.useState(2);
  
  const navLinks = [
    { path: '/', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { path: '/community', label: 'Community', icon: <Users className="w-5 h-5" /> },
    { path: '/notifications', label: 'Notifications', icon: (
      <div className="relative">
        <Bell className="w-5 h-5" />
        {notificationCount > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-primary text-white text-xs">
            {notificationCount}
          </Badge>
        )}
      </div>
    ) },
    { path: '/messages', label: 'Messages', icon: <MessageSquare className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b subtle-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-medium">
            NetworkNexus
          </Link>
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-md transition-colors",
                  location.pathname === link.path
                    ? "bg-secondary text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>
          <div className="md:hidden">
            {/* Mobile menu button would go here */}
            <button className="p-2">
              <span className="sr-only">Open menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6 animate-fade-in">
          {children}
        </div>
      </main>
      
      <footer className="py-6 border-t subtle-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} NetworkNexus. All rights reserved.
        </div>
      </footer>
      
      {/* Mobile navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t subtle-border bg-background/95 backdrop-blur-md z-50">
        <div className="flex justify-around items-center p-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex flex-col items-center p-2 rounded-lg",
                location.pathname === link.path
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {link.icon}
              <span className="text-xs mt-1">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Layout;
