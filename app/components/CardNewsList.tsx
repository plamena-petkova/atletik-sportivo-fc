'use client'

import { supabase } from '@/lib/supabaseClient'
import React, { useEffect, useRef, useState } from 'react'
import { formatDate } from '../utils/formatDate'
import Navbar from './Navbar'
import Footer from './Footer'
import CreateNewsModal from './CreateNewsForm'
import { useAuth } from '../context/AuthContext'

type NewsItem = {
    id: number
    news_title?: string
    news_summary?: string
    news_content?: string
    news_image?: string
    created_at?: string
    author_id?: string
}

const CardNewsList = () => {
    const {user} = useAuth();
    const [news, setNews] = useState<NewsItem[]>([])
    const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
    const [loading, setLoading] = useState(true)
    const modalRef = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true)
            const { data, error } = await supabase.from('news').select('*');
            if (error) {
                console.error('Error fetching news:', error.message)
            } else {
                setNews(data as NewsItem[])
            }
            setLoading(false)
        }

        fetchNews()
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        )
    }


    const openModal = (newsItem: NewsItem) => {
        setSelectedNews(newsItem)
        modalRef.current?.showModal()
    }

    const closeModal = () => {
        modalRef.current?.close()
        setSelectedNews(null)
    }

    return (
        <>
            <Navbar />
            <h1 className="text-2xl text-center p-6">
                Новини за футболен клуб Атлетик Спортиво
            </h1>
            <div className="flex justify-center p-8">
                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10">
                    {news.map((newsItem) => (
                        <div key={newsItem.id} className="card bg-base-100 w-96 shadow-sm">
                            <figure>
                                <img
                                    src={newsItem.news_image || '/football-news_img.jpg'}
                                    alt={newsItem.news_title || 'News image'}
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{newsItem?.news_title}</h2>
                                <p>{formatDate(newsItem.created_at)}</p>
                                <p>{newsItem?.news_summary}</p>
                                <button
                                    onClick={() => openModal(newsItem)}
                                    className="btn btn-secondary"
                                >
                                    Прочети повече
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="w-96 flex items-center justify-center align-middle">
                        {user && <CreateNewsModal />}
                    </div>
                </div>
            </div>

            <dialog ref={modalRef} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{selectedNews?.news_title}</h3>
                    <p>{formatDate(selectedNews?.created_at)}</p>
                    <p className="py-4">{selectedNews?.news_content}</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn" onClick={closeModal}>
                                Close
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
            <Footer />
        </>
    )
}

export default CardNewsList;
