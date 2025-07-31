
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Music, Check } from "lucide-react";
import { usePlaylistStore } from "@/store/playlistStore";
import { CreatePlaylistDialog } from "./CreatePlaylistDialog";

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  cover: string;
  plays?: number;
}

interface AddToPlaylistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  track: Track;
}

export function AddToPlaylistDialog({ open, onOpenChange, track }: AddToPlaylistDialogProps) {
  const { playlists, addTrackToPlaylist } = usePlaylistStore();
  const [selectedPlaylists, setSelectedPlaylists] = useState<string[]>([]);

  const handlePlaylistToggle = (playlistId: string) => {
    const playlist = playlists.find(p => p.id === playlistId);
    if (playlist) {
      const isTrackInPlaylist = playlist.tracks.some(t => t.id === track.id);
      if (isTrackInPlaylist) {
        // Track already in playlist, show feedback
        return;
      }
      
      addTrackToPlaylist(playlistId, track);
      setSelectedPlaylists(prev => [...prev, playlistId]);
      
      // Auto-close after a short delay
      setTimeout(() => {
        onOpenChange(false);
        setSelectedPlaylists([]);
      }, 1000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Music className="h-5 w-5 text-primary" />
            Add to Playlist
          </DialogTitle>
          <DialogDescription>
            Add "{track.title}" to your playlists
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[300px] w-full">
          <div className="space-y-2">
            {playlists.map((playlist) => {
              const isTrackInPlaylist = playlist.tracks.some(t => t.id === track.id);
              const isSelected = selectedPlaylists.includes(playlist.id);
              
              return (
                <Button
                  key={playlist.id}
                  variant={isTrackInPlaylist ? "secondary" : "ghost"}
                  className="w-full justify-start h-auto p-3"
                  onClick={() => handlePlaylistToggle(playlist.id)}
                  disabled={isTrackInPlaylist}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <Music className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium">{playlist.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {playlist.tracks.length} tracks
                      </p>
                    </div>
                    {isTrackInPlaylist && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                    {isSelected && !isTrackInPlaylist && (
                      <Check className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                </Button>
              );
            })}
          </div>
        </ScrollArea>
        
        <div className="flex justify-between items-center pt-4 border-t">
          <CreatePlaylistDialog>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Playlist
            </Button>
          </CreatePlaylistDialog>
          
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
