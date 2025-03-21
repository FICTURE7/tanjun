import Logo from './Logo';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className='footer'>
      <div>
        <Logo size='small'/>
      </div>

      <ul className='footer-links'>
        <li><a href='/about'>About</a></li>
        <li><a href='/privacy'>Privacy Policy</a></li>
        <li><a href='/login'>Login</a></li>
      </ul>
    </footer>
  );
}

export default Footer;
