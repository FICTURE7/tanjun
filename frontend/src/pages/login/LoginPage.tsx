import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router";

import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Card from "../../components/Card";
import TextField from "../../components/TextField";
import Button from "../../components/Button";

import useLoginMutation from "../../hooks/useLoginMutation";
import CardHeader from "../../components/CardHeader";
import useToken from "../../hooks/useToken";

const LoginPage: React.FC = () => {
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const loginMutation = useLoginMutation();
  const token = useToken();

  console.log(['token', token]);

  function handleSubmit(event: FormEvent): void {
    event.preventDefault();

    const usernameRegex = /^[a-zA-Z0-9]+$/;

    if (!usernameRegex.test(username)) {
      setUsernameError("Username must contain only letters and numbers.");
      return;
    }

    const data = {
      username: username,
      password: password
    };

    const options = {
      onError(error: Error) {
        setError(error.message);
      },
      onSuccess() {
        navigate('/');
      }
    };

    loginMutation.mutate(data, options);
  }

  return (
    <Container size="small">
      <Header size="normal" />

      <Card>
        <CardHeader 
          title="Log In"
          description="Login and begin creating posts."
          error={error} />

        <form onSubmit={handleSubmit}>
          <div className='mb-8'>
            <div className='mb-4'>
              <TextField
                type='input'
                label='Username'
                value={username}
                status={usernameError ? 'error' : 'normal'}
                statusLabel={usernameError}
                onChange={setUsername}
                required />
            </div>

            <div>
              <TextField
                type='password'
                label='Password'
                value={password}
                onChange={setPassword}
                required />
            </div>
          </div>

          <div className='mb-2'>
            <Button
              type='submit'
              size='large'
              label='Login'
              disabled={loginMutation.isPending}
              fullWidth />
          </div>

          <div className="mt-8 mb-4">
            <hr className="opacity-50" />
          </div>

          <div className="text-sm mb-4">
            <p>Or register if you do not have an account.</p>
          </div>

          <div>
            <Link to='/register'>
              <Button
                type='button'
                variant='secondary'
                size='large'
                label='Register'
                fullWidth />
            </Link>
          </div>
        </form>
      </Card>

      <Footer />
    </Container>
  );
}

export default LoginPage;
