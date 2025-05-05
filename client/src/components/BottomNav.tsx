import { HomeIcon, SearchIcon } from "lucide-react";

export default function BottomNav() {
  return (
    <nav className="bg-white border-t border-gray-300 fixed bottom-0 left-0 right-0 z-10">
      <div className="max-w-md mx-auto px-6">
        <div className="flex justify-around h-16">
          <button className="flex flex-col items-center justify-center w-full text-primary">
            <HomeIcon className="h-6 w-6" />
            <span className="text-xs mt-1">Feed</span>
          </button>
          <button className="flex flex-col items-center justify-center w-full text-gray-500">
            <SearchIcon className="h-6 w-6" />
            <span className="text-xs mt-1">Search</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
