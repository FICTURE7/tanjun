import { Link } from "react-router";

export interface FooterLinkProps {
  label: string;
  to: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ to, label }) => {
  return (
    <li>
      <Link className="lowercase text-sky-600" to={to}>{label}</Link>
    </li>
  );
}

export default FooterLink;
