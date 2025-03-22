import Avatar from "../../../components/Avatar"

export interface PostFooterProps {
  username: string;
  createdAt: Date;
  updatedAt?: Date;
  src: string;
}

function pad(num: number) {
  return num.toString().padStart(2, '0');
}

function formatDate(date: Date) {
  return `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

const PostFooter: React.FC<PostFooterProps> = ({ username, createdAt, updatedAt, src }) => {
  return (
    <div className="flex">
      <Avatar src={src} />

      <div className="ml-4">
        <p className="font-bold mb-1">{username}</p>
        <p className="text-xs text-gray-300">created at {formatDate(createdAt)}</p>
        {updatedAt && <p className="text-xs text-gray-300">updated at {formatDate(createdAt)}</p>}
      </div>
    </div>
  )
}

export default PostFooter;
