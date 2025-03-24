import { FormEvent, useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router";

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
  usePostEditMutation,
  usePostQuery
} from "../../hooks";

import { validateRequired } from "../../utils";

const PostEditPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [content, setContent] = useState('');
  const [contentError, setContentError] = useState('');

  const { id: rawId } = useParams();

  if (!rawId) {
    // TODO: Implement fallback for this.
    return <></>;
  }

  const id = parseInt(rawId);
  const { data } = usePostQuery({ id: id });
  const postEditMutation = usePostEditMutation(id);
  const navigate = useNavigate();
  const auth = useAuth();

  if (!auth) {
    return <Navigate to="/login" replace />
  }

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setContent(data.content);
    }
  }, [data])

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
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
      onSuccess() {
        navigate(`/post/${id}`)
      },
      onError() {
        alert('Failed to mutate.')
      }
    };

    postEditMutation.mutate(data, options);
  }

  return (
    <Container>
      <Header size="large" />

      <Card>
        <CardHeader 
          title="Edit Post"
          description="Edit some old content for the blog."/>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <TextField
              id='text-title'
              label="title"
              helperLabel="The new title of the blog post."
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
              helperLabel="The new content of the blog post."
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
                label="Edit" />
            </div>
            <div className="inline">
              <Link to={`/post/${id}`}>
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

export default PostEditPage;
