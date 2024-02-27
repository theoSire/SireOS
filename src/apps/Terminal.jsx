import { useState, useEffect, useRef } from 'react'
import BaseApp from './BaseApp'
import "../style.css"

function Terminal({ title, onClose, key }) {
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
      content={
        <div className="terminal-main">
          {entries.map((entry) => (
            <div className='terminal-entry' key={entry.id}>
              <span className='terminal-output'>{entry.output}</span>
              <div className="prompt">
                <div className="symbols">
                  <span className="symbol">&diams;</span>
                  <span className="symbol">~</span>
                </div>
                <input 
                  className="terminal-input" 
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