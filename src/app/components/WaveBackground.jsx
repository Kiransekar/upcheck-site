import { Waves } from 'lucide-react';

export const WaveBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <Waves className="absolute top-0 left-0 w-full h-32 text-[#7DD3E1] opacity-5" />
      <Waves className="absolute bottom-0 left-0 w-full h-32 text-[#7DD3E1] opacity-5 transform rotate-180" />
    </div>
  );
};