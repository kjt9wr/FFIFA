import axios from "axios";

export const getOwnersFromDB = async () => {
  const list = await axios.get("http://localhost:5000/owner/");
  return list.data;
};

export const getPlayersFromDB = async () => {
  const list = await axios.get("http://localhost:5000/player/").catch(() => {
    console.error("Unable to get players from the database");
  });
  return list ? list.data : [];
};

export const getKeptPlayersFromDB = async () => {
  const list = await axios
    .get("http://localhost:5000/player/keptPlayers")
    .catch(() => {
      console.error("Unable to get players from the database");
    });
  return list ? list.data : [];
};

export const getFreeAgentsFromDB = async () => {
  const list = await axios
    .get("http://localhost:5000/player/freeAgents")
    .catch(() => {
      console.error("Unable to get players from the database");
    });
  return list ? list.data : [];
};

export const getTradesFromDB = async () => {
  const list = await axios.get("http://localhost:5000/trade/").catch(() => {
    console.error("Unable to get trades from the database");
  });
  return list.data;
};

export const updateKeeper = async (id, willKeep) => {
  await axios
    .post(`http://localhost:5000/player/update/${id}`, willKeep)
    .catch(() => {
      console.error("Error updating keeper status");
    });
};

export const updateLuxaryTax = async (name, luxaryTaxPaid) => {
  await axios.put(
    `http://localhost:5000/owner/updateTax/${name}`,
    luxaryTaxPaid
  );
};

export const getRoster = async (owner_id) => {
  const list = await axios.get(
    "http://localhost:5000/player/roster/" + owner_id
  );
  return list.data;
};
