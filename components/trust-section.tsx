'use client';

import {
  CreditCard,
  HardDrive,
  Key,
  Lock,
  Shield,
  Users,
  Wallet,
  Zap,
} from 'lucide-react';

export function TrustSection() {
  const wallets = [
    { name: 'MetaMask', icon: Wallet },
    { name: 'Trust Wallet', icon: Lock },
    { name: 'Phantom', icon: Key },
    { name: 'Ledger', icon: HardDrive },
    { name: 'Coinbase', icon: CreditCard },
    { name: 'Rainbow', icon: Zap },
    { name: 'Safe', icon: Shield },
    { name: 'Zerion', icon: Zap },
  ];

  return (
    <section id='trust' className='relative py-20 md:py-32 overflow-hidden'>
      {/* Decorative background */}
      <div className='absolute inset-0 -z-10 overflow-hidden'>
        <div className='absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl'></div>
        <div className='absolute bottom-0 left-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl'></div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section header */}
        <div className='text-center space-y-8 mb-20'>
          <div className='space-y-4'>
            <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance text-foreground'>
              A growing ecosystem of{' '}
              <span className='bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent'>
                trusted crypto wallets
              </span>
            </h2>
          </div>

          <div className='space-y-4 max-w-2xl mx-auto'>
            <p className='text-lg text-muted-foreground leading-relaxed flex items-start gap-3'>
              <Users className='w-5 h-5 text-primary flex-shrink-0 mt-1' />
              Millions of users rely on secure and well-established wallets to
              manage assets and interact across multiple blockchains.
            </p>
            <p className='text-lg text-muted-foreground leading-relaxed'>
              WalletWise supports a wide range of wallets and networks using
              secure, read-only connections.
            </p>
          </div>
        </div>

        {/* Wallet grid */}
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-16'>
          {wallets.map((wallet, i) => {
            const IconComponent = wallet.icon;
            return (
              <div
                key={wallet.name}
                className='group relative p-4 rounded-xl border border-border bg-card/50 hover:border-primary/50 hover:bg-card/80 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-2'
                style={{
                  animation: `fadeInUp 0.5s ease-out ${i * 0.08}s both`,
                }}
              >
                <IconComponent className='w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300' />
                <span className='text-xs font-medium text-center text-muted-foreground group-hover:text-foreground transition-colors'>
                  {wallet.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Trust statement card */}
        <div className='relative rounded-2xl border border-border bg-card overflow-hidden'>
          {/* Gradient border effect */}
          <div className='absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 pointer-events-none'></div>

          <div className='relative p-8 md:p-12 text-center space-y-6'>
            <div className='flex justify-center'>
              <Lock className='w-12 h-12 text-primary' />
            </div>
            <div>
              <p className='text-sm uppercase tracking-widest text-primary mb-3 font-semibold'>
                Security First
              </p>
              <p className='text-xl md:text-2xl text-foreground font-semibold mb-3 max-w-2xl mx-auto'>
                Your assets, your control
              </p>
              <p className='text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed'>
                WalletWise uses{' '}
                <span className='text-foreground font-semibold'>
                  read-only wallet connections
                </span>{' '}
                and{' '}
                <span className='text-foreground font-semibold'>
                  never stores private keys
                </span>
                . Your security is our priority.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
