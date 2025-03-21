export interface AvatarProps {
  src: string
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return <img className='w-12 h-12 rounded-full' src={src} alt='avatar' />;
}

export default Avatar;
