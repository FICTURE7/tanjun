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

  const classes = ['transition duration-300 text-black w-full p-4 rounded-full'];

  if (rest.status === 'error') {
    classes.push('bg-rose-50 outline-1 outline-offset-2 outline-rose-500');
  } else {
    classes.push('bg-white');
  }

  return (
    <FormField {...rest}>
      <input
        id={rest.id}
        className={classes.join(' ')}
        type={type}
        value={value}
        onChange={handleChange}
        aria-required={rest.required} />
    </FormField>
  );
}

export default TextField;
