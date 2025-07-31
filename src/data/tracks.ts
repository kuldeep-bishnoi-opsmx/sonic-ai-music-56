
// Import album covers
import album1 from "@/assets/album-1.jpg";
import album2 from "@/assets/album-2.jpg";
import album3 from "@/assets/album-3.jpg";
import album4 from "@/assets/album-4.jpg";

export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  cover: string;
  plays?: number;
}

export const sampleTracks: Track[] = [
  {
    id: "1",
    title: "Digital Dreams",
    artist: "SynthAI",
    duration: "3:42",
    cover: album1,
    plays: 1234567
  },
  {
    id: "2",
    title: "Quantum Beats",
    artist: "Neural Network",
    duration: "4:18",
    cover: album2,
    plays: 987654
  },
  {
    id: "3",
    title: "Electric Euphoria",
    artist: "AI Harmony",
    duration: "5:03",
    cover: album3,
    plays: 2341234
  },
  {
    id: "4",
    title: "Binary Ballet",
    artist: "CodeSound",
    duration: "3:27",
    cover: album4,
    plays: 876543
  },
  {
    id: "5",
    title: "Neon Nights",
    artist: "CyberSynth",
    duration: "4:12",
    cover: album1,
    plays: 1567890
  },
  {
    id: "6",
    title: "Virtual Velocity",
    artist: "AI Composer",
    duration: "3:55",
    cover: album2,
    plays: 743210
  },
  {
    id: "7",
    title: "Synthetic Serenity",
    artist: "Neural Harmony",
    duration: "5:21",
    cover: album3,
    plays: 1890234
  },
  {
    id: "8",
    title: "Algorithmic Aurora",
    artist: "QuantumBeats",
    duration: "4:07",
    cover: album4,
    plays: 623456
  },
  {
    id: "9",
    title: "Digital Dreamscape",
    artist: "AI Symphony",
    duration: "6:14",
    cover: album1,
    plays: 2134567
  },
  {
    id: "10",
    title: "Cyber Cascade",
    artist: "TechnoAI",
    duration: "3:33",
    cover: album2,
    plays: 892345
  },
  {
    id: "11",
    title: "Neural Nexus",
    artist: "MindMachine",
    duration: "4:45",
    cover: album3,
    plays: 1456789
  },
  {
    id: "12",
    title: "Quantum Quasar",
    artist: "SpaceAI",
    duration: "5:28",
    cover: album4,
    plays: 2087654
  },
  {
    id: "13",
    title: "Holographic Harmony",
    artist: "VirtualVibes",
    duration: "3:17",
    cover: album1,
    plays: 934521
  },
  {
    id: "14",
    title: "Techno Transcendence",
    artist: "AI Ascension",
    duration: "4:56",
    cover: album2,
    plays: 1687532
  },
  {
    id: "15",
    title: "Synthetic Symphony",
    artist: "CodeComposer",
    duration: "6:02",
    cover: album3,
    plays: 1234098
  },
  {
    id: "16",
    title: "Digital Dynamo",
    artist: "ElectroAI",
    duration: "3:41",
    cover: album4,
    plays: 876234
  },
  {
    id: "17",
    title: "Cyber Serenity",
    artist: "TranquilTech",
    duration: "4:23",
    cover: album1,
    plays: 1543876
  },
  {
    id: "18",
    title: "Virtual Vortex",
    artist: "QuantumCore",
    duration: "5:15",
    cover: album2,
    plays: 987123
  },
  {
    id: "19",
    title: "Neural Network",
    artist: "BrainWave",
    duration: "3:58",
    cover: album3,
    plays: 2156789
  },
  {
    id: "20",
    title: "AI Anthem",
    artist: "FuturSound",
    duration: "4:31",
    cover: album4,
    plays: 1789456
  }
];
