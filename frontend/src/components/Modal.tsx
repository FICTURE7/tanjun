import React, { useEffect } from 'react';

export interface ModalProps {
  isOpen: boolean;
  title: string;
  onClose?: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  onClose,
  children,
}) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) {
    return null;
  }
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="relative">
        <div className='bg-black text-white p-5 rounded-2xl border-2 shadow-2xl'>
          <h1 className="lowercase font-bold text-3xl mb-4">{title}</h1>

          <div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
