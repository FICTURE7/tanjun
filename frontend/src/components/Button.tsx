export interface ButtonProps {
  type?: 'submit' | 'button';
  variant?: 'primary' | 'secondary'
  label: string;
  fullWidth?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ type, variant, label, fullWidth, onClick }) => {
  variant = variant ??= 'primary';

  const classes = ['text-black p-4 rounded-full cursor-pointer'];

  if (variant === 'secondary')
    classes.push('bg-white hover:bg-gray-100 active:bg-gray-200');
  else if (variant === 'primary')
    classes.push('bg-sky-300 hover:bg-sky-400 active:bg-sky-500');

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
