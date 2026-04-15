import { useWeb3 } from '@/context/Web3Context';
import { Button } from '@/components/ui/button';
import { Loader2, Wallet } from 'lucide-react';

const WalletConnector = () => {
  const { account, isConnecting, error, connect } = useWeb3();

  if (account) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Button
        variant="hero"
        size="lg"
        onClick={connect}
        disabled={isConnecting}
        className="text-base px-8 py-6 rounded-xl"
      >
        {isConnecting ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Wallet className="h-5 w-5" />
        )}
        {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
      </Button>
      {error && (
        <p className="text-sm text-destructive max-w-md text-center">{error}</p>
      )}
    </div>
  );
};

export default WalletConnector;
