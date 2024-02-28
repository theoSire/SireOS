import {useRef} from "react"
import { useDraggable } from "@neodrag/react"

export default function BaseApp({ title, content, key, onClose, height, width, minHeight, minWidth }) {
  const draggableRef = useRef(null);
  useDraggable(draggableRef, { handle: '.titlebar', bounds: 'body' })
  content
  return (
    <div className={`window resize absolute grid grid-rows-[1.5rem,1fr] h-[${height}] w-[${width}] min-h-[${minHeight}] min-w-[${minWidth}] mt-0 mb-0 bg-black bg-opacity-50 text-white backdrop-blur-md rounded-lg overflow-auto`} ref={draggableRef}>
      <div className="titlebar relative flex items-center pt-sm pb-sm">
       <button className="close-button mt-0 mr-2 mb-0 ml-2 border-0 p-1.5 bg-yellow-700 rounded-lg" onClick={() => { if (onClose) onClose(key) }}
       ></button>
       <span className="titlebar-text relative z-10">{title}</span>
      </div>
      <div className="content overflow-auto p-1">
        {content}
     </div>
    </div>
  )
}