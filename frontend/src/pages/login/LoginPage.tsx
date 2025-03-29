import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router";

import {
  Button,
  Card,
  CardHeader,
  Container,
  Footer,
  Header,
  TextField
} from "../../components";

import { useLoginMutation } from "../../hooks";
import { formatTitle, validateRequired } from "../../utils";

export function meta() {
  return [
    { title: formatTitle('login') }
  ]
}

const LoginPage: React.FC = () => {
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();
  const loginMutation = useLoginMutation();

  function handleSubmit(event: FormEvent): void {
    event.preventDefault();

    const validUsername = validateRequired(username, setUsernameError);
    const validPassword = validateRequired(password, setPasswordError);

    if (!validUsername || !validPassword) {
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
                id='text-username'
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
                id='text-password'
                type='password'
                label='Password'
                value={password}
                status={passwordError ? 'error' : 'normal'}
                statusLabel={passwordError}
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
            <Link to='/register' viewTransition>
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
