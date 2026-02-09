'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Zap } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className='relative pt-20 pb-32 overflow-hidden'>
      {/* Decorative background elements */}
      <div className='absolute inset-0 -z-10 overflow-hidden'>
        <div className='absolute top-20 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl'></div>
        <div className='absolute -bottom-32 -left-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl'></div>
        <div className='absolute top-1/2 right-1/4 w-72 h-72 bg-secondary/5 rounded-full blur-3xl'></div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>
        {/* Announcement badge */}
        <div className='flex justify-center mb-12'>
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 hover:border-primary/40 transition-colors'>
            <Zap className='w-4 h-4 text-primary' />
            <span className='text-sm font-medium text-primary'>
              Multi-chain ready
            </span>
          </div>
        </div>

        <div className='grid lg:grid-cols-2 gap-16 items-center'>
          {/* Left content */}
          <div className='space-y-8'>
            <div className='space-y-6'>
              <h1 className='text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-balance text-foreground'>
                Connect with the world{"'"}s most popular crypto{' '}
                <span className='bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent'>
                  wallets
                </span>
              </h1>

              <p className='text-xl text-muted-foreground leading-relaxed max-w-xl'>
                Securely connect your wallet to preview supported networks and
                stay prepared for upcoming WalletWise features.
              </p>

              <p className='text-base text-muted-foreground flex items-start gap-3'>
                <Shield className='w-5 h-5 text-primary flex-shrink-0 mt-0.5' />
                Built on WalletConnect-compatible integrations across major
                blockchain ecosystems.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className='flex flex-col sm:flex-row gap-4 pt-6'>
              <Link href='/connect' className='w-full sm:w-auto'>
                <Button
                  size='lg'
                  className='w-full bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all'
                >
                  Synchronize Wallet
                  <ArrowRight className='ml-2 w-5 h-5' />
                </Button>
              </Link>
              <Link href='/connect' className='w-full sm:w-auto'>
                <Button
                  variant='outline'
                  size='lg'
                  className='w-full border-border hover:bg-secondary/10 font-semibold bg-transparent'
                >
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className='grid grid-cols-2 gap-6 pt-8 border-t border-border'>
              <div>
                <div className='text-3xl font-bold text-primary'>50+</div>
                <p className='text-sm text-muted-foreground'>
                  Supported Wallets
                </p>
              </div>
              <div>
                <div className='text-3xl font-bold text-primary'>100%</div>
                <p className='text-sm text-muted-foreground'>
                  Read-Only Access
                </p>
              </div>
            </div>
          </div>

          {/* Right visual element */}
          <div className='relative h-96 hidden lg:block'>
            <div className='absolute inset-0 rounded-2xl overflow-hidden border border-border bg-card/50 backdrop-blur-sm shadow-xl'>
              {/* Gradient border effect */}
              <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-accent/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500'></div>

              {/* Content */}
              <div className='relative h-full flex flex-col items-center justify-center p-8 space-y-6'>
                <div className='text-center space-y-4'>
                  <div className='flex justify-center gap-3 mb-4'>
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className='w-3 h-3 rounded-full bg-gradient-to-r from-primary to-accent'
                        style={{
                          animation: `pulse ${
                            1.5 + i * 0.3
                          }s ease-in-out infinite`,
                        }}
                      ></div>
                    ))}
                  </div>
                  <p className='text-xs font-medium text-primary uppercase tracking-wide'>
                    Network Status
                  </p>
                  <h3 className='text-2xl md:text-3xl font-bold text-foreground'>
                    Multi-Chain Ready
                  </h3>
                  <p className='text-sm text-muted-foreground'>
                    Connected across 10+ networks
                  </p>
                </div>

                {/* Chain badges */}
                <div className='grid grid-cols-3 gap-3 w-full pt-4'>
                  {['Ethereum', 'Polygon', 'BSC'].map((chain) => (
                    <div
                      key={chain}
                      className='px-3 py-2 rounded-lg bg-secondary/30 border border-border text-xs font-medium text-center text-foreground hover:border-primary/50 transition-colors'
                    >
                      {chain}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
