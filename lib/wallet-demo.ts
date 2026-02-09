/**
 * Educational wallet demo utilities
 * Demonstrates how blockchain transactions are signed and constructed
 * WITHOUT ever asking users for private keys or seed phrases
 */

import { ethers } from 'ethers';

/**
 * Demo 1: Ephemeral Wallet (in-browser, testnet only)
 * Generates a temporary wallet for educational purposes
 * Use ONLY on testnet, never for real funds
 */
export function generateEphemeralWallet() {
  const wallet = ethers.Wallet.createRandom();
  return {
    address: wallet.address,
    privateKey: wallet.privateKey, // ONLY for demo; never share this
    mnemonic: wallet.mnemonic?.phrase || 'N/A',
  };
}

/**
 * Sign a transaction locally (educational demo)
 * This shows how wallet signing works without broadcasting
 */
export async function signTransactionDemo(
  privateKey: string,
  toAddress: string,
  valueInEther: string
) {
  const wallet = new ethers.Wallet(privateKey);

  // Construct a transaction object (not yet signed)
  const tx = {
    to: toAddress,
    value: ethers.parseEther(valueInEther), // Convert ETH to Wei
    gasLimit: 21000, // Standard gas for a simple transfer
    gasPrice: ethers.parseUnits('20', 'gwei'), // Example gas price
    nonce: 0, // Would be fetched from chain in real scenario
    chainId: 5, // Goerli testnet
    type: 2, // EIP-1559
  };

  // Sign the transaction (this is what happens locally in your wallet)
  const signedTx = await wallet.signTransaction(tx);

  return {
    originalTx: tx,
    signedTransaction: signedTx, // This can be broadcast to the network
    signer: wallet.address,
  };
}

/**
 * Decode a signed transaction (for learning)
 * Shows what data is packed into a signed tx
 */
export function decodeSignedTransaction(signedTx: string) {
  const parsed = ethers.Transaction.from(signedTx);
  return {
    to: parsed.to,
    value: parsed.value ? ethers.formatEther(parsed.value) : '0',
    from: parsed.from,
    gasLimit: parsed.gasLimit?.toString(),
    gasPrice: parsed.gasPrice
      ? ethers.formatUnits(parsed.gasPrice, 'gwei')
      : 'N/A',
    data: parsed.data,
    chainId: parsed.chainId?.toString(),
    nonce: parsed.nonce,
    hash: parsed.hash,
  };
}

/**
 * Demo 2: Safe MetaMask Integration (recommended for real dApps)
 * This is how real wallet connections work—user signs in their wallet
 * We never see the private key or seed phrase
 */
export async function connectMetaMask() {
  if (typeof window === 'undefined') {
    return null;
  }

  if (!(window as any).ethereum) {
    throw new Error('MetaMask not found. Please install MetaMask.');
  }

  try {
    const accounts = await (window as any).ethereum.request({
      method: 'eth_requestAccounts',
    });
    return accounts[0];
  } catch (error) {
    throw new Error('User denied MetaMask connection');
  }
}

/**
 * Request MetaMask to sign a message (educational)
 * The wallet UI prompts the user; we never handle the private key
 */
export async function requestMetaMaskSignMessage(
  address: string,
  message: string
) {
  if (typeof window === 'undefined') {
    return null;
  }

  if (!(window as any).ethereum) {
    throw new Error('MetaMask not found');
  }

  try {
    const signature = await (window as any).ethereum.request({
      method: 'personal_sign',
      params: [ethers.toUtf8Bytes(message), address],
    });
    return signature;
  } catch (error) {
    throw new Error('User rejected signing');
  }
}

/**
 * Request MetaMask to send a transaction (educational)
 * The wallet UI prompts the user to review and confirm
 * We never touch the private key
 */
export async function requestMetaMaskSendTransaction(
  to: string,
  valueInEther: string
) {
  if (typeof window === 'undefined') {
    return null;
  }

  if (!(window as any).ethereum) {
    throw new Error('MetaMask not found');
  }

  try {
    const from = await connectMetaMask();
    const tx = await (window as any).ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from,
          to,
          value: ethers.toBeHex(ethers.parseEther(valueInEther)),
        },
      ],
    });
    return tx; // Transaction hash
  } catch (error) {
    throw new Error('User rejected transaction or error occurred');
  }
}

/**
 * Fetch balance via ethers (read-only, safe)
 * Demonstrates how to query blockchain without signing
 */
export async function getBalanceDemo(address: string) {
  try {
    // Connect to Goerli testnet (public RPC, read-only)
    const provider = new ethers.JsonRpcProvider(
      'https://goerli.infura.io/v3/your-infura-key'
    );
    const balance = await provider.getBalance(address);
    return ethers.formatEther(balance);
  } catch {
    return '0';
  }
}

export default {
  generateEphemeralWallet,
  signTransactionDemo,
  decodeSignedTransaction,
  connectMetaMask,
  requestMetaMaskSignMessage,
  requestMetaMaskSendTransaction,
  getBalanceDemo,
};
