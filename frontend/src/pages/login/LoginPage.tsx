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
      onError: (error: Error) => {
        setError(error.message);
      },
      onSuccess: () => {
        navigate('/');
      }
    };

    loginMutation.mutate(data, options);
  }

  return (
    <Container size="small">
      <Header size="normal" />

      <Card>
        <h1 className="lowercase font-bold text-3xl mb-6">log in</h1>

        {error && (
          <div className="mb-3">
            <Alert>
              <h3>errors</h3>
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
              label='Login'
              fullWidth />
          </div>

          <div>
            <Link to='/register'>
              <Button
                type='button'
                variant='secondary'
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
