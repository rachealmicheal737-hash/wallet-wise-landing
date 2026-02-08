'use client';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, CheckCircle2, Lock, Zap } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const walletName = searchParams.get('wallet') || 'Your Wallet';
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNotifyMe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail('');
    }, 3000);
  };

  return (
    <main className='min-h-screen bg-background text-foreground flex flex-col'>
      <Header />

      <section className='flex-1 flex items-center py-12 md:py-20 relative overflow-hidden'>
        {/* Decorative backgrounds */}
        <div className='absolute inset-0 -z-10 overflow-hidden'>
          <div className='absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl'></div>
          <div className='absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl'></div>
        </div>

        <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>
          {/* Success animation container */}
          <div className='space-y-12'>
            {/* Success checkmark */}
            <div className='flex justify-center'>
              <div className='relative w-24 h-24 md:w-32 md:h-32 animate-scale-in'>
                <div className='absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full opacity-20 animate-pulse'></div>
                <div className='absolute inset-2 rounded-full flex items-center justify-center bg-card border-2 border-primary shadow-2xl'>
                  <CheckCircle2 className='w-12 h-12 md:w-16 md:h-16 text-primary' />
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className='text-center space-y-6'>
              <h1 className='text-4xl md:text-6xl font-bold leading-tight text-balance'>
                You{"'"}re{' '}
                <span className='bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent'>
                  Early
                </span>
              </h1>

              <div className='space-y-4 max-w-2xl mx-auto'>
                <p className='text-xl md:text-2xl text-muted-foreground leading-relaxed'>
                  Your wallet has been successfully synchronized.
                </p>
                <p className='text-lg text-foreground font-medium'>
                  <span className='bg-primary/10 border border-primary/20 px-3 py-1 rounded-full inline-block'>
                    {walletName}
                  </span>{' '}
                  is now ready for upcoming WalletWise features.
                </p>
              </div>
            </div>

            {/* Email subscription section */}
            <div className='max-w-md mx-auto w-full'>
              <div className='rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-8 space-y-6 shadow-xl'>
                <div className='space-y-2'>
                  <div className='flex items-center justify-center mb-3'>
                    <Bell className='w-6 h-6 text-primary' />
                  </div>
                  <h2 className='text-2xl font-bold text-foreground'>
                    Stay Updated
                  </h2>
                  <p className='text-sm text-muted-foreground leading-relaxed'>
                    Get notified when new networks, access options, or features
                    go live.
                  </p>
                </div>

                <form onSubmit={handleNotifyMe} className='space-y-3'>
                  <Input
                    type='email'
                    placeholder='your@email.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className='h-11'
                  />
                  <Button
                    type='submit'
                    className='w-full h-11 bg-primary hover:bg-primary/90 text-white font-semibold'
                    disabled={isSubscribed}
                  >
                    {isSubscribed ? 'Notified!' : 'Notify Me'}
                  </Button>
                </form>

                {isSubscribed && (
                  <div className='bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center text-sm text-foreground font-medium animate-scale-in'>
                    Thanks! We{"'"}ll keep you posted.
                  </div>
                )}
              </div>
            </div>

            {/* Info cards */}
            <div className='grid md:grid-cols-3 gap-4 mt-12'>
              {[
                {
                  title: 'Network Ready',
                  description:
                    'Your wallet supports multiple blockchain networks.',
                  icon: <Zap className='w-6 h-6 text-primary' />,
                },
                {
                  title: 'Security Verified',
                  description: 'Read-only connection, no private key access.',
                  icon: <Lock className='w-6 h-6 text-primary' />,
                },
                {
                  title: 'Always Updated',
                  description: 'Real-time notifications for new features.',
                  icon: <Bell className='w-6 h-6 text-primary' />,
                },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className='rounded-xl border border-border bg-card/50 p-6 space-y-3 text-center hover:border-primary/30 transition-colors'
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${i * 0.1}s both`,
                  }}
                >
                  <div className='flex justify-center'>{item.icon}</div>
                  <h3 className='font-semibold text-foreground'>
                    {item.title}
                  </h3>
                  <p className='text-sm text-muted-foreground'>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className='flex flex-col sm:flex-row gap-4 justify-center pt-8'>
              <Link href='/' className='w-full sm:w-auto'>
                <Button variant='outline' className='w-full bg-transparent'>
                  Back to Home
                </Button>
              </Link>
              <Link href='/connect' className='w-full sm:w-auto'>
                <Button className='w-full bg-primary hover:bg-primary/90 text-white font-semibold'>
                  Connect Another Wallet
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
