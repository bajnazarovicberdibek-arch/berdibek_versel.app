import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export default create(
  subscribeWithSelector((set) => ({
    roomPage: 'notebook',
    isNewVisit: true,
    infoPagesVisited: false,
    isOpen: false,
    loadedPage: 'github',
    isPoweredOn: false,
    isFinishedBooting: false,
    switchRoomPage: (page) => set({ roomPage: page }),
    changeVisitStatus: () => {
      set((state) => {
        if (state.isNewVisit) {
          return { isNewVisit: false };
        } else {
          return {};
        }
      });
    },

    open: () => {
      set((state) => {
        if (state.isOpen) {
          return {};
        } else {
          return { isOpen: true };
        }
      });
    },
    close: () => {
      set((state) => {
        if (state.isOpen) {
          return { isOpen: false };
        } else {
          return {};
        }
      });
    },
    powerOn: () => {
      set((state) => {
        if (state.isPoweredOn) {
          return {};
        } else {
          return { isPoweredOn: true };
        }
      });
    },
    powerOff: () => {
      set((state) => {
        if (state.isPoweredOn) {
          return { isPoweredOn: false, isFinishedBooting: false };
        } else {
          return {};
        }
      });
    },
    finishBooting: () => {
      set((state) => {
        if (state.isFinishedBooting) {
          return {};
        } else {
          return { isFinishedBooting: true };
        }
      });
    },
    switchPage: (page) =>
      set((state) => {
        if (state.loadedPage === page) {
          return {};
        } else {
          return { loadedPage: page };
        }
      }),
    accessInfoPages: () =>
      set((state) => {
        if (state.infoPagesVisited) {
          return {};
        } else {
          return { infoPagesVisited: true };
        }
      }),
    // * UNUSED STATE (for the moment)
    // isMobile: false,
    // setMobile: (isMobile) => set({ isMobile }),
  }))
);