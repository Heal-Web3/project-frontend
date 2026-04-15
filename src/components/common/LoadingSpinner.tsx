import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ message = 'Loading...' }: { message?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 animate-fade-in">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-muted-foreground text-sm">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
