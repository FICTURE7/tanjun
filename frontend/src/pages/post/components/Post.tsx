import { type Post } from "../../../models";

import Card from "../../../components/Card";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";

export interface PostProps {
  post: Post;
  editable?: boolean;
}

const Post: React.FC<PostProps> = ({ post, editable }) => {
  return (
    <div>
      <PostHeader post={post} editable={editable}/>
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
