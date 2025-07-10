'use client'
import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {

    const pathname = usePathname()
    const onAuthPage = pathname === '/auth'

    const { user, loading } = useAuth()


    const handleSignOut = async () => {
        await supabase.auth.signOut();
    }


    return (
        <div className="navbar bg-base-100 shadow-xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-56 p-2 shadow">
                        <li><a className='text-xl' href='/about'>За нас</a></li>
                        <li> <a className='text-xl' href="/schedule">График тренировки</a></li>
                        <li><a className='text-xl' href="/news">Новини</a></li>

                        <li><a className='text-xl' href="/gallery">Галерия</a></li>
                    </ul>
                </div>
                <a href="/">
                    <Image
                        src="/Logo_Sportivo.png"
                        alt="ФК Атлетик Спортиво Лого"
                        width={50}
                        height={20}
                        className="w-auto h-auto"
                    />
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a className='text-xl' href='/about'>За нас</a></li>
                    <li>
                        <a className='text-xl' href="/schedule">График тренировки</a>
                    </li>
                    <li><a className='text-xl' href="/news">Новини</a></li>

                    <li><a className='text-xl' href="/gallery">Галерия</a></li>
                </ul>
            </div>
            <div className="navbar-end">
                <a className='btn btn-secondary mr-4' href="https://www.facebook.com/" target='_blank'> <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
                </a>

                {!user && !onAuthPage ? (
                    <a className='btn btn-primary' href="/auth">За треньори</a>
                ) : user ? (
                    <div className='flex flex-col justify-center'>
                        <button className='btn btn-primary' onClick={handleSignOut}>
                            Излез {user.email}
                        </button>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default Navbar;