import {useRef} from "react"
import { useDraggable } from "@neodrag/react"
import "./style.css"

export default function App() {
  const draggableRef = useRef(null);
  useDraggable(draggableRef, { handle: '.titlebar' }, { bounds: 'parent' })

  return (
    <>
      <div className="window" ref={draggableRef}>
        <div className="titlebar">
          <button className="close-button"></button>
          <span>Terminal</span>
        </div>
        <div className="workspace">
          <span>workspace</span>
        </div>
      </div>
    </>
  )
}

