import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router";

import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Card from "../../components/Card";

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
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <div>
            <input
              type="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)} />
          </div>

          <label>Password</label>
          <div>
            <input
              type="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div>
            <button type="submit">Login</button>
            <Link to='/register'>
              <button type="button">Register</button>
            </Link>
          </div>
        </form>
      </Card>

      <Footer />
    </Container>
  );
}

export default LoginPage;
