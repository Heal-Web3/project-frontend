import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SPECIALTIES } from '@/utils/constants';
import { useApp } from '@/context/AppContext';
import { toast } from 'sonner';
import { Loader2, CheckCircle2 } from 'lucide-react';

interface MintNFTFormProps {
  onMinted: () => void;
}

const MintNFTForm = ({ onMinted }: MintNFTFormProps) => {
  const { setHasNFT } = useApp();
  const [form, setForm] = useState({ licenseNumber: '', name: '', specialty: '' });
  const [isMinting, setIsMinting] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  const handleMint = async () => {
    if (!form.licenseNumber || !form.name || !form.specialty) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsMinting(true);
    // Simulate minting
    await new Promise((r) => setTimeout(r, 2000));
    const fakeTx = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    setTxHash(fakeTx);
    setHasNFT(true);
    setIsMinting(false);
    toast.success('Doctor NFT minted successfully!');
    setTimeout(onMinted, 1500);
  };

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="font-heading">Register as Doctor</CardTitle>
        <CardDescription>Mint your Doctor NFT to start issuing verified prescriptions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="license">License Number</Label>
          <Input
            id="license"
            placeholder="e.g., MED-2024-001"
            value={form.licenseNumber}
            onChange={(e) => setForm({ ...form, licenseNumber: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="Dr. John Smith"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Specialty</Label>
          <Select value={form.specialty} onValueChange={(v) => setForm({ ...form, specialty: v })}>
            <SelectTrigger>
              <SelectValue placeholder="Select specialty" />
            </SelectTrigger>
            <SelectContent>
              {SPECIALTIES.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleMint} disabled={isMinting} className="w-full" variant="hero">
          {isMinting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {isMinting ? 'Minting NFT...' : 'Mint Doctor NFT'}
        </Button>

        {txHash && (
          <div className="bg-secondary/30 rounded-lg p-4 flex items-start gap-3 animate-fade-in">
            <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">NFT Minted Successfully!</p>
              <p className="text-xs text-muted-foreground font-mono mt-1 break-all">{txHash}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MintNFTForm;
