import Logo from './Logo';
import FooterLink from './FooterLink';
import useToken from '../hooks/useToken';

const Footer: React.FC = () => {
  const token = useToken();

  return (
    <footer className="mt-auto text-center text-sm p-5">
      <div className="mb-2 mt-12">
        <Logo size="small" />
      </div>

      <ul className="inline-flex gap-8">
        <FooterLink to="/about" label="About" />
        <FooterLink to="/privacy" label="Privacy" />
        {token
          ? <FooterLink to="/logout" label="logout" />
          : <FooterLink to="/login" label="Login" />}
      </ul>
    </footer>
  );
}

export default Footer;
