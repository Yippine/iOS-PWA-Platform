import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { motion } from 'framer-motion';
import { App } from '../types';
import { useDesktopStore } from '../store/desktopStore';
import IconWrapper from './IconWrapper';

interface AppIconProps {
  app: App;
  onOpen?: () => void;
}

const AppIcon: React.FC<AppIconProps> = ({ app, onOpen }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { moveApp, deleteApp, createFolder } = useDesktopStore();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'APP',
    item: app,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: 'APP',
    drop: (draggedApp: App) => {
      if (draggedApp.id !== app.id) {
        createFolder([draggedApp, app]);
      }
    },
  }));

  const handleLongPress = () => {
    setIsEditing(true);
    const icons = document.querySelectorAll('.app-icon');
    icons.forEach(icon => icon.classList.add('wiggle'));
  };

  const handleClick = () => {
    if (isEditing) {
      deleteApp(app.id);
    } else if (onOpen) {
      onOpen();
    }
  };

  return (
    <motion.div
      ref={(node) => drag(drop(node))}
      className={`app-icon relative ${isDragging ? 'opacity-50' : ''}`}
      whileTap={{ scale: 0.95 }}
      onContextMenu={(e) => {
        e.preventDefault();
        handleLongPress();
      }}
      onClick={handleClick}
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