import Post from "../../../models/Post";
import PostPreview from "./PostPreview";

export interface PostPreviewListProps {
  posts: Post[];
}

const PostPreviewList: React.FC<PostPreviewListProps> = ({ posts }) => {
  return (
    <ul className='post-list'>
      {posts.map(post => (
        <li>
          <PostPreview key={post.id} post={post} />
        </li>
      ))}
    </ul>
  )
}

export default PostPreviewList;
