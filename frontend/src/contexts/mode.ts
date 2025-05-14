import { create } from 'zustand';

export type ThemeMode = 'light' | 'dark';

interface ThemeStore {
    mode: ThemeMode;
    toggleMode: () => void;
    setMode: (mode: ThemeMode) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
    mode: 'light',
    toggleMode: () =>
        set((state) => ({
            mode: state.mode === 'light' ? 'dark' : 'light',
        })),
    setMode: (mode) => set({ mode }),
}));
