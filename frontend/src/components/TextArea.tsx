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

  const classes = ['transition duration-300 text-black w-full p-4 rounded-2xl'];

  if (rest.status === 'error') {
    classes.push('bg-rose-50 outline-1 outline-offset-2 outline-rose-500');
  } else {
    classes.push('bg-white');
  }

  return (
    <FormField {...rest}>
      <textarea
        id={rest.id}
        className={classes.join(' ')}
        value={value}
        onChange={handleChange}
        aria-required={rest.required} />
    </FormField>
  );
}

export default TextArea;
