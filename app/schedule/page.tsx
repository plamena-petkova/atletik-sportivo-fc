'use client';

import Navbar from "../components/Navbar";

const groups = [
    { id: 1, label: '⚽ Група 1: Родени 2017 - 2016', days: '🗓️ Понеделник, Сряда', time: '⏰ 16:00 - 17:00' },
    { id: 2, label: '🥅 Група 2: Родени 2015 - 2014', days: '🗓️ Вторник, Четвъртък', time: '⏰ 17:00 - 18:30' },
    { id: 3, label: '🏃‍♂️ Група 3: Родени 2013 - 2012', days: '🗓️ Понеделник, Сряда, Петък', time: '⏰ 18:00 - 19:30' },
    { id: 4, label: '🔥 Група 4: Родени 2011 - 2010', days: '🗓️ Вторник, Четвъртък', time: '⏰ 18:30 - 20:00' },
    { id: 5, label: '🎯 Група 5: Родени 2009 - 2008', days: '🗓️ Понеделник, Сряда, Петък', time: '⏰ 19:30 - 21:00' },
];

export default function TrainingSchedule() {
    return (
        <>
            <Navbar />
            <section className="max-w-4xl mx-auto p-8 bg-base-100 rounded-lg shadow-lg m-6">
                <h2 className="text-4xl font-extrabold mb-10 text-center text-primary drop-shadow-md">
                    🏟️ График на тренировките
                </h2>
                <div className="space-y-8">
                    {groups.map(({ id, label, days, time }) => (
                        <div
                            key={id}
                            className="border-l-8 border-secondary bg-base-200 p-6 rounded-md shadow-md transform transition-transform hover:scale-105 hover:shadow-xl"
                        >
                            <h3 className="text-2xl font-bold mb-3 text-neutral">{label}</h3>
                            <p className="text-lg mb-1 text-neutral">
                                <span className="font-semibold">Дни:</span> {days}
                            </p>
                            <p className="text-lg text-neutral">
                                <span className="font-semibold">Час:</span> {time}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
