import Logo from './Logo';
import { Link } from 'react-router';

export interface HeaderProps {
  size?: 'normal' | 'large';
}

const Header: React.FC<HeaderProps> = ({ size }) => {
  return (
    <div className="my-16 text-center">
        <h1>
          <Link to="/">
            <Logo size={size} />
          </Link>
        </h1>
    </div>
  );
}

export default Header
