'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export type TrainingGroup = {
  id: number
  label: string
  days: string
  time: string
  author_id: string
  created_at: string
}

export const useTrainings = () => {
  const [trainings, setTrainings] = useState<TrainingGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)


  const fetchTrainings = async () => {
    const { data, error } = await supabase
      .from('trainings')
      .select('*')
      .order('id')

    if (error) {
      console.error('Error fetching trainings:', error.message)
      setError(error.message)
    } else {
      setTrainings(data || [])
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchTrainings()

    const channel = supabase
      .channel('realtime:trainings')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'trainings' },
        (payload) => {
          const newRecord = payload.new as TrainingGroup
          const oldRecord = payload.old as TrainingGroup

          setTrainings((current) => {
            switch (payload.eventType) {
              case 'INSERT':
                return [newRecord, ...current]
              case 'UPDATE':
                return current.map((item) =>
                  item.id === newRecord.id ? newRecord : item
                )
              case 'DELETE':
                return current.filter((item) => item.id !== oldRecord.id)
              default:
                return current
            }
          })
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return { trainings, loading, error }
}
