import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { NewsItem } from '../components/CardNewsList'
import { fetchNews } from '../services/fetchNews'

export const useNews = () => {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true)
      try {
        const data = await fetchNews()
        setNews(data)
      } catch (error) {
        console.error('Failed to fetch news:', error)
      } finally {
        setLoading(false)
      }
    }

    loadNews()

    // Real-time subscription
    const channel = supabase
      .channel('realtime:news')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'news',
        },
        (payload) => {
          const newRecord = payload.new as NewsItem
          const oldRecord = payload.old as NewsItem

          setNews((current) => {
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

  return { news, loading }
}
