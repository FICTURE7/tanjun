import React from "react";
import { BsPencilSquare } from "react-icons/bs";
import { Link } from "react-router";

import { Post } from "../../../models";

export interface PostHeaderProps {
  post: Post
  editable?: boolean;
}

const PostHeader: React.FC<PostHeaderProps> = ({ post, editable }) => {
  return (
    <div className="flex items-center ms-5 mb-8">
      <h1 className='font-bold text-3xl flex-grow-1'>{post.title}</h1>

      {editable && (
        <Link to={`/post/edit/${post.id}`}>
          <button className='h-16 w-16 bg-black hover:bg-gray-800 active:bg-gray-700 text-white rounded-full cursor-pointer'>
            <BsPencilSquare className='inline text-2xl' />
          </button>
        </Link>
      )}
    </div>
  );
}

export default PostHeader;
