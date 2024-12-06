import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col, Card } from 'react-bootstrap'

const WeatherDetails = () => {
  const { cityName, countryCode } = useParams()
  const [cityDetails, setCityDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchDetails = async (city, country) => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=60a4044574a728ee46b503146bd942f4`
      )
      const data = await response.json()
      if (data.cod !== '200') {
        throw new Error('Errore nel recupero dei dati')
      }
      setCityDetails(data)
    } catch (error) {
      setError('Errore nel recupero dei dati')
    }

    setLoading(false)
  }

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
        Previsioni meteo per {cityName}, {countryCode}
      </h2>
      <Row className="mt-3 mb-4">
        {cityDetails &&
          cityDetails.list.slice(0, 4).map((forecast, index) => (
            <Col key={index} md={3} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>
                    {new Date(forecast.dt * 1000).toLocaleString()}
                  </Card.Title>
                  <Card.Text>
                    Temperatura: {Math.round(forecast.main.temp - 273.15)}°C
                  </Card.Text>
                  <Card.Text>{forecast.weather[0].description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  )
}

export default WeatherDetails
