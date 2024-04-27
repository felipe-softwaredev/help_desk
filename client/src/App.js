import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import NavBarComponent from './components/Navbar';
import LoginForm from './components/LoginForm';
import AuthRoute from './helpers/auth';
import TicketsList from './components/TicketsList';
import { HelpDeskContext } from './helpers/context';

function App() {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route element={<HelpDeskContext />}>
            <Route element={<AuthRoute />}>
              <Route element={<NavBarComponent />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/admin" element={<TicketsList />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
