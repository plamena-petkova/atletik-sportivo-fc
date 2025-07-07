import React from 'react';

const Hero = () => {
    return (
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage:
                    "url(/hero.jpg)",
            }}
        >
            <div className="hero-overlay"></div>
            <div className="hero-content text-neutral-content text-center">
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