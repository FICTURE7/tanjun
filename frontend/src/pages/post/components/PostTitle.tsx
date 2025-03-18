import React from "react";
import './PostTitle.css'

export interface PostTitleProps {
  value: string
}

const PostTitle: React.FC<PostTitleProps> = ({ value }) => {
  return <h2 className='post-title'>{value}</h2>;
}

export default PostTitle;
