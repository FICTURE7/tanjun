import React from "react";
import './PostHeader.css'

export interface PostHeaderProps {
  title: string
}

const PostHeader: React.FC<PostHeaderProps> = ({ title }) => {
  return (
    <div>
      <h2 className='post-title'>{title}</h2>
    </div>
  );
}

export default PostHeader;
