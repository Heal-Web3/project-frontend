import { useWeb3 } from '../context/Web3Context';
import { useApp, type UserRole } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import WalletConnector from '@/components/common/WalletConnector';
import NetworkWarning from '@/components/shared/NetworkWarning';
import { Stethoscope, Building2, Shield, ArrowRight } from 'lucide-react';

const roles = [
  {
    id: 'doctor' as UserRole,
    title: 'Doctor',
    description: 'Mint your license NFT and issue verified prescriptions on-chain.',
    icon: Stethoscope,
    gradient: 'from-heal-blue to-heal-teal',
  },
  {
    id: 'pharmacy' as UserRole,
    title: 'Pharmacist',
    description: 'Scan and verify prescriptions using QR codes or manual input.',
    icon: Building2,
    gradient: 'from-heal-teal to-heal-blue',
  },
  {
    id: 'regulator' as UserRole,
    title: 'Regulator',
    description: 'Oversee registered doctors and manage license revocations.',
    icon: Shield,
    gradient: 'from-heal-navy to-heal-blue',
  },
];

const LandingPage = () => {
  const { account, isCorrectNetwork } = useWeb3();
  const { setRole } = useApp();
  const navigate = useNavigate();

  const handleRoleSelect = (role: UserRole) => {
    setRole(role);
    navigate(`/${role}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 heal-gradient opacity-5" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-3xl mx-auto text-center animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 text-sm text-primary mb-6">
              <span className="h-2 w-2 rounded-full bg-heal-teal animate-pulse" />
              Blockchain-Verified Healthcare
            </div>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Verified Prescriptions on{' '}
              <span className="heal-text-gradient">Blockchain</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
              Secure, transparent, and tamper-proof prescription management powered by smart contracts and NFT-based doctor credentials.
            </p>
            <WalletConnector />
          </div>
        </div>
      </div>

      {/* Network Warning */}
      {account && !isCorrectNetwork && (
        <div className="container mx-auto px-4 py-4">
          <NetworkWarning />
        </div>
      )}

      {/* Role Selection */}
      {account && (
        <div className="container mx-auto px-4 py-16 animate-fade-in">
          <h2 className="font-heading text-2xl font-bold text-center text-foreground mb-2">Select Your Role</h2>
          <p className="text-center text-muted-foreground mb-10">Choose how you'll interact with the Heal network</p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <button
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id)}
                  disabled={!isCorrectNetwork}
                  className="group relative bg-card rounded-xl border border-border p-6 text-left transition-all duration-300 hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${role.gradient} flex items-center justify-center mb-4`}>
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-card-foreground mb-2">{role.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{role.description}</p>
                  <div className="flex items-center text-sm font-medium text-primary gap-1 group-hover:gap-2 transition-all">
                    Continue <ArrowRight className="h-4 w-4" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Heal MVP — Decentralized Prescription Verification</p>
          <p className="mt-1 font-mono text-xs">Contract: 0x0000...0000 (Sepolia)</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
