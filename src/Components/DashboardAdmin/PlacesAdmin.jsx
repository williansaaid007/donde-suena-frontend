import {
    getPlaces,
    deletePlaces,
    createPlaces,
    updatePlaces,
} from "../../Redux/Slices/Places/placesAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export const PlacesAdmin = () => {
    const dispatch = useDispatch();
    const { places } = useSelector((state) => state.placesState);

    const tashEvent = (id) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "No podrás revertir esta acción",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, bórralo",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deletePlaces(id));
                window.location.reload();
            }
        });
    };

    const createPlace = () => {
        Swal.fire({
            title: "Crear lugar",
            html: `
            <input id="name" class="swal2-input" placeholder="Nombre">
            <input id="address" class="swal2-input" placeholder="Dirección">
            <input id="city" class="swal2-input" placeholder="Ciudad">
            <input id="postCode" class="swal2-input" placeholder="PostCode">
            <input id="phone" class="swal2-input" placeholder="phone">
            <input id="email" class="swal2-input" placeholder="Email">
            <input id="image" class="swal2-input" placeholder="Imagen">
            `,
            focusConfirm: false,
            preConfirm: () => {
                return {
                    name: document.getElementById("name").value,
                    address: document.getElementById("address").value,
                    city: document.getElementById("city").value,
                    postCode: document.getElementById("postCode").value,
                    phone: document.getElementById("phone").value,
                    email: document.getElementById("email").value,
                    image: document.getElementById("image").value,
                };
            },
        }).then((result) => {
            console.log(result.value);
            dispatch(createPlaces(result.value));
            window.location.reload();
        });
    };

    useEffect(() => {
        dispatch(getPlaces());
    }, [dispatch]);
    return (
        <div>
            <div className="relative max-w-md h-3/4 bg-white dark:bg-slate-800 ring-slate-900/5 rounded-2xl">
                <div className="overflow-auto flex flex-col divide-y h-full border rounded-2xl">
                    <div className="flex justify-center">
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                            Lugares
                        </h1>
                    </div>
                    <div
                        className="flex items-center gap-4 p-4 cursor-pointer bg-green-500 rounded-md text-white font-bold hover:bg-green-600 transition duration-300"
                        onClick={() => {
                            createPlace();
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-white dark:text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                        </svg>
                    </div>
                    {places?.map((a, i) => {
                        return (
                            <div
                                className="flex items-center gap-4 p-4"
                                key={i}
                            >
                                <Link to={`/details/${a.id}`}>
                                    <img
                                        className="w-12 h-12 rounded-full object-cover"
                                        src={a.image}
                                        alt=""
                                    />
                                    <strong className="text-slate-900 text-sm font-medium dark:text-slate-200">
                                        {a.name}
                                    </strong>
                                </Link>
                                <div
                                    className="flex items-center gap-4 p-4 cursor-pointer bg-red-500 rounded-md text-white font-bold hover:bg-red-600 transition duration-300"
                                    onClick={() => tashEvent(a.id)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <br />
            <br />
        </div>
    );
};
