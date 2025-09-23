'use client';

import Link from 'next/link';
import { LayoutProps, HeaderProps } from '@/types';

function Header({ title }: HeaderProps) {
  return (
    <header className="bg-background border-b border-foreground/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">
              {title}
            </h1>
          </div>
          
          <nav className="hidden md:block" role="navigation" aria-label="Main navigation">
            <div className="flex items-center space-x-8">
              <Link
                href="/"
                className="text-foreground/80 hover:text-foreground transition-colors duration-200 font-medium"
                aria-label="Word Counter Tool Home"
              >
                Word Counter
              </Link>
              <div className="text-foreground/40 text-sm">
                More tools coming soon
              </div>
            </div>
          </nav>

          <button
            className="md:hidden p-2 rounded-md text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-colors duration-200"
            aria-label="Open mobile menu"
            aria-expanded="false"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header title="Word Counter Tool" />
      
      <main 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        role="main"
        aria-label="Main content"
      >
        {children}
      </main>
      
      <footer 
        className="mt-auto border-t border-foreground/10 bg-background/50"
        role="contentinfo"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-foreground/60 text-sm">
              © 2024 Word Counter Tool. Free online text analysis.
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a
                href="/privacy"
                className="text-foreground/60 hover:text-foreground transition-colors duration-200"
              >
                Privacy
              </a>
              <a
                href="/terms"
                className="text-foreground/60 hover:text-foreground transition-colors duration-200"
              >
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}