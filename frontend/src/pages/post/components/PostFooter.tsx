import Avatar from "../../../components/Avatar"

export interface PostFooterProps {
  name: string
  src: string
}

const PostFooter: React.FC<PostFooterProps> = ({ name, src }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Avatar src={src} />
      <div style={{ marginLeft: '1rem' }}>
        <h3 style={{ margin: '0', fontSize: '0.9rem' }}>Author</h3>
        <p style={{ margin: '0', fontSize: '0.9rem' }}>{name}</p>
      </div>
    </div>
  )
}

export default PostFooter;
