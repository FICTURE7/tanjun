import { ChangeEvent } from 'react';

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
      <div className='lowercase text-sm mb-2'>
        <label>
          {label}
          {required ? <span className='text-red-400'>*</span> : <></>}
          </label>
      </div>
      <input className='bg-white text-black w-100 p-4 rounded-full' type={type} value={value} onChange={handleChange} required={required} />
    </div>
  );
}

export default TextField;
