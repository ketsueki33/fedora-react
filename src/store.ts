import { create } from "zustand";

interface StoreState {
    wallpaper: string;
    setWallpaper: (newWallpaper: string) => void;

    time: Date;
    updateTime: () => void;
}

const useBaseStore = create<StoreState>()((set) => ({
    time: new Date(),
    wallpaper: "/src/assets/wallpapers/waves.png",
    setWallpaper: (newWallpaper) =>
        set(() => ({ wallpaper: `/src/assets/wallpapers/${newWallpaper}` })),
    updateTime: () => set(() => ({ time: new Date() })),
}));

export default useBaseStore;
