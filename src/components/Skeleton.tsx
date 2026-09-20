import { useState } from 'react'

export function Skeleton({ className = '', dark = false }: { className?: string; dark?: boolean }) {
  return <div aria-hidden="true" className={`skeleton ${dark ? 'skeleton-dark' : ''} ${className}`} />
}

type ImageProps = {
  src: string
  alt: string
  className?: string
  placeholderClassName?: string
}

// Shows a shimmering placeholder until the image has really finished loading.
export function SkeletonImage({
  src,
  alt,
  className = '',
  placeholderClassName = 'absolute inset-0',
}: ImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {!loaded && <Skeleton className={placeholderClassName} />}
      <img
        src={src}
        alt={alt}
        ref={(el) => {
          if (el?.complete && el.naturalWidth > 0) setLoaded(true)
        }}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={loaded ? `${className} animate-[fadein_.45s_ease-out]` : 'hidden'}
      />
    </>
  )
}
