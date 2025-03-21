import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router";

import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Card from "../../components/Card";

import useRegisterMutation from "../../hooks/useRegisterMutation";
import TextField from "../../components/TextField";
import Button from "../../components/Button";

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
        <h1>register</h1>

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
            By clicking Register, you agree to the privacy policy.
          </div>
        </form>
      </Card>

      <Footer />
    </Container>
  );
}

export default LoginPage;
