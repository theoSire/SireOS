import React, { useEffect } from 'react'
import { useBaseAppStore } from '../store'
import BaseApp from './BaseApp'
import "../style.css"
import { useState } from 'react'

function Weather() {
  const { apps } = useBaseAppStore()
  const [showInstruction, setShowInstructions] = useState(true)
  const [inputLocation, setInputLocation] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")
  const [temp_C, setTemp_C] = useState(0)
  const [temp_F, setTemp_F] = useState(0)
  const [feelsLike_C, setFeelsLike_C] = useState(0)
  const [feelsLike_F, setFeelsLike_F] = useState(0)
  const [humidity, setHumidity] = useState(0)
  const [wind_KPH, setWind_KPH] = useState(0)
  const [wind_MPH, setWind_MPH] = useState(0)
  const [isInMetric, setIsInMetric] = useState(true)
  const [gettingCurrWeather, setGettingCurrWeather] = useState(false)
  
  const WeatherAppKey = apps.Weather.appKey
 
  const fetchData = async (location) => {
    const apiKey = import.meta.env.VITE_REACT_APP_API_KEY
    const URL = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`
    try {
      if (location === "") {
        setShowInstructions(true)
      } else {
        setLoading(true)
        setError(null)
        setShowInstructions(false)
        const result = await fetch(URL)
        if (!result.ok) {
          setError("Failed to fetch weather data. Please try again.")
          throw new Error('Failed to fetch data')
        }
        const json = await result.json()
        setCity(json.location.name)
        setCountry(json.location.country)
        setTemp_C(json.current.temp_c)
        setTemp_F(json.current.temp_f)
        setFeelsLike_C(json.current.feelslike_c)
        setFeelsLike_F(json.current.feelslike_f)
        setHumidity(json.current.humidity)
        setWind_KPH(json.current.wind_kph)
        setWind_MPH(json.current.wind_mph)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      setError("Failed to fetch weather data. Please try again.")
    }
  }

  const onChange = (e) => {
      setInputLocation(e.target.value)
  }

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      setGettingCurrWeather(false)
      if (inputLocation === "") {
        setShowInstructions(true)
      } else {
        setLoading(true)
        setInputLocation(e.target.value)
        fetchData(inputLocation)
      }
    }
  }

  function handleSearch() {
    const location = document.getElementById('location-input').value
    setGettingCurrWeather(false)
    if (location === "") {
      setShowInstructions(true)
    } else {
      setLoading(true)
      setInputLocation(location)
      fetchData(inputLocation)
    }
  }

  function getCurrentLocationWeather() {
    setLoading(true)
    setError(null)
    setGettingCurrWeather(true)
    const options = {
      maximumAge: 0,
      enableHighAccuracy: false,
      timeout: 5000,
    }
  
    const success = (pos) => {
      const coords = pos.coords
      const latitude = coords.latitude
      const longitude = coords.longitude
      fetchData(`${latitude},${longitude}`)
    }
  
    const err = (err) => {
      setError(`${err.message}.`)
    }
  
    navigator.geolocation.getCurrentPosition(
      success,
      err,
      options
    )
  }

  const toggleUnitSystem = (isInMetric) => {
    if (isInMetric) {
      return (
      <React.Fragment>
        <p className="border-b-2 text-center w-full border-slate-400 mb-2">{city}, {country}</p>
        <p>Current Temperature: {temp_C}&deg;C</p>
        <p>Feels Like: {feelsLike_C}&deg;C</p>
        <p>Humidity: {humidity}%</p>
        <p>Wind: {wind_KPH}kph</p>
      </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <p className="border-b-2 text-center w-full border-slate-400 mb-2">{city}, {country}</p>
          <p>Current Temperature: {temp_F}&deg;F</p>
          <p>Feels Like: {feelsLike_F}&deg;F</p>
          <p>Humidity: {humidity}%</p>
          <p>Wind: {wind_MPH}mph</p>
        </React.Fragment>
      )
    }
  }

  return (
    <BaseApp
      appKey={WeatherAppKey}
      content={
        <div className="weather-main flex flex-col justify-center items-center gap-y-4 p-2 w-fit text-slate-300">
          <div className="input flex flex-col items-center gap-y-1.5">
            <div className="input-header flex items-center w-full">
              <p className="location-title ml-4 grow flex-1">Location</p>
              {!showInstruction && !error ? (
                <div 
                  className="unit-converter flex border-2 border-slate-400 rounded-xl overflow-hidden cursor-default"
                  onClick={() => setIsInMetric(!isInMetric)}
                >
                  <div className={`${isInMetric ? 'px-1.5 bg-slate-400 text-slate-950' : "px-1.5"}`}>&deg;C</div>
                  <div className={`${isInMetric ? "px-1.5" : 'px-1.5 bg-slate-400 text-slate-950'}`}>&deg;F</div>
                </div>
              ) : (
                <div></div>
              )
              }
            </div>
            <div className="search-bar border-2 border-slate-400 rounded-xl overflow-hidden">
              <input 
                className="location-input bg-transparent px-3.5 placeholder-slate-600" 
                id='location-input'
                type="text" 
                placeholder="Enter Location"
                name='location'
                value={inputLocation} 
                onChange={(e) => onChange(e)}
                onKeyDown={(e) => onKeyDown(e)}
              />
              <button 
                className="search-button text-slate-700 px-2 bg-slate-400 border-r-4  border-slate-400"
                onClick={handleSearch}
              >Search</button>
            </div>
            <button 
              className="current-weather-button flex items-center gap-1 text-slate-700 px-2 bg-slate-400 border-2 border-slate-400 rounded-xl"
              onClick={getCurrentLocationWeather}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12q.825 0 1.413-.587T14 10t-.587-1.412T12 8t-1.412.588T10 10t.588 1.413T12 12m0 10q-4.025-3.425-6.012-6.362T4 10.2q0-3.75 2.413-5.975T12 2t5.588 2.225T20 10.2q0 2.5-1.987 5.438T12 22"/></svg>
              Your Location Weather</button>
          </div>
          <div className="output flex flex-col justify-items-center items-center border-2 w-full p-2 border-slate-400 rounded-xl">
            {showInstruction && !gettingCurrWeather ? (
              <p className="instructions relative w-4/5 text-center">
                Please enter a location to get weather information.
              </p>
            ): (
              <React.Fragment>
                {loading && !error ? (
                  <div 
                    className="loader border-2 border-slate-700 border-t-2 border-t-slate-400 rounded-full w-8 h-8 animate-spin"
                  ></div>
                ): (
                  <React.Fragment>
                    {error ? (
                      <p className="text-red-500">{error}</p>
                      ) : (
                        <React.Fragment>
                          {showInstruction ? (
                            <div className="instructions relative">
                            <p className='text-center'>Please enter a location to get weather information.</p>
                            </div>
                      ): (
                        toggleUnitSystem(isInMetric)
                    )}
                  </React.Fragment>
                )}
              </React.Fragment>
                )}
              </React.Fragment>
            )}
          </div>
       </div>
      }
    />
  )
}

export default Weather