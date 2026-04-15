import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatusBadge from '@/components/shared/StatusBadge';
import { formatTimestamp } from '@/utils/formatters';
import { History } from 'lucide-react';

interface HistoryItem {
  patientId: string;
  medicine: string;
  verified: boolean;
  reason: string;
  timestamp: string;
}

const VerificationHistory = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('verificationHistory') || '[]');
    setHistory(data);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading flex items-center gap-2">
          <History className="h-5 w-5" />
          Verification History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No verifications yet</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient ID</TableHead>
                <TableHead>Medicine</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((h, i) => (
                <TableRow key={i}>
                  <TableCell className="font-mono text-sm">{h.patientId}</TableCell>
                  <TableCell>{h.medicine}</TableCell>
                  <TableCell><StatusBadge status={h.verified ? 'verified' : 'rejected'} /></TableCell>
                  <TableCell className="text-sm text-muted-foreground">{h.reason}</TableCell>
                  <TableCell className="text-sm">{formatTimestamp(h.timestamp)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default VerificationHistory;
