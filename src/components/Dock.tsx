import React from 'react';
import { motion } from 'framer-motion';
import { Store, MessageCircle, Camera, Globe, Settings } from 'lucide-react';
import DockItem from './DockItem';

const dockApps = [
  { id: 'messages', icon: MessageCircle, name: 'Messages' },
  { id: 'safari', icon: Globe, name: 'Safari' },
  { id: 'camera', icon: Camera, name: 'Camera' },
  { id: 'appstore', icon: Store, name: 'App Store' },
  { id: 'settings', icon: Settings, name: 'Settings' },
];

const Dock: React.FC = () => {
  return (
    <motion.div 
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="flex space-x-2 bg-white/20 backdrop-blur-xl p-2 rounded-2xl">
        {dockApps.map((app) => (
          <DockItem key={app.id} app={app} />
        ))}
      </div>
    </motion.div>
  );
}

export default Dock;