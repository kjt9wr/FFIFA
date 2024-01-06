import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Button
} from 'reactstrap';
import { SLEEPER_LEAGUE_ID } from '../Utilities/Constants';
import { playersBySleeperID } from '../Utilities/Sleeper_Ids';

const Admin = () => {
  const [roster, setRoster] = useState({players: []});


useEffect(() => {
  const getDraftInfo = async () => {
    const draftInfo = await axios.get(`https://api.sleeper.app/v1/league/${SLEEPER_LEAGUE_ID}/rosters`); 
    const alexRoster = draftInfo.data.filter((roster) => roster.roster_id === 1)
    setRoster(alexRoster[0])
  }

  getDraftInfo()
}, [])

const updateAlexRoster = async () => {
  await axios.post('http://localhost:5000/player/update/roster/' + '5e80dd6ab3bdaf34133161bd', {players : roster.players});
}

  return (
    <div className="container">
      <h1 class="text-center"> Admin Page </h1>

      <Button title="Update Alex Roster" onClick={updateAlexRoster}> Update Alex Roster</Button>
    </div>
  )
}

export default Admin;
