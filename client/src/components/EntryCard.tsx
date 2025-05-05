import { DiaryEntry } from "@/lib/db";
import { format } from "date-fns";
import { PencilIcon, TrashIcon } from "lucide-react";

interface EntryCardProps {
  entry: DiaryEntry;
  onEdit: () => void;
  onDelete: () => void;
}

export default function EntryCard({ entry, onEdit, onDelete }: EntryCardProps) {
  // Format the date to a readable string
  const formattedDate = format(new Date(entry.createdAt), "MMMM dd, yyyy");

  return (
    <div className="entry-card bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
      <div className="p-3 border-b border-gray-100 flex items-center justify-between">
        <div className="text-sm text-gray-500 font-medium">{formattedDate}</div>
        <div className="flex space-x-2">
          <button 
            className="text-gray-600 hover:text-primary"
            onClick={onEdit}
          >
            <PencilIcon className="h-5 w-5" />
          </button>
          <button 
            className="text-gray-600 hover:text-destructive"
            onClick={onDelete}
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {entry.imageData && (
        <div className="aspect-square relative bg-gray-100">
          <img 
            src={entry.imageData} 
            alt="Diary entry" 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-4">
        <p className="text-sm leading-relaxed">
          {entry.content}
        </p>
      </div>
    </div>
  );
}
