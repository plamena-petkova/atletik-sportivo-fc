import React from 'react';

const Features = () => {
    return (
        <>
            <section className="py-16 bg-base-200">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12">⚽ Защо да изберете нашия клуб?</h2>
                    <div className="grid md:grid-cols-3 gap-8">

                        <div className="card bg-base-100 shadow-xl cursor-pointer transition duration-500 hover:scale-105 animate-fadeInUp">
                            <div className="card-body items-center text-center">
                                <div className="text-5xl">👨‍🏫</div>
                                <h3 className="card-title mt-2">Професионални треньори</h3>
                                <p>Нашият екип се състои от лицензирани треньори с богат опит в детско-юношеския футбол.</p>
                            </div>
                        </div>

                        <div className="card bg-base-100 shadow-xl cursor-pointer transition duration-500 hover:scale-105 animate-fadeInUp delay-100">
                            <div className="card-body items-center text-center">
                                <div className="text-5xl">🎯</div>
                                <h3 className="card-title mt-2">Индивидуален подход</h3>
                                <p>Всяко дете получава персонално внимание и тренировъчна програма според нивото си.</p>
                            </div>
                        </div>

                        <div className="card bg-base-100 shadow-xl cursor-pointer transition duration-500 hover:scale-105 animate-fadeInUp delay-200">
                            <div className="card-body items-center text-center">
                                <div className="text-5xl">🏆</div>
                                <h3 className="card-title mt-2">Състезателна среда</h3>
                                <p>Участваме в турнири и първенства, които мотивират децата да се развиват и усъвършенстват.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <div className="flex justify-around items-start gap-6 p-6 ">
                <div className="w-1/3 p-4 justify-center items-center text-center">
                    <p className="text-lg">
                        Спортен Комплекс Технически университет<br />
                        Варна, 9000,<br />
                        България
                    </p>
                </div>
                <div className="w-2/3">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1027.871144917291!2d27.932621003382547!3d43.22503694340325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a4554bd40eef77%3A0x34167ab9e7bd2939!2z0KHQv9C-0YDRgtC10L0g0LrQvtC80L_Qu9C10LrRgSDigJ7QotC10YXQvdC40YfQtdGB0LrQuCDRg9C90LjQstC10YDRgdC40YLQtdGC4oCdIC0g0JLQsNGA0L3QsA!5e0!3m2!1sbg!2sbg!4v1752046622651!5m2!1sbg!2sbg" width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </>
    );
};

export default Features;