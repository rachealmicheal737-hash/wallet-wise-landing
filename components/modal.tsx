'use client';

import { X } from 'lucide-react';
import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className='fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300'
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className='fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none'>
        <div className='bg-card rounded-2xl p-8 max-w-md w-full space-y-6 pointer-events-auto shadow-2xl border border-border animate-scale-in'>
          {/* Header */}
          <div className='flex items-center justify-between'>
            <h2 className='text-2xl font-bold text-foreground'>{title}</h2>
            <button
              onClick={onClose}
              className='text-muted-foreground hover:text-foreground transition-colors duration-300'
              aria-label='Close modal'
            >
              <X className='w-6 h-6' />
            </button>
          </div>

          {/* Content */}
          {children}
        </div>
      </div>
    </>
  );
}
