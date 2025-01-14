import React, { useState } from 'react'
import Image from 'next/image'

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
}) => {
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500">
          Error loading image
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          onLoadingComplete={() => setLoading(false)}
          onError={() => setError('Failed to load image')}
          className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        />
      )}
    </div>
  )
}
