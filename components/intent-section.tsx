'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Lock } from 'lucide-react';
import Link from 'next/link';

export function IntentSection() {
  const categories = [
    'Migrate Wallet Data',
    'Swap & Bridge',
    'Claim Access',
    'Airdrop Access',
    'Staking',
    'NFT Preparation',
  ];

  const benefits = [
    'Wallet compatibility checks',
    'No private key requests',
    'Network readiness status',
    'Real-time notifications',
  ];

  return (
    <section id='intent' className='relative py-20 md:py-32 overflow-hidden'>
      {/* Decorative elements */}
      <div className='absolute inset-0 -z-10 overflow-hidden'>
        <div className='absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl'></div>
        <div className='absolute -bottom-40 left-1/3 w-80 h-80 bg-accent/5 rounded-full blur-3xl'></div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid lg:grid-cols-2 gap-16 items-center'>
          {/* Left content */}
          <div className='space-y-8'>
            <div className='space-y-6'>
              <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance text-foreground'>
                <span className='bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent'>
                  Synchronize
                </span>{' '}
                Your Wallet
              </h2>
              <p className='text-xl text-muted-foreground leading-relaxed'>
                Please select a category below to continue. This helps us
                understand your intent and prepare the appropriate wallet
                connection flow.
              </p>
            </div>

            {/* Benefits list */}
            <div className='space-y-4 pt-6 border-t border-border'>
              <p className='text-sm uppercase tracking-widest text-primary font-semibold'>
                What You Get
              </p>
              <ul className='space-y-3'>
                {benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className='flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors'
                  >
                    <CheckCircle className='w-5 h-5 text-primary flex-shrink-0' />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Safety note */}
            <div className='p-4 rounded-lg bg-primary/5 border border-primary/20'>
              <p className='text-sm text-foreground font-medium flex items-start gap-2'>
                <Lock className='w-5 h-5 text-primary flex-shrink-0 mt-0.5' />
                <span>
                  No transactions are initiated. WalletWise never stores private
                  keys or sensitive data.
                </span>
              </p>
            </div>
          </div>

          {/* Right content - Category preview */}
          <div className='relative'>
            <div className='rounded-2xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden shadow-xl'>
              {/* Gradient border effect */}
              <div className='absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none'></div>

              <div className='relative p-8 md:p-10 space-y-6'>
                <div className='space-y-2'>
                  <p className='text-sm font-semibold text-primary uppercase tracking-wider'>
                    Choose Your Path
                  </p>
                  <h3 className='text-2xl md:text-3xl font-bold text-foreground'>
                    Intent Categories
                  </h3>
                </div>

                {/* Category grid */}
                <div className='grid grid-cols-2 gap-3'>
                  {categories.map((category, i) => (
                    <div
                      key={category}
                      className='p-3 rounded-lg border border-border bg-secondary/10 hover:bg-secondary/20 hover:border-primary/50 transition-all duration-300 cursor-pointer group'
                      style={{
                        animation: `fadeInUp 0.5s ease-out ${i * 0.05}s both`,
                      }}
                    >
                      <p className='text-xs md:text-sm font-medium text-foreground group-hover:text-primary transition-colors'>
                        {category}
                      </p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link href='/connect' className='block pt-4'>
                  <Button className='w-full bg-primary hover:bg-primary/90 text-white font-semibold group'>
                    Get Started
                    <ArrowRight className='ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform' />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
