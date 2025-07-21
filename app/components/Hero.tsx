'use client';
import Image from 'next/image';
import React, { useRef } from 'react';

const Hero = () => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const handleOpen = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal(); // Open the dialog
        }
    };

    const handleClose = () => {
        if (dialogRef.current) {
            dialogRef.current.close(); // Close the dialog
        }
    };

    return (
        <div
            className="hero min-h-screen"
            style={{ backgroundImage: "url(/hero.jpg)" }}
        >
            <div className="hero-overlay"></div>
            <div className="hero-content flex flex-col text-neutral-content text-center sm:flex-row">
                <Image
                    src="/Logo_Sportivo.png"
                    alt="ФК Атлетик Спортиво Лого"
                    width={200}
                    height={100}
                    className="w-auto h-auto"
                />

                <dialog ref={dialogRef} className="modal z-[100]">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg text-secondary">Здравей!</h3>
                        <p className="py-4 text-secondary text-lg">За да се запишеш се обади на следните телефони:</p>
                        <p className='text-secondary text-md'>📞+359887444333</p>
                        <p className='text-secondary text-md'>📞+359886333444</p>
                        <div className="modal-action">
                            <button onClick={handleClose} className="btn">Затвори</button>
                        </div>
                    </div>
                </dialog>

                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">
                        Добре дошли в сайта на Атлетик Спортиво
                    </h1>
                    <p className="mb-5">Клуб по футбол за деца и юноши</p>
                    <button onClick={handleOpen} className="btn btn-primary">
                        Запиши се
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Hero;
