import React from "react";

export interface PostBodyProps {
  children?: React.ReactNode
}

const PostBody: React.FC<PostBodyProps> = ({ children }) => {
  return (
    <>{children}</>
  );
}

export default PostBody;
