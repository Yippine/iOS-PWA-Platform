import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

interface AppCardProps {
  app: {
    id: string;
    name: string;
    icon: string;
    description: string;
    category: string;
  };
  onInstall: () => void;
}

const AppCard: React.FC<AppCardProps> = ({ app, onInstall }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl p-4 shadow-sm flex gap-4"
    >
      <img src={app.icon} alt={app.name} className="w-16 h-16 rounded-xl" />
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold">{app.name}</h3>
            <p className="text-sm text-gray-500 capitalize">{app.category}</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onInstall}
            className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
          >
            <Download className="w-4 h-4" />
          </motion.button>
        </div>
        <p className="text-sm text-gray-600 mt-2">{app.description}</p>
      </div>
    </motion.div>
  );
};

export default AppCard;