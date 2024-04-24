import { useState, useEffect, useRef } from 'react'
import { useBaseAppStore } from '../store'
import BaseApp from './BaseApp'
import "../style.css"

function Terminal() {
  const { apps } = useBaseAppStore()
  const TerminalAppKey = apps.Terminal.appKey

  const inputRef = useRef(null)
  const [entries, setEntries] = useState([
    { id: 1,
      input: '',
      output: <div className='welcome-message flex flex-col font-bold'><span className="text-orange-400">Welcome sir!</span><span className='text-blue-400'>Available commands: echo, neofetch, clear, help</span></div>,
      disable: false }
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
      let newEntries = [...entries]
      const entryIndex = newEntries.findIndex((entry) => entry.id === id)
      let output = []

      if (entryIndex !== -1) {
        newEntries[entryIndex].disable = true
        const browser = navigator.userAgent
        const screenResolution = `${screen.width}x${screen.height}`

        switch (newEntries[entryIndex].input.split(' ')[0]) {
          case 'echo':
            output = <span className='output ml-1 mb-1'>{newEntries[entryIndex].input.split(' ')[1]}</span>
            break
          case 'neofetch':
            output = <div className="output flex gap-3 m-2 items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 32 32"><path fill="orange" d="M14.948 1a5 5 0 0 0-3.2 1.159l-3.3 2.75a4 4 0 0 0-1.224 4.37l.361 1.053l-.038 1.181a2 2 0 0 1-.812 1.546L2.05 16.515a2.485 2.485 0 0 0 1.058 4.45a4 4 0 0 0-.343 3.64l.235.588V27a4 4 0 0 0 4 4h15a5 5 0 0 0 5-5v-2.085c.156.055.325.085.5.085h1a2.5 2.5 0 0 0 2.5-2.5v-14A2.5 2.5 0 0 0 28.5 5h-1c-.205 0-.4.041-.578.115A5.002 5.002 0 0 0 22 1zM27 7h1.5a.5.5 0 0 1 .5.5v14a.5.5 0 0 1-.5.5H27zM13.028 3.695A3 3 0 0 1 14.948 3H22a3 3 0 0 1 3 3v3.789a42.58 42.58 0 0 0-4.93 4.219c-1.989 1.992-3.918 4.378-4.775 6.736a.75.75 0 0 0 1.41.512c.743-2.042 2.48-4.24 4.426-6.189A41.395 41.395 0 0 1 25 11.664V26a3 3 0 0 1-3 3H7a2 2 0 0 1-2-2v-2h9a1 1 0 1 0 0-2H4.482a2 2 0 0 1 .51-1.219L6.595 20H9.81a2 2 0 0 0 1.87-1.319l2.41-6.65c.235-.647-.56-.645-.812-.004l-2.48 6.337a1 1 0 0 1-.93.636H3.519a.485.485 0 0 1-.282-.876l4.685-3.455a4 4 0 0 0 1.624-3.091L9.565 11h1.6l.779-.573c.796-.586 1.79-.18 2.122.573H19a2 2 0 1 0 0-4H9.265a1.99 1.99 0 0 1 .463-.555z"/></svg>
                        <div className='client-info'>
                          <div className="flex gap-2">
                            <span className='font-bold text-blue-400'>os:</span>
                            <a href="https://github.com/theoSire/sireOS" className="text-green-400 underline">SireOS</a>
                          </div>
                          <div className="flex gap-2">
                            <span className='font-bold text-blue-400'>browser:</span>
                            <span className="text-green-400">{browser}</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="font-bold text-blue-400">screen Resolution:</span>
                            <span className="text-green-400">{screenResolution}</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="font-bold text-blue-400">made by:</span>
                            <a href="https://github.com/theoSire" className="text-green-400 underline">theofrid</a>
                          </div>
                          <div className="flex gap-2">
                            <span className="font-bold text-blue-400">built with:</span>
                            <div className='flex'>
                              <a href="https://react.dev" className="text-green-400 underline">react</a>
                              <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 32 32"><circle cx="16" cy="15.974" r="2.5" fill="#007acc"/><path fill="#007acc" d="M16 21.706a28.385 28.385 0 0 1-8.88-1.2a11.3 11.3 0 0 1-3.657-1.958A3.543 3.543 0 0 1 2 15.974c0-1.653 1.816-3.273 4.858-4.333A28.755 28.755 0 0 1 16 10.293a28.674 28.674 0 0 1 9.022 1.324a11.376 11.376 0 0 1 3.538 1.866A3.391 3.391 0 0 1 30 15.974c0 1.718-2.03 3.459-5.3 4.541a28.8 28.8 0 0 1-8.7 1.191m0-10.217a27.948 27.948 0 0 0-8.749 1.282c-2.8.977-4.055 2.313-4.055 3.2c0 .928 1.349 2.387 4.311 3.4A27.21 27.21 0 0 0 16 20.51a27.6 27.6 0 0 0 8.325-1.13C27.4 18.361 28.8 16.9 28.8 15.974a2.327 2.327 0 0 0-1.01-1.573a10.194 10.194 0 0 0-3.161-1.654A27.462 27.462 0 0 0 16 11.489"/><path fill="#007acc" d="M10.32 28.443a2.639 2.639 0 0 1-1.336-.328c-1.432-.826-1.928-3.208-1.327-6.373a28.755 28.755 0 0 1 3.4-8.593a28.676 28.676 0 0 1 5.653-7.154a11.376 11.376 0 0 1 3.384-2.133a3.391 3.391 0 0 1 2.878 0c1.489.858 1.982 3.486 1.287 6.859a28.806 28.806 0 0 1-3.316 8.133a28.385 28.385 0 0 1-5.476 7.093a11.3 11.3 0 0 1-3.523 2.189a4.926 4.926 0 0 1-1.624.307m1.773-14.7a27.948 27.948 0 0 0-3.26 8.219c-.553 2.915-.022 4.668.75 5.114c.8.463 2.742.024 5.1-2.036a27.209 27.209 0 0 0 5.227-6.79a27.6 27.6 0 0 0 3.181-7.776c.654-3.175.089-5.119-.713-5.581a2.327 2.327 0 0 0-1.868.089A10.194 10.194 0 0 0 17.5 6.9a27.464 27.464 0 0 0-5.4 6.849Z"/><path fill="#007acc" d="M21.677 28.456c-1.355 0-3.076-.82-4.868-2.361a28.756 28.756 0 0 1-5.747-7.237a28.676 28.676 0 0 1-3.374-8.471a11.376 11.376 0 0 1-.158-4A3.391 3.391 0 0 1 8.964 3.9c1.487-.861 4.01.024 6.585 2.31a28.8 28.8 0 0 1 5.39 6.934a28.384 28.384 0 0 1 3.41 8.287a11.3 11.3 0 0 1 .137 4.146a3.543 3.543 0 0 1-1.494 2.555a2.59 2.59 0 0 1-1.315.324m-9.58-10.2a27.949 27.949 0 0 0 5.492 6.929c2.249 1.935 4.033 2.351 4.8 1.9c.8-.465 1.39-2.363.782-5.434A27.212 27.212 0 0 0 19.9 13.74a27.6 27.6 0 0 0-5.145-6.64c-2.424-2.152-4.39-2.633-5.191-2.169a2.327 2.327 0 0 0-.855 1.662a10.194 10.194 0 0 0 .153 3.565a27.465 27.465 0 0 0 3.236 8.1Z"/></svg>
                            </div>
                          </div>
                        </div>
                      </div>
            break
          case 'clear':
            newEntries = []
            output = <br className='m-1'/>
            break
          case 'help':
            output = <div className='output flex gap-2 ml-1 mb-1'><span className='font-bold'>Available commands:</span><span>echo, neofetch, clear, help</span></div>
            break
          default:
            output = <div className='output ml-1 mb-1'><span className='text-white'>{newEntries[entryIndex].input}:</span><span className='font-bold text-red-500'> command not found</span></div>
            break
        }

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
  console.log(entries)
  
  return (
    <BaseApp
      appKey = {TerminalAppKey}
      content={
        <div className="terminal-main h-full w-full p-1">
          {entries.map((entry) => (
            <div className="terminal-entry flex flex-col w-full overflow-auto mb-0.25rem" key={entry.id}>
              {entry.output}
              <div className="prompt flex justify-around items-center text-opacity-60 h-full gap-2">
                <div className="symbols flex justify-around border-2 border-slate-300 pl-0.25rem pr-0.25rem rounded-2xl h-full text-slate-300">
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