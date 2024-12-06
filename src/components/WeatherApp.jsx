import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Hero from './Hero'
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Card,
  Alert,
} from 'react-bootstrap'

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
      <Container className="text-center mb-3 mt-3">
        <h1>Il tuo Meteo a portata di click!</h1>
      </Container>

      <Container>
        <Row className="mb-3 mt-3">
          <Col>
            <InputGroup>
              <FormControl
                type="text"
                placeholder="Cerca la tua città..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button variant="primary" onClick={handleSearch}>
                Cerca
              </Button>
            </InputGroup>
          </Col>
        </Row>

        {error && <Alert variant="danger">{error}</Alert>}

        {weatherData && (
          <Row className="mt-5">
            <Col>
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>{weatherData.name}</Card.Title>
                  <Card.Text>Temperatura: {weatherData.main.temp}°C</Card.Text>
                  <Card.Text>
                    Condizioni: {weatherData.weather[0].description}
                  </Card.Text>
                  <Button
                    variant="secondary"
                    onClick={() =>
                      navigate(
                        `/details/${weatherData.name}/${weatherData.sys.country}`
                      )
                    }
                  >
                    Vedi Dettagli
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
        <Hero />
      </Container>
    </>
  )
}

export default WeatherApp
