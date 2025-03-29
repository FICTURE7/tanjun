import { FormEvent, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";

import { Post } from "../../models";

import {
  Button,
  Card,
  CardHeader,
  Container,
  Footer,
  Header,
  TextArea,
  TextField
} from "../../components";

import {
  useAuth,
  usePostCreateMutation,
} from "../../hooks";

import { formatTitle, validateRequired } from "../../utils";

export function meta() {
  return [
    { title: formatTitle('new') }
  ]
}

const PostCreatePage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [content, setContent] = useState('');
  const [contentError, setContentError] = useState('');

  const postCreateMutation = usePostCreateMutation();
  const navigate = useNavigate();
  const auth = useAuth();

  if (!auth) {
    return <Navigate to="/login" replace />
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validTitle = validateRequired(title, setTitleError);
    const validContent = validateRequired(content, setContentError);

    if (!validTitle || !validContent) {
      return;
    }

    const data = {
      token: auth!.token,
      title: title,
      content: content
    };

    const options = {
      onError(error: Error) {
        // TODO: Implement toast.
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
              id='text-title'
              label="title"
              helperLabel="The title of your blog post."
              value={title}
              status={titleError ? 'error' : 'normal'}
              statusLabel={titleError}
              onChange={setTitle}
              required />
          </div>

          <div className="mb-6">
            <TextArea
              id='text-content'
              label="Content"
              helperLabel="The content of your blog post."
              value={content}
              status={contentError ? 'error' : 'normal'}
              statusLabel={contentError}
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
