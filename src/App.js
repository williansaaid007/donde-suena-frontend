import { Route, Routes, BrowserRouter } from "react-router-dom";

//Components Import
import ArtistForm from "./Components/ArtistForm/ArtistForm";
import Home from "./Components/Home/Home";
import EventDetail from "./Components/EventDetail/EventDetail.jsx"
import Navbar from "./Components/Navbar/Navbar";
import UserForm from "./Components/UserForm/UserForm.jsx"

function App() {
	return (
    <BrowserRouter>
    <div className="App">
		<Navbar/>
        <Routes>
        	<Route exact path={'/login/artist'} element={<ArtistForm/>}/>
			<Route exact path={'/login/user'} element={<UserForm/>}/>
        	<Route path={"/"} element={<Home/>}/>
        	<Route path={'/details/:id'} element={<EventDetail/>}/>
        </Routes>
    </div>
    </BrowserRouter>
	);
}

export default App;