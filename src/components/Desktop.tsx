import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { useDesktopStore } from '../store/desktopStore';
import AppIcon from './AppIcon';
import Dock from './Dock';
import AppStore from './AppStore/AppStore';
import Folder from './Folder/Folder';

const Desktop: React.FC = () => {
  const { apps, wallpaper } = useDesktopStore();
  const [isAppStoreOpen, setIsAppStoreOpen] = useState(false);
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null);
  const isTouchDevice = 'ontouchstart' in window;

  const activeFolder = apps.find(app => app.id === activeFolderId && app.type === 'folder');

  return (
    <DndProvider backend={isTouchDevice ? TouchBackend : HTML5Backend}>
      <div 
        className="relative w-screen h-screen overflow-hidden"
        style={{
          backgroundImage: `url(${wallpaper})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 p-5">
          {apps.map((app) => (
            <AppIcon 
              key={app.id} 
              app={app}
              onOpen={app.type === 'folder' ? () => setActiveFolderId(app.id) : undefined}
            />
          ))}
        </div>
        <Dock onAppStoreClick={() => setIsAppStoreOpen(true)} />
        
        {isAppStoreOpen && (
          <AppStore onClose={() => setIsAppStoreOpen(false)} />
        )}
        
        {activeFolder && (
          <Folder
            folder={activeFolder}
            isOpen={true}
            onClose={() => setActiveFolderId(null)}
          />
        )}
      </div>
    </DndProvider>
  );
}

export default Desktop;