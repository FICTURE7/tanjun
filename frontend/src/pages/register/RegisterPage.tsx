import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router";

import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Card from "../../components/Card";

import useRegisterMutation from "../../hooks/useRegisterMutation";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import Alert from "../../components/Alert";

const LoginPage: React.FC = () => {
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('');

  const registerMutation = useRegisterMutation();
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent): void {
    event.preventDefault();

    if (password != confirmPassword) {
      setError('Password do not match')
      return;
    }

    const data = {
      username: username,
      password: password
    };

    const options = {
      onError: (error: any) => {
        setError(error.message);
      },
      onSuccess: (_: any) => {
        navigate('/');
      }
    };

    registerMutation.mutate(data, options);
  }

  return (
    <Container size="small">
      <Header size="medium" />

      <Card>
        <h1>register</h1>

        {error && (
          <div className="mb-3">
            <Alert>
              <span>{error}</span>
            </Alert>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="mb-3">
              <TextField
                type="input"
                label="Username"
                value={username}
                onChange={setUsername}
                required />
            </div>

            <div className="mb-3">
              <TextField
                type="password"
                label="Password"
                value={password}
                onChange={setPassword}
                required />
            </div>

            <div>
              <TextField
                type="password"
                label="Confirm Password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                required />
            </div>
          </div>

          <div className="mb-3">
            <Button
              type="submit"
              label="Register"
              fullWidth />
          </div>

          <div className="text-small text-mute">
            By clicking Register, you agree to the <Link to='/privacy-policy'>privacy policy</Link>.
          </div>
        </form>
      </Card>

      <Footer />
    </Container>
  );
}

export default LoginPage;
