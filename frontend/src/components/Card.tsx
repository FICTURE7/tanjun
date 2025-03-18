import React from 'react';
import './Card.css';

export interface CardProps {
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className='card'>
      {children}
    </div>
  );
}

export default Card;
