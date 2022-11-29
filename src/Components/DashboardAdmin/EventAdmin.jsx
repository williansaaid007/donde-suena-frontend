import { deleteEvent, getEvents } from "../../Redux/Slices/Event/eventActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export const EventAdmin = () => {
    const dispatch = useDispatch();
    const { events } = useSelector((state) => state.eventsState);

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
                dispatch(deleteEvent(id));
                window.location.reload();
            }
        });
    };

    useEffect(() => {
        dispatch(getEvents());
    }, [dispatch]);
    return (
        <div>
            <div className="relative max-w-md h-3/4 bg-white dark:bg-slate-800 ring-slate-900/5 rounded-2xl">
                <div className="overflow-auto flex flex-col divide-y h-full border rounded-2xl">
                    <div className="flex justify-center">
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                            Eventos
                        </h1>
                    </div>
                    {events?.map((a, i) => {
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