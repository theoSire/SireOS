import { useState, useEffect, useRef } from 'react'
import { useAppStore, useBaseAppStore } from '../store'
import BaseApp from './BaseApp'
import "../style.css"

function Terminal() {
  const { apps } = useBaseAppStore()
  // console.log("Apps logged from the Terminal: ", apps)
  const TerminalAppKey = apps.Terminal.appKey
  // const { closeApp } = useAppStore()
  // const { addApp } = useBaseAppStore()

  // const TerminalApp = {
  //   appKey: "Terminal",
  //   component: <Terminal onClose={() => closeApp(appKey)}/>,
  //   height: "25rem",
  //   width: "40rem",
  //   minHeight: "180px",
  //   minWidth: "320px",
  // }
  // addApp(TerminalApp.title, TerminalApp)

  const inputRef = useRef(null)
  const [entries, setEntries] = useState([
    { id: 1, input: '', output: 'Welcome to the terminal app!', disable: false }
  ])

  const onChange = (e, id) => {
    const newEntries = [...entries]
    const entryIndex = newEntries.findIndex((entry) => entry.id === id)

    if (entryIndex !== -1) {
      newEntries[entryIndex].input = e.target.value
    }
    setEntries(newEntries)
  }

  const onKeyDown = (e, id) => {
    if (e.key === 'Enter') {
      const newEntries = [...entries]
      const entryIndex = newEntries.findIndex((entry) => entry.id === id)

      if (entryIndex !== -1) {
        newEntries[entryIndex].disable = true
        const output = `Output for: ${newEntries[entryIndex].input}`

        const newEntry = { id: id + 1, input: '', output}
        newEntries.push(newEntry)
        setEntries(newEntries)
      }
    }
  }

  useEffect(() => {
    const appWindow = inputRef.current?.parentNode.parentNode.parentNode.parentNode.parentNode
    const focusInput = () => {
      if (inputRef.current && appWindow) {
        inputRef.current.focus()
      }
    }
    if (appWindow) {
    appWindow.addEventListener('click', focusInput)

    return () => {
      appWindow.removeEventListener('click', focusInput)
    }
  }
  }, [])

  return (
    <BaseApp
      appKey = {TerminalAppKey}
      content={
        <div className="terminal-main h-full w-full">
          {entries.map((entry) => (
            <div className="terminal-entry flex flex-col w-full overflow-auto mb-0.25rem" key={entry.id}>
              <span className="terminal-output font-normal">{entry.output}</span>
              <div className="prompt flex justify-around items-center text-opacity-60 h-full gap-2">
                <div className="symbols flex justify-around border-2 border-slate-400 pl-0.25rem pr-0.25rem rounded-2xl h-full text-slate-400">
                  <span className="symbol ml-2 mr-2">&diams;</span>
                  <span className="symbol ml-2 mr-2">~</span>
                </div>
                <input 
                  className="terminal-input border-0 p-sm outline-none bg-transparent text-base flex-1 h-1rem" 
                  onChange={(e) => onChange(e, entry.id)}
                  onKeyDown={(e) => onKeyDown(e, entry.id)}
                  value={entry.input}
                  ref={inputRef}
                  disabled={entry.disable}
                />
              </div>
            </div>
          ))}
        </div>
      }
    />
  )
}

export default Terminal