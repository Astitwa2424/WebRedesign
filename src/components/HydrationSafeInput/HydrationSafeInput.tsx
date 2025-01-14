'use client'

import React, { useState, useEffect } from 'react'

interface HydrationSafeInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  initialValue?: string
}

export const HydrationSafeInput: React.FC<HydrationSafeInputProps> = ({
  initialValue = '',
  ...props
}) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <input {...props} value={initialValue} />
  }

  return <input {...props} />
}
