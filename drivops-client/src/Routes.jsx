import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Salesmen from './pages/Salesmen';
import Cars from './pages/Cars';

export default function MainRoutes() {
    return (

        <Routes>
            <Route path='/' element={<Login />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/dashboard' element={<Dashboard />}></Route>
            <Route path='/salesmen' element={<Salesmen />}></Route>
            <Route path='/cars' element={<Cars />}></Route>
        </Routes>


    )
}