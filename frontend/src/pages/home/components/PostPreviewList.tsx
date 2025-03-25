import { Post } from "../../../models";
import PostPreview from "./PostPreview";
import PostPreviewEmpty from "./PostPreviewEmpty";
import PostPreviewNotFound from "./PostPreviewNotFound";

export interface PostPreviewListProps {
  posts?: Post[];
  filter?: string;
}

const PostPreviewList: React.FC<PostPreviewListProps> = ({ posts, filter: search }) => {
  posts ??= [];

  if (posts.length === 0) {
    return <PostPreviewEmpty />
  }

  const filteredPosts = search ? posts.filter(p => p.title.includes(search)) : posts;

  if (filteredPosts.length === 0) {
    return <PostPreviewNotFound />
  }

  return (
    <>
      <ul className="p-0 m-0 list-none">
      {filteredPosts.map(post => (
        <li className="mb-4">
          <PostPreview key={post.id} post={post} />
        </li>
      ))}
      </ul>
    </>
  )
}

export default PostPreviewList;
