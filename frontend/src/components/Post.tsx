import './Post.module.css'

export interface PostProps {
  model?: any;
}

const Post: React.FC<PostProps> = () => {
  return (
    <div>
      <h1>Post</h1>
      <p>Content Post</p>
    </div>
  );
}

export default Post;
