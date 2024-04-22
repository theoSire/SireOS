import { useEffect, useState } from 'react'
import '../style.css'

export default function Panel() {
    const [dateTime, setDateTime] = useState(new Date())
    const dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setDateTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    return (
        <div className="panel flex sm:justify-center items-center sm:items-center mx-1 mt-1 w-full border-2 border-slate-400 rounded-xl text-slate-300 bg-black bg-opacity-75">
            <div className='date-time flex flex-1 justify-center items-center gap-5 h-full sm:h-8 w-10 sm:w-full text-sm sm:text-lg'>
                <p>{dateTime.toLocaleDateString('en-GB', dateOptions).replaceAll('/', '.')}</p>
                <p className='text-center'>{dateTime.toLocaleTimeString("en-GB")}</p>
            </div>
            <button 
                className="pr-1 hover:text-red-700"
                onClick={() => window.close()}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M13 2v10h-2V2zm3.78 1.728l.809.589a9.5 9.5 0 1 1-11.178 0l.808-.59l1.178 1.617l-.808.59a7.5 7.5 0 1 0 8.822 0l-.808-.59z"/></svg>
            </button>
        </div>
    )
}