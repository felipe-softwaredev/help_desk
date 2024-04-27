import { useState, createContext } from 'react';
import { Outlet } from 'react-router-dom';

const appContext = createContext();

const HelpDeskContext = () => {
  const [allTicketsList, setAllTicketsList] = useState([]);
  const [allAdmins, setAllAdmins] = useState([]);

  return (
    <appContext.Provider
      value={{
        allTicketsList,
        setAllTicketsList,
        allAdmins,
        setAllAdmins,
      }}
    >
      <Outlet />
    </appContext.Provider>
  );
};

export { HelpDeskContext, appContext };
