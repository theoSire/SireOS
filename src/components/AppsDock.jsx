import { useAppStore, useBaseAppStore } from '../store'
import '../style.css'

export default function AppsDock() {
  const { openApp, changeZIndex, changeFocusedApp } = useAppStore()
  const { apps } = useBaseAppStore()

  const otherLinks = {
    repository: {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m8 18l-6-6l6-6l1.425 1.425l-4.6 4.6L9.4 16.6zm8 0l-1.425-1.425l4.6-4.6L14.6 7.4L16 6l6 6z"/></svg>,
      url: "https://github.com/theoSire/SireOS",
    },
    github: {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59c.4.07.55-.17.55-.38c0-.19-.01-.82-.01-1.49c-2.01.37-2.53-.49-2.69-.94c-.09-.23-.48-.94-.82-1.13c-.28-.15-.68-.52-.01-.53c.63-.01 1.08.58 1.23.82c.72 1.21 1.87.87 2.33.66c.07-.52.28-.87.51-1.07c-1.78-.2-3.64-.89-3.64-3.95c0-.87.31-1.59.82-2.15c-.08-.2-.36-1.02.08-2.12c0 0 .67-.21 2.2.82c.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82c.44 1.1.16 1.92.08 2.12c.51.56.82 1.27.82 2.15c0 3.07-1.87 3.75-3.65 3.95c.29.25.54.73.54 1.48c0 1.07-.01 1.93-.01 2.2c0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/></svg>,
      url: "https://github.com/theosire",
    },
  }

  return (
    <div className="apps-dock mb-1 sm:mb-0 ml-0 sm:ml-1 px-2 sm:px-1.5 py-1.5 sm:py-2.5 flex sm:flex-col gap-3 border-2 border-slate-400 text-slate-300 bg-black bg-opacity-75 rounded-xl">
      {Object.entries(apps).map(([appKey, app]) => {
        return (
        <button 
          className={`${appKey}-button border-2 border-slate-400 rounded-lg hover:border-slate-300 hover:scale-110 transition-all`} 
          onMouseOver={(e) => {
            e.currentTarget.style.boxShadow = '0px 0px .50rem #a0aec0'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.boxShadow = '0px 0px .35rem transparent'
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.boxShadow = '0px 0px .35rem #64748b'
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.boxShadow = '0px 0px .35rem transparent'
          }}
          key={appKey}
          onClick={() => {
            openApp(appKey)
            changeZIndex(appKey)
            changeFocusedApp(appKey)
          }}
        >
          {app.icon}
        </button>
        )
      })}
      {Object.entries(otherLinks).map(([link, value]) => {
        return (
          <a href={value.url}
            className={`${link}-button border-2 border-slate-400 rounded-lg hover:border-slate-300 hover:scale-110 transition-all`}
            target="_blank"
            onMouseOver={(e) => {
            e.currentTarget.style.boxShadow = '0px 0px .50rem #a0aec0'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.boxShadow = '0px 0px .35rem transparent'
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.boxShadow = '0px 0px .35rem #64748b'
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.boxShadow = '0px 0px .35rem transparent'
          }}
          key={link}
          >
            {value.icon}
          </a>
        )
      })}
    </div>  
  )
}