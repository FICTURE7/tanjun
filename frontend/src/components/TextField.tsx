import { ChangeEvent } from 'react';
import FormField, { FormFieldProps } from './FormField';

export interface TextFieldProps extends Omit<FormFieldProps, 'children'> {
  type?: 'input' | 'password'
  value?: string;
  onChange?: (value: string) => void;
}

const TextField: React.FC<TextFieldProps> = ({ type, value, onChange, ...rest }) => {
  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    if (onChange)
      onChange(event.target.value);
  }

  return (
    <FormField {...rest}>
      <input className='bg-white text-black w-full p-4 rounded-full' type={type} value={value} onChange={handleChange} required={rest.required} />
    </FormField>
  );
}

export default TextField;
