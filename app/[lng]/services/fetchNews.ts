import { supabase } from '@/lib/supabaseClient'
import { NewsItem } from '../components/CardNewsList';


export const fetchNews = async (): Promise<NewsItem[]> => {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching news:', error.message)
    throw new Error('Failed to fetch news')
  }

  return data as NewsItem[];
}
