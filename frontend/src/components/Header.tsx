import Logo from './Logo';
import './Header.css';
import { Link } from 'react-router';

export interface HeaderProps {
  size?: 'normal' | 'large';
}

const Header: React.FC<HeaderProps> = ({ size }) => {
  return (
    <div className={size ? `header ${size}` : 'header'}>
        <h1>
          <Link to='/'>
            <Logo size={size} />
          </Link>
        </h1>
    </div>
  );
}

export default Header
