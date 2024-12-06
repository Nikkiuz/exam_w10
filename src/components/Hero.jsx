import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const predefinedCities = [
    { name: 'Roma', country: 'IT' },
    { name: 'London', country: 'GB' },
    { name: 'New York', country: 'US' },
    { name: 'Tokyo', country: 'JP' },
  ]

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true)
      setError('')
      try {
        const weatherData = await Promise.all(
          predefinedCities.map(async (city) => {
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?q=${city.name},${city.country}&appid=60a4044574a728ee46b503146bd942f4`
            )
            const data = await response.json()
            if (data.cod !== 200) {
              throw new Error('Errore nel recupero dei dati')
            }
            return {
              name: city.name,
              country: city.country,
              temp: data.main.temp,
              weather: data.weather[0].description,
            }
          })
        )
        setCities(weatherData)
      } catch (error) {
        setError('Si è verificato un errore nel recupero dei dati')
      } finally {
        setLoading(false)
      }
    }

    fetchWeatherData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <h2>Meteo attuale</h2>

      {loading && <div>Caricamento...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {cities.map((city, index) => (
          <div key={index} className="col-md-3 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  {city.name}, {city.country}
                </h5>
                <p className="card-text">{city.weather}</p>
                <p className="card-text">
                  Temperatura: {Math.round(city.temp - 273.15)}°C
                </p>
                {/* Modifica il link per passare città e paese separatamente */}
                <Link
                  to={`/details/${city.name}/${city.country}`}
                  className="btn btn-primary"
                >
                  Vai ai dettagli
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Hero
