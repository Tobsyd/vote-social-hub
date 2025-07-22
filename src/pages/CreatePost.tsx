import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [talent, setTalent] = useState("");
  const [media, setMedia] = useState<string[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !content || !talent) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // In real app, this would save to Supabase
    toast({
      title: "Success!",
      description: "Your post has been created successfully",
    });

    navigate("/");
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // In real app, upload to Supabase storage
      const newMedia = Array.from(files).map((file, index) => 
        `https://images.unsplash.com/photo-149379540812${index}?w=400`
      );
      setMedia(prev => [...prev, ...newMedia].slice(0, 4));
    }
  };

  const removeMedia = (index: number) => {
    setMedia(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl bg-gradient-primary bg-clip-text text-transparent">
              Share Your Talent
            </CardTitle>
            <p className="text-muted-foreground">
              Create a new post to showcase your amazing skills
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Give your post a compelling title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="talent">Talent Category *</Label>
                <Select value={talent} onValueChange={setTalent}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your talent category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Music">🎵 Music</SelectItem>
                    <SelectItem value="Art">🎨 Art</SelectItem>
                    <SelectItem value="Dance">💃 Dance</SelectItem>
                    <SelectItem value="Writing">✍️ Writing</SelectItem>
                    <SelectItem value="Tech">💻 Tech</SelectItem>
                    <SelectItem value="Sports">⚽ Sports</SelectItem>
                    <SelectItem value="Cooking">👨‍🍳 Cooking</SelectItem>
                    <SelectItem value="Photography">📸 Photography</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Description *</Label>
                <Textarea
                  id="content"
                  placeholder="Tell us about your work, inspiration, or process..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={6}
                  className="resize-none"
                />
              </div>

              <div className="space-y-4">
                <Label>Media (Optional)</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleMediaUpload}
                    className="hidden"
                    id="media-upload"
                  />
                  <label htmlFor="media-upload" className="cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload images or videos
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Maximum 4 files
                    </p>
                  </label>
                </div>

                {media.length > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    {media.map((item, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={item}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeMedia(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1">
                  Publish Post
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate("/")}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CreatePost;