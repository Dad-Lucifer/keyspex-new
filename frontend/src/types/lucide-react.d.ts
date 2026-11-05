declare module 'lucide-react' {
  import * as React from 'react';

  export interface LucideProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
    strokeWidth?: number | string;
    color?: string;
    className?: string;
  }

  export type LucideIcon = React.ForwardRefExoticComponent<
    LucideProps & React.RefAttributes<SVGSVGElement>
  >;

  export const LayoutDashboard: LucideIcon;
  export const Wallet: LucideIcon;
  export const CreditCard: LucideIcon;
  export const TrendingUp: LucideIcon;
  export const Users: LucideIcon;
  export const UserCheck: LucideIcon;
  export const Briefcase: LucideIcon;
  export const CheckSquare: LucideIcon;
  export const FileText: LucideIcon;
  export const Calendar: LucideIcon;
  export const BarChart3: LucideIcon;
  export const History: LucideIcon;
  export const Settings: LucideIcon;
  export const Search: LucideIcon;
  export const Bell: LucideIcon;
  export const HelpCircle: LucideIcon;
  export const LogOut: LucideIcon;
  export const Plus: LucideIcon;
  export const Download: LucideIcon;
  export const ChevronDown: LucideIcon;
  export const ChevronUp: LucideIcon;
  export const ChevronRight: LucideIcon;
  export const ChevronLeft: LucideIcon;
  export const AlertCircle: LucideIcon;
  export const Clock: LucideIcon;
  export const ArrowUpRight: LucideIcon;
  export const Shield: LucideIcon;
  export const ShieldAlert: LucideIcon;
  export const Activity: LucideIcon;
  export const Filter: LucideIcon;
  export const MoreVertical: LucideIcon;
  export const Building: LucideIcon;
  export const Check: LucideIcon;
  export const X: LucideIcon;
  export const XIcon: LucideIcon;
  export const XCircle: LucideIcon;
  export const ArrowLeft: LucideIcon;
  export const Radio: LucideIcon;
  export const ChevronDownIcon: LucideIcon;
  export const ChevronUpIcon: LucideIcon;
  export const ExternalLink: LucideIcon;
  export const RefreshCw: LucideIcon;
  export const Sparkles: LucideIcon;
  export const DollarSign: LucideIcon;
  export const Menu: LucideIcon;
  export const Trash2: LucideIcon;
  export const UserPlus: LucideIcon;
  export const Lock: LucideIcon;
  export const Mail: LucideIcon;
  export const Eye: LucideIcon;
  export const EyeOff: LucideIcon;
  export const Layers: LucideIcon;
  export const Zap: LucideIcon;
  export const Bot: LucideIcon;
  export const Server: LucideIcon;
  export const ShieldCheck: LucideIcon;
  export const CheckCircle2: LucideIcon;
  export const Loader2: LucideIcon;

  const icons: { [key: string]: LucideIcon };
  export default icons;
}
