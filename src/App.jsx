import { useAppStore, useBaseAppStore } from './store.js'
import Terminal from "./apps/Terminal"
import Weather from "./apps/WeatherApp"
import Browser from "./apps/Browser"
import Clock from "./apps/Clock"
import Calculator from "./apps/Calculator"
import { useEffect } from 'react'

export default function App() {
  const { activeApps, zIndex, maxZIndex, openApp, closeApp, changeZIndex, changeFocusedApp } = useAppStore()
  const { apps, addApp } = useBaseAppStore()

  const TerminalApp = {
    appKey: "Terminal",
    component: <Terminal onClose={() => closeApp(this.appKey)}/>,
    height: "25rem",
    width: "40rem",
    minHeight: "180px",
    minWidth: "320px",
    maximized: true,
    isVisible: true,
  }

  const WeatherApp = {
    appKey: "Weather",
    component: <Weather onClose={() => closeApp(this.appKey)}/>,
    height: "25rem",
    width: "40rem",
    minHeight: "350px",
    minWidth: "322px",
    maximized: false,
    isVisible: true,
  }

  const BrowserApp = {
    appKey: "Browser",
    component: <Browser onClose={() => closeApp(this.appKey)}/>,
    height: "25rem",
    width: "40rem",
    minHeight: "350px",
    minWidth: "440px",
    maximized: false,
    isVisible: true,
  }

  addApp(TerminalApp.appKey, TerminalApp)
  addApp(WeatherApp.appKey, WeatherApp)
  addApp(BrowserApp.appKey, BrowserApp)

  return (
    <div className="desktop flex justify-center align-top">
      <div className="apps-panel flex text-black ">
        {Object.entries(apps).map(([appKey, app]) => {
          return (
          <button 
            className={`${appKey}-button border-2 bg-orange-600 border-red-900 m-1 p-1`} 
            key={appKey}
            onClick={() => {
              openApp(appKey)
              changeZIndex(appKey)
              changeFocusedApp(appKey)
            }}
          >
            {app.appKey}
          </button>
          )
        })}
      </div>
      <div className="active-apps relative">
        {activeApps.map((appKey) => (
          <div className={`${appKey} relative`}
            key={appKey}
            style={{ zIndex: `${zIndex[appKey] || maxZIndex}` }}
            onMouseDown={() => {changeZIndex(appKey)}}
          >
            {apps[appKey].component}
          </div>
        ))}
      </div>
    </div>
  )
}
