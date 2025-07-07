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
                        <li><a>За нас</a></li>
                        <li>
                            <a>Групи по година на раждане</a>
                            <ul className="p-2">
                                <li><a>2007</a></li>
                                <li><a>2008</a></li>
                                <li><a>2009</a></li>
                                <li><a>2010</a></li>
                                <li><a>2011</a></li>
                                <li><a>2012</a></li>
                                <li><a>2013</a></li>
                                <li><a>2014</a></li>
                                <li><a>2015</a></li>
                                <li><a>2016</a></li>
                                <li><a>2017</a></li>
                            </ul>
                        </li>
                        <li><a>Новини</a></li>
                        <li><a>Галерия</a></li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-3xl"> <img
                    src="/Logo_Olympic.png"
                    alt="ФК Олимпик Варна Лого"
                    className="h-10 w-auto"
                /></a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a>За нас</a></li>
                    <li>
                        <details>
                            <summary>Групи по година на раждане</summary>
                            <ul className="p-2">
                                <li><a>2007</a></li>
                                <li><a>2008</a></li>
                                <li><a>2009</a></li>
                                <li><a>2010</a></li>
                                <li><a>2011</a></li>
                                <li><a>2012</a></li>
                                <li><a>2013</a></li>
                                <li><a>2014</a></li>
                                <li><a>2015</a></li>
                                <li><a>2016</a></li>
                                <li><a>2017</a></li>
                            </ul>
                        </details>
                    </li>
                    <li><a>Новини</a></li>
                    <li><a>Галерия</a></li>
                </ul>
            </div>
            <div className="navbar-end">

            </div>
        </div>
    );
};

export default Navbar;