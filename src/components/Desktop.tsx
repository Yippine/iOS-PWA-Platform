import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { useDesktopStore } from '../store/desktopStore';
import AppIcon from './AppIcon';
import Dock from './Dock';

const Desktop: React.FC = () => {
  const { apps, wallpaper } = useDesktopStore();
  const isTouchDevice = 'ontouchstart' in window;

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
        <div className="grid grid-cols-6 gap-4 p-4">
          {apps.map((app) => (
            <AppIcon key={app.id} app={app} />
          ))}
        </div>
        <Dock />
      </div>
    </DndProvider>
  );
}

export default Desktop;