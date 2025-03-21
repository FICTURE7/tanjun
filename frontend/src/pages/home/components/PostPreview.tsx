import { Link } from 'react-router';

import Post from '../../../models/Post';
import Card from '../../../components/Card';

import './PostPreview.css'

export interface PostProps {
  post: Post;
}

const PostPreview: React.FC<PostProps> = ({ post }) => {
  return (
    <Card>
      <h2 className='card-title'>{post.title}</h2>
      <p>{post.content}</p>
      <Link className='card-link' to={`/post/${post.id}`}>read more</Link>
    </Card>
  );
}

export default PostPreview;
