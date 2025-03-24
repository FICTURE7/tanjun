export interface ButtonProps {
  type?: 'submit' | 'button';
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'normal' | 'large';
  label: string;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ type, variant, size, label, disabled, fullWidth, onClick }) => {
  variant ??= 'primary';
  size ??= 'normal';

  const classes = ['rounded-full cursor-pointer select-none'];

  if (variant === 'secondary')
    classes.push('text-black bg-white hover:bg-gray-200 active:bg-gray-300 disabled:bg-gray-300');
  else if (variant === 'primary')
    classes.push('text-black bg-sky-300 hover:bg-sky-400 active:bg-sky-500 disabled:bg-sky-400');
  else if (variant === 'danger')
    classes.push('text-white bg-rose-500 hover:bg-rose-600 active:bg-rose-500 disabled:bg-rose-400');

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
    <button
      className={classes.join(' ')}
      type={type}
      onClick={handleClick}
      disabled={disabled}>
      {label}
    </button>
  );
}

export default Button;
