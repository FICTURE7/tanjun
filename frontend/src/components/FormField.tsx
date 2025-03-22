import React from "react";

export interface FormFieldProps {
  label: string;
  helperLabel?: string;
  required?: boolean;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ label, required, helperLabel, children }) => {
  return (
    <div>
      <div className="lowercase text-sm mb-2">
        <label>
          {label}
          {required && <span className="text-red-400">*</span>}
          </label>
      </div>
      <div>
        {children}
      </div>
      {helperLabel && (
        <p className="text-xs opacity-80 mt-2">{helperLabel}</p>
      )}
    </div>
  );
}

export default FormField;
