import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useCallback } from 'react';
import { TransactionSignature, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
export function Airdrop() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const request = useCallback(async () => {
    if (!publicKey) {
      console.log('error', 'Wallet not connected!');
      console.log({
        type: 'error',
        message: 'error',
        description: 'Wallet not connected!',
      });
      return;
    }

    let signature: TransactionSignature = '';

    try {
      signature = await connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL);

      // Get the lates block hash to use on our transaction and confirmation
      const latestBlockhash = await connection.getLatestBlockhash();
      await connection.confirmTransaction(
        { signature, ...latestBlockhash },
        'confirmed'
      );

      console.log({
        type: 'success',
        message: 'Airdrop successful!',
        txid: signature,
      });

      // getUserSOLBalance(publicKey, connection);
    } catch (error: any) {
      console.log({
        type: 'error',
        message: `Airdrop failed!`,
        description: error?.message,
        txid: signature,
      });
      console.log(error);
      console.log('error', `Airdrop failed! ${error?.message}`, signature);
    }
  }, [publicKey, connection]);

  return (
    <div className="hero py-[100px]">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Airdrop</h1>
          <p className="py-6">
            You can request an airdrop of 1 SOL to your wallet address.
          </p>
          {publicKey ? (
            <button onClick={request} className="btn btn-primary">
              Request Airdrop
            </button>
          ) : (
            <WalletMultiButton />
          )}
        </div>
      </div>
    </div>
  );
}
