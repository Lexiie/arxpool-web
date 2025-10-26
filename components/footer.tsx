export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} ArxPool Labs. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="/docs/security" className="hover:text-primary">
            Security
          </a>
          <a href="/docs/api" className="hover:text-primary">
            API Reference
          </a>
          <a href="mailto:team@arxpool.dev" className="hover:text-primary">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
