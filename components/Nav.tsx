"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Scroll, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Roadmap" },
  { href: "/roster", label: "Roster" },
  { href: "/builder", label: "Strategy" },
  { href: "/compare", label: "Compare" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-parchment-dark bg-parchment/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <Scroll className="w-4 h-4 text-sage" />
          <span className="font-serif text-ink text-sm tracking-wider">RELLION</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`
                font-serif text-xs tracking-widest uppercase px-3 py-1 border-b-2 transition-colors
                ${pathname === href
                  ? "border-sage text-sage"
                  : "border-transparent text-ink-muted hover:text-ink"}
              `}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-1 text-ink-muted hover:text-ink transition-colors"
          aria-label="Menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-parchment-dark bg-parchment/95 backdrop-blur-sm">
          <nav className="max-w-2xl mx-auto px-4 py-2 flex flex-col">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`
                  font-serif text-sm tracking-widest uppercase py-3 border-b border-parchment-dark last:border-0 transition-colors
                  ${pathname === href ? "text-sage" : "text-ink-muted"}
                `}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
