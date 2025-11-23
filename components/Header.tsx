import React from 'react';
import { Icons } from './IconComponents';
import { ProductDetails } from '../types';

interface HeaderProps {
  product: ProductDetails;
}

export const Header: React.FC<HeaderProps> = ({ product }) => {
  return (
    <div className="flex flex-col w-full bg-[#1E232E] shadow-sm z-20 sticky top-0">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <button className="p-1 -ml-2">
            <Icons.Back />
          </button>
          <div className="flex flex-col">
            <h1 className="text-white font-medium text-lg leading-tight">{product.sellerName}</h1>
            <span className="text-slate-400 text-xs">{product.sellerSince}</span>
          </div>
        </div>
        <button>
          <Icons.Menu />
        </button>
      </div>

      {/* Product Strip */}
      <div className="flex items-center gap-3 px-4 py-3 border-t border-slate-700/50 bg-[#232836]">
        <div className="w-10 h-10 bg-slate-600 rounded overflow-hidden flex-shrink-0">
          <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col">
          <span className="text-white text-sm font-medium">{product.title}</span>
          <span className="text-white text-sm font-bold">{product.price}</span>
        </div>
      </div>

      {/* Safety Warning */}
      <div className="bg-white px-4 py-3 flex items-start gap-3">
        <div className="pt-0.5">
          <Icons.Shield />
        </div>
        <p className="text-slate-700 text-xs leading-tight">
          A OLX não solicita seus dados ou envia links por este chat. Ao suspeitar de algo, denuncie.
        </p>
      </div>
    </div>
  );
};