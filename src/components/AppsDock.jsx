import { useAppStore, useBaseAppStore } from '../store'
import '../style.css'

export default function AppsDock() {
  const { openApp, changeZIndex, changeFocusedApp } = useAppStore()
  const { apps } = useBaseAppStore()

  const otherLinks = {
    Repository: {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m8 18l-6-6l6-6l1.425 1.425l-4.6 4.6L9.4 16.6zm8 0l-1.425-1.425l4.6-4.6L14.6 7.4L16 6l6 6z"/></svg>,
      url: "https://github.com/theoSire/SireOS",
    },
    Github: {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M7.024 2.31a9.08 9.08 0 0 1 2.125 1.046A11.432 11.432 0 0 1 12 3c.993 0 1.951.124 2.849.355a9.08 9.08 0 0 1 2.124-1.045c.697-.237 1.69-.621 2.28.032c.4.444.5 1.188.571 1.756c.08.634.099 1.46-.111 2.28C20.516 7.415 21 8.652 21 10c0 2.042-1.106 3.815-2.743 5.043a9.456 9.456 0 0 1-2.59 1.356c.214.49.333 1.032.333 1.601v3a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-.991c-.955.117-1.756.013-2.437-.276c-.712-.302-1.208-.77-1.581-1.218c-.354-.424-.74-1.38-1.298-1.566a1 1 0 0 1 .632-1.898c.666.222 1.1.702 1.397 1.088c.48.62.87 1.43 1.63 1.753c.313.133.772.22 1.49.122L8 17.98a3.986 3.986 0 0 1 .333-1.581a9.455 9.455 0 0 1-2.59-1.356C4.106 13.815 3 12.043 3 10c0-1.346.483-2.582 1.284-3.618c-.21-.82-.192-1.648-.112-2.283l.005-.038c.073-.582.158-1.267.566-1.719c.59-.653 1.584-.268 2.28-.031Z"/></g></svg>, 
      url: "https://github.com/theosire",
    },
  }

  return (
    <div className="apps-dock mb-1 sm:mb-0 ml-0 sm:ml-1 px-2 sm:px-1.5 py-1.5 sm:py-2.5 flex sm:flex-col gap-3 border-2 border-slate-400 text-slate-300 bg-black bg-opacity-75 rounded-xl">
      {Object.entries(apps).map(([appKey, app]) => {
        return (
        <button 
          className={`${appKey}-button border-2 border-slate-400 rounded-lg hover:border-slate-300 hover:scale-110 transition-all hover:drop-shadow-[0px_0px_.5rem_#a0aec0] focus:drop-shadow-[0px_0px_.5rem_#64748b]`}
          title={appKey}
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
            className={`${link}-button border-2 border-slate-400 rounded-lg hover:border-slate-300 hover:scale-110 transition-all hover:drop-shadow-[0px_0px_.5rem_#a0aec0] focus:drop-shadow-[0px_0px_.5rem_#64748b]`}
            title={link}
            target="_blank"
          key={link}
          >
            {value.icon}
          </a>
        )
      })}
    </div>  
  )
}