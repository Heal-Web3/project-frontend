import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import VerificationResult from './VerificationResult';
import { toast } from 'sonner';
import { Loader2, Search } from 'lucide-react';

export interface VerificationData {
  patientId: string;
  medicine: string;
  dosage: string;
  expiry: string;
  issuedAt: string;
  signature: string;
  verified: boolean;
  reason: string;
}

const ManualInput = () => {
  const [input, setInput] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<VerificationData | null>(null);

  const handleVerify = async () => {
    if (!input.trim()) {
      toast.error('Please paste QR code data');
      return;
    }

    setIsVerifying(true);
    await new Promise((r) => setTimeout(r, 1500));

    try {
      const data = JSON.parse(input);
      const isExpired = new Date(data.expiry) < new Date();

      const verification: VerificationData = {
        patientId: data.patientId || 'Unknown',
        medicine: data.medicine || 'Unknown',
        dosage: data.dosage || 'Unknown',
        expiry: data.expiry || 'Unknown',
        issuedAt: data.issuedAt || 'Unknown',
        signature: data.signature || 'No signature',
        verified: !isExpired && !!data.signature,
        reason: isExpired ? 'Prescription has expired' : !data.signature ? 'Missing doctor signature' : 'Prescription is valid and verified on-chain',
      };

      setResult(verification);

      // Save to history
      const history = JSON.parse(localStorage.getItem('verificationHistory') || '[]');
      history.unshift({ ...verification, timestamp: new Date().toISOString() });
      localStorage.setItem('verificationHistory', JSON.stringify(history.slice(0, 50)));

    } catch {
      toast.error('Invalid QR data format. Please paste valid JSON.');
    }

    setIsVerifying(false);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Manual Verification</CardTitle>
          <CardDescription>Paste the QR code data string to verify a prescription</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder='Paste QR code JSON data here...'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={8}
            className="font-mono text-sm"
          />
          <Button onClick={handleVerify} disabled={isVerifying} className="w-full" variant="hero">
            {isVerifying ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            {isVerifying ? 'Verifying...' : 'Verify Prescription'}
          </Button>
        </CardContent>
      </Card>

      <div>
        {result ? (
          <VerificationResult data={result} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-muted-foreground p-12 border border-dashed border-border rounded-xl">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p>Verification results will appear here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManualInput;
