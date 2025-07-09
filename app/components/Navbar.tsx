import Image from 'next/image';
import React from 'react';

const Navbar = () => {
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-56 p-2 shadow">
                        <li><a href='/about'>За нас</a></li>
                        <li>
                            <a>График тренировки</a>
                            <ul className="p-2">
                                <li><a>2007</a></li>
                                <li><a>2008</a></li>
                            </ul>
                        </li>
                        <li><a>Новини</a></li>

                        <li><a>Галерия</a></li>
                    </ul>
                </div>
                <a href="/">
                    <Image
                        src="/Logo_Olympic.png"
                        alt="ФК Олимпик Варна Лого"
                        width={50}
                        height={20}
                        className="w-auto h-auto"
                    />
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a href='/about'>За нас</a></li>
                    <li>
                        <details>
                            <summary>График тренировки</summary>
                            <ul className="p-2">
                                <li><a>2007</a></li>
                                <li><a>2008</a></li>
                            </ul>
                        </details>
                    </li>
                    <li><a>Новини</a></li>

                    <li><a>Галерия</a></li>
                </ul>
            </div>
            <div className="navbar-end">
                <a className='btn btn-secondary mr-4' href="https://www.facebook.com/f.c.olympicvarna" target='_blank'> <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
                </a>
            </div>
        </div>
    );
};

export default Navbar;