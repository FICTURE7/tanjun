import Post from "../../../models/Post";
import PostPreview from "./PostPreview";
import PostPreviewEmpty from "./PostPreviewEmpty";
import Toolbar from "./Toolbar";

export interface PostPreviewListProps {
  posts?: Post[];
}

const PostPreviewList: React.FC<PostPreviewListProps> = ({ posts }) => {
  posts ??= [];

  return (
    <div>
      <div className="mb-8">
        <Toolbar />
      </div>

      {posts.length === 0 && <PostPreviewEmpty />}
      {posts.length > 0 && (
        <ul className="p-0 m-0 list-none">
        {posts.map(post => (
          <li className="mb-4">
            <PostPreview key={post.id} post={post} />
          </li>
        ))}
        </ul>
      )}
    </div>
  )
}

export default PostPreviewList;
