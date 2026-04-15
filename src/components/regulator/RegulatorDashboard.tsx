import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DoctorsTable from './DoctorsTable';
import AuditLog from './AuditLog';
import { Users, ScrollText } from 'lucide-react';

const RegulatorDashboard = () => {
  return (
    <div className="animate-slide-up">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground">Regulator Dashboard</h1>
        <p className="text-muted-foreground mt-1">Oversee registered doctors and manage licenses</p>
      </div>

      <Tabs defaultValue="doctors">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="doctors" className="gap-2">
            <Users className="h-4 w-4" />
            All Doctors
          </TabsTrigger>
          <TabsTrigger value="audit" className="gap-2">
            <ScrollText className="h-4 w-4" />
            Audit Log
          </TabsTrigger>
        </TabsList>

        <TabsContent value="doctors">
          <DoctorsTable />
        </TabsContent>
        <TabsContent value="audit">
          <AuditLog />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RegulatorDashboard;
