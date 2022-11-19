import GenericLogo from '../../assets/generic-logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { SignOut } from 'phosphor-react';

export default function NavBar() {
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.clear();
        navigate('/');
    }

    return (
        <div className="w-full h-14 flex items-center justify-between px-[15%] bg-violet-100 text-xl">
            <img className='w-24' src={GenericLogo} alt="generic company logo" />

            <div className='flex gap-6 items-center'>
                <NavLink
                    exact={true}
                    to={'/dashboard'}
                    className={({ isActive }) => "nav-link" + (isActive ? " underline" : "")}
                >
                    Dashboard
                </NavLink>
                <NavLink
                    exact={true}
                    to={'/salesmen'}
                    className={({ isActive }) => "nav-link" + (isActive ? " underline" : "")}
                >
                    Salesmen
                </NavLink>
                <NavLink
                    exact={true}
                    to={'/cars'}
                    className={({ isActive }) => "nav-link" + (isActive ? " underline" : "")}
                >
                    Cars
                </NavLink>
                <SignOut onClick={handleSignOut} size={30} />
            </div>
        </div>
    )
}