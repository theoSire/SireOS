import { useEffect, useRef } from 'react'
import BaseApp from './BaseApp'
import "../style.css"

export default function Terminal() {
  const inputRef = useRef(null)

  useEffect(() => {
    const focusInput = () => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }
    const terminalMain = inputRef.current.parentNode

    terminalMain.addEventListener('click', focusInput)

    return () => {
      terminalMain.removeEventListener('click', focusInput)
    }
  }, [])

  return (
    <BaseApp
      title="Terminal"
      content={
        <div className="terminal-main">
          <span className="prompt">$</span>
          <input className="terminal-input" type="text" ref={inputRef}/>
        </div>
      }
    />
  )
}
