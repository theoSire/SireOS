import { useState } from "react"
import Terminal from "./apps/Terminal"
import Weather from "./apps/WeatherApp"
import Browser from "./apps/Browser"
import Clock from "./apps/Clock"
import Calculator from "./apps/Calculator"

export default function App() {
  const [activeApps, setActiveApps] = useState([])
  const [zIndex, setZIndex] = useState({})
  const [maxZIndex, setMaxZIndex] = useState(0)
  const [isFocused, setIsFocused] = useState(false)
  
  const closeApp = (appKey) => {
    setActiveApps(activeApps.filter((key) => key !== appKey))
  }

  const apps = [
    { component: <Terminal title="Terminal" onClose={() => closeApp("terminal")} appKey="terminal" isFocused={isFocused}/>},
    { component: <Weather title="Weather" onClose={() => closeApp("weather")} appKey="weather" />},
    { component: <Browser title="Browser" onClose={() => closeApp("browser")} appKey="browser" />},
    { component: <Clock title="Clock" onClose={() => closeApp("clock")} appKey="clock" />},
    { component: <Calculator title="Calculator" onClose={() => closeApp("calculator")} appKey="calculator" />}
  ]

  const openApp = (appKey) => {
    const isAppActive = activeApps.includes(appKey)
    if (!isAppActive) {
      setActiveApps([...activeApps, appKey])
    }
  }

  const changeZIndex = (appKey) => {
    const newZIndex = maxZIndex + 1

    setZIndex((prevZIndex) => ({
      ...prevZIndex,
      [appKey]: newZIndex,
    }))

    setMaxZIndex(newZIndex)
  }

  // console.log(isFocused)
  return (
    <div className="desktop flex justify-center align-top">
      <div className="apps-panel flex text-black ">
        {apps.map((app) => (
          <button 
            className={`${app.component.props.title}-button border-2 bg-orange-600 border-red-900 m-1 p-1`} 
            key={app.component.props.appKey}
            onClick={() => {
              openApp(app.component.props.appKey)
              changeZIndex()
              setIsFocused(true)
            }
            }
          >
            {app.component.props.title}
          </button>
        ))}
      </div>
      <div className="active-apps relative">
        {activeApps.map((appKey) => (
          <div className={`${appKey} relative`}
            key={appKey} 
            style={{ zIndex: `${zIndex[appKey] || maxZIndex}` }}
            onMouseDown={() => {changeZIndex(appKey)}}
          >
            {apps.find((app) => app.component.props.appKey === appKey).component}
          </div>
        ))}
      </div>
    </div>
  )
}
