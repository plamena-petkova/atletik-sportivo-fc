import Image from 'next/image';
import React from 'react';

const Footer = () => {
    return (
        <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content items-center p-4 justify-around">
            <aside className="grid-flow-col items-center text-center">
                <Image
                    src="/Logo_Sportivo.png"
                    alt="ФК Атлетик Спортиво Лого"
                    width={50}
                    height={40}
                    className="w-auto h-auto"
                />
                <p>
                    ФК Атлетик Спортиво
                    2025
                </p>
                <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
            </aside>
            <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">

                <a className='btn btn-secondary' href='https://www.facebook.com'>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="fill-current">
                        <path
                            d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                    </svg>
                </a>
            </nav>
        </footer>
    );
};

export default Footer;

