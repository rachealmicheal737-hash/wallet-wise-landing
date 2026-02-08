'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-xl border-b border-border shadow-sm'
          : 'bg-background'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <div className="w-10 h-10 bg-gradient-to-br from-primary via-primary to-accent rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-base">W</span>
          </div>
          <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent hidden sm:inline">
            WalletWise
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-12">
          <a
            href="#ecosystem"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            Ecosystem
          </a>
          <a
            href="#intent"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            Features
          </a>
          <a
            href="#trust"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            Security
          </a>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="text-foreground hover:bg-secondary/20"
          >
            Learn More
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90 text-white font-semibold">
            Get Started
          </Button>
        </div>
      </nav>
    </header>
  )
}
