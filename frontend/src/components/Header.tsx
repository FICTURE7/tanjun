import Logo from './Logo';
import './Header.css';

export interface HeaderProps {
  size?: 'medium' | 'large';
}

const Header: React.FC<HeaderProps> = ({ size }) => {
  return (
    <div className={size ? `header ${size}` : 'header'}>
        <h1>
          <Logo size={size} />
        </h1>
    </div>
  );
}

export default Header
