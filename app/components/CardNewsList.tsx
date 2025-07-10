'use client'

import { supabase } from '@/lib/supabaseClient'
import React, { useEffect, useRef, useState } from 'react'
import { formatDate } from '../utils/formatDate'
import Navbar from './Navbar'
import Footer from './Footer'
import CreateNewsModal from './CreateNewsForm'
import { useAuth } from '../context/AuthContext'
import EditNewsModal from './EditNewsModal'
import { useNews } from '../hooks/useNews'

export type NewsItem = {
    id: number
    news_title?: string
    news_summary?: string
    news_content?: string
    news_image?: string
    created_at?: string
    author_id?: string
}

const CardNewsList = () => {

    const { loading, news } = useNews()

    const { user } = useAuth();
    const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
    const modalRef = useRef<HTMLDialogElement>(null)
    const [editOpen, setEditOpen] = useState(false);


    const handleEdit = (newsItem: NewsItem) => {
        setSelectedNews(newsItem)
        setEditOpen(true)
    }

    const openModal = (newsItem: NewsItem) => {
        setSelectedNews(newsItem)
        modalRef.current?.showModal()
    }

    const closeModal = () => {
        modalRef.current?.close()
        setSelectedNews(null)
    }

    const handleDeleteNews = async (id: number) => {
        if (!confirm("Are you sure you want to delete this news?")) return;

        const { error } = await supabase.from('news').delete().eq('id', id);

        if (error) {
            console.error('Delete error:', error.message);
            alert('Failed to delete news.');
        } else {
            alert('News deleted successfully.');
        }
    };


    return (
        <>
            <Navbar />
            {loading ? <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div> : <> <EditNewsModal
                newsItem={selectedNews}
                isOpen={editOpen}
                onClose={() => {
                    setEditOpen(false)
                    setSelectedNews(null)
                }}

            />
                <h1 className="text-2xl text-center p-6">
                    Новини за футболен клуб Атлетик Спортиво
                </h1>
                <div className="flex justify-center p-8">
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10">
                        {news.map((newsItem) => {
                            return <div key={newsItem.id} className="card bg-base-100 w-96 shadow-sm">
                                <figure className='w-full h-48 overflow-hidden'>
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
                                    {user && <div className="flex justify-center gap-2">
                                        <button onClick={() => handleEdit(newsItem)} className='btn btn-success'>Edit</button>
                                        <button onClick={() => handleDeleteNews(newsItem.id)} className='btn btn-primary'>Delete</button>
                                    </div>}
                                </div>
                            </div>
                        })}
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
            }
        </>
    )
}

export default CardNewsList;
