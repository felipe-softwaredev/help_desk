import { useState, useEffect, useContext } from 'react';
import TicketCard from './TicketCard';
import { API } from '../helpers/api';
import FilterForm from './FilterForm';
import { appContext } from '../helpers/context';

import { v4 as uuidv4 } from 'uuid';
import universalCookies from 'universal-cookie';
const cookies = new universalCookies();

const TicketsList = () => {
  const [filter, setFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState(false);
  const [tempTicketList, setTempTicketsList] = useState([]);

  const { allTicketsList, setAllTicketsList, allAdmins, setAllAdmins } =
    useContext(appContext);

  useEffect(() => {
    const fetchTickets = async () => {
      const { data } = await API.getAll('tickets');
      setAllTicketsList(data.Tickets);
      setTempTicketsList(data.Tickets);
    };
    const fetchAdmins = async () => {
      const { data } = await API.getAll('/');
      setAllAdmins(data.All_Admin);
    };

    fetchTickets();
    fetchAdmins();
  }, []);

  const searchHandler = async (term) => {
    const { data } = await API.getAll('tickets', term);
    setFilter(true);
    setSearchTerm(term.term);
    setTempTicketsList(data.Tickets);
  };

  useEffect(() => {
    const removeFilter = async () => {
      if (!filter) {
        setSearchTerm(false);
        const { data } = await API.getAll('tickets');
        setTempTicketsList(data.Tickets);
      }
    };
    removeFilter();
  }, [filter]);

  return (
    <>
      <div className="">
        <div>
          <h2 className="text-center">Tickets List</h2>
          <div className="d-flex justify-content-center">
            <div className="flex-column grid gap-3">
              <div className="text-center">
                <FilterForm
                  searchHandler={searchHandler}
                  placeholder="Filter by ADMIN username"
                />
              </div>
              {searchTerm && (
                <div className="my-2">
                  <h3>Search by Admin: {searchTerm}</h3>
                </div>
              )}
              <div className="text-center mt-3">
                <h4> N. of results: {tempTicketList.length}</h4>
                {filter && (
                  <button
                    onClick={() => setFilter(false)}
                    className="btn btn-dark"
                  >
                    Remover filter
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="flex-column container ">
            {tempTicketList.map((ticket) => {
              return (
                <TicketCard
                  ticket={ticket}
                  key={uuidv4()}
                  ticketListList={tempTicketList}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketsList;
