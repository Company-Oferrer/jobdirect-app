export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-slate-400 md:flex-row md:items-center justify-center">
        <p>© {year} JobDirect. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
