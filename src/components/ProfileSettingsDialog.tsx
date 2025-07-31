
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { User, Mail, Bell, Shield, Save } from "lucide-react";
import { profileSettingsSchema } from "@/lib/validationSchemas";
import { sanitizeInput } from "@/lib/sanitization";
import { z } from "zod";

interface ProfileSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type ProfileSettingsFormData = z.infer<typeof profileSettingsSchema>;

export function ProfileSettingsDialog({ open, onOpenChange }: ProfileSettingsDialogProps) {
  const [notifications, setNotifications] = useState({
    newReleases: true,
    recommendations: true,
    social: false
  });
  const [privacy, setPrivacy] = useState({
    publicProfile: true,
    showListeningHistory: false
  });

  const form = useForm<ProfileSettingsFormData>({
    resolver: zodResolver(profileSettingsSchema),
    defaultValues: {
      username: "music_lover_ai",
      displayName: "AI Music Lover",
      email: "user@example.com",
    },
  });

  const handleSave = (data: ProfileSettingsFormData) => {
    const sanitizedData = {
      username: sanitizeInput(data.username),
      displayName: sanitizeInput(data.displayName),
      email: sanitizeInput(data.email),
      notifications,
      privacy
    };
    
    console.log('Saving profile settings:', sanitizedData);
    
    // Simulate save
    setTimeout(() => {
      onOpenChange(false);
    }, 500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Profile Settings
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Basic Information</h3>
              <div className="space-y-3">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input {...field} maxLength={30} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="displayName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Name</FormLabel>
                      <FormControl>
                        <Input {...field} maxLength={50} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" maxLength={255} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            {/* Notifications */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">New Releases</p>
                    <p className="text-xs text-muted-foreground">Get notified about new AI tracks</p>
                  </div>
                  <Switch
                    checked={notifications.newReleases}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, newReleases: checked})
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Recommendations</p>
                    <p className="text-xs text-muted-foreground">Personalized music suggestions</p>
                  </div>
                  <Switch
                    checked={notifications.recommendations}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, recommendations: checked})
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Social Updates</p>
                    <p className="text-xs text-muted-foreground">Activity from people you follow</p>
                  </div>
                  <Switch
                    checked={notifications.social}
                    onCheckedChange={(checked) => 
                      setNotifications({...notifications, social: checked})
                    }
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Privacy */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Privacy
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Public Profile</p>
                    <p className="text-xs text-muted-foreground">Allow others to view your profile</p>
                  </div>
                  <Switch
                    checked={privacy.publicProfile}
                    onCheckedChange={(checked) => 
                      setPrivacy({...privacy, publicProfile: checked})
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Show Listening History</p>
                    <p className="text-xs text-muted-foreground">Display your recent tracks publicly</p>
                  </div>
                  <Switch
                    checked={privacy.showListeningHistory}
                    onCheckedChange={(checked) => 
                      setPrivacy({...privacy, showListeningHistory: checked})
                    }
                  />
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-primary">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
