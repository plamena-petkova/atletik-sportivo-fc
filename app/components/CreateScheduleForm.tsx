'use client'

import { useRef, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useAuth } from '../context/AuthContext';

export default function CreateScheduleForm() {

    const { user } = useAuth();

    const [label, setLabel] = useState('')
    const [days, setDays] = useState('')
    const [time, setTime] = useState('')
    const [loading, setLoading] = useState(false)

    const modalRef = useRef<HTMLDialogElement>(null)

    const openModal = () => modalRef.current?.showModal()
    const closeModal = () => modalRef.current?.close()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const { error } = await supabase.from('trainings').insert({
            label,
            days,
            time,
            author_id: user?.id
        })

        setLoading(false)

        if (error) {
            alert('❌ Грешка при създаване на график: ' + error.message)
        } else {
            // alert('✅ Успешно създаден график!')
            setLabel('')
            setDays('')
            setTime('');
            closeModal();
        }
    }


    return (
        <div className='h-screen'>
            <button
                className="btn btn-secondary text-xl p-6 flex align-middle items-center justify-center mx-auto shadow-lg hover:scale-110 transition-transform"
                onClick={openModal}
                aria-label="Create new"
            >
                Добави тренировка +
            </button>
            <dialog ref={modalRef} className="modal backdrop-blur-sm">
                <section className="max-w-2xl mx-auto bg-base-200 p-6 rounded-lg shadow-md my-6">
                    <h3 className="text-xl font-bold text-center text-primary mb-4">➕ Добави тренировка</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="label">
                                <span className="label-text">Име на групата</span>
                            </label>
                            <input
                                type="text"
                                value={label}
                                onChange={(e) => setLabel(e.target.value)}
                                required
                                className="input input-bordered w-full"
                                placeholder="⚽ Група 1: Родени 2017 - 2016"
                            />
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text">Дни</span>
                            </label>
                            <input
                                type="text"
                                value={days}
                                onChange={(e) => setDays(e.target.value)}
                                required
                                className="input input-bordered w-full"
                                placeholder="🗓️ Понеделник, Сряда"
                            />
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text">Час</span>
                            </label>
                            <input
                                type="text"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                required
                                className="input input-bordered w-full"
                                placeholder="⏰ 16:00 - 17:00"
                            />
                        </div>
                        <div className="text-center">
                            <button type="button" className="btn btn-outline mr-4" onClick={closeModal}>
                                Cancel
                            </button>
                            <button className="btn btn-primary" type="submit" disabled={loading}>
                                {loading ? 'Запазване...' : 'Запази графика'}
                            </button>
                        </div>
                    </form>
                </section>
            </dialog>
        </div>
    )
}
