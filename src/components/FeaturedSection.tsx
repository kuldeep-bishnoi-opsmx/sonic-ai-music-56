import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, TrendingUp, Sparkles, Zap } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  cover: string;
  plays?: number;
}

interface FeaturedSectionProps {
  onPlay: (track: Track) => void;
}

export function FeaturedSection({ onPlay }: FeaturedSectionProps) {
  const handlePlayFeatured = () => {
    onPlay({
      id: "featured-1",
      title: "Neural Symphony No. 1",
      artist: "QuantumAI Composer",
      duration: "4:32",
      cover: "/src/assets/album-1.jpg",
      plays: 2847392
    });
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative h-96 rounded-2xl overflow-hidden mb-8">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="relative h-full flex items-center px-8">
          <div className="max-w-lg">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              <Sparkles className="h-3 w-3 mr-1" />
              Featured Track
            </Badge>
            <h2 className="text-4xl font-bold text-white mb-3">
              Neural Symphony No. 1
            </h2>
            <p className="text-lg text-white/80 mb-2">
              by QuantumAI Composer
            </p>
            <p className="text-white/60 mb-6 leading-relaxed">
              Experience the future of music with this AI-generated masterpiece. 
              A harmonious blend of classical orchestration and digital innovation.
            </p>
            <div className="flex items-center gap-4">
              <Button 
                variant="glow" 
                size="lg" 
                onClick={handlePlayFeatured}
                className="shadow-glow"
              >
                <Play className="h-5 w-5 mr-2" />
                Play Now
              </Button>
              <div className="flex items-center gap-4 text-white/60">
                <span className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  2.8M plays
                </span>
                <span>4:32</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-500/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-electric-purple/20 rounded-lg">
              <Zap className="h-6 w-6 text-electric-purple" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">AI Tracks</h3>
              <p className="text-2xl font-bold text-electric-purple">50K+</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-electric-blue/20 rounded-lg">
              <TrendingUp className="h-6 w-6 text-electric-blue" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Daily Streams</h3>
              <p className="text-2xl font-bold text-electric-blue">1.2M</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-neon-green/20 rounded-lg">
              <Sparkles className="h-6 w-6 text-neon-green" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">AI Artists</h3>
              <p className="text-2xl font-bold text-neon-green">5K+</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}