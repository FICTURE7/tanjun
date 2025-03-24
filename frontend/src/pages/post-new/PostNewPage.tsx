import { FormEvent, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";

import Post from "../../models/Post";
import Button from "../../components/Button";
import Card from "../../components/Card";
import CardHeader from "../../components/CardHeader";
import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import TextArea from "../../components/TextArea";
import TextField from "../../components/TextField";

import {
  usePostCreateMutation,
  useToken
} from "../../hooks";

const PostCreatePage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const postCreateMutation = usePostCreateMutation();
  const navigate = useNavigate();
  const token = useToken();

  if (!token) {
    return <Navigate to="/login" replace />
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = {
      title: title,
      content: content
    };

    const options = {
      onError(error: Error) {
        alert(`error: ${error.message}`);
      },
      onSuccess(post: Post) {
        navigate(`/post/${post.id}`);
      }
    };

    postCreateMutation.mutate(data, options);
  }

  return (
    <Container>
      <Header size="large" />

      <Card>
        <CardHeader 
          title="Create Post"
          description="Create some new content for the blog."/>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <TextField
              label="title"
              helperLabel="The title of your blog post."
              value={title}
              onChange={setTitle}
              required />
          </div>

          <div className="mb-6">
            <TextArea
              label="Content"
              helperLabel="The content of your blog post."
              value={content}
              onChange={setContent}
              required />
          </div>

          <div>
            <div className="inline mr-2">
              <Button
                type="submit"
                label="Create" />
            </div>
            <div className="inline">
              <Link to="/">
                <Button
                  type="button"
                  label="Cancel"
                  variant="secondary" />
              </Link>
            </div>
          </div>
        </form>
      </Card>

      <Footer />
    </Container>
  )
}

export default PostCreatePage;
