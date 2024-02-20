import { useState, useEffect, useRef } from 'react'
import BaseApp from './BaseApp'
import "../style.css"

function Terminal() {
  const inputRef = useRef(null)
  const [input, setInput] = useState('hello')
  const [inputDisabled, setInputDisabled] = useState(false)

  const onChange = event => {
    setInput(event.target.value)
    console.log(input)
  }

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
          <input 
            className="terminal-input" 
            onChange={onChange}
            value={input}
            disabled={inputDisabled}
            ref={inputRef}
          />
        </div>
      }
    />
  )
}

export default Terminal