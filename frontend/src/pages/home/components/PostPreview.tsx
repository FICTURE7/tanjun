import { Link } from 'react-router';

import { Card } from '../../../components';
import { Post } from '../../../models';

export interface PostProps {
  post: Post;
}

const PostPreview: React.FC<PostProps> = ({ post }) => {
  return (
    <Card>
      <h2 className='mb-2 lowercase font-bold text-xl overflow-ellipsis overflow-hiden whitespace-nowrap overflow-hidden'>{post.title}</h2>
      <p className='mb-2 overflow-ellipsis overflow-hiden whitespace-nowrap overflow-hidden'>{post.content}</p>
      <Link className='block lowercase text-sky-300 hover:text-sky-400 text-right' to={`/post/${post.id}`}>read more</Link>
    </Card>
  );
}

export default PostPreview;
