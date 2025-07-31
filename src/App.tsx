
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import Library from "./pages/Library";
import NotFound from "./pages/NotFound";
import TrendingTracks from "./pages/TrendingTracks";
import RecentTracks from "./pages/RecentTracks";

const queryClient = new QueryClient();

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  cover: string;
  plays?: number;
}

const App = () => {
  const {
    currentTrack,
    isPlaying,
    playTrack,
    setIsPlaying
  } = useAudioPlayer();

  const handleShowTrending = () => {
    // This will be handled by navigation in individual pages
    console.log("Show trending tracks");
  };

  const handleShowRecent = () => {
    // This will be handled by navigation in individual pages
    console.log("Show recent tracks");
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route 
              path="/home" 
              element={
                <Home 
                  onPlay={playTrack}
                  currentTrack={currentTrack}
                  isPlaying={isPlaying}
                  onPause={handlePause}
                  onShowTrending={handleShowTrending}
                  onShowRecent={handleShowRecent}
                />
              } 
            />
            <Route 
              path="/discover" 
              element={
                <Discover 
                  onPlay={playTrack}
                  currentTrack={currentTrack}
                  isPlaying={isPlaying}
                  onPause={handlePause}
                />
              } 
            />
            <Route 
              path="/library" 
              element={
                <Library 
                  onPlay={playTrack}
                  currentTrack={currentTrack}
                  isPlaying={isPlaying}
                  onPause={handlePause}
                />
              } 
            />
            <Route 
              path="/trending" 
              element={
                <TrendingTracks 
                  onPlay={playTrack}
                  currentTrack={currentTrack}
                  isPlaying={isPlaying}
                  onPause={handlePause}
                  onBack={() => window.history.back()}
                />
              } 
            />
            <Route 
              path="/recent" 
              element={
                <RecentTracks 
                  onPlay={playTrack}
                  currentTrack={currentTrack}
                  isPlaying={isPlaying}
                  onPause={handlePause}
                  onBack={() => window.history.back()}
                />
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
