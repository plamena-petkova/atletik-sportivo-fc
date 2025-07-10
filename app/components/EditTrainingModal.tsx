'use client'

import { useRef, useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useAuth } from '../context/AuthContext'
import { TrainingGroup } from '../hooks/useTrainings'

type EditScheduleModalProps = {
  training: TrainingGroup | null
  isOpen: boolean
  onClose: () => void
  onUpdate: (updatedTraining: TrainingGroup) => void
}

export default function EditScheduleModal({
  training,
  isOpen,
  onClose,
  onUpdate,
}: EditScheduleModalProps) {
  const { user } = useAuth()

  const modalRef = useRef<HTMLDialogElement>(null)

  const [label, setLabel] = useState<string>('')
  const [days, setDays] = useState<string>('')
  const [time, setTime] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (training) {
      setLabel(training.label)
      setDays(training.days)
      setTime(training.time)
    }
  }, [training])

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal()
    } else {
      modalRef.current?.close()
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!training) return

    setLoading(true)

    const { data, error } = await supabase
      .from('trainings')
      .update({
        label,
        days,
        time,
        author_id: user?.id,
      })
      .eq('id', training.id)
      .select()
      .single()

    setLoading(false)

    if (error) {
      alert('❌ Грешка при обновяване на графика: ' + error.message)
    } else if (data) {
      //alert('✅ Успешно обновен график!')
      onUpdate(data)
      onClose()
    }
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <dialog ref={modalRef} className="modal backdrop-blur-sm" onCancel={handleClose}>
      <section className="max-w-2xl mx-auto bg-base-200 p-6 rounded-lg shadow-md my-6">
        <h3 className="text-xl font-bold text-center text-primary mb-4">✏️ Редактирай тренировка</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Име на групата</span>
            </label>
            <input
              type="text"
              value={label}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLabel(e.target.value)}
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDays(e.target.value)}
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTime(e.target.value)}
              required
              className="input input-bordered w-full"
              placeholder="⏰ 16:00 - 17:00"
            />
          </div>
          <div className="text-center">
            <button type="button" className="btn btn-outline mr-4" onClick={handleClose}>
              Cancel
            </button>
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? 'Запазване...' : 'Запази промени'}
            </button>
          </div>
        </form>
      </section>
    </dialog>
  )
}
