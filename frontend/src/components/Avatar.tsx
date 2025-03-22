export interface AvatarProps {
  src: string
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return <img className='w-14 h-14 rounded-full' src={src} alt='avatar' />;
}

export default Avatar;
