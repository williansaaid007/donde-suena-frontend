import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postArtist } from "../../Redux/Slices/Artist/artistActions";
import {getArtists} from "../../Redux/Slices/Artist/artistActions"
import InputEmoji from 'react-input-emoji'


function PostVar() {

    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const CLOUD_NAME = "CLOUD_NAME";
    const UPLOAD_PRESET = "UPLOAD_PRESET";
    const [submit, setSubmit] = useState(false);
    const [ text, setText ] = useState('')

    function handleOnEnter (text) {
        console.log('enter', text)
    }

    const upload = async () => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", CLOUD_NAME);
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${UPLOAD_PRESET}/upload`,
            { method: "POST", body: data }
        );
        const dat = await response.json();
        console.log(dat); // reemplazar con un mensaje de éxito o la acción deseada
    };

    const [input, setInput] = useState({
        title: "",
        image: "",
        description: "",
        artist: "",
    });
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postArtist(input));
        alert("Nuevo post publicado! 🤟");
        setInput({
            title: "",
            artist: "",
            image: "",
            description: "",
        });
    }
    useEffect(() => {
        dispatch(postArtist());
        dispatch(getArtists());
    }, [dispatch]);

    console.log(input);
    return (
        <form className= "flex items-center justify-center mt-20" onSubmit={handleSubmit}>
            <div className=" w-full max-w-2xl bg-customGray p-4  flex items-center justify-center gap-2 my-8 rounded-2xl flex-col ifont-source-sans">
                <input
                    class="block w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-xl cursor-pointer bg-customGray dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300"
                    id="input"
                    type="text"
                    value={input.title}
                    name="title"
                    onChange={handleChange}
                    placeholder="Titulo"
                />
                    <InputEmoji
                        value={input.text}
                        onChange={setText}
                        cleanOnEnter
                        onEnter={handleOnEnter}
                        placeholder="Que vas a compartir hoy con tu publico?"
                    />
                <input
                    class="block text-sm text-gray-900 border border-gray-300 rounded-xl cursor-pointer bg-customGray dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-customGray"
                    id="file_input"
                    type="file"
                    accept="image/jpg, image/png, image/jpeg"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                {file ? (
                    <figure class="max-w-lg">
                        <img
                            class="max-w-full h-auto rounded-lg"
                            alt="Preview"
                            height="30"
                            src={URL.createObjectURL(file)}
                        />
                    </figure>
                ) : null}
            <button class="inline-block px-6 py-2.5 bg-red-600 text-customGray font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-700 focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out" onClick={upload} type="button">Upload</button>
            <button class="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out" type="submit">Publicar</button>
        </div>

        </form>
    );
}

export default PostVar;