
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send } from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
}

interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  messages: Message[];
  lastMessageTimestamp: Date;
}

// Mock data
const CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    participantId: 'member-2',
    participantName: 'Member 2',
    participantAvatar: '/placeholder.svg',
    messages: [
      {
        id: 'msg-1',
        senderId: 'member-2',
        text: 'Hi there! I saw your interest in the Platform Migration project.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
      },
      {
        id: 'msg-2',
        senderId: 'current-user',
        text: 'Hey! Yes, I\'ve been working on that recently. Are you involved as well?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1) // 1 hour ago
      },
      {
        id: 'msg-3',
        senderId: 'member-2',
        text: 'I just joined the team last week. I was hoping we could collaborate on the frontend components.',
        timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
      }
    ],
    lastMessageTimestamp: new Date(Date.now() - 1000 * 60 * 30)
  },
  {
    id: 'conv-2',
    participantId: 'member-5',
    participantName: 'Member 5',
    participantAvatar: '/placeholder.svg',
    messages: [
      {
        id: 'msg-4',
        senderId: 'current-user',
        text: 'Do you have time to discuss the API integration this week?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2) // 2 days ago
      },
      {
        id: 'msg-5',
        senderId: 'member-5',
        text: 'Sure, how about Thursday afternoon?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1) // 1 day ago
      }
    ],
    lastMessageTimestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1)
  }
];

const Messages = () => {
  const [conversations, setConversations] = useState<Conversation[]>(CONVERSATIONS);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(CONVERSATIONS[0] || null);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeConversation) return;
    
    const updatedMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: 'current-user',
      text: newMessage,
      timestamp: new Date()
    };
    
    const updatedConversation: Conversation = {
      ...activeConversation,
      messages: [...activeConversation.messages, updatedMessage],
      lastMessageTimestamp: new Date()
    };
    
    setConversations(prev => 
      prev.map(conv => 
        conv.id === activeConversation.id ? updatedConversation : conv
      )
    );
    
    setActiveConversation(updatedConversation);
    setNewMessage('');
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
          <p className="text-muted-foreground">
            Chat with your network members.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-240px)]">
          <Card className="col-span-1 overflow-hidden">
            <div className="p-4 border-b subtle-border">
              <h2 className="font-medium">Conversations</h2>
            </div>
            
            <ScrollArea className="h-[calc(100vh-320px)]">
              <div className="space-y-1 p-2">
                {conversations.map(conversation => (
                  <div
                    key={conversation.id}
                    className={`p-3 rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors ${
                      activeConversation?.id === conversation.id ? 'bg-secondary' : ''
                    }`}
                    onClick={() => setActiveConversation(conversation)}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <img src={conversation.participantAvatar} alt={conversation.participantName} />
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline">
                          <h3 className="font-medium truncate">{conversation.participantName}</h3>
                          <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                            {formatTime(conversation.lastMessageTimestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {conversation.messages[conversation.messages.length - 1]?.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
          
          <Card className="col-span-1 md:col-span-2 flex flex-col">
            {activeConversation ? (
              <>
                <div className="p-4 border-b subtle-border flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <img src={activeConversation.participantAvatar} alt={activeConversation.participantName} />
                  </Avatar>
                  <h2 className="font-medium">{activeConversation.participantName}</h2>
                </div>
                
                <ScrollArea className="flex-grow p-4 h-[calc(100vh-400px)]">
                  <div className="space-y-4">
                    {activeConversation.messages.map(message => {
                      const isOwnMessage = message.senderId === 'current-user';
                      
                      return (
                        <div
                          key={message.id}
                          className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[80%] rounded-xl p-3 ${
                            isOwnMessage 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-secondary text-secondary-foreground'
                          }`}>
                            <p>{message.text}</p>
                            <div className={`text-xs mt-1 ${
                              isOwnMessage ? 'text-primary-foreground/70' : 'text-muted-foreground'
                            }`}>
                              {formatTime(message.timestamp)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
                
                <div className="p-4 border-t subtle-border mt-auto">
                  <form
                    className="flex items-center space-x-2"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage();
                    }}
                  >
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-grow"
                    />
                    <Button type="submit" size="icon" className="rounded-full h-10 w-10">
                      <Send className="h-5 w-5" />
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                Select a conversation to start messaging
              </div>
            )}
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Messages;
