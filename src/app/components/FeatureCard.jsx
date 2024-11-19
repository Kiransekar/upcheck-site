import { LucideIcon } from 'lucide-react';

export const FeatureCard = ({ Icon, title }) => {
  return (
    <div className="group">
      <div className="flex flex-col items-center space-y-4 p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-[#7DD3E1]/20 hover:bg-[#7DD3E1]/10 transition-all">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#7DD3E1] to-[#5BC0DE] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          <Icon className="h-12 w-12 text-white" />
        </div>
        <p className="text-lg font-medium text-gray-900">{title}</p>
      </div>
    </div>
  );
};