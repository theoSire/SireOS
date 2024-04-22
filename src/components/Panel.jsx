import { useEffect, useState } from 'react'
import '../style.css'

export default function Panel() {
    const [dateTime, setDateTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setDateTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    return (
        <div className="panel h-full sm:h-10 w-10 sm:w-full text-slate-400 bg-black bg-opacity-75">
            <p>Date: {dateTime.toLocaleDateString().replace('/', ' ')}</p>
            <p>Time: {dateTime.toLocaleTimeString()}</p>
        </div>
    )
}