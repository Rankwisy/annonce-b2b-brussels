'use client'

import { useRef, useState } from 'react'

interface UploadedImage {
  id: string
  image_url: string
  position: number
}

interface ImageUploaderProps {
  listingId: string
  initialImages?: UploadedImage[]
  onChange?: (images: UploadedImage[]) => void
}

export function ImageUploader({ listingId, initialImages = [], onChange }: ImageUploaderProps) {
  const [images, setImages] = useState<UploadedImage[]>(initialImages)
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function uploadFile(file: File) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('listing_id', listingId)
    formData.append('position', String(images.length))

    const res = await fetch('/api/upload', { method: 'POST', body: formData })
    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.error ?? 'Upload failed')
    }
    return res.json() as Promise<UploadedImage>
  }

  async function handleFiles(files: FileList | null) {
    if (!files?.length) return
    setUploading(true)
    try {
      const uploaded: UploadedImage[] = []
      for (const file of Array.from(files)) {
        if (!file.type.startsWith('image/')) continue
        const img = await uploadFile(file)
        uploaded.push(img)
      }
      const next = [...images, ...uploaded]
      setImages(next)
      onChange?.(next)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  async function removeImage(imageId: string) {
    const res = await fetch('/api/upload', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image_id: imageId }),
    })
    if (res.ok) {
      const next = images.filter(img => img.id !== imageId)
      setImages(next)
      onChange?.(next)
    }
  }

  return (
    <div className="space-y-3">
      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files) }}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
          dragOver
            ? 'border-primary bg-primary/5'
            : 'border-outline-variant/40 hover:border-primary/50 hover:bg-surface-container/50'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-on-surface/60">Téléchargement en cours…</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <svg className="w-10 h-10 text-on-surface/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm font-medium text-on-surface/70">
              Glissez vos photos ici ou <span className="text-primary">cliquez pour parcourir</span>
            </p>
            <p className="text-xs text-on-surface/40">JPG, PNG, WebP — max 5 Mo chacune</p>
          </div>
        )}
      </div>

      {/* Preview grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {images.map((img, idx) => (
            <div key={img.id} className="relative group rounded-xl overflow-hidden aspect-video bg-surface-container">
              <img src={img.image_url} alt={`Image ${idx + 1}`} className="w-full h-full object-cover" />
              {idx === 0 && (
                <span className="absolute top-1.5 left-1.5 text-[10px] font-bold bg-primary text-white px-1.5 py-0.5 rounded-full">
                  Principal
                </span>
              )}
              <button
                type="button"
                onClick={() => removeImage(img.id)}
                className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
