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

  toggleMaximize: (appKey) => 
    set((state) => {
      const newMaxState = !state.apps[appKey].maximized
      return {
        ...state,
        apps: {
          ...state.apps,
          [appKey]: {
            ...state.apps[appKey],
            maximized: newMaxState
          }
        }
      }
    }),

  toggleVisibility: (appKey) => 
    set((state) => {
      const newVisibility = !state.apps[appKey].isVisible
      return {
        ...state,
        apps: {
          ...state.apps,
          [appKey]: {
            ...state.apps[appKey],
            isVisible: newVisibility
          }
        }
      }
    })
}))
