'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  connectMetaMask,
  decodeSignedTransaction,
  generateEphemeralWallet,
  requestMetaMaskSignMessage,
  signTransactionDemo,
} from '@/lib/wallet-demo';
import { AlertTriangle, CheckCircle2, Copy, Zap } from 'lucide-react';
import { useState } from 'react';

export default function EduWalletDemoPage() {
  const [activeTab, setActiveTab] = useState('ephemeral');
  const [copied, setCopied] = useState(false);

  // Ephemeral wallet state
  const [ephemeralWallet, setEphemeralWallet] = useState<any>(null);
  const [toAddress, setToAddress] = useState(
    '0x742d35Cc6634C0532925a3b844Bc9e7595f42e12'
  );
  const [valueEth, setValueEth] = useState('0.01');
  const [signedTxData, setSignedTxData] = useState<any>(null);
  const [loadingEphemeral, setLoadingEphemeral] = useState(false);

  // MetaMask state
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null);
  const [metaMaskMessage, setMetaMaskMessage] = useState('Hello, blockchain!');
  const [metaMaskSignature, setMetaMaskSignature] = useState<string | null>(
    null
  );
  const [loadingMeta, setLoadingMeta] = useState(false);
  const [statusMeta, setStatusMeta] = useState('');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // === EPHEMERAL WALLET DEMO ===
  const handleGenerateWallet = () => {
    setLoadingEphemeral(true);
    try {
      const wallet = generateEphemeralWallet();
      setEphemeralWallet(wallet);
      setSignedTxData(null);
    } finally {
      setLoadingEphemeral(false);
    }
  };

  const handleSignTransaction = async () => {
    if (!ephemeralWallet) return;
    setLoadingEphemeral(true);
    try {
      const result = await signTransactionDemo(
        ephemeralWallet.privateKey,
        toAddress,
        valueEth
      );
      setSignedTxData(result);
    } catch (err) {
      alert('Error signing transaction: ' + (err as any).message);
    } finally {
      setLoadingEphemeral(false);
    }
  };

  // === METAMASK DEMO ===
  const handleConnectMetaMask = async () => {
    setLoadingMeta(true);
    setStatusMeta('Connecting...');
    try {
      const address = await connectMetaMask();
      setConnectedAddress(address);
      setStatusMeta('✓ Connected!');
    } catch (err) {
      setStatusMeta('✗ ' + (err as any).message);
    } finally {
      setLoadingMeta(false);
    }
  };

  const handleSignMessage = async () => {
    if (!connectedAddress) {
      setStatusMeta('✗ Connect MetaMask first');
      return;
    }
    setLoadingMeta(true);
    setStatusMeta('Requesting signature...');
    try {
      const sig = await requestMetaMaskSignMessage(
        connectedAddress,
        metaMaskMessage
      );
      setMetaMaskSignature(sig);
      setStatusMeta('✓ Message signed!');
    } catch (err) {
      setStatusMeta('✗ ' + (err as any).message);
    } finally {
      setLoadingMeta(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 p-8'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-4xl font-bold text-white mb-2'>
            🔐 Educational Wallet Demo
          </h1>
          <p className='text-slate-400'>
            Learn how blockchain wallets and transactions work—safely and
            locally
          </p>
        </div>

        {/* ⚠️ WARNING BANNER */}
        <Alert className='mb-8 border-orange-500 bg-orange-50 dark:bg-orange-950'>
          <AlertTriangle className='h-5 w-5 text-orange-600' />
          <AlertDescription className='text-orange-800 dark:text-orange-200'>
            <strong>Educational Purpose Only:</strong> These demos use testnet
            or in-browser ephemeral wallets. Never paste real seed phrases or
            private keys into any website. Real wallet integrations (MetaMask)
            keep your keys secure by signing locally.
          </AlertDescription>
        </Alert>

        {/* TABS */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='ephemeral'>
              📝 Ephemeral Wallet (Local Signing)
            </TabsTrigger>
            <TabsTrigger value='metamask'>
              🦊 MetaMask Integration (Safe)
            </TabsTrigger>
          </TabsList>

          {/* === TAB 1: EPHEMERAL WALLET === */}
          <TabsContent value='ephemeral' className='space-y-6'>
            <Card className='bg-slate-800 border-slate-700 p-6'>
              <div className='space-y-4'>
                <div>
                  <h3 className='text-lg font-semibold text-white mb-2'>
                    Step 1: Generate a Temporary Wallet
                  </h3>
                  <p className='text-slate-300 mb-4'>
                    Creates a new random wallet in your browser. This is
                    <strong> ephemeral</strong>—it exists only in memory and
                    disappears when you refresh.
                  </p>
                  <Button
                    onClick={handleGenerateWallet}
                    disabled={loadingEphemeral}
                    className='bg-blue-600 hover:bg-blue-700'
                  >
                    {loadingEphemeral ? 'Generating...' : '➕ Generate Wallet'}
                  </Button>
                </div>

                {ephemeralWallet && (
                  <div className='bg-slate-900 p-4 rounded border border-slate-700 space-y-3'>
                    <div>
                      <Label className='text-slate-300'>Address (Public)</Label>
                      <div className='flex gap-2 items-center mt-1'>
                        <code className='text-xs bg-slate-950 p-2 rounded flex-1 text-green-400 overflow-auto'>
                          {ephemeralWallet.address}
                        </code>
                        <Button
                          size='sm'
                          variant='ghost'
                          onClick={() =>
                            copyToClipboard(ephemeralWallet.address)
                          }
                        >
                          {copied ? (
                            <CheckCircle2 className='w-4 h-4 text-green-500' />
                          ) : (
                            <Copy className='w-4 h-4' />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label className='text-slate-300'>
                        Private Key (⚠️ DEMO ONLY)
                      </Label>
                      <code className='text-xs bg-slate-950 p-2 rounded block text-red-400 overflow-auto mt-1'>
                        {ephemeralWallet.privateKey}
                      </code>
                      <p className='text-xs text-red-400 mt-2'>
                        🚨 Never share this. In real wallets, this stays
                        encrypted on your device.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Step 2: Sign Transaction */}
            {ephemeralWallet && (
              <Card className='bg-slate-800 border-slate-700 p-6'>
                <div className='space-y-4'>
                  <div>
                    <h3 className='text-lg font-semibold text-white mb-2'>
                      Step 2: Construct & Sign a Transaction
                    </h3>
                    <p className='text-slate-300 mb-4'>
                      This demonstrates how wallets sign transactions. The
                      private key proves ownership, the signature proves
                      authorization.
                    </p>
                  </div>

                  <div className='grid gap-4'>
                    <div>
                      <Label htmlFor='to-address' className='text-slate-300'>
                        Send to Address:
                      </Label>
                      <Input
                        id='to-address'
                        value={toAddress}
                        onChange={(e) => setToAddress(e.target.value)}
                        className='bg-slate-900 border-slate-600 text-white mt-1'
                        placeholder='0x...'
                      />
                    </div>
                    <div>
                      <Label htmlFor='value-eth' className='text-slate-300'>
                        Amount (ETH):
                      </Label>
                      <Input
                        id='value-eth'
                        type='number'
                        value={valueEth}
                        onChange={(e) => setValueEth(e.target.value)}
                        className='bg-slate-900 border-slate-600 text-white mt-1'
                        step='0.001'
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleSignTransaction}
                    disabled={loadingEphemeral}
                    className='bg-purple-600 hover:bg-purple-700 w-full'
                  >
                    {loadingEphemeral ? 'Signing...' : '🔏 Sign Transaction'}
                  </Button>
                </div>
              </Card>
            )}

            {/* Step 3: Show Signed TX */}
            {signedTxData && (
              <Card className='bg-slate-800 border-slate-700 p-6'>
                <div className='space-y-4'>
                  <h3 className='text-lg font-semibold text-white'>
                    Step 3: Signed Transaction
                  </h3>
                  <p className='text-slate-300'>
                    This is a real signed transaction object. In production,
                    this would be sent to the blockchain network.
                  </p>

                  <div className='bg-slate-900 p-4 rounded border border-slate-700'>
                    <Label className='text-slate-300 text-sm'>
                      Raw Signed TX:
                    </Label>
                    <code className='text-xs bg-slate-950 p-2 rounded block text-green-400 overflow-auto mt-2 break-all'>
                      {signedTxData.signedTransaction}
                    </code>
                  </div>

                  <details className='bg-slate-900 p-4 rounded border border-slate-700'>
                    <summary className='text-slate-300 cursor-pointer font-medium'>
                      📋 Decoded Transaction Details
                    </summary>
                    <div className='mt-3 space-y-2 text-sm'>
                      {(() => {
                        const decoded = decodeSignedTransaction(
                          signedTxData.signedTransaction
                        );
                        return (
                          <>
                            <div>
                              <span className='text-slate-400'>To:</span>
                              <code className='text-green-400 ml-2'>
                                {decoded.to}
                              </code>
                            </div>
                            <div>
                              <span className='text-slate-400'>From:</span>
                              <code className='text-green-400 ml-2'>
                                {decoded.from}
                              </code>
                            </div>
                            <div>
                              <span className='text-slate-400'>
                                Value (ETH):
                              </span>
                              <code className='text-green-400 ml-2'>
                                {decoded.value}
                              </code>
                            </div>
                            <div>
                              <span className='text-slate-400'>
                                Gas Price (Gwei):
                              </span>
                              <code className='text-green-400 ml-2'>
                                {decoded.gasPrice}
                              </code>
                            </div>
                            <div>
                              <span className='text-slate-400'>Nonce:</span>
                              <code className='text-green-400 ml-2'>
                                {decoded.nonce}
                              </code>
                            </div>
                            <div>
                              <span className='text-slate-400'>Chain ID:</span>
                              <code className='text-green-400 ml-2'>
                                {decoded.chainId}
                              </code>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </details>

                  <Alert className='border-blue-500 bg-blue-50 dark:bg-blue-950'>
                    <Zap className='h-5 w-5 text-blue-600' />
                    <AlertDescription className='text-blue-800 dark:text-blue-200 text-sm'>
                      In a real scenario, this signed transaction would be
                      broadcast to the network. No private key was ever sent
                      over the internet—it stayed on your device and only signed
                      locally.
                    </AlertDescription>
                  </Alert>
                </div>
              </Card>
            )}
          </TabsContent>

          {/* === TAB 2: METAMASK === */}
          <TabsContent value='metamask' className='space-y-6'>
            <Card className='bg-slate-800 border-slate-700 p-6'>
              <div className='space-y-4'>
                <div>
                  <h3 className='text-lg font-semibold text-white mb-2'>
                    Safe Integration: MetaMask
                  </h3>
                  <p className='text-slate-300 mb-4'>
                    MetaMask (and other wallet extensions) keep your private
                    keys safe. This demo shows how a dApp requests signatures
                    from your wallet—your keys never leave your computer.
                  </p>
                </div>

                <div>
                  <Button
                    onClick={handleConnectMetaMask}
                    disabled={loadingMeta || !!connectedAddress}
                    className='bg-orange-500 hover:bg-orange-600'
                  >
                    {loadingMeta
                      ? 'Connecting...'
                      : connectedAddress
                      ? '✓ Connected'
                      : '🦊 Connect MetaMask'}
                  </Button>

                  {statusMeta && (
                    <p className='text-sm mt-3 text-slate-300'>{statusMeta}</p>
                  )}

                  {connectedAddress && (
                    <div className='bg-slate-900 p-4 rounded border border-slate-700 mt-4'>
                      <Label className='text-slate-300'>
                        Connected Address
                      </Label>
                      <code className='text-sm bg-slate-950 p-2 rounded block text-green-400 mt-2 overflow-auto'>
                        {connectedAddress}
                      </code>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {connectedAddress && (
              <Card className='bg-slate-800 border-slate-700 p-6'>
                <div className='space-y-4'>
                  <h3 className='text-lg font-semibold text-white'>
                    Request a Signature
                  </h3>
                  <p className='text-slate-300 mb-4'>
                    Sign a message with MetaMask. A popup will appear for you to
                    review and confirm. Your private key stays in MetaMask.
                  </p>

                  <div>
                    <Label htmlFor='message' className='text-slate-300'>
                      Message to Sign:
                    </Label>
                    <Input
                      id='message'
                      value={metaMaskMessage}
                      onChange={(e) => setMetaMaskMessage(e.target.value)}
                      className='bg-slate-900 border-slate-600 text-white mt-1'
                      placeholder='Enter a message...'
                    />
                  </div>

                  <Button
                    onClick={handleSignMessage}
                    disabled={loadingMeta}
                    className='bg-purple-600 hover:bg-purple-700 w-full'
                  >
                    {loadingMeta ? 'Requesting...' : '✍️ Sign with MetaMask'}
                  </Button>

                  {metaMaskSignature && (
                    <div className='bg-slate-900 p-4 rounded border border-slate-700'>
                      <Label className='text-slate-300'>Signature:</Label>
                      <code className='text-xs bg-slate-950 p-2 rounded block text-green-400 overflow-auto mt-2 break-all'>
                        {metaMaskSignature}
                      </code>
                      <p className='text-xs text-slate-400 mt-3'>
                        This signature proves you own the address—it's a
                        cryptographic proof without revealing your private key.
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            )}

            <Alert className='border-green-500 bg-green-50 dark:bg-green-950'>
              <CheckCircle2 className='h-5 w-5 text-green-600' />
              <AlertDescription className='text-green-800 dark:text-green-200 text-sm'>
                <strong>Why MetaMask is Safe:</strong> Your private key never
                leaves your computer. MetaMask handles signing locally and only
                sends back the signature. The dApp never sees your keys.
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>

        {/* FOOTER */}
        <div className='mt-12 p-6 bg-slate-800 rounded border border-slate-700'>
          <h4 className='font-semibold text-white mb-3'>
            📚 What You Learned:
          </h4>
          <ul className='space-y-2 text-slate-300 text-sm'>
            <li>
              ✅ <strong>Public vs. Private Keys:</strong> Your address is
              public; your private key signs transactions and must stay secret.
            </li>
            <li>
              ✅ <strong>Local Signing:</strong> Wallets sign transactions
              locally, not on a server. Only the signature is sent.
            </li>
            <li>
              ✅ <strong>Transaction Structure:</strong> Transactions include
              to, from, value, gas, and nonce fields.
            </li>
            <li>
              ✅ <strong>Safe Integration:</strong> Real dApps use MetaMask to
              request signatures—they never handle private keys.
            </li>
            <li>
              ✅ <strong>Never paste seeds/keys:</strong> Websites that ask for
              seed phrases or private keys are malicious.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
