import { ChangeEvent } from 'react';
import FormField, { FormFieldProps } from './FormField';

export interface TextAreaProps extends Omit<FormFieldProps, 'children'> {
  value?: string;
  onChange?: (value: string) => void;
}

const TextArea: React.FC<TextAreaProps> = ({ value, onChange, ...rest }) => {
  function handleChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    if (onChange)
      onChange(event.target.value);
  }

  return (
    <FormField {...rest}>
      <textarea className='bg-white text-black w-full p-4 rounded-2xl' value={value} onChange={handleChange} required={rest.required} />
    </FormField>
  );
}

export default TextArea;
