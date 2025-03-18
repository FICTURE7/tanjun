import type Post from '../models/Post';
import './PostCard.css'

export interface PostProps {
  post: Post;
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <div className='card'>
      <h2 className='card-title'>{post.title}</h2>
      <p>{post.content}</p>
      <a className='card-link' href='#'>read more</a>
    </div>
  );
}

export default Post;
