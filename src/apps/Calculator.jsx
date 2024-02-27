import BaseApp from './BaseApp'
import "../style.css"

function Calculator({ title, onClose, key }) {
  return (
    <BaseApp
      title={title}
      onClose={onClose}
      appKey={key}
      content={
        <div className="calculator-main">
            <span>${title} App</span>
        </div>
      }
    />
  )
}

export default Calculator