import { Spinner } from "../../../components";
import { Post } from "../../../models";
import PostPreview from "./PostPreview";
import PostPreviewEmpty from "./PostPreviewEmpty";
import PostPreviewNotFound from "./PostPreviewNotFound";

export interface PostPreviewListProps {
  isLoading: boolean;
  posts?: Post[];
  filter?: string;
}

const PostPreviewList: React.FC<PostPreviewListProps> = ({ isLoading, posts, filter }) => {
  posts ??= [];

  if (isLoading) {
    return <Spinner />
  }

  if (posts.length === 0) {
    return <PostPreviewEmpty />
  }

  const filteredPosts = filter ? posts.filter(p => p.title.includes(filter)) : posts;

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
