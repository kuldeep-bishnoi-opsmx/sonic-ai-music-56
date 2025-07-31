
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Footer } from "@/components/Footer";
import { NeonCursor } from "@/components/NeonCursor";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { sampleTracks } from "@/data/tracks";
import Home from "./Home";
import Discover from "./Discover";
import Library from "./Library";
import TrendingTracks from "./TrendingTracks";
import RecentTracks from "./RecentTracks";

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  cover: string;
  plays?: number;
}

const Index = () => {
  const {
    currentTrack,
    isPlaying,
    progress,
    currentTime,
    playTrack,
    togglePlayPause,
    seekTo,
    formatTime,
    setCurrentTrack,
    setIsPlaying
  } = useAudioPlayer();

  const [activeSection, setActiveSection] = useState("home");
  const [searchResults, setSearchResults] = useState<Track[]>([]);

  const handleNext = () => {
    if (!currentTrack) return;
    const currentIndex = sampleTracks.findIndex(track => track.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % sampleTracks.length;
    playTrack(sampleTracks[nextIndex]);
  };

  const handlePrevious = () => {
    if (!currentTrack) return;
    const currentIndex = sampleTracks.findIndex(track => track.id === currentTrack.id);
    const prevIndex = currentIndex === 0 ? sampleTracks.length - 1 : currentIndex - 1;
    playTrack(sampleTracks[prevIndex]);
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    const filtered = sampleTracks.filter(track => 
      track.title.toLowerCase().includes(query.toLowerCase()) ||
      track.artist.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setSearchResults([]);
  };

  const renderCurrentPage = () => {
    if (searchResults.length > 0) {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Search Results</h2>
            <button 
              onClick={() => setSearchResults([])}
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Clear
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchResults.map((track) => (
              <div key={track.id} className="bg-card rounded-lg p-4 hover:shadow-card transition-all">
                <img src={track.cover} alt={track.title} className="w-full aspect-square object-cover rounded-lg mb-3" />
                <h3 className="font-semibold text-foreground truncate">{track.title}</h3>
                <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground">{track.duration}</span>
                  <button 
                    onClick={() => playTrack(track)}
                    className="text-xs text-primary hover:text-primary/80"
                  >
                    Play
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Render the appropriate page based on activeSection
    switch (activeSection) {
      case "discover":
        return <Discover 
          onPlay={playTrack}
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onPause={() => setIsPlaying(false)}
        />;
      case "library":
        return <Library 
          onPlay={playTrack}
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onPause={() => setIsPlaying(false)}
        />;
      case "trending":
        return <TrendingTracks
          onPlay={playTrack}
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onPause={() => setIsPlaying(false)}
          onBack={() => setActiveSection("home")}
        />;
      case "recent":
        return <RecentTracks
          onPlay={playTrack}
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onPause={() => setIsPlaying(false)}
          onBack={() => setActiveSection("home")}
        />;
      default:
        return <Home 
          onPlay={playTrack}
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onPause={() => setIsPlaying(false)}
          onShowTrending={() => setActiveSection("trending")}
          onShowRecent={() => setActiveSection("recent")}
        />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NeonCursor />
      <Navigation 
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        onSearch={handleSearch}
      />
      
      <main className="container mx-auto px-6 py-8 pb-32">
        {renderCurrentPage()}
      </main>

      <Footer onSectionChange={handleSectionChange} />

      <MusicPlayer
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        progress={progress}
        currentTime={currentTime}
        onPlayPause={togglePlayPause}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onSeek={seekTo}
        formatTime={formatTime}
      />
    </div>
  );
};

export default Index;
