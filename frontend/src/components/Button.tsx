export interface ButtonProps {
  type?: 'submit' | 'button';
  variant?: 'primary' | 'secondary';
  size?: 'normal' | 'large';
  label: string;
  fullWidth?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ type, variant, size, label, fullWidth, onClick }) => {
  variant ??= 'primary';
  size ??= 'normal';

  const classes = ['text-black rounded-full cursor-pointer select-none'];

  if (variant === 'secondary')
    classes.push('bg-white hover:bg-gray-200 active:bg-gray-300');
  else if (variant === 'primary')
    classes.push('bg-sky-300 hover:bg-sky-400 active:bg-sky-500');

  if (size === 'normal')
    classes.push('py-2 px-4')
  else if (size === 'large')
    classes.push('p-4')

  if (fullWidth)
    classes.push('w-100');

  function handleClick() {
    if (onClick)
      onClick();
  }

  return (
    <button className={classes.join(' ')} type={type} onClick={handleClick}>
      {label}
    </button>
  );
}

export default Button;
