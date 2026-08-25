/**
 * =============================================================================
 * shared/hooks/useToast.ts — Global Toast State
 * =============================================================================
 *
 * A Zustand store that manages the global toast notification state.
 * This allows any feature (like the Cart) to easily trigger a toast
 * without prop drilling or complex context providers.
 */

import { create } from "zustand";

export interface ToastState {
  isVisible: boolean;
  message: string;
  
  // Actions
  show: (message: string) => void;
  hide: () => void;
}

export const useToast = create<ToastState>((set, get) => ({
  isVisible: false,
  message: "",
  
  show: (message: string) => {
    // If a toast is already visible, this updates the message and 
    // effectively restarts the visual perception of it.
    set({ isVisible: true, message });
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      // Only hide if the message hasn't changed in the meantime
      if (get().message === message) {
        set({ isVisible: false });
      }
    }, 3000);
  },
  
  hide: () => {
    set({ isVisible: false });
  },
}));
