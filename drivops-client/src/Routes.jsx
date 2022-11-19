import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';

export default function MainRoutes() {
    return (

        <Routes>
            <Route path='/' element={<Login />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/home' element={<Home />}></Route>
        </Routes>


    )
}