
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Check, X, Bell, UserPlus, BellRing } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  type: 'connection' | 'message' | 'project' | 'system';
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
  actionRequired?: boolean;
  user?: {
    id: string;
    name: string;
    avatar: string;
  };
}

// Generate mock notifications
const NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    type: 'connection',
    title: 'Connection Request',
    description: 'Member 3 wants to connect with you',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
    actionRequired: true,
    user: {
      id: 'member-3',
      name: 'Member 3',
      avatar: '/placeholder.svg',
    },
  },
  {
    id: 'notif-2',
    type: 'message',
    title: 'New Message',
    description: 'Member 2 sent you a new message',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    read: false,
    user: {
      id: 'member-2',
      name: 'Member 2',
      avatar: '/placeholder.svg',
    },
  },
  {
    id: 'notif-3',
    type: 'project',
    title: 'Project Update',
    description: 'You were added to the "Platform Migration" project',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
  },
  {
    id: 'notif-4',
    type: 'system',
    title: 'Welcome to NetworkNexus',
    description: 'Complete your profile to get started connecting with colleagues',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    read: true,
  },
  {
    id: 'notif-5',
    type: 'connection',
    title: 'Connection Request',
    description: 'Member 7 wants to connect with you',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    read: false,
    actionRequired: true,
    user: {
      id: 'member-7',
      name: 'Member 7',
      avatar: '/placeholder.svg',
    },
  },
];

const Notifications = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>(NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
  
  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : notifications.filter(n => !n.read);
  
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };
  
  const handleAcceptConnection = (notification: Notification) => {
    if (notification.type !== 'connection' || !notification.user) return;
    
    toast({
      title: 'Connection Accepted',
      description: `You are now connected with ${notification.user.name}`,
      duration: 3000,
    });
    
    // Remove the notification and mark as read
    setNotifications(prev => 
      prev.filter(n => n.id !== notification.id)
    );
  };
  
  const handleDeclineConnection = (notification: Notification) => {
    if (notification.type !== 'connection' || !notification.user) return;
    
    toast({
      title: 'Connection Declined',
      description: `You declined the connection request from ${notification.user.name}`,
      duration: 3000,
    });
    
    // Remove the notification and mark as read
    setNotifications(prev => 
      prev.filter(n => n.id !== notification.id)
    );
  };
  
  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMins = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInMins < 60) {
      return `${diffInMins} min${diffInMins === 1 ? '' : 's'} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
    } else {
      return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
    }
  };
  
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'connection':
        return <UserPlus className="h-5 w-5 text-primary" />;
      case 'message':
        return <Bell className="h-5 w-5 text-blue-500" />;
      case 'project':
        return <Bell className="h-5 w-5 text-green-500" />;
      case 'system':
        return <BellRing className="h-5 w-5 text-purple-500" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  // Animation variants
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    toast({
      title: "All notifications marked as read",
      duration: 3000,
    });
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated on connection requests and important updates.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setActiveTab(value as 'all' | 'unread')}>
            <TabsList className="grid grid-cols-2 w-full md:w-[400px]">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">
                Unread
                {notifications.filter(n => !n.read).length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {notifications.filter(n => !n.read).length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={markAllAsRead}
            className="whitespace-nowrap"
          >
            Mark all as read
          </Button>
        </div>
        
        <motion.div 
          className="space-y-4"
          variants={listVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <motion.div 
                key={notification.id}
                variants={itemVariants}
                onClick={() => markAsRead(notification.id)}
              >
                <Card className={`p-4 hover-lift ${!notification.read ? 'border-l-4 border-l-primary' : ''}`}>
                  <div className="flex items-start gap-4">
                    <div className="bg-secondary rounded-full p-2 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">{notification.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {notification.description}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                          {formatTime(notification.timestamp)}
                        </span>
                      </div>
                      
                      {notification.actionRequired && notification.type === 'connection' && (
                        <div className="mt-3 flex gap-3">
                          <Button 
                            size="sm" 
                            onClick={() => handleAcceptConnection(notification)}
                            className="h-8"
                          >
                            <Check className="mr-1 h-4 w-4" />
                            Accept
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleDeclineConnection(notification)}
                            className="h-8"
                          >
                            <X className="mr-1 h-4 w-4" />
                            Decline
                          </Button>
                        </div>
                      )}
                      
                      {notification.user && (
                        <div className="mt-2 flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <img src={notification.user.avatar} alt={notification.user.name} />
                          </Avatar>
                          <span className="text-sm">{notification.user.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
                <Bell className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No notifications</h3>
              <p className="text-muted-foreground mt-1">
                {activeTab === 'all' 
                  ? "You don't have any notifications yet" 
                  : "You don't have any unread notifications"}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
};

export default Notifications;
