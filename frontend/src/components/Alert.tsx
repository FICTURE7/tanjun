import React from "react";
import './Alert.css'

export interface AlertProps {
  children?: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({ children }) => {
  return (
    <div className="alert">
      {children}
    </div>
  )
}

export default Alert;
