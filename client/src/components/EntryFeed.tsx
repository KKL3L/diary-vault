import { DiaryEntry } from "@/lib/db";
import EntryCard from "./EntryCard";

interface EntryFeedProps {
  entries: DiaryEntry[];
  onEdit: (entry: DiaryEntry) => void;
  onDelete: (entryId: number) => void;
}

export default function EntryFeed({ entries, onEdit, onDelete }: EntryFeedProps) {
  return (
    <div className="space-y-6">
      {entries.map((entry) => (
        <EntryCard
          key={entry.id}
          entry={entry}
          onEdit={() => onEdit(entry)}
          onDelete={() => entry.id && onDelete(entry.id)}
        />
      ))}
    </div>
  );
}
