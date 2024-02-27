import BaseApp from './BaseApp'
import "../style.css"

function Weather({ title, onClose, key }) {
  return (
    <BaseApp
      title={title}
      onClose={onClose}
      appKey={key}
      content={
        <div className="weather-main">
            <span>{title} App</span>
        </div>
      }
    />
  )
}

export default Weather