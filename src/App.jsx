import { useState } from "react"
import Terminal from "./apps/Terminal"
import Weather from "./apps/WeatherApp"
import Browser from "./apps/Browser"
import Clock from "./apps/Clock"
import Calculator from "./apps/Calculator"

export default function App() {
  const [activeApps, setActiveApps] = useState([])
  
    const closeApp = (appKey) => {
      setActiveApps(activeApps.filter((key) => key !== appKey))
    }

  const apps = [
    { component: <Terminal title="Terminal" onClose={() => closeApp("terminal")} appKey="terminal"/>},
    { component: <Weather title="Weather" onClose={() => closeApp("weather")} appKey="weather" />},
    { component: <Browser title="Browser" onClose={() => closeApp("browser")} appKey="browser" />},
    { component: <Clock title="Clock" onClose={() => closeApp("clock")} appKey="clock" />},
    { component: <Calculator title="Calculator" onClose={() => closeApp("calculator")} appKey="calculator" />}
  ]

  const openApp = (appKey) => {
    console.log(appKey)
    const isAppActive = activeApps.includes(appKey)
    if (!isAppActive) {
      setActiveApps([...activeApps, appKey])
    }
  }
  
  return (
    <>
      <div className="apps-panel">
        {apps.map((app) => (
          <button 
            className={`${app.component.props.title}-button`} 
            key={app.component.props.appKey}
            onClick={() => openApp(app.component.props.appKey)
            }
          >
            {app.component.props.title}
          </button>
        ))}
      </div>
      <div className="active-apps">
        {activeApps.map((appKey) => (
          <div key={appKey} className="active-app">
            {apps.find((app) => app.component.props.appKey === appKey).component}
          </div>
        ))}
      </div>
    </>
  )
}
