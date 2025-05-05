import { useState, useEffect } from "react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import EntryFeed from "@/components/EntryFeed";
import EmptyState from "@/components/EmptyState";
import EntryModal from "@/components/EntryModal";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import { DiaryEntry, getAllEntries } from "@/lib/db";
import { PlusIcon } from "lucide-react";

export default function Home() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<DiaryEntry | null>(null);
  const [entryToDelete, setEntryToDelete] = useState<number | null>(null);

  // Load entries from IndexedDB
  useEffect(() => {
    const loadEntries = async () => {
      try {
        const loadedEntries = await getAllEntries();
        setEntries(loadedEntries);
      } catch (error) {
        console.error("Error loading entries:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadEntries();
  }, []);

  const handleCreateEntry = () => {
    setCurrentEntry(null);
    setModalOpen(true);
  };

  const handleEditEntry = (entry: DiaryEntry) => {
    setCurrentEntry(entry);
    setModalOpen(true);
  };

  const handleDeleteEntry = (entryId: number) => {
    setEntryToDelete(entryId);
    setDeleteModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setCurrentEntry(null);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
    setEntryToDelete(null);
  };

  const handleEntrySaved = async () => {
    // Refresh entries after saving
    try {
      const loadedEntries = await getAllEntries();
      setEntries(loadedEntries);
    } catch (error) {
      console.error("Error refreshing entries:", error);
    }
    setModalOpen(false);
    setCurrentEntry(null);
  };

  const handleEntryDeleted = async () => {
    // Refresh entries after deletion
    try {
      const loadedEntries = await getAllEntries();
      setEntries(loadedEntries);
    } catch (error) {
      console.error("Error refreshing entries:", error);
    }
    setDeleteModalOpen(false);
    setEntryToDelete(null);
  };

  return (
    <div className="max-w-md mx-auto bg-background min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 overflow-auto py-4 px-4">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-pulse">Loading...</div>
          </div>
        ) : entries.length > 0 ? (
          <EntryFeed 
            entries={entries} 
            onEdit={handleEditEntry} 
            onDelete={handleDeleteEntry} 
          />
        ) : (
          <EmptyState onCreateEntry={handleCreateEntry} />
        )}
      </main>

      {/* New Entry FAB Button */}
      <div className="fixed bottom-20 right-6">
        <button
          onClick={handleCreateEntry}
          className="bg-primary text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <PlusIcon className="h-7 w-7" />
        </button>
      </div>

      <BottomNav />

      {/* Modals */}
      <EntryModal
        isOpen={modalOpen}
        onClose={handleModalClose}
        entry={currentEntry}
        onSave={handleEntrySaved}
      />

      <DeleteConfirmation
        isOpen={deleteModalOpen}
        onClose={handleDeleteModalClose}
        entryId={entryToDelete}
        onDelete={handleEntryDeleted}
      />
    </div>
  );
}
