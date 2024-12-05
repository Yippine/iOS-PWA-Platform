import React from 'react';
import { useDrag } from 'react-dnd';
import { motion } from 'framer-motion';
import { App } from '../types';
import { useDesktopStore } from '../store/desktopStore';
import IconWrapper from './IconWrapper';

interface AppIconProps {
  app: App;
}

const AppIcon: React.FC<AppIconProps> = ({ app }) => {
  const moveApp = useDesktopStore((state) => state.moveApp);
  const deleteApp = useDesktopStore((state) => state.deleteApp);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'APP',
    item: app,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const handleLongPress = () => {
    const icons = document.querySelectorAll('.app-icon');
    icons.forEach(icon => icon.classList.add('wiggle'));
  };

  return (
    <motion.div
      ref={drag}
      className={`app-icon relative ${isDragging ? 'opacity-50' : ''}`}
      whileTap={{ scale: 0.95 }}
      onContextMenu={(e) => {
        e.preventDefault();
        handleLongPress();
      }}
      style={{
        position: 'absolute',
        left: app.position.x,
        top: app.position.y,
      }}
    >
      <IconWrapper icon={app.icon} name={app.name} />
    </motion.div>
  );
}

export default AppIcon;