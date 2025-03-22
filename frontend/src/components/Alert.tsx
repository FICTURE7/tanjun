import React from "react";
import { BsExclamationTriangleFill } from "react-icons/bs";

export interface AlertProps {
  children?: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({ children }) => {
  return (
    <div className="rounded-2xl bg-rose-500 p-4">
      <div className="flex items-center justify-between mb-2"> 
        <p className="lowercase font-bold text-lg">
          errors
        </p>
        <BsExclamationTriangleFill className="inline me-2"/>
      </div>
      {children}
    </div>
  )
}

export default Alert;
