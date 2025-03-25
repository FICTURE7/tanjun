import { FormEvent, useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router";

import {
  Button,
  Card,
  CardHeader,
  Container,
  Footer,
  Header,
  Modal,
  TextArea,
  TextField
} from "../../components";

import {
  useAuth,
  usePostEditMutation,
  usePostQuery
} from "../../hooks";

import { validateRequired } from "../../utils";
import usePostDeleteMutation from "../../hooks/usePostDeleteMutation";

const PostEditPage: React.FC = () => {
  const [confirmOpened, setConfirmOpened] = useState(false);
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
  const postDeleteMutation = usePostDeleteMutation(id);
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

  function handleDelete(): void {
    const data = {
      token: auth!.token
    };

    const options = {
      onSuccess() {
        navigate('/');
      },
      onError() {
        alert('Failed to mutate.')
      }
    };

    postDeleteMutation.mutate(data, options);
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

          <div className="flex">
            <div className="flex-grow-1">
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

            <div className="inline">
              <Button
                type="button"
                label="Delete"
                variant="danger"
                onClick={() => setConfirmOpened(true)} />

              <Modal title="Confirm" isOpen={confirmOpened}>
                <p className="mb-8">Are you sure you want to delete this post?</p>
                <div>
                  <div className="inline mr-2">
                    <Button
                      type="button"
                      label="Yes"
                      onClick={handleDelete} />
                  </div>
                  <div className="inline">
                    <Button 
                      type="button"
                      label="Close"
                      variant="secondary"
                      onClick={() => setConfirmOpened(false)} />
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </form>
      </Card>

      <Footer />
    </Container>
  )
}

export default PostEditPage;
