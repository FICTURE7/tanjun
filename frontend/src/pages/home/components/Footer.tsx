import './Footer.css';

const Footer: React.FC = () => {
  return (
    <div className='footer'>
      <p className='text-logo'>tanjun</p>
      <ul className='footer-links'>
        <li><a href='/about'>About Us</a></li>
        <li><a href='/contact'>Contact</a></li>
        <li><a href='/privacy'>Privacy Policy</a></li>
        <li><a href='/terms'>Terms of Service</a></li>
      </ul>
    </div>
  );
}

export default Footer;
