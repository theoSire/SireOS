import {useRef} from "react"
import { useDraggable } from "@neodrag/react"
import "../style.css"

export default function BaseApp({ title, content, key, onClose }) {
  const draggableRef = useRef(null);
  useDraggable(draggableRef, { handle: '.titlebar', bounds: 'body' })

  return (
    <div className="window" ref={draggableRef}>
      <div className="titlebar">
       <button 
        className="close-button"
        onClick={() => {
          if (onClose) onClose(key)
        }}
       >X</button>
       <span className="titlebar-text">{title}</span>
      </div>
      <div className="content">
        {content}
     </div>
    </div>
  )
}