export interface ContainerProps {
  size?: 'small' | 'normal';
  children?: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ size, children }) => {
  size ??= 'normal';

  const classes = ['flex flex-col my-0 mx-auto min-h-screen w-19/20'];

  if (size === 'normal') {
    classes.push('max-w-3xl');
  } else if (size === 'small') {
    classes.push('max-w-md');
  }

  return (
    <div className={classes.join(' ')}>
      {children}
    </div>
  )
};

export default Container;
