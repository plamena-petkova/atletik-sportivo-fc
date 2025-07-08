import Image from 'next/image';
import React from 'react';

const Hero = () => {
    return (
        <div
            className="hero min-h-screen-3/4"
            style={{
                backgroundImage:
                    "url(/hero.jpg)",
            }}
        >
            <div className="hero-overlay"></div>
            <div className="hero-content text-neutral-content text-center">
                <Image
                    src="/Logo_Olympic.png"
                    alt="ФК Олимпик Варна Лого"
                    width={200}
                    height={100}
                    className="w-auto h-auto"
                />
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Добре дошли в сайта на Олимпик Варна</h1>
                    <p className="mb-5">
                        Клуб по футбол за деца и юноши
                    </p>
                    <button className="btn btn-primary">Запиши се</button>
                </div>

            </div>
        </div>
    );
};

export default Hero;