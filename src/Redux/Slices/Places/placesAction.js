import axios from "axios";
import Swal from "sweetalert2";
import { getAllPlaces } from "./placesSlice";

const successCreationAlert = () => {
    Swal.fire({
        title: "Lugar Creado!",
        text: "Ahora puedes agregar mas ubicaciones!",
        icon: "success",
        timer: 2000,
    });
};

const errorCreationAlert = (error) => {
    Swal.fire({
        title: "Ocurrió un error",
        text: `${error}`,
        icon: "error",
        timer: 4000,
    });
};

export const getPlaces = () => (dispatch) => {
    axios("/place/getPlaces")
        .then((res) => dispatch(getAllPlaces(res.data.places)))
        .catch((e) => console.log(e));
};

export const deletePlaces = (id) => (dispatch) => {
    axios
        .delete(`/place/deletePlace/${id}`)
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
};

export const createPlaces = (place) => (dispatch) => {
    axios
        .post("/place/createPlace", place)
        .then((res) => {
            successCreationAlert();
            console.log(res.data.place.id);
            return res.data.place.id;
        })
        .catch((e) => {
            console.log(e);
            e.response.data
                ? errorCreationAlert(e.response.data.msg)
                : console.log(e);
        });
};

export const updatePlaces = (place) => (dispatch) => {
    axios
        .put(`/place/updatePlace/${place.id}`, place)
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
};
