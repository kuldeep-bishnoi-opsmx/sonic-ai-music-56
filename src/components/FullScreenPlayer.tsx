
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
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
  X,
  Plus,
  Share,
  MoreHorizontal
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  cover: string;
}

interface FullScreenPlayerProps {
  currentTrack?: Track;
  isPlaying: boolean;
  progress: number;
  currentTime: number;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSeek: (percentage: number) => void;
  formatTime: (seconds: number) => string;
  onClose: () => void;
}

export function FullScreenPlayer({ 
  currentTrack, 
  isPlaying, 
  progress,
  currentTime,
  onPlayPause, 
  onNext, 
  onPrevious,
  onSeek,
  formatTime,
  onClose
}: FullScreenPlayerProps) {
  const [volume, setVolume] = useState([75]);
  const [isLiked, setIsLiked] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeated, setIsRepeated] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [waveformData, setWaveformData] = useState<number[]>([]);
  const { toast } = useToast();

  // Generate waveform data for visualization
  useEffect(() => {
    const generateWaveform = () => {
      const data = Array.from({ length: 100 }, () => Math.random() * 100);
      setWaveformData(data);
    };
    generateWaveform();
  }, [currentTrack]);

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

  const handleProgressChange = (newProgress: number[]) => {
    onSeek(newProgress[0]);
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

  const VolumeIcon = getVolumeIcon();

  if (!currentTrack) return null;

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
          <h2 className="text-lg font-semibold">Now Playing</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Share className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-2xl w-full space-y-8">
          {/* Album Cover */}
          <div className="relative mx-auto w-80 h-80 rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={currentTrack.cover} 
              alt={currentTrack.title}
              className={`w-full h-full object-cover transition-transform duration-300 ${
                isPlaying ? 'scale-105' : 'scale-100'
              }`}
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent ${
              isPlaying ? 'animate-pulse' : ''
            }`} />
          </div>

          {/* Track Info */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-foreground">{currentTrack.title}</h1>
            <p className="text-xl text-muted-foreground">{currentTrack.artist}</p>
          </div>

          {/* Waveform Visualization */}
          <div className="h-20 flex items-end justify-center gap-1 px-4">
            {waveformData.map((height, index) => (
              <div
                key={index}
                className={`w-1 bg-primary/30 rounded-full transition-all duration-150 ${
                  isPlaying && index < (progress / 100) * waveformData.length 
                    ? 'bg-primary animate-pulse' 
                    : ''
                }`}
                style={{ height: `${Math.max(height * 0.6, 4)}px` }}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Slider
              value={[progress]}
              onValueChange={handleProgressChange}
              max={100}
              step={0.1}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{currentTrack.duration}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsShuffled(!isShuffled)}
              className={`${isShuffled ? 'text-primary' : 'text-muted-foreground'} hover:text-primary`}
            >
              <Shuffle className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="lg" onClick={onPrevious}>
              <SkipBack className="h-6 w-6" />
            </Button>
            
            <Button 
              variant="glow" 
              size="lg" 
              onClick={onPlayPause}
              className="w-16 h-16 rounded-full shadow-glow"
            >
              {isPlaying ? (
                <Pause className="h-8 w-8" />
              ) : (
                <Play className="h-8 w-8 ml-1" />
              )}
            </Button>
            
            <Button variant="ghost" size="lg" onClick={onNext}>
              <SkipForward className="h-6 w-6" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsRepeated(!isRepeated)}
              className={`${isRepeated ? 'text-primary' : 'text-muted-foreground'} hover:text-primary`}
            >
              <Repeat className="h-5 w-5" />
            </Button>
          </div>

          {/* Bottom Controls */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLike}
              className="hover:text-primary"
            >
              <Heart className={`h-6 w-6 ${isLiked ? 'fill-primary text-primary' : ''}`} />
            </Button>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={toggleMute}>
                <VolumeIcon className="h-5 w-5" />
              </Button>
              <Slider
                value={isMuted ? [0] : volume}
                onValueChange={handleVolumeChange}
                max={100}
                step={1}
                className="w-24"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
