import Card from "../../../components/Card";
import type Post from "../../../models/Post";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";

export interface PostProps {
  post: Post;
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <div>
      <PostHeader post={post} />
      <Card>
        <div className="mb-8">
          <p>{post.content}</p>
        </div>

        <PostFooter
          username={post.author.username}
          createdAt={post.createdAt}
          updatedAt={post.updatedAt}
          src={"https://placehold.co/150"} />
      </Card>
    </div>
  )
}

export default Post;
