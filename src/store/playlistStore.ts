
import { create } from 'zustand';

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  cover: string;
  plays?: number;
}

interface Playlist {
  id: string;
  name: string;
  description: string;
  tracks: Track[];
  cover: string;
  createdAt: string;
}

interface PlaylistStore {
  playlists: Playlist[];
  createPlaylist: (name: string, description: string) => void;
  deletePlaylist: (id: string) => void;
  addTrackToPlaylist: (playlistId: string, track: Track) => void;
  removeTrackFromPlaylist: (playlistId: string, trackId: string) => void;
  updatePlaylist: (id: string, updates: Partial<Playlist>) => void;
}

export const usePlaylistStore = create<PlaylistStore>((set) => ({
  playlists: [
    {
      id: 'p1',
      name: 'AI Favorites',
      description: 'My favorite AI-generated tracks',
      tracks: [],
      cover: '/assets/album-1.jpg',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'p2',
      name: 'Workout Beats',
      description: 'High-energy AI music for workouts',
      tracks: [],
      cover: '/assets/album-2.jpg',
      createdAt: new Date().toISOString(),
    },
  ],
  
  createPlaylist: (name, description) => set((state) => ({
    playlists: [...state.playlists, {
      id: `p${Date.now()}`,
      name,
      description,
      tracks: [],
      cover: '/assets/album-1.jpg',
      createdAt: new Date().toISOString(),
    }]
  })),
  
  deletePlaylist: (id) => set((state) => ({
    playlists: state.playlists.filter(p => p.id !== id)
  })),
  
  addTrackToPlaylist: (playlistId, track) => set((state) => ({
    playlists: state.playlists.map(p => 
      p.id === playlistId 
        ? { ...p, tracks: [...p.tracks, track] }
        : p
    )
  })),
  
  removeTrackFromPlaylist: (playlistId, trackId) => set((state) => ({
    playlists: state.playlists.map(p => 
      p.id === playlistId 
        ? { ...p, tracks: p.tracks.filter(t => t.id !== trackId) }
        : p
    )
  })),
  
  updatePlaylist: (id, updates) => set((state) => ({
    playlists: state.playlists.map(p => 
      p.id === id ? { ...p, ...updates } : p
    )
  })),
}));
