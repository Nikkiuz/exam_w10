import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Card, Button, Alert } from 'react-bootstrap'

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
              `https://api.openweathermap.org/data/2.5/weather?q=${city.name},${city.country}&appid=8c213aae94d24bcb33da8a0f54e3d6e1`
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
      }

      setLoading(false)
    }

    fetchWeatherData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="mt-5">
      <h2>Situazione attuale</h2>

      {loading && <div>Caricamento...</div>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Row className="mt-5">
        {cities.map((city, index) => (
          <Col key={index} md={3} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>
                  {city.name}, {city.country}
                </Card.Title>
                <Card.Text>{city.weather}</Card.Text>
                <Card.Text>
                  Temperatura: {Math.round(city.temp - 273.15)}°C
                </Card.Text>
                <Link to={`/details/${city.name}/${city.country}`}>
                  <Button variant="primary">Vai ai dettagli</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Hero
