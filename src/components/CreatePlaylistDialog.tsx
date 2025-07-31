
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Plus, Music } from "lucide-react";
import { usePlaylistStore } from "@/store/playlistStore";
import { playlistSchema } from "@/lib/validationSchemas";
import { sanitizePlaylistName, sanitizeDescription } from "@/lib/sanitization";
import { z } from "zod";

interface CreatePlaylistDialogProps {
  children: React.ReactNode;
}

type PlaylistFormData = z.infer<typeof playlistSchema>;

export function CreatePlaylistDialog({ children }: CreatePlaylistDialogProps) {
  const [open, setOpen] = useState(false);
  const createPlaylist = usePlaylistStore(state => state.createPlaylist);

  const form = useForm<PlaylistFormData>({
    resolver: zodResolver(playlistSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleSubmit = (data: PlaylistFormData) => {
    const sanitizedName = sanitizePlaylistName(data.name);
    const sanitizedDescription = sanitizeDescription(data.description || "");
    
    createPlaylist(sanitizedName, sanitizedDescription);
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Music className="h-5 w-5 text-primary" />
            Create New Playlist
          </DialogTitle>
          <DialogDescription>
            Create a new playlist to organize your favorite AI tracks.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Playlist Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter playlist name"
                      {...field}
                      maxLength={100}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your playlist..."
                      rows={3}
                      {...field}
                      maxLength={500}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="gradient">
                <Plus className="h-4 w-4 mr-2" />
                Create Playlist
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
