import { useState } from "react";
import { TrackCard } from "@/components/TrackCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Compass, Search, Filter, Music, Headphones, Radio } from "lucide-react";

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
  genre?: string;
}

const discoverTracks: Track[] = [
  {
    id: "d1",
    title: "Neon Nights",
    artist: "CyberSynth",
    duration: "4:12",
    cover: album1,
    plays: 2456789,
    genre: "Synthwave"
  },
  {
    id: "d2",
    title: "Data Stream",
    artist: "AlgoBeats",
    duration: "3:58",
    cover: album2,
    plays: 1876543,
    genre: "Electronic"
  },
  {
    id: "d3",
    title: "Future Funk",
    artist: "DigitalGroove",
    duration: "5:23",
    cover: album3,
    plays: 3214567,
    genre: "Funk"
  },
  {
    id: "d4",
    title: "Quantum Resonance",
    artist: "WaveAI",
    duration: "4:45",
    cover: album4,
    plays: 987654,
    genre: "Ambient"
  }
];

const genres = ["All", "Electronic", "Synthwave", "Ambient", "Funk", "Classical", "Jazz"];

interface DiscoverProps {
  onPlay: (track: Track) => void;
  currentTrack?: Track;
  isPlaying: boolean;
  onPause: () => void;
}

export default function Discover({ onPlay, currentTrack, isPlaying, onPause }: DiscoverProps) {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Basic input validation and sanitization
    if (value.length <= 100 && /^[a-zA-Z0-9\s\-_.!?&()]*$/.test(value)) {
      setSearchQuery(value);
    }
  };

  const filteredTracks = discoverTracks.filter(track => {
    const matchesGenre = selectedGenre === "All" || track.genre === selectedGenre;
    const matchesSearch = track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         track.artist.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  const handleLike = (trackId: string) => {
    const track = discoverTracks.find(t => t.id === trackId);
    if (track) {
      alert(`Added "${track.title}" to your liked songs!`);
    }
  };

  const handleAddToPlaylist = (trackId: string) => {
    const track = discoverTracks.find(t => t.id === trackId);
    if (track) {
      alert(`Added "${track.title}" to playlist`);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-primary/20 rounded-lg">
          <Compass className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Discover</h1>
          <p className="text-muted-foreground">Find new AI-generated music</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tracks, artists, genres..."
            className="pl-10"
            value={searchQuery}
            onChange={handleSearchChange}
            maxLength={100}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Genre Filter */}
      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <Button
            key={genre}
            variant={selectedGenre === genre ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedGenre(genre)}
          >
            {genre}
          </Button>
        ))}
      </div>

      {/* Quick Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20 cursor-pointer hover:shadow-card transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Music className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">New Releases</h3>
              <p className="text-sm text-muted-foreground">Fresh AI tracks</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20 cursor-pointer hover:shadow-card transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <Headphones className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Curated Playlists</h3>
              <p className="text-sm text-muted-foreground">Editor's picks</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20 cursor-pointer hover:shadow-card transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <Radio className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">AI Radio</h3>
              <p className="text-sm text-muted-foreground">Endless discovery</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Track Results */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            {selectedGenre === "All" ? "All Tracks" : `${selectedGenre} Tracks`}
          </h2>
          <Badge variant="secondary">{filteredTracks.length} tracks</Badge>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTracks.map((track) => (
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
