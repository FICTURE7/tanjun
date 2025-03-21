import './Button.css';

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

  const classes = ['button'];

  if (variant === 'secondary')
    classes.push('secondary');
  if (fullWidth)
    classes.push('full-width');

  return (
    <button className={classes.join(' ')} type={type} onClick={handleClick}>
      {label}
    </button>
  );
}

export default Button;
