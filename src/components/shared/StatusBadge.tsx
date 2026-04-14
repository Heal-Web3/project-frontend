import { cn } from '@/lib/utils';

type StatusType = 'verified' | 'rejected' | 'active' | 'revoked' | 'pending';

const statusStyles: Record<StatusType, string> = {
  verified: 'bg-secondary text-secondary-foreground',
  active: 'bg-secondary text-secondary-foreground',
  rejected: 'bg-destructive/10 text-destructive',
  revoked: 'bg-destructive/10 text-destructive',
  pending: 'bg-muted text-muted-foreground',
};

const statusLabels: Record<StatusType, string> = {
  verified: '✅ Verified',
  active: '● Active',
  rejected: '❌ Rejected',
  revoked: '⊘ Revoked',
  pending: '◌ Pending',
};

const StatusBadge = ({ status, className }: { status: StatusType; className?: string }) => {
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', statusStyles[status], className)}>
      {statusLabels[status]}
    </span>
  );
};

export default StatusBadge;
