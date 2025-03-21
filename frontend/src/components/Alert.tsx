import React from "react";

export interface AlertProps {
  children?: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({ children }) => {
  return (
    <div className="rounded-2xl bg-red-400 p-2">
      {children}
    </div>
  )
}

export default Alert;
