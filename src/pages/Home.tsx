import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock, Crown } from "lucide-react";
import PostCard from "@/components/posts/PostCard";
import Layout from "@/components/layout/Layout";

// Mock data - in real app this would come from Supabase
const mockPosts = [
  {
    id: "1",
    title: "My Latest Piano Composition",
    content: "Just finished working on this emotional piece. It took me weeks to perfect, but I'm really proud of how it turned out. The melody captures the feeling of a rainy evening perfectly.",
    author: {
      name: "Sarah Chen",
      username: "sarahmusic",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=400"
    },
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
    title: "Street Art Mural Progress",
    content: "Day 3 of working on this massive mural downtown. The community response has been incredible! Art has the power to bring people together.",
    author: {
      name: "Marcus Johnson",
      username: "streetartist_mj",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
    },
    talent: "Art",
    votes: 98,
    userVote: 'up' as 'up' | 'down' | null,
    likes: 156,
    comments: 34,
    views: 2341,
    createdAt: "5 hours ago",
    media: [
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"
    ]
  },
  {
    id: "3",
    title: "Contemporary Dance Routine",
    content: "Choreographed this piece to express the journey of self-discovery. Every movement tells a story.",
    author: {
      name: "Elena Rodriguez",
      username: "elena_dance",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400"
    },
    talent: "Dance",
    votes: 76,
    userVote: null,
    likes: 92,
    comments: 18,
    views: 987,
    createdAt: "1 day ago"
  }
];

const mockTopVoters = [
  { name: "Alex Thompson", votes: 1234, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400" },
  { name: "Maya Patel", votes: 987, avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=400" },
  { name: "David Kim", votes: 842, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" },
];

const Home = () => {
  const [posts, setPosts] = useState(mockPosts);

  const handleVote = (postId: string, type: 'up' | 'down') => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          let newVotes = post.votes;
          let newUserVote = type;

        if (post.userVote === type) {
          // Remove vote
          newVotes = type === 'up' ? post.votes - 1 : post.votes + 1;
          newUserVote = null as 'up' | 'down' | null;
          } else if (post.userVote) {
            // Change vote
            newVotes = type === 'up' ? post.votes + 2 : post.votes - 2;
          } else {
            // New vote
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
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="mb-6">
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              Discover Amazing Talents
            </h1>
            <p className="text-muted-foreground">
              Explore, vote, and connect with talented creators from around the world
            </p>
          </div>

          <Tabs defaultValue="trending" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="trending" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Trending
              </TabsTrigger>
              <TabsTrigger value="recent" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Recent
              </TabsTrigger>
              <TabsTrigger value="top" className="flex items-center gap-2">
                <Crown className="h-4 w-4" />
                Top Voted
              </TabsTrigger>
            </TabsList>

            <TabsContent value="trending" className="space-y-6">
              {posts.map(post => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  onVote={handleVote}
                  onLike={handleLike}
                />
              ))}
            </TabsContent>

            <TabsContent value="recent" className="space-y-6">
              {[...posts].reverse().map(post => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  onVote={handleVote}
                  onLike={handleLike}
                />
              ))}
            </TabsContent>

            <TabsContent value="top" className="space-y-6">
              {[...posts].sort((a, b) => b.votes - a.votes).map(post => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  onVote={handleVote}
                  onLike={handleLike}
                />
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Top Voters */}
          <div className="bg-card rounded-lg border p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Crown className="h-5 w-5 text-primary" />
              Top Voters
            </h3>
            <div className="space-y-4">
              {mockTopVoters.map((voter, index) => (
                <div key={voter.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img 
                        src={voter.avatar} 
                        alt={voter.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                        {index + 1}
                      </Badge>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{voter.name}</p>
                      <p className="text-xs text-muted-foreground">{voter.votes} votes</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Talent Categories */}
          <div className="bg-card rounded-lg border p-6">
            <h3 className="font-bold text-lg mb-4">Popular Categories</h3>
            <div className="flex flex-wrap gap-2">
              {['Music', 'Art', 'Dance', 'Writing', 'Tech', 'Sports'].map(category => (
                <Badge key={category} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;