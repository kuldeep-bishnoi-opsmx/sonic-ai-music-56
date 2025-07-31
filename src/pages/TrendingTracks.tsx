
import { TrackCard } from "@/components/TrackCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Flame, TrendingUp } from "lucide-react";
import { sampleTracks } from "@/data/tracks";
import { useToast } from "@/hooks/use-toast";

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  cover: string;
  plays?: number;
}

interface TrendingTracksProps {
  onPlay: (track: Track) => void;
  currentTrack?: Track;
  isPlaying: boolean;
  onPause: () => void;
  onBack: () => void;
}

export default function TrendingTracks({ onPlay, currentTrack, isPlaying, onPause, onBack }: TrendingTracksProps) {
  const { toast } = useToast();

  const handleLike = (trackId: string) => {
    const track = sampleTracks.find(t => t.id === trackId);
    if (track) {
      toast({
        title: "Added to Liked Songs",
        description: `"${track.title}" has been added to your liked songs.`,
      });
    }
  };

  const handleAddToPlaylist = (trackId: string) => {
    const track = sampleTracks.find(t => t.id === trackId);
    if (track) {
      toast({
        title: "Added to Playlist",
        description: `"${track.title}" has been added to your playlist.`,
      });
    }
  };

  // Sort tracks by play count for trending
  const trendingTracks = [...sampleTracks].sort((a, b) => (b.plays || 0) - (a.plays || 0));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-lg">
            <Flame className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Trending AI Tracks</h1>
            <p className="text-muted-foreground">The hottest AI-generated music right now</p>
          </div>
          <Badge variant="secondary" className="ml-2">
            <TrendingUp className="h-3 w-3 mr-1" />
            Hot
          </Badge>
        </div>
      </div>

      {/* Tracks Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {trendingTracks.map((track) => (
          <TrackCard
            key={track.id}
            track={track}
            isPlaying={isPlaying}
            isCurrentTrack={currentTrack?.id === track.id}
            onPlay={onPlay}
            onPause={onPause}
            onLike={handleLike}
            onAddToPlaylist={handleAddToPlaylist}
          />
        ))}
      </div>
    </div>
  );
}
