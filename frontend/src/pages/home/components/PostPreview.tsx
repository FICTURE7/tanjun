import { Link } from 'react-router';

import Post from '../../../models/Post';
import { Card } from '../../../components';

export interface PostProps {
  post: Post;
}

const PostPreview: React.FC<PostProps> = ({ post }) => {
  return (
    <Card>
      <h2 className='lowercase font-bold text-xl mb-2'>{post.title}</h2>
      <p className='mb-2'>{post.content}</p>
      <Link className='block lowercase text-sky-300 hover:text-sky-400 text-right' to={`/post/${post.id}`}>read more</Link>
    </Card>
  );
}

export default PostPreview;
