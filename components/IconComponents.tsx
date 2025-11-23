import React from 'react';
import { 
  ArrowLeft, 
  MoreVertical, 
  ShieldCheck, 
  Wallet, 
  Truck, 
  CheckCircle2, 
  Mic, 
  Image as ImageIcon 
} from 'lucide-react';

export const Icons = {
  Back: () => <ArrowLeft className="w-6 h-6 text-white" />,
  Menu: () => <MoreVertical className="w-5 h-5 text-white" />,
  Shield: () => <ShieldCheck className="w-5 h-5 text-slate-600" />,
  Wallet: () => <Wallet className="w-6 h-6 text-green-300" />,
  Truck: () => <Truck className="w-6 h-6 text-green-300" />,
  Check: () => <CheckCircle2 className="w-6 h-6 text-green-300" />,
  Mic: () => <Mic className="w-6 h-6 text-purple-400" />,
  ImagePlaceholder: () => <ImageIcon className="w-8 h-8 text-slate-400" />
};