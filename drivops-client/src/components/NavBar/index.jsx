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
        <header className="w-full h-14 fixed top-0 flex items-center justify-between px-[15%] bg-violet-100 text-xl">
            <img className='w-24' src={GenericLogo} alt="generic company logo" />

            <nav className='flex gap-6 items-center'>
                <NavLink
                    to={'/dashboard'}
                    className={({ isActive }) => "nav-link" + (isActive ? " underline" : "")}
                >
                    Dashboard
                </NavLink>
                <NavLink
                    to={'/salesmen'}
                    className={({ isActive }) => "nav-link" + (isActive ? " underline" : "")}
                >
                    Salesmen
                </NavLink>
                <NavLink
                    to={'/cars'}
                    className={({ isActive }) => "nav-link" + (isActive ? " underline" : "")}
                >
                    Cars
                </NavLink>
                <SignOut onClick={handleSignOut} size={30} />
            </nav>
        </header>
    )
}