import React from 'react';
import { motion } from 'framer-motion';
import { Store, MessageCircle, Camera, Globe, Settings } from 'lucide-react';
import DockItem from './DockItem';

interface DockProps {
  onAppStoreClick: () => void;
}

const dockApps = [
  { 
    id: 'messages', 
    icon: MessageCircle, 
    name: 'Messages',
    action: () => alert('Messages app clicked!')
  },
  { 
    id: 'safari', 
    icon: Globe, 
    name: 'Safari',
    action: () => window.open('https://www.google.com', '_blank')
  },
  { 
    id: 'camera', 
    icon: Camera, 
    name: 'Camera',
    action: () => alert('Camera app clicked!')
  },
  { 
    id: 'appstore', 
    icon: Store, 
    name: 'App Store',
    action: null // Handled separately
  },
  { 
    id: 'settings', 
    icon: Settings, 
    name: 'Settings',
    action: () => alert('Settings app clicked!')
  },
];

const Dock: React.FC<DockProps> = ({ onAppStoreClick }) => {
  const handleClick = (id: string, action: (() => void) | null) => {
    if (id === 'appstore') {
      onAppStoreClick();
    } else if (action) {
      action();
    }
  };

  return (
    <motion.div 
      className="fixed bottom-4 left-0 right-0 mx-auto w-fit"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-xl p-2 rounded-2xl">
        {dockApps.map((app) => (
          <DockItem 
            key={app.id} 
            app={app} 
            onClick={() => handleClick(app.id, app.action)}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default Dock;