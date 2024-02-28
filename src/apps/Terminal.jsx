import { useState, useEffect, useRef } from 'react'
import BaseApp from './BaseApp'
import "../style.css"

function Terminal({ title, onClose, key }) {
  const height = "25rem"
  const width = "40rem"
  const minHeight = "180px"
  const minWidth = "320px"
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
    const terminalMain = inputRef.current?.parentNode.parentNode.parentNode.parentNode
    const focusInput = () => {
      if (inputRef.current && terminalMain) {
        inputRef.current.focus()
      }
    }
    if (terminalMain) {
    terminalMain.addEventListener('click', focusInput)

    return () => {
      terminalMain.removeEventListener('click', focusInput)
    }
  }
  }, [])

  return (
    <BaseApp
      title={title}
      onClose={onClose}
      appKey={key}
      height={height}
      width={width}
      minHeight={minHeight}
      minWidth={minWidth}
      content={
        <div className="terminal-main h-full w-full">
          {entries.map((entry) => (
            <div className="terminal-entry flex flex-col w-full overflow-auto mb-0.25rem" key={entry.id}>
              <span className="terminal-output font-normal">{entry.output}</span>
              <div className="prompt flex justify-around items-center text-black text-opacity-60 h-full gap-2">
                <div className="symbols flex justify-around pl-0.25rem pr-0.25rem bg-white rounded-xl h-full">
                  <span className="symbol ml-2 mr-2">&diams;</span>
                  <span className="symbol ml-2 mr-2">~</span>
                </div>
                <input 
                  className="terminal-input border-0 p-sm outline-none bg-transparent text-base text-white flex-1 h-1rem" 
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