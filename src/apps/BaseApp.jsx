import { useEffect, useRef, useState } from "react"
import { useDraggable } from "@neodrag/react"
import { useAppStore, useBaseAppStore } from "../store"
import '../style.css'

export default function BaseApp({ appKey, content }) {
  const draggableRef = useRef(null);
  useDraggable(draggableRef, { handle: '.titlebar', bounds: 'body' })

  const { apps, toggleMaximize, toggleVisibility } = useBaseAppStore()
  const p = apps[appKey]
  const { closeApp } = useAppStore()

  return (
    <div className={`window fixed resize grid grid-rows-[1.75rem,1fr] border-2 border-slate-400 h-[${p.height}] w-[95dvw] sm:w-[${p.width}] max-w-[100dvw] max-h-[100dvh] bg-black bg-opacity-75 text-slate-300 backdrop-blur-md rounded-lg overflow-auto`} 
      ref={draggableRef}
      style={{
              boxShadow: '0px 0px 1rem black',
              resize: p.maximized ? 'none' : 'both',
              transform: p.maximized ? 'translate(0px, 0px)' : 'translate(0%, 0%)',
              top: p.maximized ? '0' : '0%',
              left: p.maximized ? '0' : '0%',
              height: p.maximized ? '100vh' : p.height, 
              width: p.maximized ? '100vw' : p.width,
              minHeight: p.minHeight,
              minWidth: p.minWidth,
              opacity: p.isVisible ? 1 : 0,
            }}
    >
      <div className="titlebar relative flex items-center cursor-default" 
        onDoubleClick={() => { 
            toggleMaximize(appKey)
        }}
      >
        <button 
          className={`close-button ml-1.5 border-2 border-slate-400 p-1.5 text-xs rounded-lg hover:bg-slate-300 hover:border-slate-300 active:bg-slate-500 active:border-slate-500 transition-colors duration-300`} 
          onClick={() => { if (closeApp) {
            setTimeout(() => {
              toggleVisibility(appKey)
              closeApp(appKey) 
            }, 150)
            }}}
        >
        </button>
        <button 
          className={`min-max-button ml-1.5 border-2 border-orange-300 border-opacity-70 p-1.5 text-xs rounded-lg hover:bg-orange-200 hover:border-orange-200 active:bg-orange-400 active:border-orange-400 transition-colors duration-300`} 
          onClick={() => { toggleMaximize(appKey) }}>            
        </button>
       <span className="titlebar-text relative ml-1.5">{appKey}</span>
      </div>
      <div className="content overflow-auto p-1">
        {content}
     </div>
    </div>
  )
  
}