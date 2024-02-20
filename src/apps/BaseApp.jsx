import {useRef, useState} from "react"
import { useDraggable } from "@neodrag/react"
import "../style.css"

export default function BaseApp({ title, content}) {
  const draggableRef = useRef(null);
  useDraggable(draggableRef, { handle: '.titlebar', bounds: 'body' })

  return (
    <div className="window" ref={draggableRef}>
      <div className="titlebar">
       <button className="close-button"></button>
       <span>{title}</span>
      </div>
      <div className="content">
        {content}
     </div>
    </div>
  )
}