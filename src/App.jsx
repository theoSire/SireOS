import { useAppStore, useBaseAppStore } from './store.js'
import Terminal from "./apps/Terminal"
import Weather from "./apps/WeatherApp"
import Browser from "./apps/Browser"
import Clock from "./apps/Clock"
import Calculator from "./apps/Calculator"
import { useEffect } from 'react'

export default function App() {
  const { activeApps, zIndex, maxZIndex, focusedApp, openApp, closeApp, changeZIndex, changeFocusedApp } = useAppStore()
  const { apps, addApp } = useBaseAppStore()

  const TerminalApp = {
    appKey: "Terminal",
    component: <Terminal onClose={() => closeApp(this.appKey)}/>,
    height: "25rem",
    width: "40rem",
    minHeight: "180px",
    minWidth: "320px",
  }
  addApp(TerminalApp.appKey, TerminalApp)
  // console.log(TerminalApp)
  // console.log("apps:", apps)

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
