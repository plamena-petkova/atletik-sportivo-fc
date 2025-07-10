'use client'

import { useState, useRef, ChangeEvent, FormEvent } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'

const CreateNewsModal = () => {

const {user} = useAuth();

const [title, setTitle] = useState<string>('')
  const [summary, setSummary] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const modalRef = useRef<HTMLDialogElement>(null)
  const router = useRouter()

  const openModal = () => modalRef.current?.showModal()
  const closeModal = () => modalRef.current?.close()

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setImageFile(file || null)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    let imageUrl = ''

    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('news-images')
        .upload(fileName, imageFile);
        console.log('Upload data',uploadData, fileName);

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

    const { error } = await supabase.from('news').insert([
      {
        news_title: title,
        news_summary: summary,
        news_content: content,
        author_id: user?.id,
        news_image: imageUrl,
      },
    ])

    if (error) {
      console.error('News creation failed:', error.message)
    } else {
      router.refresh()
      closeModal()
      setTitle('')
      setSummary('')
      setContent('')
      setImageFile(null)
    }

    setLoading(false)
  }

    return (
        <>
            <button
                className="btn btn-secondary text-xl p-6 flex align-middle items-center justify-center mx-auto shadow-lg hover:scale-110 transition-transform"
                onClick={openModal}
                aria-label="Create new"
            >
                Добави новина +
            </button>

            <dialog ref={modalRef} className="modal backdrop-blur-sm">
                <div className="modal-box w-full max-w-2xl">
                    <h2 className="text-xl font-semibold mb-4">📝 Добави новина</h2>
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
                            <button type="button" className="btn btn-outline" onClick={closeModal}>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    )
}

export default CreateNewsModal;
