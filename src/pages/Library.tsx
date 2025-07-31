import { useState } from "react";
import { TrackCard } from "@/components/TrackCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Library as LibraryIcon, Heart, Clock, Music, Plus, Play, Trash2, Edit } from "lucide-react";
import { usePlaylistStore } from "@/store/playlistStore";
import { CreatePlaylistDialog } from "@/components/CreatePlaylistDialog";
import { AddToPlaylistDialog } from "@/components/AddToPlaylistDialog";

// Import album covers
import album1 from "@/assets/album-1.jpg";
import album2 from "@/assets/album-2.jpg";
import album3 from "@/assets/album-3.jpg";
import album4 from "@/assets/album-4.jpg";

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  cover: string;
  plays?: number;
  dateAdded?: string;
}

interface Playlist {
  id: string;
  name: string;
  trackCount: number;
  cover: string;
  description: string;
}

const likedTracks: Track[] = [
  {
    id: "l1",
    title: "Digital Dreams",
    artist: "SynthAI",
    duration: "3:42",
    cover: album1,
    plays: 1234567,
    dateAdded: "2 days ago"
  },
  {
    id: "l2",
    title: "Quantum Beats",
    artist: "Neural Network",
    duration: "4:18",
    cover: album2,
    plays: 987654,
    dateAdded: "1 week ago"
  }
];

const recentlyPlayed: Track[] = [
  {
    id: "r1",
    title: "Electric Euphoria",
    artist: "AI Harmony",
    duration: "5:03",
    cover: album3,
    plays: 2341234,
    dateAdded: "Today"
  },
  {
    id: "r2",
    title: "Binary Ballet",
    artist: "CodeSound",
    duration: "3:27",
    cover: album4,
    plays: 876543,
    dateAdded: "Yesterday"
  }
];

const playlists: Playlist[] = [
  {
    id: "p1",
    name: "AI Favorites",
    trackCount: 23,
    cover: album1,
    description: "My favorite AI-generated tracks"
  },
  {
    id: "p2",
    name: "Workout Beats",
    trackCount: 15,
    cover: album2,
    description: "High-energy AI music for workouts"
  },
  {
    id: "p3",
    name: "Chill Vibes",
    trackCount: 32,
    cover: album3,
    description: "Relaxing AI ambient music"
  }
];

interface LibraryProps {
  onPlay: (track: Track) => void;
  currentTrack?: Track;
  isPlaying: boolean;
  onPause: () => void;
}

export default function Library({ onPlay, currentTrack, isPlaying, onPause }: LibraryProps) {
  const [activeTab, setActiveTab] = useState("playlists");
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [showAddToPlaylist, setShowAddToPlaylist] = useState(false);
  
  const { playlists, deletePlaylist } = usePlaylistStore();

  const handleLike = (trackId: string) => {
    alert("Track removed from liked songs!");
  };

  const handleAddToPlaylist = (trackId: string) => {
    const track = [...likedTracks, ...recentlyPlayed].find(t => t.id === trackId);
    if (track) {
      setSelectedTrack(track);
      setShowAddToPlaylist(true);
    }
  };

  const handlePlayPlaylist = (playlistId: string) => {
    const playlist = playlists.find(p => p.id === playlistId);
    if (playlist && playlist.tracks.length > 0) {
      onPlay(playlist.tracks[0]);
    } else {
      alert("This playlist is empty. Add some tracks first!");
    }
  };

  const handleDeletePlaylist = (playlistId: string) => {
    const playlist = playlists.find(p => p.id === playlistId);
    if (playlist && confirm(`Are you sure you want to delete "${playlist.name}"?`)) {
      deletePlaylist(playlistId);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/20 rounded-lg">
            <LibraryIcon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Your Library</h1>
            <p className="text-muted-foreground">Your music, organized</p>
          </div>
        </div>
        <CreatePlaylistDialog>
          <Button variant="gradient">
            <Plus className="h-4 w-4 mr-2" />
            Create Playlist
          </Button>
        </CreatePlaylistDialog>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
          <TabsTrigger value="liked">Liked Songs</TabsTrigger>
          <TabsTrigger value="recent">Recently Played</TabsTrigger>
        </TabsList>

        <TabsContent value="playlists" className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {playlists.map((playlist) => (
              <Card key={playlist.id} className="group cursor-pointer hover:shadow-card transition-all duration-300">
                <div className="aspect-square relative overflow-hidden rounded-lg">
                  <div className="w-full h-full bg-gradient-primary flex items-center justify-center">
                    <Music className="h-16 w-16 text-white/70" />
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex gap-2">
                      <Button
                        variant="glow"
                        size="player"
                        onClick={() => handlePlayPlaylist(playlist.id)}
                        className="shadow-glow"
                      >
                        <Play className="h-6 w-6 ml-1" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeletePlaylist(playlist.id)}
                        className="bg-red-500/20 hover:bg-red-500/40"
                      >
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                    {playlist.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{playlist.description}</p>
                  <div className="flex items-center justify-between mt-3">
                    <Badge variant="secondary">{playlist.tracks.length} tracks</Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="liked" className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <Heart className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Liked Songs</h2>
              <p className="text-muted-foreground">{likedTracks.length} tracks</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {likedTracks.map((track) => (
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
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-accent/20 rounded-lg">
              <Clock className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Recently Played</h2>
              <p className="text-muted-foreground">{recentlyPlayed.length} tracks</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recentlyPlayed.map((track) => (
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
        </TabsContent>
      </Tabs>

      {/* Add to Playlist Dialog */}
      {selectedTrack && (
        <AddToPlaylistDialog
          open={showAddToPlaylist}
          onOpenChange={setShowAddToPlaylist}
          track={selectedTrack}
        />
      )}
    </div>
  );
}
