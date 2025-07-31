'use client';

import { useEffect } from 'react';
import { setCookie } from 'cookies-next';

export function ScreenSizeDetector() {
  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth > 768;
      setCookie('isDesktop', isDesktop.toString());
    };
    
    // Set initial value
    handleResize();
    
    // Update on resize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return null;
}