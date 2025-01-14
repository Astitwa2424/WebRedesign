'use client'

import { useState } from 'react'
import { OptimizedImage } from './OptimizedImage'

export function ImageUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setError(null)

    try {
      const filename = encodeURIComponent(file.name)
      const res = await fetch(`/api/upload?filename=${filename}`, {
        method: 'POST',
        body: file,
      })

      if (!res.ok) throw new Error('Upload failed')

      const data = await res.json()
      setUploadedImageUrl(data.url)
    } catch (err) {
      console.error('Error uploading file:', err)
      setError('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {uploadedImageUrl && (
        <div>
          <p>Uploaded Image:</p>
          <OptimizedImage src={uploadedImageUrl} alt="Uploaded image" width={300} height={200} />
        </div>
      )}
    </div>
  )
}
