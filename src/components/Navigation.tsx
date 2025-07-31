
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  Home, 
  Compass, 
  Library, 
  Plus,
  User,
  Bell,
  Settings,
  LogOut,
  Crown,
  History,
  Download,
  Heart
} from "lucide-react";
import { UploadTrackDialog } from "./UploadTrackDialog";
import { ProfileSettingsDialog } from "./ProfileSettingsDialog";
import { UpgradePremiumDialog } from "./UpgradePremiumDialog";

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onSearch: (query: string) => void;
}

export function Navigation({ activeSection, onSectionChange, onSearch }: NavigationProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [premiumDialogOpen, setPremiumDialogOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, title: "New AI track released", text: "QuantumAI Composer just dropped a new symphony" },
    { id: 2, title: "Weekly recap", text: "You listened to 47 AI tracks this week" },
    { id: 3, title: "Trending now", text: "Neural Beats is trending in your area" }
  ]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleLogout = () => {
    alert("Logout functionality would be implemented here");
  };

  return (
    <>
      <nav className="bg-card/95 backdrop-blur-md border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold text-primary-foreground">AI</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                SonicAI
              </h1>
              <Badge variant="secondary" className="ml-2">
                Beta
              </Badge>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search AI music, artists, genres..." 
                  className="pl-10 bg-secondary/50 border-border focus:border-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            </div>

            {/* Navigation Actions */}
            <div className="flex items-center gap-2">
              {/* Notifications Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary rounded-full text-xs text-primary-foreground flex items-center justify-center">
                      {notifications.length}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 bg-card border-border" align="end">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {notifications.map((notification) => (
                    <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-4">
                      <span className="font-medium text-foreground">{notification.title}</span>
                      <span className="text-sm text-muted-foreground">{notification.text}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Settings Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-card border-border" align="end">
                  <DropdownMenuLabel>Settings</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    Download Quality
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Heart className="mr-2 h-4 w-4" />
                    Liked Songs
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <History className="mr-2 h-4 w-4" />
                    Listening History
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Upload AI Track Button with Slower Glow Animation */}
              <Button 
                variant="gradient" 
                size="sm" 
                onClick={() => setUploadDialogOpen(true)}
                className="animate-[pulse_3s_ease-in-out_infinite] hover:animate-none hover:shadow-glow transition-all duration-300"
              >
                <Plus className="h-4 w-4 mr-2" />
                Upload AI Track
              </Button>

              {/* User Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-2">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-card border-border" align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setPremiumDialogOpen(true)}>
                    <Crown className="mr-2 h-4 w-4" />
                    Upgrade to Premium
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setProfileDialogOpen(true)}>
                    <User className="mr-2 h-4 w-4" />
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <History className="mr-2 h-4 w-4" />
                    Listening History
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Main Navigation */}
          <div className="flex items-center gap-6 mt-4">
            <Button 
              variant={activeSection === "home" ? "default" : "ghost"} 
              onClick={() => onSectionChange("home")}
              className={activeSection === "home" ? "text-primary-foreground" : ""}
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
            <Button 
              variant={activeSection === "discover" ? "default" : "ghost"}
              onClick={() => onSectionChange("discover")}
              className={activeSection === "discover" ? "text-primary-foreground" : ""}
            >
              <Compass className="h-4 w-4 mr-2" />
              Discover
            </Button>
            <Button 
              variant={activeSection === "library" ? "default" : "ghost"}
              onClick={() => onSectionChange("library")}
              className={activeSection === "library" ? "text-primary-foreground" : ""}
            >
              <Library className="h-4 w-4 mr-2" />
              Library
            </Button>
          </div>
        </div>
      </nav>

      {/* Dialogs */}
      <UploadTrackDialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen} />
      <ProfileSettingsDialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen} />
      <UpgradePremiumDialog open={premiumDialogOpen} onOpenChange={setPremiumDialogOpen} />
    </>
  );
}
