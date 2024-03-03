import BaseApp from './BaseApp'
import "../style.css"

function Weather({ title, onClose, key }) {
  const height = "25rem"
  const width = "40rem"
  const minHeight = "180px"
  const minWidth = "320px"
  return (
    <BaseApp
      title={title}
      onClose={onClose}
      appKey={key}
      height={height}
      width={width}
      minHeight={minHeight}
      minWidth={minWidth}
      content={
        <div className="weather-main">
            <span>{title} App</span>
        </div>
      }
    />
  )
}

export default Weather