import { Container, Navbar, Nav } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

const WeatherNavbar = () => {
  const location = useLocation()
  return (
    <Navbar expand="lg" className="bg-body-tertiary text-center">
      <Container>
        <Navbar.Brand>
          <Link to={'/'}>
            <img src="./icon.png" alt="icon" width={100} />
          </Link>
        </Navbar.Brand>
        <Nav className="me-auto">
          <Link
            to={'/'}
            className={location.pathname === '/' ? 'nav-link' : 'nav-link'}
          >
            <div className="text-info fs-1 fw-bold">NiccoWeather</div>
          </Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default WeatherNavbar
