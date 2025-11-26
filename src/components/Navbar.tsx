import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-sm font-bold">
            JD
          </div>
          <span className="text-lg font-semibold tracking-tight text-slate-50">
            Job<span className="text-primary">Direct</span>
          </span>
        </Link>
      </div>
    </header>
  );
}
