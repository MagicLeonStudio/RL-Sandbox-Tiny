import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-14 flex items-center gap-4">
        <Link to="/" className="font-bold text-xl">
          RL Sandbox
        </Link>
        <span className="text-muted-foreground text-sm">Tiny Edition</span>
      </div>
    </nav>
  );
}
