import './Avatar.css'

export interface AvatarProps {
  src: string
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return <img className='avatar' src={src} alt='avatar' />;
}

export default Avatar;
