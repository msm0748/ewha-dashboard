import { create } from 'zustand';

interface LayoutState {
  title: string;
  setTitle: (title: string) => void;
}

export const useLayoutStore = create<LayoutState>((set) => ({
  title: '대시보드',
  setTitle: (title) => set({ title }),
}));
