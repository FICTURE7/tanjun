export interface ButtonProps {
  type?: 'submit' | 'button';
  variant?: 'primary' | 'secondary'
  label: string;
  fullWidth?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ type, variant, label, fullWidth, onClick }) => {
  function handleClick() {
    if (onClick)
      onClick();
  }

  const classes = ['bg-sky-300 text-black p-4 rounded-full cursor-pointer'];

  if (variant === 'secondary')
    classes.push('bg-white');
  if (fullWidth)
    classes.push('w-100');

  return (
    <button className={classes.join(' ')} type={type} onClick={handleClick}>
      {label}
    </button>
  );
}

export default Button;
