import { useState } from "react";
import { Send, Search, MoreVertical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout/Layout";
import { Textarea } from "@/components/ui/textarea";

const mockConversations = [
  {
    id: "1",
    user: {
      name: "Sarah Chen",
      username: "sarahmusic",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=400",
      online: true
    },
    lastMessage: "That piano piece was absolutely beautiful! How long have you been playing?",
    time: "2m ago",
    unread: 2
  },
  {
    id: "2",
    user: {
      name: "Marcus Johnson",
      username: "streetartist_mj",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      online: false
    },
    lastMessage: "Thanks for the feedback on my mural! Really appreciate it.",
    time: "1h ago",
    unread: 0
  },
  {
    id: "3",
    user: {
      name: "Elena Rodriguez",
      username: "elena_dance",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      online: true
    },
    lastMessage: "Would love to collaborate on a project together!",
    time: "3h ago",
    unread: 1
  }
];

const mockMessages = [
  {
    id: "1",
    senderId: "2",
    content: "Hey! I saw your latest post about the piano composition. It's incredible!",
    time: "10:30 AM",
    read: true
  },
  {
    id: "2",
    senderId: "1",
    content: "Thank you so much! I've been working on it for weeks. Really glad you enjoyed it 😊",
    time: "10:32 AM",
    read: true
  },
  {
    id: "3",
    senderId: "2",
    content: "That piano piece was absolutely beautiful! How long have you been playing?",
    time: "10:35 AM",
    read: false
  },
  {
    id: "4",
    senderId: "2",
    content: "I'd love to hear more of your work sometime!",
    time: "10:35 AM",
    read: false
  }
];

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // In real app, this would send message via Supabase
    console.log("Sending message:", newMessage);
    setNewMessage("");
  };

  const filteredConversations = mockConversations.filter(conv =>
    conv.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Messages
              <Badge variant="secondary">
                {mockConversations.reduce((acc, conv) => acc + conv.unread, 0)}
              </Badge>
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                    selectedConversation.id === conversation.id ? 'bg-primary/10' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={conversation.user.avatar} />
                        <AvatarFallback>
                          {conversation.user.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.user.online && (
                        <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold text-sm truncate">
                          {conversation.user.name}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {conversation.time}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.lastMessage}
                      </p>
                    </div>
                    
                    {conversation.unread > 0 && (
                      <Badge variant="destructive" className="ml-2">
                        {conversation.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2 flex flex-col">
          {/* Chat Header */}
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedConversation.user.avatar} />
                    <AvatarFallback>
                      {selectedConversation.user.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {selectedConversation.user.online && (
                    <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background"></div>
                  )}
                </div>
                <div>
                  <p className="font-semibold">{selectedConversation.user.name}</p>
                  <p className="text-sm text-muted-foreground">
                    @{selectedConversation.user.username}
                    {selectedConversation.user.online ? " • Online" : " • Last seen 2h ago"}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {mockMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === "1" ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${
                    message.senderId === "1" 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  } rounded-lg p-3`}>
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.senderId === "1" 
                        ? 'text-primary-foreground/70' 
                        : 'text-muted-foreground'
                    }`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>

          {/* Message Input */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Textarea
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 min-h-[40px] max-h-[120px] resize-none"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="self-end"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Messages;