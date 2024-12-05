import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface DockItemProps {
  app: {
    id: string;
    icon: LucideIcon;
    name: string;
  };
}

const DockItem: React.FC<DockItemProps> = ({ app }) => {
  const Icon = app.icon;
  
  return (
    <motion.div
      className="w-12 h-12 flex items-center justify-center relative group"
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className="w-8 h-8 text-white" />
      <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity bg-black/75 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
        {app.name}
      </div>
    </motion.div>
  );
};

export default DockItem;