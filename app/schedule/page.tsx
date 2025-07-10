'use client'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CreateScheduleForm from '../components/CreateScheduleForm'
import { TrainingGroup, useTrainings } from '../hooks/useTrainings'
import { supabase } from '@/lib/supabaseClient'
import { useState } from 'react'
import EditScheduleModal from '../components/EditTrainingModal'
import { useAuth } from '../context/AuthContext'

export default function TrainingSchedule() {
  const { user } = useAuth();
  const { trainings, loading, error } = useTrainings();

  const [groups, setGroups] = useState<TrainingGroup[]>([])
  const [editOpen, setEditOpen] = useState<boolean>(false)
  const [selectedTraining, setSelectedTraining] = useState<TrainingGroup | null>(null)

  const openEdit = (training: TrainingGroup) => {
    setSelectedTraining(training)
    setEditOpen(true)
  }

  const closeEdit = () => {
    setEditOpen(false)
    setSelectedTraining(null)
  }

  const handleUpdate = (updatedTraining: TrainingGroup) => {
    setGroups((prev) =>
      prev.map((g) => (g.id === updatedTraining.id ? updatedTraining : g))
    )
  }

  const handleDeleteTraining = async (id: number) => {
    if (!confirm("Are you sure you want to delete this training?")) return;

    const { error } = await supabase.from('trainings').delete().eq('id', id);

    if (error) {
      console.error('Delete error:', error.message);
      alert('Failed to delete training.');
    } else {
      alert('Training deleted successfully.');
    }
  };


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
      {loading ? <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div> : <section className="max-w-4xl mx-auto p-8 bg-base-100 rounded-lg shadow-lg m-6 cursor-pointer">
        <h2 className="text-4xl font-extrabold mb-10 text-center text-primary drop-shadow-md">
          🏟️ График на тренировките
        </h2>
        <div className="space-y-8">
          {trainings.map((training) => (
            <div
              key={training.id}
              className="border-l-8 border-secondary bg-base-200 p-6 rounded-md shadow-md transform transition-transform hover:scale-105 hover:shadow-xl"
            >
              <div className="flex justify-between">
                <div className="">
                  <h3 className="text-2xl font-bold mb-3 text-neutral">⚽ {training.label}</h3>
                  <p className="text-lg mb-1 text-neutral">
                    <span className="font-semibold">🗓️ Дни:</span> {training.days}
                  </p>
                  <p className="text-lg text-neutral">
                    <span className="font-semibold">⏰ Час:</span> {training.time}
                  </p>
                </div>
                {user && <div className="flex justify-start m-3">

                  <button onClick={() => openEdit(training)} className='btn btn-secondary mr-5'>Edit</button>
                  <button onClick={() => handleDeleteTraining(training.id)} className='btn btn-primary'>Delete</button>
                </div>}
              </div>
            </div>

          ))}
        </div>
      </section>}


      <EditScheduleModal
        training={selectedTraining}
        isOpen={editOpen}
        onClose={closeEdit}
        onUpdate={handleUpdate}
      />
      {user && <CreateScheduleForm />}
      <Footer />
    </>
  )
}
