import React from 'react';
import { Droplets } from 'lucide-react';

export const StatCard = ({ value }) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <Droplets className="h-8 w-8 text-[#7DD3E1]" />
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
};