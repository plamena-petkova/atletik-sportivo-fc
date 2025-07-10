'use client'

import { useState, useRef, ChangeEvent, FormEvent, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { NewsItem } from './CardNewsList'

type EditNewsModalProps = {
    newsItem: NewsItem | null
    onClose: () => void
    isOpen: boolean
}

const EditNewsModal = ({ newsItem, onClose, isOpen }: EditNewsModalProps) => {
    const [title, setTitle] = useState<string>('')
    const [summary, setSummary] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const modalRef = useRef<HTMLDialogElement>(null)
    const router = useRouter()

    useEffect(() => {
        if (newsItem) {
            setTitle(newsItem.news_title || '')
            setSummary(newsItem.news_summary || '')
            setContent(newsItem.news_content || '')
        }
    }, [newsItem])


    useEffect(() => {
        if (isOpen) modalRef.current?.showModal()
        else modalRef.current?.close()
    }, [isOpen])

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file)
        } else {
            setImageFile(null)
        }

    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!newsItem) return
        setLoading(true)

        let imageUrl = newsItem.news_image || ''

        if (imageFile) {
            const fileExt = imageFile.name.split('.').pop()
            const fileName = `${Date.now()}.${fileExt}`

            const { error: uploadError } = await supabase.storage
                .from('news-images')
                .upload(fileName, imageFile, { upsert: true })

            if (uploadError) {
                console.error('Image upload failed:', uploadError.message)
                setLoading(false)
                return
            }

            const { data: publicUrlData } = supabase.storage
                .from('news-images')
                .getPublicUrl(fileName)

            imageUrl = publicUrlData?.publicUrl || ''
        }

        const { error } = await supabase
            .from('news')
            .update({
                news_title: title,
                news_summary: summary,
                news_content: content,
                news_image: imageUrl,
            })
            .eq('id', newsItem.id)

        if (error) {
            console.error('News update failed:', error.message)
        } else {
            router.refresh()
            onClose()
        }

        setLoading(false)
    }

    return (
        <dialog ref={modalRef} className="modal backdrop-blur-sm">
            <div className="modal-box w-full max-w-2xl">
                <h2 className="text-xl font-semibold mb-4">✏️ Редактирай новина</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Title"
                        className="input input-bordered w-full"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Summary"
                        className="input input-bordered w-full"
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Content"
                        className="textarea textarea-bordered w-full"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                    <input
                        type="file"
                        accept="image/*"
                        className="file-input file-input-bordered w-full"
                        onChange={handleFileChange}
                    />
                    <div className="flex justify-end gap-4">
                        <button type="button" className="btn btn-outline" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    )
}

export default EditNewsModal;
