import { MenuIcon } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-300 px-4 py-2 flex items-center justify-between">
      <h1 className="text-xl font-semibold">My Diary</h1>
      <div className="flex items-center space-x-4">
        <button className="text-primary">
          <MenuIcon className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
}
