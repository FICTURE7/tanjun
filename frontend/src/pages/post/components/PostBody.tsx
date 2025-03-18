import React from "react";
import Card from "../../../components/Card";
import Avatar from "../../../components/Avatar";

export interface PostBodyProps {
  children?: React.ReactNode
}

const PostBody: React.FC<PostBodyProps> = ({ children }) => {
  return (
    <Card>
      {children}

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar src='https://placehold.co/150' />
        <div style={{ marginLeft: '1rem' }}>
          <h3 style={{ margin: '0', fontSize: '0.9rem' }}>Author</h3>
          <p style={{ margin: '0', fontSize: '0.9rem' }}>name</p>
        </div>
      </div>
    </Card>
  );
}

export default PostBody;
