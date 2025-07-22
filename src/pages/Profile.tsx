import { useState } from "react";
import { MapPin, Calendar, Users, Heart, MessageCircle, Settings, Camera } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/layout/Layout";
import PostCard from "@/components/posts/PostCard";

const mockUser = {
  id: "1",
  name: "Sarah Chen",
  username: "sarahmusic",
  avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=400",
  coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
  bio: "Passionate pianist and composer. Creating melodies that touch the soul. 🎹✨",
  location: "San Francisco, CA",
  joinedDate: "March 2023",
  followers: 2847,
  following: 523,
  totalVotes: 1234,
  talents: ["Music", "Composition"],
  verified: true
};

const mockUserPosts = [
  {
    id: "1",
    title: "My Latest Piano Composition",
    content: "Just finished working on this emotional piece. It took me weeks to perfect, but I'm really proud of how it turned out.",
    author: mockUser,
    talent: "Music",
    votes: 142,
    userVote: null,
    likes: 89,
    comments: 23,
    views: 1205,
    createdAt: "2 hours ago",
    media: ["https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400"]
  },
  {
    id: "2",
    title: "Behind the Scenes: Recording Session",
    content: "Spent the day in the studio working on my new album. The creative process is always so fulfilling!",
    author: mockUser,
    talent: "Music",
    votes: 98,
    userVote: null,
    likes: 156,
    comments: 34,
    views: 2341,
    createdAt: "1 day ago",
    media: ["https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400"]
  }
];

const Profile = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [posts, setPosts] = useState(mockUserPosts);

  const handleVote = (postId: string, type: 'up' | 'down') => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          let newVotes = post.votes;
          let newUserVote: 'up' | 'down' | null = type;

          if (post.userVote === type) {
            newVotes = type === 'up' ? post.votes - 1 : post.votes + 1;
            newUserVote = null;
          } else if (post.userVote) {
            newVotes = type === 'up' ? post.votes + 2 : post.votes - 2;
          } else {
            newVotes = type === 'up' ? post.votes + 1 : post.votes - 1;
          }

          return { ...post, votes: newVotes, userVote: newUserVote };
        }
        return post;
      })
    );
  };

  const handleLike = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card>
          <div className="relative">
            {/* Cover Image */}
            <div className="h-48 bg-gradient-primary rounded-t-lg relative overflow-hidden">
              <img 
                src={mockUser.coverImage} 
                alt="Cover" 
                className="w-full h-full object-cover"
              />
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-4 right-4 bg-black/20 backdrop-blur-sm border-0"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>

            {/* Profile Info */}
            <CardContent className="pt-0">
              <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-5 -mt-12 relative">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-background">
                    <AvatarImage src={mockUser.avatar} />
                    <AvatarFallback className="text-lg">
                      {mockUser.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute bottom-0 right-0 h-6 w-6 rounded-full"
                  >
                    <Camera className="h-3 w-3" />
                  </Button>
                </div>

                <div className="flex-1 min-w-0 mt-4 sm:mt-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h1 className="text-2xl font-bold flex items-center gap-2">
                        {mockUser.name}
                        {mockUser.verified && (
                          <Badge className="bg-blue-500 text-white">✓</Badge>
                        )}
                      </h1>
                      <p className="text-muted-foreground">@{mockUser.username}</p>
                    </div>
                    
                    <div className="flex gap-2 mt-4 sm:mt-0">
                      <Button
                        variant={isFollowing ? "outline" : "default"}
                        onClick={() => setIsFollowing(!isFollowing)}
                      >
                        <Users className="h-4 w-4 mr-2" />
                        {isFollowing ? "Following" : "Follow"}
                      </Button>
                      <Button variant="outline">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <p className="mt-4 text-foreground">{mockUser.bio}</p>

                  <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {mockUser.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Joined {mockUser.joinedDate}
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mt-4">
                    <div className="text-center">
                      <div className="font-bold text-lg">{mockUser.followers}</div>
                      <div className="text-sm text-muted-foreground">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg">{mockUser.following}</div>
                      <div className="text-sm text-muted-foreground">Following</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg">{mockUser.totalVotes}</div>
                      <div className="text-sm text-muted-foreground">Total Votes</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {mockUser.talents.map(talent => (
                      <Badge key={talent} variant="secondary">
                        {talent}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>

        {/* Profile Content */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="followers">Followers</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-6">
            {posts.map(post => (
              <PostCard 
                key={post.id} 
                post={post} 
                onVote={handleVote}
                onLike={handleLike}
              />
            ))}
          </TabsContent>

          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Bio</h4>
                  <p className="text-muted-foreground">{mockUser.bio}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Talents</h4>
                  <div className="flex flex-wrap gap-2">
                    {mockUser.talents.map(talent => (
                      <Badge key={talent} variant="outline">
                        {talent}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Location</h4>
                  <p className="text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {mockUser.location}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="followers">
            <Card>
              <CardHeader>
                <CardTitle>Followers ({mockUser.followers})</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Followers list would be displayed here...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="following">
            <Card>
              <CardHeader>
                <CardTitle>Following ({mockUser.following})</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Following list would be displayed here...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Profile;