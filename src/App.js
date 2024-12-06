import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import WeatherNavbar from './components/WeatherNavbar' // Percorso corretto
import WeatherApp from './components/WeatherApp' // Percorso corretto
import WeatherDetails from './components/WeatherDetails' // Percorso corretto

function App() {
  return (
    <Router>
      <div>
        <header>
          <WeatherNavbar />
        </header>
        <main className="container mt-4">
          <Routes>
            <Route path="/" element={<WeatherApp />} />
            {/* Modificato per usare due parametri separati */}
            <Route
              path="/details/:cityName/:countryCode"
              element={<WeatherDetails />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
