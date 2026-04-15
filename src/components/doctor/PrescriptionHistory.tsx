import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import QRDisplay from '@/components/shared/QRDisplay';
import { formatDate } from '@/utils/formatters';
import { QrCode, History } from 'lucide-react';

interface Prescription {
  id: string;
  patientId: string;
  medicine: string;
  dosage: string;
  expiry: string;
  issuedAt: string;
  signature: string;
}

const PrescriptionHistory = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [selectedQR, setSelectedQR] = useState<string | null>(null);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('prescriptionHistory') || '[]');
    setPrescriptions(history);
  }, []);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="font-heading flex items-center gap-2">
            <History className="h-5 w-5" />
            Prescription History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {prescriptions.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No prescriptions issued yet</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient ID</TableHead>
                  <TableHead>Medicine</TableHead>
                  <TableHead>Dosage</TableHead>
                  <TableHead>Issued</TableHead>
                  <TableHead>Expiry</TableHead>
                  <TableHead>QR</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prescriptions.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-mono text-sm">{p.patientId}</TableCell>
                    <TableCell>{p.medicine}</TableCell>
                    <TableCell>{p.dosage}</TableCell>
                    <TableCell>{formatDate(p.issuedAt)}</TableCell>
                    <TableCell>{formatDate(p.expiry)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => setSelectedQR(JSON.stringify(p))}>
                        <QrCode className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selectedQR} onOpenChange={() => setSelectedQR(null)}>
        <DialogContent className="flex flex-col items-center">
          <DialogHeader>
            <DialogTitle className="font-heading">Prescription QR Code</DialogTitle>
          </DialogHeader>
          {selectedQR && <QRDisplay data={selectedQR} />}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PrescriptionHistory;
