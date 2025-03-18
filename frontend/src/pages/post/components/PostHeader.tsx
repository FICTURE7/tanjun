import React from "react";
import './PostHeader.css'

export interface PostHeaderProps {
  title: string
}

const PostHeader: React.FC<PostHeaderProps> = ({ title }) => {
  return (
    <div>
      <h1 className='post-title'>{title}</h1>
    </div>
  );
}

export default PostHeader;
