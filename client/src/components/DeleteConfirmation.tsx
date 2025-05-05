import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { deleteEntry } from "@/lib/db";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface DeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  entryId: number | null;
  onDelete: () => void;
}

export default function DeleteConfirmation({ 
  isOpen, 
  onClose, 
  entryId, 
  onDelete 
}: DeleteConfirmationProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    if (!entryId) return;
    
    setIsDeleting(true);
    
    try {
      await deleteEntry(entryId);
      toast({
        title: "Entry deleted",
        description: "Your diary entry has been deleted successfully"
      });
      onDelete();
    } catch (error) {
      console.error("Error deleting entry:", error);
      toast({
        title: "Error deleting entry",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Entry</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this entry? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete} 
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
