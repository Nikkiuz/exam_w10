import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Hero from './Hero'

const WeatherApp = () => {
  const [query, setQuery] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSearch = async () => {
    if (query) {
      const apiKey = '60a4044574a728ee46b503146bd942f4'
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`

      try {
        const response = await fetch(apiUrl)
        if (!response.ok) {
          throw new Error('Città non trovata')
        }

        const weatherData = await response.json()
        setWeatherData(weatherData)
        setError(null)
      } catch (error) {
        setError(error.message)
      }
    }
  }

  return (
    <>
      <div className="text-center mb-3 mt-3">
        <h1>Il tuo Meteo a portata di click!</h1>
      </div>
      <div>
        <div className="input-group mb-3 mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Cerca la tua città..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Cerca
          </button>
        </div>

        {error && <p className="text-danger">{error}</p>}

        {weatherData && (
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{weatherData.name}</h5>
              <p className="card-text">
                Temperatura: {weatherData.main.temp}°C
              </p>
              <p className="card-text">
                Condizioni: {weatherData.weather[0].description}
              </p>
              <button
                className="btn btn-secondary"
                onClick={() =>
                  navigate(
                    `/details/${weatherData.name}/${weatherData.sys.country}`
                  )
                }
              >
                Vedi Dettagli
              </button>
            </div>
          </div>
        )}
        <div>
          <Hero />
        </div>
      </div>
    </>
  )
}

export default WeatherApp
