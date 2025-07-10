'use client'

import { useRef, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

const AddPicture = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const modalRef = useRef<HTMLDialogElement>(null);

  const openModal = () => modalRef.current?.showModal()
  const closeModal = () => modalRef.current?.close()

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!imageFile) return

    setUploading(true)

    const fileExt = imageFile.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`

    const { data: storageData, error: storageError } = await supabase.storage
      .from('gallery-images')
      .upload(fileName, imageFile)

    if (storageError) {
      console.error('Upload error:', storageError.message)
      setUploading(false)
      return;
    }

    setUploading(false);
    closeModal();
  }

  return (
    <>
      <button
        className="btn btn-secondary text-xl p-6 mb-6 flex align-middle items-center justify-center mx-auto shadow-lg hover:scale-110 transition-transform"
        onClick={openModal}
      >
        Добави снимка +
      </button>

      <dialog ref={modalRef} className="modal backdrop-blur-sm">
        <div className="modal-box w-full max-w-md">
          <h3 className="font-bold text-lg mb-4">Качи снимка</h3>
          <form onSubmit={handleUpload} className="space-y-4">
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              required
            />
            <div className="flex justify-end gap-4">
              <button type="button" className="btn btn-outline" onClick={closeModal}>
                Затвори
              </button>
              <button type="submit" className="btn btn-primary" disabled={uploading}>
                {uploading ? 'Качване...' : 'Качи'}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  )
}

export default AddPicture;
