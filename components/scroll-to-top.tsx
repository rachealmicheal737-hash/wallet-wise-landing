'use client';

import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (typeof window !== 'undefined') {
      setIsVisible(window.scrollY > 300);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', toggleVisibility);
      return () => {
        window.removeEventListener('scroll', toggleVisibility);
      };
    }
  }, []);

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className='fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full flex items-center justify-center bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 group animate-scale-in'
      aria-label='Scroll to top'
    >
      <ArrowUp className='w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300' />
    </button>
  );
}
