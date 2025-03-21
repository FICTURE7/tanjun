import { Link } from 'react-router';

import Post from '../../../models/Post';
import Card from '../../../components/Card';

export interface PostProps {
  post: Post;
}

const PostPreview: React.FC<PostProps> = ({ post }) => {
  return (
    <Card>
      <h2 className='lowercase'>{post.title}</h2>
      <p>{post.content}</p>
      <Link className='lowercase text-sky-300' to={`/post/${post.id}`}>read more</Link>
    </Card>
  );
}

export default PostPreview;
