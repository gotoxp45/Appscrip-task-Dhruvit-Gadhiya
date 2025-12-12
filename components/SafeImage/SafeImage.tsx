'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface SafeImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  width?: number;
  height?: number;
  'data-seo-name'?: string;
}

const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  fill = false,
  className = '',
  sizes,
  loading = 'lazy',
  priority = false,
  width,
  height,
  'data-seo-name': dataSeoName,
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  if (imageError) {
    return (
      <div 
        className={`${className} safe-image-fallback`}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
          color: '#666',
          fontSize: '12px',
          textAlign: 'center',
          padding: '1rem',
          ...(fill && { 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0,
            width: '100%',
            height: '100%'
          })
        }}
        role="img"
        aria-label={alt}
      >
        <span>Image unavailable</span>
      </div>
    );
  }

  const imageProps: Omit<React.ComponentPropsWithoutRef<typeof Image>, 'src' | 'alt'> = {
    className,
    loading,
    priority,
    onError: handleError,
    onLoad: handleLoad,
  };

  if (fill) {
    imageProps.fill = true;
    if (sizes) imageProps.sizes = sizes;
  } else if (width && height) {
    imageProps.width = width;
    imageProps.height = height;
  }

  return (
    <>
      {isLoading && (
        <div 
          className={`${className} safe-image-loading`}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f8f9fa',
            color: '#999',
            fontSize: '12px',
            ...(fill && { 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0,
              width: '100%',
              height: '100%'
            })
          }}
        >
          Loading...
        </div>
      )}
      <Image src={src} alt={alt} {...imageProps} data-seo-name={dataSeoName} />
    </>
  );
};

export default SafeImage;
