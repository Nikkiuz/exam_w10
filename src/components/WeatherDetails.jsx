import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const WeatherDetails = () => {
  const { cityName, countryCode } = useParams() // Estrai città e paese dai parametri URL
  const [cityDetails, setCityDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Recupera i dettagli della città tramite le API
  const fetchDetails = async (city, country) => {
    setLoading(true)
    setError('')
    try {
      // Fetch dei dettagli meteo a 4 giorni
      const response = await fetch(
        `https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${city},${country}&appid=e0cd7e86d9812a3786b1184d3f7166ca`
      )
      const data = await response.json()
      if (data.cod !== '200') {
        throw new Error('Errore nel recupero dei dati')
      }
      setCityDetails(data)
    } catch (error) {
      setError('Si è verificato un errore nel recupero dei dati')
    } finally {
      setLoading(false)
    }
  }

  // Effettua la fetch quando la pagina si carica
  useEffect(() => {
    if (cityName && countryCode) {
      fetchDetails(cityName, countryCode)
    }
  }, [cityName, countryCode])

  if (loading) return <div>Caricamento...</div>
  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <div>
      <h2>
        Dettagli meteo per {cityName}, {countryCode}
      </h2>
      <h3>Previsioni a 4 giorni</h3>
      <div className="row">
        {cityDetails &&
          cityDetails.list.slice(0, 4).map((forecast, index) => (
            <div key={index} className="col-md-3 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    {new Date(forecast.dt * 1000).toLocaleString()}
                  </h5>
                  <p className="card-text">
                    Temperatura: {Math.round(forecast.main.temp - 273.15)}°C
                  </p>
                  <p className="card-text">{forecast.weather[0].description}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default WeatherDetails
