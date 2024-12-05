import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { App } from '../../types';
import AppIcon from '../AppIcon';

interface FolderProps {
  folder: App;
  isOpen: boolean;
  onClose: () => void;
}

const Folder: React.FC<FolderProps> = ({ folder, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            className="bg-white/90 rounded-2xl p-4 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4">{folder.name}</h3>
            <div className="grid grid-cols-4 gap-4">
              {folder.children?.map((app) => (
                <AppIcon key={app.id} app={app} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Folder;