import type Post from "../../../models/Post";
import PostBody from "./PostBody";
import PostHeader from "./PostHeader";

export interface PostProps {
  post: Post;
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <div>
      <PostHeader title={post.title} />
      <PostBody>
        <p>
          {post.content}
        </p>
      </PostBody>
    </div>
  )
}

export default Post;
