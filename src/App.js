import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import WeatherNavbar from './components/WeatherNavbar'
import WeatherApp from './components/WeatherApp'
import WeatherDetails from './components/WeatherDetails'
import SearchDetails from './components/SearchDetails'

function App() {
  return (
    <BrowserRouter>
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
          <Route path="/details/:city/:state" element={<SearchDetails />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
