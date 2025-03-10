
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, Users, Clock, ChevronRight, X, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data
  const pendingRequests = 2;
  const projectsCount = 3;
  const connections = 5;
  
  const activeProjects = [
    {
      id: 'proj-1',
      name: 'Platform Migration',
      description: 'Migrating the current platform to a new architecture',
      members: 8,
      progress: 65,
      dueIn: '5 days',
    },
    {
      id: 'proj-2',
      name: 'API Integration',
      description: 'Implementing third-party API integrations',
      members: 5,
      progress: 30,
      dueIn: '2 weeks',
    },
    {
      id: 'proj-3',
      name: 'New Feature Development',
      description: 'Developing new features for the product dashboard',
      members: 4,
      progress: 10,
      dueIn: '3 weeks',
    },
  ];
  
  const pendingConnectionsPreview = [
    { id: 'member-3', name: 'Member 3', role: 'Developer', avatar: '/placeholder.svg' },
    { id: 'member-7', name: 'Member 7', role: 'Designer', avatar: '/placeholder.svg' },
  ];
  
  const recentConnectionsPreview = [
    { id: 'member-2', name: 'Member 2', role: 'Product Manager', avatar: '/placeholder.svg' },
    { id: 'member-5', name: 'Member 5', role: 'Data Scientist', avatar: '/placeholder.svg' },
    { id: 'member-8', name: 'Member 8', role: 'Backend Developer', avatar: '/placeholder.svg' },
  ];
  
  const interests = ['UI/UX', 'Front-end', 'API Design', 'Data Visualization'];

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.1,
      } 
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    },
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="space-y-2">
          <motion.h1 
            className="text-4xl font-bold tracking-tight"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome to NetworkNexus
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Connect with colleagues and collaborate on projects
          </motion.p>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-8" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="profile">My Profile</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <motion.div 
              className="grid gap-6 md:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <Link to="/community">
                  <Card className="hover-lift h-full">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <div className="rounded-full bg-primary/10 p-3 mb-2">
                        <Users className="h-8 w-8 text-primary" />
                      </div>
                      <div className="text-2xl font-bold">{connections}</div>
                      <p className="text-sm text-muted-foreground mt-1">Connections</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Link to="/notifications">
                  <Card className="hover-lift h-full">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <div className="rounded-full bg-blue-500/10 p-3 mb-2">
                        <Briefcase className="h-8 w-8 text-blue-500" />
                      </div>
                      <div className="text-2xl font-bold">{projectsCount}</div>
                      <p className="text-sm text-muted-foreground mt-1">Active Projects</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Link to="/notifications">
                  <Card className="hover-lift h-full">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <div className="rounded-full bg-orange-500/10 p-3 mb-2">
                        <Clock className="h-8 w-8 text-orange-500" />
                      </div>
                      <div className="text-2xl font-bold">{pendingRequests}</div>
                      <p className="text-sm text-muted-foreground mt-1">Pending Requests</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            </motion.div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <motion.div 
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
              >
                <Card className="h-full">
                  <div className="p-6 pb-4 border-b subtle-border">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Active Projects</h3>
                      <Link to="/projects" className="text-primary text-sm flex items-center hover:underline">
                        View all <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    {activeProjects.map((project) => (
                      <div key={project.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">{project.name}</h4>
                          <Badge variant="outline">{project.dueIn}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{project.description}</p>
                        
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">{project.members} members</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        
                        <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-primary h-full rounded-full"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
              >
                <Card className="h-full">
                  <div className="p-6 pb-4 border-b subtle-border">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Network</h3>
                      <Link to="/community" className="text-primary text-sm flex items-center hover:underline">
                        Go to Community <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-muted-foreground">PENDING REQUESTS</h4>
                      {pendingConnectionsPreview.map((member) => (
                        <div key={member.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <img src={member.avatar} alt={member.name} />
                            </Avatar>
                            <div>
                              <h5 className="font-medium">{member.name}</h5>
                              <p className="text-sm text-muted-foreground">{member.role}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="h-9 px-3">
                              <X className="h-4 w-4" />
                            </Button>
                            <Button size="sm" className="h-9 px-3">
                              <Check className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-muted-foreground">RECENT CONNECTIONS</h4>
                      {recentConnectionsPreview.map((member) => (
                        <div key={member.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <img src={member.avatar} alt={member.name} />
                            </Avatar>
                            <div>
                              <h5 className="font-medium">{member.name}</h5>
                              <p className="text-sm text-muted-foreground">{member.role}</p>
                            </div>
                          </div>
                          <Link to="/messages">
                            <Button size="sm" variant="secondary" className="h-9">
                              Message
                            </Button>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
          
          <TabsContent value="profile" className="space-y-6">
            <motion.div 
              className="grid gap-6 md:grid-cols-2"
              variants={containerVariants}
              initial="hidden"
              animate={activeTab === 'profile' ? 'visible' : 'hidden'}
            >
              <motion.div variants={itemVariants}>
                <Card className="h-full">
                  <div className="p-6 pb-4 border-b subtle-border">
                    <h3 className="font-medium">Profile Information</h3>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start mb-6">
                      <Avatar className="h-24 w-24 border-4 border-primary/10">
                        <img src="/placeholder.svg" alt="Profile" />
                      </Avatar>
                      
                      <div className="space-y-1 text-center sm:text-left">
                        <h2 className="text-2xl font-bold">Current User</h2>
                        <p className="text-muted-foreground">Senior Developer • Engineering</p>
                        <div className="mt-2">
                          <Button variant="outline" size="sm">
                            Edit Profile
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">EMAIL</h4>
                        <p>user@example.com</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">DEPARTMENT</h4>
                        <p>Engineering</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">JOINED</h4>
                        <p>January 2023</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Card className="h-full">
                  <div className="p-6 pb-4 border-b subtle-border">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">My Interests & Skills</h3>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-muted-foreground">INTERESTS</h4>
                      <div className="flex flex-wrap gap-2">
                        {interests.map((interest) => (
                          <Badge key={interest} variant="secondary">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-muted-foreground">SKILLS</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">JavaScript</Badge>
                        <Badge variant="outline">React</Badge>
                        <Badge variant="outline">TypeScript</Badge>
                        <Badge variant="outline">UI Design</Badge>
                        <Badge variant="outline">API Development</Badge>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">BIO</h4>
                      <p className="text-sm text-muted-foreground">
                        Senior Developer with 5+ years of experience in web application development.
                        Passionate about creating intuitive user interfaces and optimizing application performance.
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Index;
