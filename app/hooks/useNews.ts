import { useEffect, useState } from 'react'
import { fetchNews } from '../services/fetchNews'
import { NewsItem } from '../components/CardNewsList'


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
  }, [])

  return { news, loading }
}
