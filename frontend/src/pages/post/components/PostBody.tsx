import React from "react";
import Card from "../../../components/Card";
import PostFooter from "./PostFooter";

export interface PostBodyProps {
  children?: React.ReactNode
}

const PostBody: React.FC<PostBodyProps> = ({ children }) => {
  return (
    <Card>
      <div className="mb-8">
        {children}
      </div>

      <PostFooter name={"username"} src={"https://placehold.co/150"} />
    </Card>
  );
}

export default PostBody;
