import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import StatusBadge from '@/components/shared/StatusBadge';
import { shortenAddress } from '@/utils/formatters';
import { toast } from 'sonner';
import { Search, AlertTriangle } from 'lucide-react';

interface Doctor {
  wallet: string;
  license: string;
  name: string;
  specialty: string;
  nftId: string;
  status: 'active' | 'revoked';
}

const mockDoctors: Doctor[] = [
  { wallet: '0x1234567890abcdef1234567890abcdef12345678', license: 'MED-001', name: 'Dr. Sarah Smith', specialty: 'Cardiologist', nftId: '#1', status: 'active' },
  { wallet: '0xabcdef1234567890abcdef1234567890abcdef12', license: 'MED-002', name: 'Dr. James Wilson', specialty: 'Neurologist', nftId: '#2', status: 'active' },
  { wallet: '0x9876543210fedcba9876543210fedcba98765432', license: 'MED-003', name: 'Dr. Emily Chen', specialty: 'Pediatrician', nftId: '#3', status: 'active' },
  { wallet: '0xfedcba9876543210fedcba9876543210fedcba98', license: 'MED-004', name: 'Dr. Michael Brown', specialty: 'Dermatologist', nftId: '#4', status: 'revoked' },
  { wallet: '0x1111222233334444555566667777888899990000', license: 'MED-005', name: 'Dr. Lisa Johnson', specialty: 'Surgeon', nftId: '#5', status: 'active' },
];

const DoctorsTable = () => {
  const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [revokeTarget, setRevokeTarget] = useState<Doctor | null>(null);

  const filtered = doctors.filter((d) => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.wallet.toLowerCase().includes(search.toLowerCase()) ||
      d.license.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || d.status === filter;
    return matchesSearch && matchesFilter;
  });

  const activeCount = doctors.filter((d) => d.status === 'active').length;
  const revokedCount = doctors.filter((d) => d.status === 'revoked').length;

  const handleRevoke = () => {
    if (!revokeTarget) return;
    setDoctors(doctors.map((d) => d.wallet === revokeTarget.wallet ? { ...d, status: 'revoked' as const } : d));

    const auditLog = JSON.parse(localStorage.getItem('auditLog') || '[]');
    auditLog.unshift({
      timestamp: new Date().toISOString(),
      regulatorWallet: '0xRegulator',
      doctorAddress: revokeTarget.wallet,
      doctorName: revokeTarget.name,
      action: 'Revoke',
    });
    localStorage.setItem('auditLog', JSON.stringify(auditLog));

    toast.success(`License revoked for ${revokeTarget.name}`);
    setRevokeTarget(null);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Registered Doctors</CardTitle>
          <div className="flex gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by name, wallet, or license..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="revoked">Revoked</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Wallet</TableHead>
                <TableHead>License</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Specialty</TableHead>
                <TableHead>NFT ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((d) => (
                <TableRow key={d.wallet}>
                  <TableCell className="font-mono text-sm">{shortenAddress(d.wallet)}</TableCell>
                  <TableCell>{d.license}</TableCell>
                  <TableCell className="font-medium">{d.name}</TableCell>
                  <TableCell>{d.specialty}</TableCell>
                  <TableCell>{d.nftId}</TableCell>
                  <TableCell><StatusBadge status={d.status} /></TableCell>
                  <TableCell>
                    {d.status === 'active' && (
                      <Button variant="destructive" size="sm" onClick={() => setRevokeTarget(d)}>Revoke</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex gap-6 mt-6 text-sm text-muted-foreground border-t border-border pt-4">
            <span>Total: <strong className="text-foreground">{doctors.length}</strong></span>
            <span>Active: <strong className="text-primary">{activeCount}</strong></span>
            <span>Revoked: <strong className="text-destructive">{revokedCount}</strong></span>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!revokeTarget} onOpenChange={() => setRevokeTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-heading flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Revoke Doctor License
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to revoke the license for <strong>{revokeTarget?.name}</strong>? This action cannot be undone on-chain.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRevokeTarget(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleRevoke}>Revoke License</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DoctorsTable;
