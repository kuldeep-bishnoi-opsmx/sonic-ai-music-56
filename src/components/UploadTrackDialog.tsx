
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Upload, Music, Sparkles, CheckCircle } from "lucide-react";
import { trackUploadSchema } from "@/lib/validationSchemas";
import { sanitizeTrackTitle, sanitizeInput } from "@/lib/sanitization";
import { z } from "zod";

interface UploadTrackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type TrackUploadFormData = z.infer<typeof trackUploadSchema>;

export function UploadTrackDialog({ open, onOpenChange }: UploadTrackDialogProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [uploadedTrack, setUploadedTrack] = useState<string>("");

  const form = useForm<TrackUploadFormData>({
    resolver: zodResolver(trackUploadSchema),
    defaultValues: {
      title: "",
      genre: "",
    },
  });

  const handleUpload = async (data: TrackUploadFormData) => {
    const sanitizedTitle = sanitizeTrackTitle(data.title);
    const sanitizedGenre = sanitizeInput(data.genre);
    
    setIsUploading(true);
    setUploadProgress(0);
    setUploadedTrack(sanitizedTitle);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setIsComplete(true);
          setTimeout(() => {
            setIsComplete(false);
            setUploadedTrack("");
            setUploadProgress(0);
            form.reset();
            onOpenChange(false);
          }, 2000);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleClose = () => {
    if (!isUploading) {
      onOpenChange(false);
      setIsComplete(false);
      setUploadedTrack("");
      setUploadProgress(0);
      form.reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Music className="h-5 w-5 text-primary" />
            Upload AI Track
          </DialogTitle>
        </DialogHeader>
        
        {!isComplete ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpload)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Track Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter track title..."
                        {...field}
                        disabled={isUploading}
                        maxLength={200}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genre</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Electronic, Ambient, Synthwave..."
                        {...field}
                        disabled={isUploading}
                        maxLength={50}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {isUploading && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                    <span className="text-sm text-muted-foreground">
                      AI is processing your track...
                    </span>
                  </div>
                  <Progress value={uploadProgress} className="w-full" />
                </div>
              )}
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleClose} disabled={isUploading}>
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={isUploading}
                  className="bg-gradient-primary hover:shadow-glow"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {isUploading ? "Uploading..." : "Upload Track"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Track Uploaded Successfully!
            </h3>
            <p className="text-sm text-muted-foreground">
              Your AI track "{uploadedTrack}" is now live on SonicAI
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
