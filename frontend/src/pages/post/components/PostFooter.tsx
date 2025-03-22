import Avatar from "../../../components/Avatar"

export interface PostFooterProps {
  name: string
  src: string
}

const PostFooter: React.FC<PostFooterProps> = ({ name, src }) => {
  return (
    <div className="flex align-middle">
      <Avatar src={src} />
      <div className="ml-4">
        <p className="text-sm">{name}</p>
        <p className="text-sm">created at 19/03/2025</p>
      </div>
    </div>
  )
}

export default PostFooter;
