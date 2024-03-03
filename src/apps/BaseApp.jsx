import {useRef, useState} from "react"
import { useDraggable } from "@neodrag/react"
import '../style.css'

export default function BaseApp({ title, content, appKey, onClose, height, width, minHeight, minWidth, isFocused }) {
  let h = height
  let w = width

  const [maximized, setMaximized] = useState(true)
  const [isVisible, setIsVisible] = useState(true)

  const draggableRef = useRef(null);
  useDraggable(draggableRef, { handle: '.titlebar', bounds: 'body' })

  // console.log(maximized)
  return (
    <div className={`window resize fixed grid grid-rows-[1.75rem,1fr] border-2 border-slate-400 h-[${h}] w-[95dvw] sm:w-[${w}] min-h-[${minHeight}] min-w-[${minWidth}] max-w-[100dvw] max-h-[100dvh] bg-black bg-opacity-75 text-slate-300 backdrop-blur-md rounded-lg overflow-auto`} 
      ref={draggableRef}
      style={{
              boxShadow: '0px 0px 1rem black',
              transform: maximized ? 'translate(0px, 0px)' : 'translate(-50%, -50%)',
              height: maximized ? '100vh' : h, 
              width: maximized ? '100vw' : w,
              top: maximized ? '0%' : '50%',
              left: maximized ? '0%' : '50%',
              opacity: isVisible ? 1 : 0,
            }}
    >
      <div className="titlebar relative flex items-center cursor-default" 
        onDoubleClick={() => { 
            setMaximized(!maximized)
        }}
      >
        <button 
          className={`close-button ml-1.5 border-2 border-slate-400 p-1.5 text-xs rounded-lg hover:bg-slate-300 hover:border-slate-300 active:bg-slate-500 active:border-slate-500 transition-colors duration-300`} 
          onClick={() => { if (onClose) {
            setTimeout(() => {
              setIsVisible(!isVisible)
              onClose(appKey) 
            }, 150)
            }}}
        >
        </button>
        <button 
          className={`min-max-button ml-1.5 border-2 border-orange-300 border-opacity-70 p-1.5 text-xs rounded-lg hover:bg-orange-200 hover:border-orange-200 active:bg-orange-400 active:border-orange-400 transition-colors duration-300`} 
          onClick={() => { setMaximized(!maximized) }}>            
        </button>
       <span className="titlebar-text relative ml-1.5">{title}</span>
      </div>
      <div className="content overflow-auto p-1">
        {content}
     </div>
    </div>
  )
  
}