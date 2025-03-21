import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router";

import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Card from "../../components/Card";

import useRegisterMutation from "../../hooks/useRegisterMutation";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const registerMutation = useRegisterMutation()
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent): void {
    event.preventDefault();

    if (password != confirmPassword) {
      alert('passwords do not match!');
      return;
    }

    const data = {
      username: username,
      password: password
    };

    const options = {
      onError: (error: any) => {
        alert(`failed to register! ${error}`)
      },
      onSuccess: (data: any) => {
        alert('got the data! ' + JSON.stringify(data));
        navigate('/');
      }
    };

    registerMutation.mutate(data, options);
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </div>

          <label>Confirm Password</label>
          <div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>

          <div>
            <button type="submit">Register</button>
          </div>
        </form>
      </Card>

      <Footer />
    </Container>
  );
}

export default LoginPage;
