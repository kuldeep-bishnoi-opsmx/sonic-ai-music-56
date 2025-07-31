import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Heart,
  Repeat,
  Shuffle,
  VolumeX,
  Volume1,
  MoreHorizontal,
  Plus,
  Share,
  Maximize
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { FullScreenPlayer } from "./FullScreenPlayer";

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  cover: string;
}

interface MusicPlayerProps {
  currentTrack?: Track;
  isPlaying: boolean;
  progress: number;
  currentTime: number;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSeek: (percentage: number) => void;
  formatTime: (seconds: number) => string;
}

export function MusicPlayer({ 
  currentTrack, 
  isPlaying, 
  progress,
  currentTime,
  onPlayPause, 
  onNext, 
  onPrevious,
  onSeek,
  formatTime
}: MusicPlayerProps) {
  const [volume, setVolume] = useState([75]);
  const [isLiked, setIsLiked] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeated, setIsRepeated] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { toast } = useToast();

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume);
    if (newVolume[0] > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const getVolumeIcon = () => {
    if (isMuted || volume[0] === 0) return VolumeX;
    if (volume[0] < 50) return Volume1;
    return Volume2;
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked && currentTrack) {
      toast({
        title: "Added to Liked Songs",
        description: `"${currentTrack.title}" has been added to your liked songs.`,
      });
    }
  };

  const handleShuffle = () => {
    setIsShuffled(!isShuffled);
    toast({
      title: `Shuffle ${!isShuffled ? 'Enabled' : 'Disabled'}`,
      description: `Shuffle mode has been ${!isShuffled ? 'turned on' : 'turned off'}.`,
    });
  };

  const handleRepeat = () => {
    setIsRepeated(!isRepeated);
    toast({
      title: `Repeat ${!isRepeated ? 'Enabled' : 'Disabled'}`,
      description: `Repeat mode has been ${!isRepeated ? 'turned on' : 'turned off'}.`,
    });
  };

  const handleShare = () => {
    if (currentTrack) {
      navigator.clipboard.writeText(`Check out "${currentTrack.title}" by ${currentTrack.artist} on SonicAI!`);
      toast({
        title: "Link Copied",
        description: "Track link has been copied to your clipboard.",
      });
    }
  };

  const handleAddToPlaylist = () => {
    if (currentTrack) {
      toast({
        title: "Added to Playlist",
        description: `"${currentTrack.title}" has been added to your playlist.`,
      });
    }
  };

  const handleProgressChange = (newProgress: number[]) => {
    onSeek(newProgress[0]);
  };

  if (!currentTrack) {
    return (
      <Card className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border p-4 z-50">
        <div className="flex items-center justify-center text-muted-foreground">
          <p>Select a track to start playing</p>
        </div>
      </Card>
    );
  }

  const VolumeIcon = getVolumeIcon();

  return (
    <>
      <Card className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border p-4 z-50">
        <div className="flex items-center gap-4">
          {/* Track Info */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-14 h-14 rounded-lg overflow-hidden bg-gradient-primary cursor-pointer" 
                 onClick={() => setIsFullScreen(true)}>
              <img 
                src={currentTrack.cover} 
                alt={currentTrack.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-foreground truncate cursor-pointer hover:text-primary"
                  onClick={() => setIsFullScreen(true)}>
                {currentTrack.title}
              </h4>
              <p className="text-sm text-muted-foreground truncate">
                {currentTrack.artist}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLike}
              className="shrink-0"
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-primary text-primary' : ''}`} />
            </Button>
          </div>

          {/* Player Controls */}
          <div className="flex flex-col items-center gap-2 flex-1 max-w-md">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleShuffle}
                className={isShuffled ? 'text-primary' : ''}
              >
                <Shuffle className="h-4 w-4" />
              </Button>
              <Button variant="player" size="icon" onClick={onPrevious}>
                <SkipBack className="h-5 w-5" />
              </Button>
              <Button 
                variant="glow" 
                size="player" 
                onClick={onPlayPause}
                className="shadow-glow"
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6 ml-1" />
                )}
              </Button>
              <Button variant="player" size="icon" onClick={onNext}>
                <SkipForward className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRepeat}
                className={isRepeated ? 'text-primary' : ''}
              >
                <Repeat className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-2 w-full">
              <span className="text-xs text-muted-foreground w-10 text-right">
                {formatTime(currentTime)}
              </span>
              <Slider
                value={[progress]}
                onValueChange={handleProgressChange}
                max={100}
                step={0.1}
                className="flex-1"
              />
              <span className="text-xs text-muted-foreground w-10">
                {currentTrack.duration}
              </span>
            </div>
          </div>

          {/* Volume Control & More Options */}
          <div className="flex items-center gap-2 min-w-0 flex-1 justify-end">
            <Button variant="ghost" size="icon" onClick={toggleMute}>
              <VolumeIcon className="h-5 w-5 text-muted-foreground" />
            </Button>
            <Slider
              value={isMuted ? [0] : volume}
              onValueChange={handleVolumeChange}
              max={100}
              step={1}
              className="w-24"
            />
            
            {/* Fullscreen Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsFullScreen(true)}
              className="hover:text-primary"
            >
              <Maximize className="h-5 w-5" />
            </Button>
            
            {/* More Options */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-5 w-5" />
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
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Go to Artist
                </DropdownMenuItem>
                <DropdownMenuItem>
                  View Lyrics
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </Card>

      {/* Full Screen Player */}
      {isFullScreen && (
        <FullScreenPlayer
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          progress={progress}
          currentTime={currentTime}
          onPlayPause={onPlayPause}
          onNext={onNext}
          onPrevious={onPrevious}
          onSeek={onSeek}
          formatTime={formatTime}
          onClose={() => setIsFullScreen(false)}
        />
      )}
    </>
  );
}
