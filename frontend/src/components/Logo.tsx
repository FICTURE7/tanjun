export interface LogoProps {
  size?: 'small' | 'normal' | 'large';
}

const Logo: React.FC<LogoProps> = ({ size }) => {
  size ??= 'normal';

  const classes = ['font-bold overline select-none'];

  if (size === 'small')
    classes.push('text-sm')
  else if (size === 'normal')
    classes.push('text-3xl');
  else if (size === 'large')
    classes.push('text-6xl')

  return (
    <span className={classes.join(' ')}>
      tanjun
    </span>
  );
}

export default Logo;
