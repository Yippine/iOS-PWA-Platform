import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useDesktopStore } from '../../store/desktopStore';
import AppCard from './AppCard';
import { availableApps } from '../../data/apps';

const AppStore: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const addApp = useDesktopStore((state) => state.addApp);

  const filteredApps = availableApps.filter(app => 
    (category === 'all' || app.category === category) &&
    app.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-lg flex items-center justify-center p-4"
    >
      <div className="bg-white/90 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">App Store</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-4">
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search apps..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 rounded-lg bg-gray-100"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="productivity">Productivity</option>
              <option value="social">Social</option>
              <option value="games">Games</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredApps.map((app) => (
              <AppCard key={app.id} app={app} onInstall={() => addApp(app)} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AppStore;