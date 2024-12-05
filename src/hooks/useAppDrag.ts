import { useDrag } from 'react-dnd';
import { App } from '../types';

export const useAppDrag = (app: App) => {
  return useDrag(() => ({
    type: 'APP',
    item: app,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
};