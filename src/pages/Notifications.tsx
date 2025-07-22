import { Bell, Heart, MessageCircle, UserPlus, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Layout from "@/components/layout/Layout";

const mockNotifications = [
  {
    id: "1",
    type: "like",
    user: {
      name: "Alex Thompson",
      username: "alexthompson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"
    },
    message: "liked your post",
    post: "My Latest Piano Composition",
    time: "2 minutes ago",
    read: false
  },
  {
    id: "2",
    type: "follow",
    user: {
      name: "Maya Patel",
      username: "mayapatel",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=400"
    },
    message: "started following you",
    time: "10 minutes ago",
    read: false
  },
  {
    id: "3",
    type: "comment",
    user: {
      name: "David Kim",
      username: "davidkim",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
    },
    message: "commented on your post",
    post: "Street Art Mural Progress",
    comment: "This is absolutely stunning! The colors are incredible.",
    time: "1 hour ago",
    read: true
  },
  {
    id: "4",
    type: "vote",
    user: {
      name: "Sarah Chen",
      username: "sarahmusic",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400"
    },
    message: "upvoted your post",
    post: "Contemporary Dance Routine",
    time: "3 hours ago",
    read: true
  },
  {
    id: "5",
    type: "trending",
    message: "Your post is now trending!",
    post: "My Latest Piano Composition",
    time: "5 hours ago",
    read: true
  }
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'like':
      return <Heart className="h-4 w-4 text-red-500" />;
    case 'follow':
      return <UserPlus className="h-4 w-4 text-blue-500" />;
    case 'comment':
      return <MessageCircle className="h-4 w-4 text-green-500" />;
    case 'vote':
      return <TrendingUp className="h-4 w-4 text-purple-500" />;
    case 'trending':
      return <TrendingUp className="h-4 w-4 text-orange-500" />;
    default:
      return <Bell className="h-4 w-4" />;
  }
};

const Notifications = () => {
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-6 w-6" />
                Notifications
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {unreadCount}
                  </Badge>
                )}
              </div>
              <Button variant="outline" size="sm">
                Mark all as read
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {mockNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-6 hover:bg-muted/50 transition-colors ${
                    !notification.read ? 'bg-primary/5 border-l-4 border-l-primary' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {notification.user ? (
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={notification.user.avatar} />
                          <AvatarFallback>
                            {notification.user.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                          {getNotificationIcon(notification.type)}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {getNotificationIcon(notification.type)}
                        <span className="text-sm text-muted-foreground">
                          {notification.time}
                        </span>
                        {!notification.read && (
                          <div className="h-2 w-2 bg-primary rounded-full"></div>
                        )}
                      </div>

                      <p className="text-sm">
                        {notification.user && (
                          <span className="font-semibold">
                            {notification.user.name}
                          </span>
                        )}
                        {" " + notification.message}
                        {notification.post && (
                          <span className="font-medium text-primary">
                            {" \"" + notification.post + "\""}
                          </span>
                        )}
                      </p>

                      {notification.comment && (
                        <div className="mt-2 p-3 bg-muted rounded-lg">
                          <p className="text-sm italic">"{notification.comment}"</p>
                        </div>
                      )}
                    </div>

                    <div className="flex-shrink-0">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Notifications;