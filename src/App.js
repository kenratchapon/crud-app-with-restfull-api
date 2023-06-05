
import './App.css';
import Navbar from './components/Navbar';
import Users from './components/Users';
import {Routes, Route } from "react-router-dom";
import UserCreate from './components/UserCreate';
import UserUpdate from './components/UserUpdate';

function App() {
	return (
		<div className="App">
			<Navbar/>
			<Routes>
				<Route path='/' element={<Users/>}/>
				<Route path='Create' element={<UserCreate/>}/>
				<Route path='Update/:id' element={<UserUpdate/>}/>
			</Routes>
			
		</div>
	);
}

export default App;
