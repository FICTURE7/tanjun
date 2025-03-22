import React from "react";

export interface AlertProps {
  children?: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({ children }) => {
  return (
    <div className="rounded-2xl bg-rose-500 p-4">
      <p className="lowercase font-bold text-lg mb-2">errors</p>
      {children}
    </div>
  )
}

export default Alert;
