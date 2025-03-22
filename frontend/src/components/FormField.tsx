import React from "react";

export interface FormFieldProps {
  label: string;
  status?: 'normal' | 'error';
  statusLabel?: string;
  helperLabel?: string;
  required?: boolean;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  helperLabel,
  status,
  statusLabel,
  required,
  children
}) => {
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

      {statusLabel && status === 'error' && (
        <p className="text-xs text-rose-500 mt-2">
          <span className="font-bold">Error: </span>{statusLabel}
        </p>
      )}

      {helperLabel && (
        <p className="text-xs text-gray-300 mt-2">{helperLabel}</p>
      )}
    </div>
  );
}

export default FormField;
