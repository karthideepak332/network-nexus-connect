
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, Check, UserCheck } from 'lucide-react';

// Mock data for demonstration
const DEPARTMENTS = ['Design', 'Engineering', 'Marketing', 'Product', 'Research'];
const INTERESTS = ['UI/UX', 'Front-end', 'Back-end', 'AI/ML', 'Data Science', 'Mobile', 'DevOps', 'Security', 'Blockchain'];
const PROJECTS = ['App Redesign', 'Platform Migration', 'New Feature Development', 'Analytics Dashboard', 'API Integration'];

interface Member {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar: string;
  interests: string[];
  projects: string[];
  status: 'none' | 'pending' | 'connected';
}

// Generate some mock members
const generateMembers = (count: number): Member[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `member-${i + 1}`,
    name: `Member ${i + 1}`,
    role: ['Developer', 'Designer', 'Manager', 'Analyst', 'Specialist'][Math.floor(Math.random() * 5)],
    department: DEPARTMENTS[Math.floor(Math.random() * DEPARTMENTS.length)],
    avatar: `/placeholder.svg`,
    interests: Array.from(
      { length: Math.floor(Math.random() * 3) + 1 },
      () => INTERESTS[Math.floor(Math.random() * INTERESTS.length)]
    ),
    projects: Array.from(
      { length: Math.floor(Math.random() * 2) + 1 },
      () => PROJECTS[Math.floor(Math.random() * PROJECTS.length)]
    ),
    status: ['none', 'pending', 'connected'][Math.floor(Math.random() * 3)] as Member['status'],
  }));
};

const Community = () => {
  const { toast } = useToast();
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [selectedTab, setSelectedTab] = useState('all');

  // Initialize with mock data
  useEffect(() => {
    const mockMembers = generateMembers(12);
    setMembers(mockMembers);
    setFilteredMembers(mockMembers);
  }, []);

  // Filter members based on selections
  useEffect(() => {
    let filtered = [...members];
    
    if (selectedTab === 'network') {
      filtered = filtered.filter(member => member.status === 'connected');
    } else if (selectedTab === 'pending') {
      filtered = filtered.filter(member => member.status === 'pending');
    }
    
    if (selectedInterests.length > 0) {
      filtered = filtered.filter(member => 
        member.interests.some(interest => selectedInterests.includes(interest))
      );
    }
    
    if (selectedProjects.length > 0) {
      filtered = filtered.filter(member => 
        member.projects.some(project => selectedProjects.includes(project))
      );
    }
    
    setFilteredMembers(filtered);
  }, [members, selectedInterests, selectedProjects, selectedTab]);

  // Toggle interest selection
  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  // Toggle project selection
  const toggleProject = (project: string) => {
    setSelectedProjects(prev => 
      prev.includes(project) 
        ? prev.filter(p => p !== project)
        : [...prev, project]
    );
  };

  // Handle connection request
  const handleConnect = (memberId: string) => {
    setMembers(prev => 
      prev.map(member => 
        member.id === memberId 
          ? { ...member, status: 'pending' } 
          : member
      )
    );
    
    toast({
      title: "Connection Request Sent",
      description: "They'll be notified about your request",
      duration: 3000,
    });
  };

  // Handle accepting a connection
  const handleAccept = (memberId: string) => {
    setMembers(prev => 
      prev.map(member => 
        member.id === memberId 
          ? { ...member, status: 'connected' } 
          : member
      )
    );
    
    toast({
      title: "Connection Accepted",
      description: "You can now message this member",
      duration: 3000,
    });
  };

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    }),
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="space-y-2">
          <motion.h1 
            className="text-3xl font-bold tracking-tight"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Community
          </motion.h1>
          <motion.p 
            className="text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            Connect with colleagues based on shared interests and projects.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div 
            className="md:col-span-1 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-4 space-y-4">
              <h3 className="font-medium text-sm text-muted-foreground">FILTER BY INTERESTS</h3>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map(interest => (
                  <Badge
                    key={interest}
                    variant={selectedInterests.includes(interest) ? "default" : "outline"}
                    className={`cursor-pointer hover-lift ${
                      selectedInterests.includes(interest) ? 'bg-primary' : ''
                    }`}
                    onClick={() => toggleInterest(interest)}
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
            </Card>
            
            <Card className="p-4 space-y-4">
              <h3 className="font-medium text-sm text-muted-foreground">FILTER BY PROJECTS</h3>
              <div className="flex flex-wrap gap-2">
                {PROJECTS.map(project => (
                  <Badge
                    key={project}
                    variant={selectedProjects.includes(project) ? "default" : "outline"}
                    className={`cursor-pointer hover-lift ${
                      selectedProjects.includes(project) ? 'bg-primary' : ''
                    }`}
                    onClick={() => toggleProject(project)}
                  >
                    {project}
                  </Badge>
                ))}
              </div>
            </Card>
          </motion.div>
          
          <div className="md:col-span-3 space-y-6">
            <Tabs 
              defaultValue="all" 
              className="w-full"
              onValueChange={setSelectedTab}
            >
              <TabsList className="grid grid-cols-3 w-full md:w-auto mb-6">
                <TabsTrigger value="all">All Members</TabsTrigger>
                <TabsTrigger value="network">My Network</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredMembers.map((member, index) => (
                    <motion.div
                      key={member.id}
                      custom={index}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, y: 20 }}
                    >
                      <Card className="p-5 hover-lift h-full flex flex-col justify-between">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-12 w-12 border-2 border-primary/10">
                              <img src={member.avatar} alt={member.name} />
                            </Avatar>
                            <div>
                              <h3 className="font-medium text-lg">{member.name}</h3>
                              <p className="text-sm text-muted-foreground">{member.role} • {member.department}</p>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-xs font-medium text-muted-foreground mb-1.5">INTERESTS</h4>
                            <div className="flex flex-wrap gap-1.5">
                              {member.interests.map(interest => (
                                <Badge key={interest} variant="secondary" className="text-xs">
                                  {interest}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-xs font-medium text-muted-foreground mb-1.5">PROJECTS</h4>
                            <div className="flex flex-wrap gap-1.5">
                              {member.projects.map(project => (
                                <Badge key={project} variant="outline" className="text-xs">
                                  {project}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t subtle-border">
                          {member.status === 'none' && (
                            <Button 
                              onClick={() => handleConnect(member.id)} 
                              className="w-full group"
                            >
                              <UserPlus className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                              Connect
                            </Button>
                          )}
                          
                          {member.status === 'pending' && (
                            <Button 
                              variant="outline" 
                              onClick={() => handleAccept(member.id)}
                              className="w-full group"
                            >
                              <Check className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                              Accept Request
                            </Button>
                          )}
                          
                          {member.status === 'connected' && (
                            <Button 
                              variant="secondary" 
                              onClick={() => {
                                toast({
                                  title: "Message Sent",
                                  description: "Check your messages for the conversation",
                                });
                              }}
                              className="w-full"
                            >
                              <UserCheck className="mr-2 h-4 w-4" />
                              Message
                            </Button>
                          )}
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                
                {filteredMembers.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No members match your current filters.</p>
                    <Button 
                      variant="link" 
                      onClick={() => {
                        setSelectedInterests([]);
                        setSelectedProjects([]);
                      }}
                    >
                      Clear all filters
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="network" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredMembers.map((member, index) => (
                    <motion.div
                      key={member.id}
                      custom={index}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Card className="p-5 hover-lift h-full flex flex-col justify-between">
                        {/* Same card content as above */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-12 w-12 border-2 border-primary/10">
                              <img src={member.avatar} alt={member.name} />
                            </Avatar>
                            <div>
                              <h3 className="font-medium text-lg">{member.name}</h3>
                              <p className="text-sm text-muted-foreground">{member.role} • {member.department}</p>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-xs font-medium text-muted-foreground mb-1.5">INTERESTS</h4>
                            <div className="flex flex-wrap gap-1.5">
                              {member.interests.map(interest => (
                                <Badge key={interest} variant="secondary" className="text-xs">
                                  {interest}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-xs font-medium text-muted-foreground mb-1.5">PROJECTS</h4>
                            <div className="flex flex-wrap gap-1.5">
                              {member.projects.map(project => (
                                <Badge key={project} variant="outline" className="text-xs">
                                  {project}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t subtle-border">
                          <Button 
                            variant="secondary"
                            onClick={() => {
                              toast({
                                title: "Message Sent",
                                description: "Check your messages for the conversation",
                              });
                            }}
                            className="w-full"
                          >
                            <UserCheck className="mr-2 h-4 w-4" />
                            Message
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                
                {filteredMembers.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">You haven't connected with anyone matching these filters yet.</p>
                    <Button 
                      variant="link" 
                      onClick={() => {
                        setSelectedInterests([]);
                        setSelectedProjects([]);
                      }}
                    >
                      Clear all filters
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="pending" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredMembers.map((member, index) => (
                    <motion.div
                      key={member.id}
                      custom={index}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Card className="p-5 hover-lift h-full flex flex-col justify-between">
                        {/* Same card content as above */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-12 w-12 border-2 border-primary/10">
                              <img src={member.avatar} alt={member.name} />
                            </Avatar>
                            <div>
                              <h3 className="font-medium text-lg">{member.name}</h3>
                              <p className="text-sm text-muted-foreground">{member.role} • {member.department}</p>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-xs font-medium text-muted-foreground mb-1.5">INTERESTS</h4>
                            <div className="flex flex-wrap gap-1.5">
                              {member.interests.map(interest => (
                                <Badge key={interest} variant="secondary" className="text-xs">
                                  {interest}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-xs font-medium text-muted-foreground mb-1.5">PROJECTS</h4>
                            <div className="flex flex-wrap gap-1.5">
                              {member.projects.map(project => (
                                <Badge key={project} variant="outline" className="text-xs">
                                  {project}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t subtle-border">
                          <Button 
                            variant="outline"
                            onClick={() => handleAccept(member.id)}
                            className="w-full group"
                          >
                            <Check className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                            Accept Request
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                
                {filteredMembers.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No pending connection requests matching these filters.</p>
                    <Button 
                      variant="link" 
                      onClick={() => {
                        setSelectedInterests([]);
                        setSelectedProjects([]);
                      }}
                    >
                      Clear all filters
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Community;
