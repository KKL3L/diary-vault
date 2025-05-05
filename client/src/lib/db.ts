// IndexedDB database for storing diary entries
export interface DiaryEntry {
  id?: number;
  content: string;
  imageData?: string; // Base64 encoded image
  createdAt: Date;
  updatedAt: Date;
}

const DB_NAME = 'diary_db';
const DB_VERSION = 1;
const STORE_NAME = 'entries';

// Open the database connection
export function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = (event) => {
      reject('Error opening database');
    };
    
    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      // Create object store for diary entries if it doesn't exist
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        store.createIndex('createdAt', 'createdAt', { unique: false });
      }
    };
  });
}

// Add a new diary entry
export async function addEntry(entry: DiaryEntry): Promise<DiaryEntry> {
  const db = await openDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    // Make sure dates are properly set
    entry.createdAt = new Date();
    entry.updatedAt = new Date();
    
    const request = store.add(entry);
    
    request.onsuccess = (event) => {
      const id = (event.target as IDBRequest).result as number;
      resolve({ ...entry, id });
    };
    
    request.onerror = (event) => {
      reject('Error adding entry');
    };
    
    transaction.oncomplete = () => {
      db.close();
    };
  });
}

// Get all entries in reverse chronological order
export async function getAllEntries(): Promise<DiaryEntry[]> {
  const db = await openDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const index = store.index('createdAt');
    
    // Get all entries sorted by createdAt in descending order
    const request = index.openCursor(null, 'prev');
    const entries: DiaryEntry[] = [];
    
    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest).result as IDBCursorWithValue;
      
      if (cursor) {
        entries.push(cursor.value);
        cursor.continue();
      } else {
        resolve(entries);
      }
    };
    
    request.onerror = (event) => {
      reject('Error getting entries');
    };
    
    transaction.oncomplete = () => {
      db.close();
    };
  });
}

// Get a single entry by ID
export async function getEntry(id: number): Promise<DiaryEntry> {
  const db = await openDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    
    const request = store.get(id);
    
    request.onsuccess = (event) => {
      const entry = (event.target as IDBRequest).result as DiaryEntry;
      
      if (entry) {
        resolve(entry);
      } else {
        reject(`Entry with ID ${id} not found`);
      }
    };
    
    request.onerror = (event) => {
      reject('Error getting entry');
    };
    
    transaction.oncomplete = () => {
      db.close();
    };
  });
}

// Update an existing entry
export async function updateEntry(entry: DiaryEntry): Promise<DiaryEntry> {
  if (!entry.id) {
    throw new Error('Entry ID is required for updating');
  }
  
  const db = await openDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    // Update the updatedAt timestamp
    entry.updatedAt = new Date();
    
    const request = store.put(entry);
    
    request.onsuccess = (event) => {
      resolve(entry);
    };
    
    request.onerror = (event) => {
      reject('Error updating entry');
    };
    
    transaction.oncomplete = () => {
      db.close();
    };
  });
}

// Delete an entry by ID
export async function deleteEntry(id: number): Promise<void> {
  const db = await openDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    const request = store.delete(id);
    
    request.onsuccess = (event) => {
      resolve();
    };
    
    request.onerror = (event) => {
      reject('Error deleting entry');
    };
    
    transaction.oncomplete = () => {
      db.close();
    };
  });
}
