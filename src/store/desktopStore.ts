import { create } from 'zustand';
import { DesktopState, App } from '../types';

export const useDesktopStore = create<DesktopState>((set) => ({
  apps: [],
  wallpaper: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
  
  addApp: (app) => set((state) => ({ 
    apps: [...state.apps, app] 
  })),
  
  moveApp: (id, position) => set((state) => ({
    apps: state.apps.map(app =>
      app.id === id ? { ...app, position } : app
    )
  })),
  
  deleteApp: (id) => set((state) => ({
    apps: state.apps.filter(app => app.id !== id)
  })),
  
  createFolder: (apps) => set((state) => {
    const folder: App = {
      id: `folder-${Date.now()}`,
      name: 'New Folder',
      icon: 'folder',
      type: 'folder',
      position: apps[0].position,
      parentId: null,
      children: apps
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