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
import { formatTitle } from "../../utils";

export function meta() {
  return [
    { title: formatTitle('register') }
  ]
}

const LoginPage: React.FC = () => {
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const registerMutation = useRegisterMutation();
  const navigate = useNavigate();

  function validateUsername() {
    const validLength = username.length >= 1 && username.length <= 32;
    const validChars = [...username].every(c => /[A-Za-z0-9_]/.test(c));

    console.log('wtf');

    if (!validLength || !validChars) {
      setUsernameError("Must be between 1 and 32 characters long and contain only alphanumeric characters and underscore (_)");
      return false;
    }

    setUsernameError('')
    return true;
  }

  function validatePassword() {
    const validLength = password.length >= 8 && password.length <= 32;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSpecial = /[@$!%*?&]/.test(password);

    if (validLength && hasUppercase && hasLowercase && hasDigit && hasSpecial) {
      setPasswordError('');
      return true;
    }

    setPasswordError("Must be between 8 and 32 characters long, contain an uppercase character, a lowercase character, a digit, and a special character ('@', '$', '!', '%', '*', '?', '&')");
    return false;
  }

  function validateConfirmPassword(): boolean {
    if (password && password === confirmPassword) {
      setConfirmPasswordError('')
      return true;
    }

    setConfirmPasswordError('Password must match Confirm Password')
    return false;
  }

  function handleSubmit(event: FormEvent): void {
    event.preventDefault();

    const validUsername = validateUsername();
    const validPassword = validatePassword();
    const validConfirmPassword = validateConfirmPassword();

    if (!validUsername || !validPassword || !validConfirmPassword) {
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
                status={usernameError ? 'error' : 'normal'}
                statusLabel={usernameError}
                onChange={setUsername}
                required />
            </div>

            <div className="mb-4">
              <TextField
                type="password"
                label="Password"
                value={password}
                status={passwordError ? 'error' : 'normal'}
                statusLabel={passwordError}
                onChange={setPassword}
                required />
            </div>

            <div>
              <TextField
                type="password"
                label="Confirm Password"
                value={confirmPassword}
                status={confirmPasswordError ? 'error' : 'normal'}
                statusLabel={confirmPasswordError}
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
