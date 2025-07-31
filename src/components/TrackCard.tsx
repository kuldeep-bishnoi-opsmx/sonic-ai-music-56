
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Play, Pause, Heart, MoreHorizontal, Plus, Share, Download } from "lucide-react";
import { useState } from "react";
import { AddToPlaylistDialog } from "./AddToPlaylistDialog";

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  cover: string;
  plays?: number;
}

interface TrackCardProps {
  track: Track;
  isPlaying: boolean;
  isCurrentTrack: boolean;
  onPlay: (track: Track) => void;
  onPause: () => void;
  onLike?: (trackId: string) => void;
  onAddToPlaylist?: (trackId: string) => void;
}

export function TrackCard({ 
  track, 
  isPlaying, 
  isCurrentTrack, 
  onPlay, 
  onPause,
  onLike,
  onAddToPlaylist
}: TrackCardProps) {
  const [showAddToPlaylist, setShowAddToPlaylist] = useState(false);

  const handlePlayPause = () => {
    if (isCurrentTrack && isPlaying) {
      onPause();
    } else {
      onPlay(track);
    }
  };

  const handleLike = () => {
    onLike?.(track.id);
  };

  const handleAddToPlaylist = () => {
    if (onAddToPlaylist) {
      onAddToPlaylist(track.id);
    } else {
      setShowAddToPlaylist(true);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`Check out "${track.title}" by ${track.artist} on SonicAI!`);
    alert("Track link copied to clipboard!");
  };

  const handleDownload = () => {
    alert("Download feature would be available with premium subscription");
  };

  return (
    <>
      <Card className="group relative bg-card hover:bg-card/80 transition-all duration-300 overflow-hidden border-border hover:shadow-card cursor-pointer">
        <div className="aspect-square relative overflow-hidden rounded-lg">
          <img 
            src={track.cover} 
            alt={track.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button
              variant="glow"
              size="player"
              onClick={handlePlayPause}
              className="shadow-glow"
            >
              {isCurrentTrack && isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6 ml-1" />
              )}
            </Button>
          </div>
          
          {/* Controls overlay */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 bg-black/60 hover:bg-black/80"
              onClick={handleLike}
            >
              <Heart className="h-4 w-4" />
            </Button>
            
            {/* More Options Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 bg-black/60 hover:bg-black/80">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card border-border" align="end">
                <DropdownMenuItem onClick={handleAddToPlaylist}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add to Playlist
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleShare}>
                  <Share className="mr-2 h-4 w-4" />
                  Share Track
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDownload}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Go to Artist
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300 truncate">
            {track.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 truncate">
            {track.artist}
          </p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-muted-foreground">
              {track.duration}
            </span>
            {track.plays && (
              <span className="text-xs text-muted-foreground">
                {track.plays.toLocaleString()} plays
              </span>
            )}
          </div>
        </div>
      </Card>

      {/* Add to Playlist Dialog */}
      <AddToPlaylistDialog
        open={showAddToPlaylist}
        onOpenChange={setShowAddToPlaylist}
        track={track}
      />
    </>
  );
}
