import React, { useState, useEffect } from 'react'
import * as DatabaseService from '../Services/DatabaseService';

const CapTracker = () =>  {
  const [owners, setOwners] = useState([]);
  const [year, setYear] = useState(1);

  useEffect(() => {
    const getOwnerInfo = async () => {
      const ownersList = await DatabaseService.getOwnersFromDB();
        setOwners(ownersList);
    }

    getOwnerInfo();
  }, []);

  const displayCapTable = (yearIndex) => { 
    return ( <table className='table' >
      <thead className='thead-light'>
        <tr> <th></th>
          { owners.map(owner => <th>{owner.name}</th>) }
        </tr>
      </thead>
      <tbody>
          <tr>
            <td>{ 2020 + parseInt(yearIndex) }</td>
              {owners.map(owner => <td>{owner.cap[yearIndex]}</td>)}
          </tr>
      </tbody>
    </table> )
  }

  return (
    <div className="container">
      <h2 class="text-center">Cap Tracker </h2>
        { displayCapTable(year) }
          <div class="btn-group" role="group">
            <button type="button" class="btn btn-secondary" onClick={() => setYear(0)}>2020</button>
            <button type="button" class="btn btn-secondary" onClick={() => setYear(1)}>2021</button>
            <button type="button" class="btn btn-secondary" onClick={() => setYear(2)}>2022</button>
          </div>
    </div>
  )
}

export default CapTracker;
