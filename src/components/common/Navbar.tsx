import { useWeb3 } from '@/context/Web3Context';
import { useApp, type UserRole } from '@/context/AppContext';
import { shortenAddress } from '@/utils/formatters';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Stethoscope, Building2, LogOut, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const roleIcons: Record<string, React.ReactNode> = {
  doctor: <Stethoscope className="h-4 w-4" />,
  pharmacy: <Building2 className="h-4 w-4" />,
  regulator: <Shield className="h-4 w-4" />,
};

const roleLabels: Record<string, string> = {
  doctor: 'Doctor',
  pharmacy: 'Pharmacist',
  regulator: 'Regulator',
};

const Navbar = () => {
  const { account, disconnect, isCorrectNetwork } = useWeb3();
  const { role, setRole } = useApp();
  const navigate = useNavigate();

  const handleRoleSwitch = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole) navigate(`/${newRole}`);
  };

  return (
    <nav className="sticky top-0 z-50 heal-glass">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" onClick={() => setRole(null)}>
          <div className="h-8 w-8 rounded-lg heal-gradient flex items-center justify-center">
            <span className="text-primary-foreground font-heading font-bold text-sm">H</span>
          </div>
          <span className="font-heading font-bold text-xl text-foreground">Heal</span>
        </Link>

        <div className="flex items-center gap-3">
          {role && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  {roleIcons[role]}
                  {roleLabels[role]}
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {(['doctor', 'pharmacy', 'regulator'] as UserRole[]).map((r) => (
                  <DropdownMenuItem key={r} onClick={() => handleRoleSwitch(r)} className="gap-2">
                    {roleIcons[r!]}
                    {roleLabels[r!]}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {account && (
            <>
              <div className={`px-3 py-1.5 rounded-full text-xs font-medium ${isCorrectNetwork ? 'bg-secondary text-secondary-foreground' : 'bg-destructive/10 text-destructive'}`}>
                {isCorrectNetwork ? 'Sepolia' : 'Wrong Network'}
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-muted text-muted-foreground text-sm font-mono">
                {shortenAddress(account)}
              </div>
              <Button variant="ghost" size="icon" onClick={disconnect} className="text-muted-foreground hover:text-destructive">
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
