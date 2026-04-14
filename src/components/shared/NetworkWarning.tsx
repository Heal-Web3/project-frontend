import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SEPOLIA_CHAIN_ID } from '@/utils/constants';

const NetworkWarning = () => {
  const switchNetwork = async () => {
    try {
      await (window as any).ethereum?.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: SEPOLIA_CHAIN_ID }],
      });
    } catch (err) {
      console.error('Failed to switch network:', err);
    }
  };

  return (
    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex items-center gap-3">
      <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
      <div className="flex-1">
        <p className="text-sm font-medium text-destructive">Wrong Network</p>
        <p className="text-xs text-muted-foreground">Please switch to Sepolia testnet to continue.</p>
      </div>
      <Button variant="danger" size="sm" onClick={switchNetwork}>
        Switch to Sepolia
      </Button>
    </div>
  );
};

export default NetworkWarning;
