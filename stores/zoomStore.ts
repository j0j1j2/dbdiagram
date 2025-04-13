import {create} from "zustand"; 
interface ZoomState { 
    zoom: number; 
    setZoom: (zoom: number) => void;
}
const useZoomStore = create<ZoomState>((set) => ({
    zoom: 100,
    setZoom: (newZoom) => set({ zoom: newZoom }),
}));

export default useZoomStore;