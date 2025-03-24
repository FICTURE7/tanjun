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

import { useRegisterMutation } from "../../hooks";

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
      <Header size="normal" />

      <Card>
        <CardHeader 
          title="Register"
          description="Create an account and begin creating posts."
          error={error} />

        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <div className="mb-4">
              <TextField
                type="input"
                label="Username"
                value={username}
                onChange={setUsername}
                required />
            </div>

            <div className="mb-4">
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

          <div className="mb-4">
            <Button
              type="submit"
              label="Register"
              size="large"
              fullWidth />
          </div>

          <div className="text-xs opacity-75">
            By clicking Register, you agree to the <Link className="underline" to="/privacy">privacy policy</Link>.
          </div>
        </form>
      </Card>

      <Footer />
    </Container>
  );
}

export default LoginPage;
