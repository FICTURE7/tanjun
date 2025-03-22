import Logo from './Logo';
import FooterLink from './FooterLink';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto text-center text-sm p-5">
      <div className="mb-2 mt-12">
        <Logo size="small" />
      </div>

      <ul className="inline-flex gap-8">
        <FooterLink to="/about" label="About" />
        <FooterLink to="/privacy" label="Privacy" />
        <FooterLink to="/login" label="login" />
      </ul>
    </footer>
  );
}

export default Footer;
