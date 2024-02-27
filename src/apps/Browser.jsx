import BaseApp from './BaseApp'
import "../style.css"

function Browser({ title, onClose, key }) {
  return (
    <BaseApp
      title={title}
      onClose={onClose}
      appKey={key}
      content={
        <div className="browser-main">
            <span>${title} App</span>
        </div>
      }
    />
  )
}

export default Browser