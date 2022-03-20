import axios from "axios";

// const TUITS_API = "https://zzy-assign4.herokuapp.com/tuits";
// const USERS_API = "https://zzy-assign4.herokuapp.com/users";
const TUITS_API = "http://localhost:4000/tuits";
const USERS_API = "http://localhost:4000/users";

const api = axios.create({
                             withCredentials: true
                         });

export const findAllTuits = () =>
    api.get(TUITS_API)
        .then(response => response.data);

export const findTuitById = (tid) =>
    api.get(`${TUITS_API}/${tid}`)
        .then(response => response.data);

export const findTuitByUser = (uid) =>
    api.get(`${USERS_API}/${uid}/tuits`)
        .then(response => response.data);

export const createTuit = (uid, tuit) =>
    api.post(`${USERS_API}/${uid}/tuits`, tuit)
        .then(response => response.data);

export const updateTuit = (tid, tuit) =>
    api.post(`${TUITS_API}/${tid}`, tuit)
        .then(response => response.data);

export const deleteTuit = (tid) =>
    api.delete(`${TUITS_API}/${tid}`)
        .then(response => response.data);

export const findUserByUsername = (username) =>
    api.get(`${USERS_API}/username/${username}/get`)
        .then(response => response.data);

export const deleteTuitsByUser = (uid) =>
    api.get(`${USERS_API}/${uid}/tuits/delete`)
        .then(response => response.data);