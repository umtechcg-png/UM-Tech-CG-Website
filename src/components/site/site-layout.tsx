import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Menu, X, MessageCircle, CalendarCheck } from "lucide-react";
import logoAsset from "@/assets/logo.asset.json";
import badgeAsset from "@/assets/umtechcg-badge.png.asset.json";
import { navLinks, FooterCol } from "./site-data";

export function SiteLayout({ children }: { children: ReactNode }) {
  const [navOpen, setNavOpen] = useState(false);

  const navItemClass = (isActive: boolean) =>
    `relative transition-colors ${
      isActive
        ? "text-transparent bg-clip-text bg-gradient-brand font-semibold after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-0.5 after:rounded-full after:bg-gradient-brand"
        : "text-muted-foreground hover:text-foreground"
    }`;

  return (
    <main className="min-h-dvh bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logoAsset.url} alt="UM Tech CG logo" className="w-10 h-10 rounded-lg object-cover" />
            <div className="leading-tight">
              <div className="font-bold text-sm">UM TECH CG</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Ubuntu Mzansi</div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            {navLinks.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: true }}
                className="text-muted-foreground hover:text-foreground transition-colors relative"
                activeProps={{
                  className:
                    "relative text-transparent bg-clip-text bg-gradient-brand font-semibold after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-0.5 after:rounded-full after:bg-gradient-brand",
                }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-brand text-white text-sm font-medium shadow-glow hover:opacity-90 transition">
              Book Consultation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <button className="md:hidden p-2" onClick={() => setNavOpen((o) => !o)} aria-label="Menu">
            {navOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {navOpen && (
          <div className="md:hidden border-t border-border bg-background/95 px-6 py-4 flex flex-col gap-3">
            {navLinks.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setNavOpen(false)}
                className="text-sm py-1 text-muted-foreground"
                activeProps={{ className: "text-sm py-1 text-transparent bg-clip-text bg-gradient-brand font-semibold" }}
              >
                {n.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setNavOpen(false)} className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-gradient-brand text-white text-sm font-medium">
              Book Consultation
            </Link>
          </div>
        )}
      </header>

      {children}

      {/* FOOTER */}
      <footer className="border-t border-border px-6 py-14">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3">
              <img src={logoAsset.url} alt="UM Tech CG" className="w-10 h-10 rounded-lg" />
              <div className="font-bold">UM TECH CG</div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Ubuntu Mzansi Tech Consulting Group — building practical, scalable technology for South African businesses.
            </p>
          </div>
          <FooterCol title="Services" links={["Consulting", "Web Development", "Mobile Apps", "Custom Software", "Cloud"]} />
          <FooterCol title="Products" links={["TrackSuite", "ServiceLayer", "DevFlow", "BizActivate"]} />
          <FooterCol title="Company" links={["About", "Process", "Packages", "Contact"]} />
        </div>
        <div className="max-w-7xl mx-auto mt-10 pt-8 border-t border-border flex flex-col md:flex-row gap-4 items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <img src={badgeAsset.url} alt="UM Tech CG badge" className="w-10 h-10 rounded-full" />
            <span>© 2026 UM Tech CG. All Rights Reserved.</span>
          </div>
          <div className="flex gap-4"><a href="#" className="hover:text-foreground">Privacy</a><a href="#" className="hover:text-foreground">Terms</a></div>
        </div>
      </footer>

      {/* FLOATING ACTIONS */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <Link
          to="/contact"
          aria-label="Book a consultation"
          className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-gradient-brand text-white font-medium shadow-glow hover:scale-105 transition"
        >
          <CalendarCheck className="w-5 h-5" /> Book Consultation
        </Link>
        <a
          href="https://wa.me/27000000000"
          aria-label="Chat on WhatsApp"
          className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-gradient-brand text-white font-medium shadow-glow hover:scale-105 transition"
        >
          <MessageCircle className="w-5 h-5" /> WhatsApp
        </a>
      </div>

      <style>{`
        .input {
          width: 100%;
          background: oklch(1 0 0 / 0.04);
          border: 1px solid oklch(1 0 0 / 0.10);
          border-radius: 0.875rem;
          padding: 0.75rem 1rem;
          font-size: 0.9rem;
          color: inherit;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .input:focus { border-color: oklch(0.65 0.22 295); background: oklch(1 0 0 / 0.06); }
        .input::placeholder { color: oklch(0.72 0.02 280); }
      `}</style>
    </main>
  );
}