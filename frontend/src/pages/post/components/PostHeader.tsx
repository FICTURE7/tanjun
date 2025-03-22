import React from "react";

export interface PostHeaderProps {
  title: string
}

const PostHeader: React.FC<PostHeaderProps> = ({ title }) => {
  return (
    <div>
      <h1 className='font-bold text-3xl mb-8'>{title}</h1>
    </div>
  );
}

export default PostHeader;
