import { useRef, useState} from "react"
import { useDraggable } from "@neodrag/react"
import { useAppStore, useBaseAppStore } from "../store"
import '../style.css'

export default function BaseApp({ appKey, content }) {
  const [ maximized, setMaximized ] = useState(true)
  const [ isVisible, setIsVisible ] = useState(true)

  const draggableRef = useRef(null);
  useDraggable(draggableRef, { handle: '.titlebar', bounds: 'body' })
  
  const { apps } = useBaseAppStore()
  const p = apps[appKey]
  const { closeApp } = useAppStore()

  return (
    <div className={`window fixed resize grid grid-rows-[1.75rem,1fr] border-2 border-slate-300 h-[${p.height}] w-[95dvw] sm:w-[${p.width}] min-h-[${p.minHeight}] min-w-[${p.minWidth}] max-w-[100dvw] max-h-[100dvh] bg-black bg-opacity-75 text-slate-300 backdrop-blur-md rounded-lg overflow-auto`} 
      ref={draggableRef}
      style={{
              boxShadow: '0px 0px 1rem black',
              resize: maximized ? 'none' : 'both',
              transform: maximized ? 'translate(0px, 0px)' : 'translate(0%, 0%)',
              top: maximized ? '0' : '0%',
              left: maximized ? '0' : '0%',
              height: maximized ? '100vh' : p.height, 
              width: maximized ? '100vw' : p.width,
              minHeight: p.minHeight,
              minWidth: p.minWidth,
              opacity: isVisible ? 1 : 0,
            }}
    >
      <div className="titlebar relative flex items-center cursor-default border-b-2 border-slate-300 py-1.5" 
        onDoubleClick={() => { 
            setMaximized(!maximized)
        }}
      >
        <button 
          className={`close-button ml-1.5 border-2 border-slate-400 p-1.5 text-xs rounded-lg hover:bg-slate-300 hover:border-slate-300 hover: active:bg-slate-500 active:border-slate-500 transition-all`}
          onMouseOver={(e) => {
            e.currentTarget.style.boxShadow = '0px 0px .35rem #a0aec0'
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
          onClick={() => { if (closeApp) {
            setTimeout(() => {
              setIsVisible(!isVisible)
              closeApp(appKey) 
            }, 150)
            }}}
        >
        </button>
        <button 
          className={`min-max-button ml-1.5 border-2 border-orange-300 border-opacity-70 p-1.5 text-xs rounded-lg hover:bg-orange-200 hover:border-orange-200 active:bg-orange-400 active:border-orange-400 transition-all`} 
          onMouseOver={(e) => {
            e.currentTarget.style.boxShadow = '0px 0px .35rem #FBD38D'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.boxShadow = '0 0 .35rem transparent'
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.boxShadow = '0 0 .35rem #ED8936'
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.boxShadow = '0 0 .35rem transparent'
          }}
          onClick={() => { setMaximized(!maximized) }}>            
        </button>
      
       <span className="titlebar-text relative ml-1.5 font-bold">{appKey}</span>
      </div>
      <div className="flex justify-center items-start content overflow-auto">
        {content}
     </div>
    </div>
  )
  
}