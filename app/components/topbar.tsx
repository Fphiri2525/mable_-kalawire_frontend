'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Our Work', href: '/work' },
  { name: 'Updates', href: '/updates' },
  { name: 'Contact', href: '/contact' },
];

export default function TopBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Check if link is active
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#1a1a5e] z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-24">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="group"
            >
              <div className="flex flex-col items-start">
                <span className="text-2xl md:text-3xl font-bold text-yellow-400 tracking-tight">
                  Mable Orphan Foundation
                </span>
                <span className="text-sm font-medium text-yellow-300 uppercase tracking-wider mt-1">
                  
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`
                  text-sm font-semibold px-2 py-1 transition-all duration-200
                  ${isActive(link.href) 
                    ? 'text-yellow-400 border-b-2 border-yellow-400' 
                    : 'text-white hover:text-yellow-400'
                  }
                `}
              >
                {link.name}
              </Link>
            ))}
            {/* Login Button in Nav */}
            <Link
              href="/login"
              className="bg-yellow-400 hover:bg-yellow-500 text-[#1a1a5e] font-bold py-2 px-6 rounded-full transition-all duration-200 hover:scale-105 ml-4"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white hover:text-yellow-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#1a1a5e] py-6 border-t border-blue-900">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`
                    text-lg font-medium py-3 px-6 rounded-lg transition-colors
                    ${isActive(link.href) 
                      ? 'text-yellow-400 bg-blue-900/70' 
                      : 'text-white hover:text-yellow-400 hover:bg-blue-900/50'
                    }
                  `}
                >
                  {link.name}
                </Link>
              ))}
              {/* Mobile Login Button */}
              <Link
                href="/login"
                className="bg-yellow-400 hover:bg-yellow-500 text-[#1a1a5e] font-bold py-3 px-6 rounded-full text-center mt-4 transition-all duration-200"
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}