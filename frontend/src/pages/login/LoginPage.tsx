import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router";

import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Card from "../../components/Card";
import TextField from "../../components/TextField";
import Button from "../../components/Button";

import useLoginMutation from "../../hooks/useLoginMutation";

const LoginPage: React.FC = () => {
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
      onError: (error: any) => {
        alert(`failed to login! ${error}`)
      },
      onSuccess: (data: any) => {
        alert('got the data! ' + JSON.stringify(data));
        navigate('/');
      }
    };

    loginMutation.mutate(data, options);
  }

  return (
    <Container size="small">
      <Header size="medium" />

      <Card>
        <h1>log in</h1>

        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <div className='mb-3'>
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
