import { useNavigate } from 'react-router-dom';
import './styles.css';

export default function Login() {
    const navigate = useNavigate();

    return (
        <div className="h-screen w-full flex justify-between ">
            <div className="login-bg w-1/2" />
            <div className="w-1/2 flex flex-col items-center justify-center bg-violet-100">
                <div className='w-[400px] flex flex-col gap-6'>
                    <label className="flex flex-col">
                        E-mail*
                        <input className="rounded-lg px-2 py-1" type="text" placeholder="Manager's e-mail" />
                    </label>
                    <label className="flex flex-col mb-6">
                        Password*
                        <input className="rounded-lg px-2 py-1" type="text" placeholder="Manager's password" />
                    </label>
                    <button
                        onClick={(e) => navigate('/dashboard')}
                        className="rounded-lg py-1 px-4 bg-sky-700 opacity-80 hover:opacity-100 hover:scale-[1.01]"
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    )
}