import axios from "axios";
import {
    getAllArtists,
    getAllArtistById,
    getArtistEvents,
} from "./artistSlice";

export const getArtists = () => (dispatch) => {
    axios("/auth/getArtists")
        .then((res) => dispatch(getAllArtists(res.data.artists)))
        .catch((e) => console.log(e));
};

export const postArtist = (values) => (dispatch) => {
    axios
        .post("/auth/artist/createPost", values)
        .then((res) => {
            console.log(res);
            dispatch(res);
            alert("Post Creado Exitosamente");
        })
        .catch((e) => {
            console.log(e);
        });
};

export const getArtistsById = (id) => (dispatch) => {
    axios(`/auth/getArtistById/${id}`)
        .then((res) => {
            dispatch(getAllArtistById(res.data.artistID));
        })
        .catch((e) => console.log(e));
};

export const getArtistEvent = (id) => (dispatch) => {
    axios(`/event/getEvents/?filter[artist]=${id}`)
        .then((res) => {
            dispatch(getArtistEvents(res.data.events));
        })
        .catch((e) => console.log(e));
};

export const deleteArtist = (id) => (dispatch) => {
    axios
        .delete(`/auth/deleteArtist/${id}`)
        .then((res) => {
            console.log(res);
            dispatch(res);
            alert("Artista Eliminado Exitosamente");
        })
        .catch((e) => {
            console.log(e);
        });
};
