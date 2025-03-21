import Post from "../../../models/Post";
import PostPreview from "./PostPreview";
import PostPreviewEmpty from "./PostPreviewEmpty";
import './PostPreviewList.css';

export interface PostPreviewListProps {
  posts?: Post[];
}

const PostPreviewList: React.FC<PostPreviewListProps> = ({ posts }) => {
  posts ??= [];

  return posts.length == 0
    ? <PostPreviewEmpty />
    : (<ul className='post-list'>
      {posts.map(post => (
        <li>
          <PostPreview key={post.id} post={post} />
        </li>
      ))}
    </ul>)
}

export default PostPreviewList;
