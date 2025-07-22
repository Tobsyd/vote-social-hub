import { Heart, MessageCircle, Share2, Eye, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PostCardProps {
  post: {
    id: string;
    title: string;
    content: string;
    author: {
      name: string;
      avatar?: string;
      username: string;
    };
    talent: string;
    votes: number;
    userVote?: 'up' | 'down' | null;
    likes: number;
    comments: number;
    views: number;
    createdAt: string;
    media?: string[];
  };
  onVote?: (postId: string, type: 'up' | 'down') => void;
  onLike?: (postId: string) => void;
}

const PostCard = ({ post, onVote, onLike }: PostCardProps) => {
  const handleVote = (type: 'up' | 'down') => {
    onVote?.(post.id, type);
  };

  const getTalentColor = (talent: string) => {
    const colors = {
      'Music': 'bg-purple-100 text-purple-800',
      'Art': 'bg-pink-100 text-pink-800',
      'Dance': 'bg-blue-100 text-blue-800',
      'Writing': 'bg-green-100 text-green-800',
      'Tech': 'bg-orange-100 text-orange-800',
      'Sports': 'bg-red-100 text-red-800',
    };
    return colors[talent as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="w-full hover:shadow-lg transition-all duration-300 border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.author.avatar} />
              <AvatarFallback>{post.author.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">{post.author.name}</p>
              <p className="text-xs text-muted-foreground">@{post.author.username}</p>
            </div>
          </div>
          <Badge className={getTalentColor(post.talent)} variant="secondary">
            {post.talent}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <h3 className="font-bold text-lg mb-2">{post.title}</h3>
          <p className="text-foreground/80 leading-relaxed">{post.content}</p>
        </div>

        {post.media && post.media.length > 0 && (
          <div className="grid grid-cols-2 gap-2 rounded-lg overflow-hidden">
            {post.media.slice(0, 4).map((media, index) => (
              <div key={index} className="aspect-square bg-muted rounded-md overflow-hidden">
                <img 
                  src={media} 
                  alt={`Post media ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex items-center justify-between w-full">
          {/* Voting */}
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleVote('up')}
              className={`h-8 px-2 ${post.userVote === 'up' ? 'text-success bg-success/10' : ''}`}
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
            <span className="font-semibold text-sm min-w-[2rem] text-center">
              {post.votes}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleVote('down')}
              className={`h-8 px-2 ${post.userVote === 'down' ? 'text-destructive bg-destructive/10' : ''}`}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onLike?.(post.id)}
              className="h-8 px-2"
            >
              <Heart className="h-4 w-4 mr-1" />
              <span className="text-xs">{post.likes}</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <MessageCircle className="h-4 w-4 mr-1" />
              <span className="text-xs">{post.comments}</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <Share2 className="h-4 w-4" />
            </Button>

            <div className="flex items-center text-xs text-muted-foreground ml-2">
              <Eye className="h-3 w-3 mr-1" />
              {post.views}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;