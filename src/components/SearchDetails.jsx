import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row, Col, Card } from 'react-bootstrap'

const SearchDetails = () => {
  const { city, state } = useParams()
  const [details, setDetails] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const API_KEY = 'e0cd7e86d9812a3786b1184d3f7166ca'
        const fetchURL = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state}&appid=${API_KEY}`
        const response = await fetch(fetchURL)

        if (!response.ok) {
          throw new Error('Errore durante il recupero dei dati.')
        }

        const data = await response.json()
        setDetails(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchDetails()
  }, [city, state])

  if (loading) {
    return <div>Caricamento in corso...</div>
  }

  if (error) {
    return <div>Errore: {error}</div>
  }

  return (
    <div className="details">
      <Container className="mt-5 mb-4">
        <h2>Previsioni Meteo per {details.name}</h2>
        <Row className="mt-5">
          <Col md={6}>
            <Card className="h-100 mt-5">
              <Card.Body>
                <Card.Title>Informazioni Meteo</Card.Title>
                <Card.Text>
                  Temperatura: {Math.round(details.main.temp - 273.15)}°C
                </Card.Text>
                <Card.Text>Umidità: {details.main.humidity}%</Card.Text>
                <Card.Text>
                  Velocità del vento: {details.wind.speed} m/s
                </Card.Text>
                <Card.Text>
                  Condizioni: {details.weather[0].description}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default SearchDetails
