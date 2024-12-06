import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SearchDetails = () => {
  const { city, state } = useParams(); 
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const API_KEY = "e0cd7e86d9812a3786b1184d3f7166ca";
        const fetchURL = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state}&appid=${API_KEY}`;
        const response = await fetch(fetchURL);

        if (!response.ok) {
          throw new Error("Errore durante il recupero dei dati.");
        }

        const data = await response.json();
        setDetails(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDetails();
  }, [city, state]);

  if (loading) {
    return <div>Caricamento in corso...</div>;
  }

  if (error) {
    return <div>Errore: {error}</div>;
  }

  return (
    <div className="details">
      <h2>Dettagli Meteo per {details.name}</h2>
      <p>Temperatura: {Math.round(details.main.temp - 273.15)}°C</p>
      <p>Umidità: {details.main.humidity}%</p>
      <p>Velocità del vento: {details.wind.speed} m/s</p>
      <p>Condizioni: {details.weather[0].description}</p>
    </div>
  );
};

export default SearchDetails;
