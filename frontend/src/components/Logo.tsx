import './Logo.css'

export interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

const Logo: React.FC<LogoProps> = ({ size }) => {
  return (
    <span className={size ? `logo ${size}` : 'logo'}>
      tanjun
    </span>
  );
}

export default Logo;
