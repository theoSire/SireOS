import { useAppStore, useBaseAppStore } from './store.js'
import Terminal from "./apps/Terminal"
import Weather from "./apps/WeatherApp"
import Browser from "./apps/Browser"
import Clock from "./apps/Clock"
import Calculator from "./apps/Calculator"
import AppsDock from './components/AppsDock.jsx'
import Panel from './components/Panel.jsx'

export default function App() {
  const { activeApps, zIndex, maxZIndex, closeApp, changeZIndex } = useAppStore()
  const { apps, addApp } = useBaseAppStore()

  const TerminalApp = {
    appKey: "Terminal",
    component: <Terminal onClose={() => closeApp(this.appKey)}/>,
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1m9 12v2h6v-2zm-3.586-3l-2.828 2.828L7 16.243L11.243 12L7 7.757L5.586 9.172z"/></svg>,
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
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M13 20a1 1 0 1 1 0 2a1 1 0 0 1 0-2m-3.5-1a1 1 0 1 1 0 2a1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2a1 1 0 0 1 0-2M13.002 6.009c3.168 0 4.966 2.097 5.227 4.63h.08a3.687 3.687 0 0 1 3.692 3.683a3.687 3.687 0 0 1-3.692 3.682H7.694a3.687 3.687 0 0 1-3.692-3.682a3.687 3.687 0 0 1 3.692-3.683h.08c.263-2.55 2.06-4.63 5.228-4.63M6.589 2a5.06 5.06 0 0 1 2.263.674A5.06 5.06 0 0 1 11.06 5.27c-1.984.563-3.404 2.002-3.994 3.947l-.069.245l-.058.238l-.206.039a4.67 4.67 0 0 0-2.804 1.814a5.06 5.06 0 0 1-1.797-1.599a.75.75 0 0 1 .366-1.132c1.643-.588 2.527-1.25 3.034-2.216c.552-1.055.654-2.174.287-3.677A.75.75 0 0 1 6.59 2"/></svg>,
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
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M21 12a9 9 0 1 0-9 9M3.6 9h16.8M3.6 15h7.9"></path><path d="M11.5 3a17 17 0 0 0 0 18m1-18a17 17 0 0 1 2.574 8.62M15 18a3 3 0 1 0 6 0a3 3 0 1 0-6 0m5.2 2.2L22 22"></path></g></svg>,
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
    <div className='w-full h-full'>
      <div className='w-full h-[5%] flex sm:items-center'>
        <Panel/>
      </div>
      <div className="apps-dock-parent w-full h-[95%] relative flex justify-center sm:justify-start items-end sm:items-center">
        <AppsDock/>
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
    </div>
  )
}
