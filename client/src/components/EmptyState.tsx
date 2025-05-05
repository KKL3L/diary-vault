import { ArchiveIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onCreateEntry: () => void;
}

export default function EmptyState({ onCreateEntry }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <ArchiveIcon className="h-16 w-16 text-gray-300 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-1">No diary entries yet</h3>
      <p className="text-gray-500 mb-6">Create your first entry to get started</p>
      <Button onClick={onCreateEntry}>
        Create New Entry
      </Button>
    </div>
  );
}
