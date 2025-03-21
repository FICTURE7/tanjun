import Post from "../../../models/Post";
import PostPreview from "./PostPreview";
import PostPreviewEmpty from "./PostPreviewEmpty";
import Toolbar from "./Toolbar";

import './PostPreviewList.css';

export interface PostPreviewListProps {
  posts?: Post[];
}

const PostPreviewList: React.FC<PostPreviewListProps> = ({ posts }) => {
  posts ??= [];

  return (
    <div>
      <div className="mb-3">
        <Toolbar />
      </div>

      {posts.length === 0 && <PostPreviewEmpty />}
      {posts.length > 0 && (
        <ul className='post-list'>
        {posts.map(post => (
          <li>
            <PostPreview key={post.id} post={post} />
          </li>
        ))}
        </ul>
      )}
    </div>
  )
}

export default PostPreviewList;
