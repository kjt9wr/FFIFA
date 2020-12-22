import axios from 'axios';

export const getOwnersFromDB = async () => {
    const list = await axios.get('http://localhost:5000/owner/');
    return list.data;
}

export const getPlayersFromDB = async () => {
    const list = await axios.get('http://localhost:5000/player/');
    return list.data;
}

export const updateKeeper = async (id, willKeep) => {
    await axios.post('http://localhost:5000/player/update/' + id, willKeep);
}
