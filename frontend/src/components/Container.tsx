import './Container.css'

export interface ContainerProps {
  size?: 'small' | 'large';
  children?: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ size, children }) => {
  return (
    <div className={size ? `container ${size}` : 'container'}>
      {children}
    </div>
  )
};

export default Container;
