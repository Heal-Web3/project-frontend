import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/shared/StatusBadge';
import { formatDate } from '@/utils/formatters';
import { CheckCircle2, XCircle, Pill } from 'lucide-react';
import { toast } from 'sonner';
import type { VerificationData } from './ManualInput';

interface Props {
  data: VerificationData;
}

const VerificationResult = ({ data }: Props) => {
  const handleMarkFilled = () => {
    toast.success('Prescription marked as filled');
  };

  return (
    <Card className={`animate-slide-up border-2 ${data.verified ? 'border-heal-teal' : 'border-destructive/30'}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          {data.verified ? (
            <CheckCircle2 className="h-8 w-8 text-primary" />
          ) : (
            <XCircle className="h-8 w-8 text-destructive" />
          )}
          <div>
            <CardTitle className="font-heading text-xl">
              {data.verified ? 'Prescription Verified' : 'Verification Failed'}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{data.reason}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <StatusBadge status={data.verified ? 'verified' : 'rejected'} />

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Patient ID</p>
            <p className="font-medium font-mono">{data.patientId}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Medicine</p>
            <p className="font-medium flex items-center gap-1"><Pill className="h-3 w-3" />{data.medicine}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Dosage</p>
            <p className="font-medium">{data.dosage}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Expiry</p>
            <p className="font-medium">{formatDate(data.expiry)}</p>
          </div>
        </div>

        {data.verified && (
          <Button onClick={handleMarkFilled} className="w-full" variant="hero">
            Mark as Filled
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default VerificationResult;
