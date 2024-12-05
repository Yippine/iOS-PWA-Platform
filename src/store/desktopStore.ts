import { create } from 'zustand';
import { DesktopState, App } from '../types';

const GRID_SIZE = 100;
const GRID_PADDING = 20;
const APPS_PER_ROW = 6;

const calculateNextPosition = (apps: App[]) => {
  if (apps.length === 0) {
    return { x: GRID_PADDING, y: GRID_PADDING };
  }

  const positions = apps.map(app => ({
    x: Math.floor((app.position.x - GRID_PADDING) / GRID_SIZE),
    y: Math.floor((app.position.y - GRID_PADDING) / GRID_SIZE)
  }));

  let row = 0;
  let col = 0;
  let found = false;

  while (!found) {
    const pos = { x: col, y: row };
    const isOccupied = positions.some(p => p.x === pos.x && p.y === pos.y);

    if (!isOccupied) {
      found = true;
    } else {
      col++;
      if (col >= APPS_PER_ROW) {
        col = 0;
        row++;
      }
    }
  }

  return {
    x: col * GRID_SIZE + GRID_PADDING,
    y: row * GRID_SIZE + GRID_PADDING
  };
};

export const useDesktopStore = create<DesktopState>((set) => ({
  apps: [],
  wallpaper: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
  
  addApp: (app) => set((state) => {
    // Check if app already exists
    if (state.apps.some(a => a.id === app.id)) {
      return state;
    }

    const position = calculateNextPosition(state.apps);
    return { 
      apps: [...state.apps, { ...app, position }]
    };
  }),
  
  moveApp: (id, position) => set((state) => ({
    apps: state.apps.map(app =>
      app.id === id ? { ...app, position } : app
    )
  })),
  
  deleteApp: (id) => set((state) => ({
    apps: state.apps.filter(app => app.id !== id)
  })),
  
  createFolder: (apps) => set((state) => {
    const position = apps[0].position;
    const folderId = `folder-${Date.now()}`;
    const folder: App = {
      id: folderId,
      name: 'New Folder',
      icon: 'folder',
      type: 'folder',
      position,
      parentId: null,
      children: apps.map(app => ({
        ...app,
        parentId: folderId
      }))
    };
    
    return {
      apps: [
        ...state.apps.filter(app => !apps.includes(app)),
        folder
      ]
    };
  }),
  
  setWallpaper: (url) => set({ wallpaper: url })
}));