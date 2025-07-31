
import { useState } from "react";
import { FeaturedSection } from "@/components/FeaturedSection";
import { TrackCard } from "@/components/TrackCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Flame, Clock, TrendingUp, Sparkles } from "lucide-react";
import { sampleTracks } from "@/data/tracks";
import { useToast } from "@/hooks/use-toast";
import Autoplay from "embla-carousel-autoplay";

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  cover: string;
  plays?: number;
}

interface HomeProps {
  onPlay: (track: Track) => void;
  currentTrack?: Track;
  isPlaying: boolean;
  onPause: () => void;
  onShowTrending: () => void;
  onShowRecent: () => void;
}

export default function Home({ onPlay, currentTrack, isPlaying, onPause, onShowTrending, onShowRecent }: HomeProps) {
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

  return (
    <div className="space-y-8">
      <FeaturedSection onPlay={onPlay} />

      {/* Trending Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Flame className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Trending AI Tracks</h2>
            <Badge variant="secondary">
              <TrendingUp className="h-3 w-3 mr-1" />
              Hot
            </Badge>
          </div>
          <Button variant="ghost" onClick={onShowTrending}>View All</Button>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
            skipSnaps: false,
            dragFree: true,
          }}
          plugins={[
            Autoplay({
              delay: 2000,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
              stopOnFocusIn: false,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {sampleTracks.slice(0, 8).map((track) => (
              <CarouselItem key={track.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <TrackCard
                  track={track}
                  isPlaying={isPlaying}
                  isCurrentTrack={currentTrack?.id === track.id}
                  onPlay={onPlay}
                  onPause={onPause}
                  onLike={handleLike}
                  onAddToPlaylist={handleAddToPlaylist}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </section>

      {/* Recently Added Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/20 rounded-lg">
              <Clock className="h-5 w-5 text-accent" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Recently Added</h2>
            <Badge variant="secondary">
              <Sparkles className="h-3 w-3 mr-1" />
              New
            </Badge>
          </div>
          <Button variant="ghost" onClick={onShowRecent}>View All</Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sampleTracks.slice(-8).map((track) => (
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
      </section>
    </div>
  );
}
