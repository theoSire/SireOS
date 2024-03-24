import { create } from "zustand"

export const useAppStore = create((set) => ({
    activeApps: [],
    zIndex: {},
    maxZIndex: 0,
    focusedApp: undefined,

    openApp: (appKey) => {
      set((state) => {
        if (!state.activeApps.includes(appKey)) {
          return {
            activeApps: [...state.activeApps, appKey],
          }
        }
        return state
      })
    },

    closeApp: (appKey) => {
      set((state) => ({
        activeApps: state.activeApps.filter((key) => key !== appKey),
      }));
      console.log("closed!")
    },

    changeZIndex: (appKey) => {
      set((state) => {
        const newZIndex = state.maxZIndex + 1
        return {
          zIndex: {
            ...state.zIndex,
            [appKey]: newZIndex,
          },
          maxZIndex: newZIndex,
        }
      })
    },

    changeFocusedApp: (appKey) => {
      set(() => ({
        focusedApp: appKey
      }))
    },
}))

export const useBaseAppStore = create((set) => ({
  apps: [],
  addApp: (appKey, properties) => 
    set((state) => {
      if (!(appKey in state.apps)) {
        return { 
          apps: {
            ...state.apps,
            [appKey]: properties,
          }
        }
      } else {
        return state
      }
    }),
}))
