export interface App {
  id: string;
  name: string;
  icon: string;
  type: 'app' | 'folder';
  position: { x: number; y: number };
  parentId: string | null;
  children?: App[];
}

export interface DesktopState {
  apps: App[];
  wallpaper: string;
  addApp: (app: App) => void;
  moveApp: (id: string, position: { x: number; y: number }) => void;
  deleteApp: (id: string) => void;
  createFolder: (apps: App[]) => void;
  setWallpaper: (url: string) => void;
}