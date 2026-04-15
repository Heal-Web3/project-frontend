import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import QRDisplay from '@/components/shared/QRDisplay';
import { toast } from 'sonner';
import { Loader2, FileText } from 'lucide-react';

interface Prescription {
  id: string;
  patientId: string;
  medicine: string;
  dosage: string;
  expiry: string;
  issuedAt: string;
  signature: string;
}

const IssuePrescription = () => {
  const [form, setForm] = useState({ patientId: '', medicine: '', dosage: '', expiry: '' });
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrData, setQrData] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!form.patientId || !form.medicine || !form.dosage || !form.expiry) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 1500));

    const prescription: Prescription = {
      id: crypto.randomUUID(),
      ...form,
      issuedAt: new Date().toISOString(),
      signature: '0x' + Array.from({ length: 130 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
    };

    // Save to localStorage
    const history = JSON.parse(localStorage.getItem('prescriptionHistory') || '[]');
    history.unshift(prescription);
    localStorage.setItem('prescriptionHistory', JSON.stringify(history.slice(0, 50)));

    setQrData(JSON.stringify(prescription));
    setIsGenerating(false);
    toast.success('Prescription generated with QR code');
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-heading flex items-center gap-2">
            <FileText className="h-5 w-5" />
            New Prescription
          </CardTitle>
          <CardDescription>Fill in the prescription details to generate a signed QR code</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="patientId">Patient ID</Label>
            <Input id="patientId" placeholder="Anonymous identifier" value={form.patientId} onChange={(e) => setForm({ ...form, patientId: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="medicine">Medicine</Label>
            <Input id="medicine" placeholder="e.g., Amoxicillin" value={form.medicine} onChange={(e) => setForm({ ...form, medicine: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dosage">Dosage</Label>
            <Input id="dosage" placeholder="e.g., 500mg twice daily" value={form.dosage} onChange={(e) => setForm({ ...form, dosage: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="expiry">Expiry Date</Label>
            <Input id="expiry" type="date" value={form.expiry} onChange={(e) => setForm({ ...form, expiry: e.target.value })} />
          </div>
          <Button onClick={handleGenerate} disabled={isGenerating} className="w-full" variant="hero">
            {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {isGenerating ? 'Signing...' : 'Generate Prescription QR'}
          </Button>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center">
        {qrData ? (
          <QRDisplay data={qrData} size={220} />
        ) : (
          <div className="text-center text-muted-foreground p-12 border border-dashed border-border rounded-xl">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p>QR code will appear here after generating a prescription</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IssuePrescription;
