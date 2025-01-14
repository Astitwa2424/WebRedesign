import Image from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}

export function OptimizedImage({ src, alt, width, height, className }: OptimizedImageProps) {
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          Loading...
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-100 text-red-500">
          Error: {error.message}
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        onLoadingComplete={() => setLoading(false)}
        onError={(e) => setError(e as Error)}
        className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
      />
    </div>
  )
}
