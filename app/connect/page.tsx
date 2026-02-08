'use client';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { WalletIcon } from '@/components/wallet-icons';
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  CheckCircle,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const popularWallets = [
  'MetaMask',
  'Trust Wallet',
  'Phantom',
  'Ledger',
  'Coinbase Wallet',
  'Rainbow',
];

const otherWallets = [
  'Xaman Wallet',
  'Safe',
  'Uniswap Wallet',
  'Zerion',
  'imToken',
  'Argent',
  'Spot',
  'Atomic Wallet',
  'Joey Wallet',
  'Solflare',
  'Zengo Wallet',
  'Exodus',
  'AlphaWallet',
  'MEW Wallet',
  'Tangem',
  'Trezor',
];

export default function ConnectPage() {
  const router = useRouter();
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
  const [connectionFailed, setConnectionFailed] = useState(false);

  const handleConnect = (walletName: string) => {
    setConnectedWallet(walletName);
    setConnectionFailed(false);
  };

  useEffect(() => {
    if (connectedWallet && !connectionFailed) {
      const timer = setTimeout(() => {
        setConnectionFailed(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [connectedWallet, connectionFailed]);

  const handleConnectManually = () => {
    setConnectedWallet(null);
    setConnectionFailed(false);
  };

  return (
    <main className='min-h-screen bg-background text-foreground'>
      <Header />

      <section className='relative pt-16 pb-20 md:pt-20 md:pb-32 overflow-hidden'>
        {/* Decorative backgrounds */}
        <div className='absolute inset-0 -z-10 overflow-hidden'>
          <div className='absolute top-32 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl'></div>
          <div className='absolute bottom-32 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl'></div>
        </div>

        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* Back button */}
          <Link
            href='/'
            className='inline-flex items-center gap-2 text-primary hover:text-primary/90 mb-12 transition-colors'
          >
            <ArrowLeft className='w-5 h-5' />
            <span className='font-medium'>Back to Explorer</span>
          </Link>

          {/* Page header */}
          <div className='space-y-6 mb-16'>
            <div className='space-y-3'>
              <h1 className='text-5xl md:text-6xl font-bold text-foreground'>
                Connect a Wallet
              </h1>
              <p className='text-xl text-muted-foreground max-w-2xl'>
                Choose a wallet below to continue. Wallet connections are secure
                and used only to determine compatibility and access.
              </p>
            </div>

            {/* Security notice */}
            <div className='flex items-start gap-3 p-4 rounded-lg bg-primary/10 border border-primary/20'>
              <AlertCircle className='w-5 h-5 text-primary flex-shrink-0 mt-0.5' />
              <p className='text-sm text-foreground'>
                <span className='font-semibold'>Security First:</span>{' '}
                WalletWise uses read-only wallet connections and never stores
                private keys.
              </p>
            </div>
          </div>

          {/* Popular Wallets */}
          <div className='mb-20'>
            <div className='flex items-center gap-2 mb-8'>
              <Zap className='w-6 h-6 text-primary' />
              <h2 className='text-2xl font-bold text-foreground'>
                Popular Wallets
              </h2>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
              {popularWallets.map((walletName, i) => (
                <button
                  key={walletName}
                  onClick={() => handleConnect(walletName)}
                  className='group relative p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 flex flex-col items-center justify-center gap-3 cursor-pointer'
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${i * 0.05}s both`,
                  }}
                >
                  <div className='w-10 h-10 group-hover:scale-110 transition-transform duration-300'>
                    <WalletIcon name={walletName} className='w-full h-full' />
                  </div>
                  <span className='text-sm font-semibold text-center text-foreground'>
                    {walletName}
                  </span>
                  <div className='absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-primary/10 to-accent/10 pointer-events-none'></div>
                </button>
              ))}
            </div>
          </div>

          {/* Other Wallets */}
          <div className='mb-12'>
            <h2 className='text-2xl font-bold text-foreground mb-8'>
              Other Wallets
            </h2>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3'>
              {otherWallets.map((walletName, i) => (
                <button
                  key={walletName}
                  onClick={() => handleConnect(walletName)}
                  className='group p-4 rounded-lg border border-border bg-card/50 hover:border-primary/50 hover:bg-card transition-all duration-300 flex flex-col items-center justify-center gap-2 cursor-pointer'
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${
                      (i + popularWallets.length) * 0.02
                    }s both`,
                  }}
                >
                  <div className='w-8 h-8 group-hover:scale-105 transition-transform duration-300'>
                    <WalletIcon name={walletName} className='w-full h-full' />
                  </div>
                  <span className='text-xs font-medium text-center text-muted-foreground group-hover:text-foreground transition-colors'>
                    {walletName}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Safety note */}
          <div className='max-w-2xl mx-auto text-center py-8 border-t border-border'>
            <p className='text-xs uppercase tracking-wider text-primary font-semibold mb-2'>
              Safety Note
            </p>
            <p className='text-sm text-muted-foreground'>
              WalletWise does not request private keys or initiate transactions.
              All connections are read-only and used solely for compatibility
              checks.
            </p>
          </div>

          {/* Connection status indicator */}
          {connectedWallet && (
            <div className='fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/20'>
              {!connectionFailed ? (
                <div className='bg-card border border-border rounded-2xl p-8 max-w-sm mx-4 text-center space-y-4 shadow-2xl animate-scale-in'>
                  <div className='flex justify-center mb-4'>
                    <div className='relative w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center'>
                      <CheckCircle className='w-8 h-8 text-primary' />

                      <div className='absolute inset-0 rounded-full border-2 border-primary animate-spin'></div>
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <p className='font-semibold text-lg text-foreground flex items-center justify-center gap-2'>
                      <AlertCircle className='w-5 h-5' />
                      Initializing Connection...
                    </p>
                    <p className='text-sm text-muted-foreground'>
                      Setting up {connectedWallet}
                    </p>
                  </div>
                  <div className='flex justify-center gap-1 pt-4'>
                    <div
                      className='w-2 h-2 bg-primary rounded-full animate-bounce'
                      style={{ animationDelay: '0s' }}
                    ></div>
                    <div
                      className='w-2 h-2 bg-primary rounded-full animate-bounce'
                      style={{ animationDelay: '0.2s' }}
                    ></div>
                    <div
                      className='w-2 h-2 bg-primary rounded-full animate-bounce'
                      style={{ animationDelay: '0.4s' }}
                    ></div>
                  </div>
                </div>
              ) : (
                <div className='bg-card border border-border rounded-2xl p-8 max-w-sm mx-4 text-center space-y-6 shadow-2xl animate-scale-in'>
                  <div className='flex justify-center'>
                    <div className='w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center'>
                      <AlertTriangle className='w-8 h-8 text-red-500' />
                    </div>
                  </div>
                  <div className='space-y-3'>
                    <p className='font-semibold text-lg text-foreground'>
                      Unable to establish secure connection
                    </p>
                    <p className='text-sm text-muted-foreground'>
                      We couldn't connect to {connectedWallet}. Please try
                      connecting manually or select a different wallet.
                    </p>
                  </div>
                  <div className='flex gap-3'>
                    <Button
                      variant='outline'
                      onClick={handleConnectManually}
                      className='flex-1 bg-transparent'
                    >
                      Try Another
                    </Button>
                    <Button
                      onClick={() =>
                        router.push(
                          `/connect/secure-connection?wallet=${encodeURIComponent(
                            connectedWallet
                          )}`
                        )
                      }
                      className='flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold'
                    >
                      Connect Manually
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
