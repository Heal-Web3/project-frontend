import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useApp } from '@/context/AppContext';
import MintNFTForm from './MintNFTForm';
import IssuePrescription from './IssuePrescription';
import PrescriptionHistory from './PrescriptionHistory';
import { UserPlus, FileText, History } from 'lucide-react';

const DoctorDashboard = () => {
  const { hasNFT } = useApp();
  const [activeTab, setActiveTab] = useState(hasNFT ? 'issue' : 'register');

  return (
    <div className="animate-slide-up">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground">Doctor Dashboard</h1>
        <p className="text-muted-foreground mt-1">Manage your credentials and prescriptions</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="register" className="gap-2">
            <UserPlus className="h-4 w-4" />
            Register
          </TabsTrigger>
          <TabsTrigger value="issue" className="gap-2">
            <FileText className="h-4 w-4" />
            Issue Prescription
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2">
            <History className="h-4 w-4" />
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="register">
          <MintNFTForm onMinted={() => setActiveTab('issue')} />
        </TabsContent>
        <TabsContent value="issue">
          <IssuePrescription />
        </TabsContent>
        <TabsContent value="history">
          <PrescriptionHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DoctorDashboard;
