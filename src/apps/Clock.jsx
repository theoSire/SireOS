import BaseApp from './BaseApp'
import "../style.css"

function Clock({ title, onClose, key }) {
  return (
    <BaseApp
      title={title}
      onClose={onClose}
      appKey={key}
      content={
        <div className="clock-main">
            <span>${title} App</span>
        </div>
      }
    />
  )
}

export default Clock 