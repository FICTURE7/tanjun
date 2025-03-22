import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router";

import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Card from "../../components/Card";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import Alert from "../../components/Alert";

import useLoginMutation from "../../hooks/useLoginMutation";
import CardHeader from "../../components/CardHeader";

const LoginPage: React.FC = () => {
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const loginMutation = useLoginMutation();

  function handleSubmit(event: FormEvent): void {
    event.preventDefault();

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
          description="Login and begin creating posts."/>

        {error && (
          <div className="mb-3">
            <Alert>
              <span>{error}</span>
            </Alert>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className='mb-8'>
            <div className='mb-4'>
              <TextField
                type='input'
                label='Username'
                value={username}
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
