'use client'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CreateScheduleForm from '../components/CreateScheduleForm'
import { useTrainings } from '../hooks/useTrainings'

export default function TrainingSchedule() {
  const { trainings, loading, error } = useTrainings()

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        ⚠️ Възникна грешка при зареждане: {error}
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <section className="max-w-4xl mx-auto p-8 bg-base-100 rounded-lg shadow-lg m-6 cursor-pointer">
        <h2 className="text-4xl font-extrabold mb-10 text-center text-primary drop-shadow-md">
          🏟️ График на тренировките
        </h2>
        <div className="space-y-8">
          {trainings.map(({ id, label, days, time }) => (
            <div
              key={id}
              className="border-l-8 border-secondary bg-base-200 p-6 rounded-md shadow-md transform transition-transform hover:scale-105 hover:shadow-xl"
            >
              <h3 className="text-2xl font-bold mb-3 text-neutral">⚽ {label}</h3>
              <p className="text-lg mb-1 text-neutral">
                <span className="font-semibold">🗓️ Дни:</span> {days}
              </p>
              <p className="text-lg text-neutral">
                <span className="font-semibold">⏰ Час:</span> {time}
              </p>
            </div>
          ))}
        </div>
      </section>

      <CreateScheduleForm />
      <Footer />
    </>
  )
}
