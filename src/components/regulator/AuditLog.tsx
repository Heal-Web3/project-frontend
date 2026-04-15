import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { shortenAddress, formatTimestamp } from '@/utils/formatters';
import { Download, ScrollText } from 'lucide-react';

interface AuditEntry {
  timestamp: string;
  regulatorWallet: string;
  doctorAddress: string;
  doctorName: string;
  action: string;
}

const AuditLog = () => {
  const [logs, setLogs] = useState<AuditEntry[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('auditLog') || '[]');
    setLogs(data);
  }, []);

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(logs, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'audit-log.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-heading flex items-center gap-2">
          <ScrollText className="h-5 w-5" />
          Audit Log
        </CardTitle>
        {logs.length > 0 && (
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4" />
            Export JSON
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {logs.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No audit entries yet</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Regulator</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((l, i) => (
                <TableRow key={i}>
                  <TableCell className="text-sm">{formatTimestamp(l.timestamp)}</TableCell>
                  <TableCell className="font-mono text-sm">{shortenAddress(l.regulatorWallet)}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{l.doctorName}</p>
                      <p className="font-mono text-xs text-muted-foreground">{shortenAddress(l.doctorAddress)}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-destructive font-medium text-sm">{l.action}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default AuditLog;
