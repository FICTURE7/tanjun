import React from 'react';

export interface CardProps {
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className='bg-black text-white p-5 rounded-2xl'>
      {children}
    </div>
  );
}

export default Card;
