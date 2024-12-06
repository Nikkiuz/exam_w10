import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import WeatherNavbar from './components/WeatherNavbar'
import WeatherApp from './components/WeatherApp'
import WeatherDetails from './components/WeatherDetails'

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
