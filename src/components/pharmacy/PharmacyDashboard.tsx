import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ManualInput from './ManualInput';
import VerificationHistory from './VerificationHistory';
import { ScanLine, Keyboard, History } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const PharmacyDashboard = () => {
  return (
    <div className="animate-slide-up">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground">Pharmacy Dashboard</h1>
        <p className="text-muted-foreground mt-1">Scan and verify prescriptions</p>
      </div>

      <Tabs defaultValue="scanner">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="scanner" className="gap-2">
            <ScanLine className="h-4 w-4" />
            QR Scanner
          </TabsTrigger>
          <TabsTrigger value="manual" className="gap-2">
            <Keyboard className="h-4 w-4" />
            Manual Input
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2">
            <History className="h-4 w-4" />
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="scanner">
          <Card>
            <CardHeader>
              <CardTitle className="font-heading">QR Code Scanner</CardTitle>
              <CardDescription>Use your device camera to scan a prescription QR code</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg flex flex-col items-center justify-center gap-4 border-2 border-dashed border-border">
                <ScanLine className="h-16 w-16 text-muted-foreground/30" />
                <p className="text-muted-foreground text-sm">Camera access requires a secure context (HTTPS)</p>
                <p className="text-muted-foreground text-xs">Use the Manual Input tab to paste QR data instead</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manual">
          <ManualInput />
        </TabsContent>

        <TabsContent value="history">
          <VerificationHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PharmacyDashboard;
