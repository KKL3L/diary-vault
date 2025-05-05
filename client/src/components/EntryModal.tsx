import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { X, Image } from "lucide-react";
import { DiaryEntry, addEntry, updateEntry } from "@/lib/db";
import { useToast } from "@/hooks/use-toast";

interface EntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  entry: DiaryEntry | null;
  onSave: () => void;
}

export default function EntryModal({ isOpen, onClose, entry, onSave }: EntryModalProps) {
  const [content, setContent] = useState("");
  const [imageData, setImageData] = useState<string | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Reset form when modal opens/closes or entry changes
  useEffect(() => {
    if (isOpen && entry) {
      setContent(entry.content);
      setImageData(entry.imageData);
    } else if (isOpen) {
      // New entry
      setContent("");
      setImageData(undefined);
    }
  }, [isOpen, entry]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Image too large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive"
      });
      return;
    }

    // Convert image to base64
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImageData(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImageData(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!content.trim() && !imageData) {
      toast({
        title: "Missing content",
        description: "Please add some text or an image to your entry",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      if (entry?.id) {
        // Update existing entry
        await updateEntry({
          ...entry,
          content,
          imageData,
          updatedAt: new Date()
        });
      } else {
        // Create new entry
        await addEntry({
          content,
          imageData,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }

      toast({
        title: entry?.id ? "Entry updated" : "Entry created",
        description: "Your diary entry has been saved successfully"
      });

      onSave();
    } catch (error) {
      console.error("Error saving entry:", error);
      toast({
        title: "Error saving entry",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{entry?.id ? "Edit Entry" : "New Entry"}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSave} className="space-y-4 mt-2">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-2 mb-4 bg-gray-50 text-center relative">
            <input 
              type="file" 
              id="imageUpload" 
              ref={fileInputRef}
              className="hidden" 
              accept="image/*"
              onChange={handleImageUpload}
            />
            
            {imageData ? (
              <div className="relative">
                <img 
                  src={imageData} 
                  alt="Entry preview" 
                  className="max-h-60 mx-auto rounded"
                />
                <button 
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            ) : (
              <div className="py-4">
                <Image className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 mb-2">Add a photo to your entry</p>
                <Button 
                  type="button" 
                  variant="secondary" 
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800"
                >
                  Upload Photo
                </Button>
              </div>
            )}
          </div>
          
          <div>
            <label htmlFor="entryContent" className="block text-sm font-medium text-gray-700 mb-1">
              What's on your mind?
            </label>
            <Textarea
              id="entryContent"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              placeholder="Write your thoughts here..."
              className="resize-none"
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Entry"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
