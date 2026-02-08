export const WalletImages: Record<string, string> = {
  MetaMask: '/wallets/metamask-icon.png',
  'Trust Wallet': '/wallets/trust-wallet-icon.png',
  TrustWallet: '/wallets/trust-wallet-icon.png',
  Phantom: '/wallets/phantom.svg',
  Ledger: '/wallets/ledger.webp',
  'Coinbase Wallet': '/wallets/coinbase.png',
  Rainbow: '/wallets/rainbow.webp',
  Safe: '/wallets/safe.png',
  'Uniswap Wallet': '/wallets/uniswap.webp',
  Zerion: '/wallets/zerion.webp',
  imToken: '/wallets/imToken.png',
  Argent: '/wallets/argent.webp',
  Solflare: '/wallets/solflare.png',
  Exodus: '/wallets/exodus.png',
  'Zengo Wallet': '/wallets/zengo.png',
  Trezor: '/wallets/trezor.png',
  Tangem: '/wallets/tangem.webp',
  'MEW Wallet': '/wallets/mew.png',
  AlphaWallet: '/wallets/alphaWallet.webp',
  'Atomic Wallet': '/wallets/atomic.png',
  Spot: '/wallets/spot.png',
  'Joey Wallet': '/wallets/joey.jpg',
  'Xaman Wallet': '/wallets/xaman.webp',
};

type WalletIconProps = {
  name: string;
  className?: string;
};

export function WalletIcon({ name, className = 'w-16 h-16' }: WalletIconProps) {
  const imageSrc = WalletImages[name];

  return (
    <div className={`flex items-center justify-center ${className} `}>
      {imageSrc ? (
        <img
          src={imageSrc || '/placeholder.svg'}
          alt={name}
          className='w-full h-full object-contain rounded-lg'
          loading='lazy'
        />
      ) : (
        <span className='text-sm font-bold text-foreground'>
          {name.charAt(0)}
        </span>
      )}
    </div>
  );
}
