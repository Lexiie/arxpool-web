export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-black/40">
      <div className="mx-auto max-w-6xl px-6 py-10 text-center text-sm text-white/70">
        <p>
          © {year} ArxPool -- Built for Arcium Encrypted Side Track.
        </p>
        <div className="mt-3 flex flex-col items-center justify-center gap-2 text-xs text-white/60 sm:flex-row sm:gap-4">
          <a href="https://github.com/Lexiie/arxpool-sdk" className="underline hover:text-primary">
            SDK GitHub
          </a>
          <span className="hidden text-white/30 sm:inline">•</span>
          <a href="https://github.com/Lexiie/arxpool-web" className="underline hover:text-primary">
            Web Repo
          </a>
        </div>
      </div>
    </footer>
  );
}
