import { ChangeEvent } from 'react';
import './TextField.css'

export interface TextFieldProps {
  type?: 'input' | 'password'
  label: string;
  value?: string;
  required?: boolean;
  onChange?: (value: string) => void;
}

const TextField: React.FC<TextFieldProps> = ({ type, label, value, required, onChange }) => {
  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    if (onChange) {
      onChange(event.target.value);
    }
  }

  return (
    <div>
      <div className='text-field-label'>
        <label>
          {label}
          {required ? <span className='text-field-label-required'>*</span> : <></>}
          </label>
      </div>
      <input className='text-field' type={type} value={value} onChange={handleChange} required={required} />
    </div>
  );
}

export default TextField;
