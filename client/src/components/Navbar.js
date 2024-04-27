import { Link, NavLink, Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import universalCookies from 'universal-cookie';
import { API } from '../helpers/api';
import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
const cookies = new universalCookies();

const NavBarComponent = () => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (cookies.get('Admin')) {
        const user = cookies.get('Admin')[0];

        setUser(user);
      }
    };
    fetchUser();
  }, []);

  const logOut = () => {
    setTimeout(async () => {
      Cookies.remove('Admin');
      window.location.replace('/');
    }, 1000);
  };
  return (
    <>
      <Navbar expand="lg">
        <Container fluid className="navbar">
          <Navbar.Brand href="/" className="ms-2" style={{ color: 'white' }}>
            Help Desk
          </Navbar.Brand>
          {!user && (
            <div className="text-end me-5 link-button">
              <h5 className="text-nowrap">
                <Link
                  className="btn btn-outline-light"
                  role="button"
                  to="/login"
                >
                  Admin Login
                </Link>
              </h5>
            </div>
          )}
          {user && (
            <>
              <h5 style={{ color: 'white' }}>Currently logged as: {user}</h5>
              <div className="text-end me-5 link-button">
                <h5 className="text-nowrap">
                  <Link
                    className="btn btn-outline-light"
                    role="button"
                    onClick={logOut}
                  >
                    Log Out
                  </Link>
                </h5>
              </div>
            </>
          )}
        </Container>
      </Navbar>

      <Outlet />
    </>
  );
};

export default NavBarComponent;
