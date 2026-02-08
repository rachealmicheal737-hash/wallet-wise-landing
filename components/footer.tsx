'use client';

import { Github, MessageCircle, Twitter } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='relative border-t border-border mt-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16'>
        <div className='grid md:grid-cols-4 gap-12 mb-12'>
          {/* Brand */}
          <div className='space-y-4'>
            <Link
              href='/'
              className='flex items-center gap-3 hover:opacity-90 transition-opacity'
            >
              <div className='w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center'>
                <span className='text-white font-bold text-base'>W</span>
              </div>
              <span className='font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent'>
                WalletWise
              </span>
            </Link>
            <p className='text-sm text-muted-foreground leading-relaxed max-w-sm'>
              A pre-launch platform focused on wallet compatibility, access, and
              readiness across Web3 networks.
            </p>
          </div>

          {/* Product Links */}
          <div className='space-y-4'>
            <h3 className='font-semibold text-sm text-foreground uppercase tracking-wider'>
              Product
            </h3>
            <ul className='space-y-3 text-sm'>
              <li>
                <a
                  href='#trust'
                  className='text-muted-foreground hover:text-foreground transition-colors duration-300'
                >
                  Ecosystem
                </a>
              </li>
              <li>
                <a
                  href='#intent'
                  className='text-muted-foreground hover:text-foreground transition-colors duration-300'
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-muted-foreground hover:text-foreground transition-colors duration-300'
                >
                  Roadmap
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className='space-y-4'>
            <h3 className='font-semibold text-sm text-foreground uppercase tracking-wider'>
              Company
            </h3>
            <ul className='space-y-3 text-sm'>
              <li>
                <a
                  href='#'
                  className='text-muted-foreground hover:text-foreground transition-colors duration-300'
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-muted-foreground hover:text-foreground transition-colors duration-300'
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-muted-foreground hover:text-foreground transition-colors duration-300'
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className='space-y-4'>
            <h3 className='font-semibold text-sm text-foreground uppercase tracking-wider'>
              Legal
            </h3>
            <ul className='space-y-3 text-sm'>
              <li>
                <a
                  href='#'
                  className='text-muted-foreground hover:text-foreground transition-colors duration-300'
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-muted-foreground hover:text-foreground transition-colors duration-300'
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-muted-foreground hover:text-foreground transition-colors duration-300'
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className='border-t border-border my-8'></div>

        {/* Bottom bar */}
        <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
          <p className='text-xs text-muted-foreground text-center md:text-left'>
            © {currentYear} WalletWise. All rights reserved. Wallet connections
            are used only to determine compatibility and provide updates.
          </p>
          <div className='flex items-center gap-6'>
            <a
              href='#'
              className='text-muted-foreground hover:text-primary transition-colors duration-300'
              aria-label='Twitter'
            >
              <Twitter className='w-5 h-5' />
            </a>
            <a
              href='#'
              className='text-muted-foreground hover:text-primary transition-colors duration-300'
              aria-label='Discord'
            >
              <MessageCircle className='w-5 h-5' />
            </a>
            <a
              href='#'
              className='text-muted-foreground hover:text-primary transition-colors duration-300'
              aria-label='GitHub'
            >
              <Github className='w-5 h-5' />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
