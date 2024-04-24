import { useBaseAppStore } from '../store'
import BaseApp from './BaseApp'
import "../style.css"
import { useEffect, useState } from 'react'

function Browser() {
  const { apps } = useBaseAppStore()
  const BrowserAppKey = apps.Browser.appKey
  const [input, setInput] = useState('')
  const [link, setLink] = useState('')
  const searchURL = "https://swisscows.com/en/web?query="

  const onChange = (e) => {
    setInput(e.target.value)
  }

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      if (e.target.value.startsWith("https://") || e.target.value.startsWith("http://")) {
        setLink(input)
      } else {
        setLink(`${searchURL}${input}`)
      }
    }
  }

  useEffect(() => {
    setInput(link)
  },[link])

  return (
    <BaseApp
      appKey = {BrowserAppKey}
      content={
        <div className="browser-main flex flex-col w-full h-full">
          <div className="nav-bar w-full pl-1 py-[.12rem] flex gap-1.5 border-b-2 border-slate-300">
            <input 
              className="search-bar mr-1.5 border-2 border-slate-300 rounded-xl bg-transparent px-3.5 placeholder-slate-600 outline-none flex-1"
              type="text" 
              placeholder="Search with Swisscows or enter address"
              value={input}
              onChange={(e) => onChange(e)}
              onKeyDown={(e) => onKeyDown(e)}
            />
          </div>
          <iframe className="flex-1 w-full" src={link}></iframe>
        </div>
      }
    />
  )
}

export default Browser