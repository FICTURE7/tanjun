import React from "react";
import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const LoginPage: React.FC = () => {
  return (
    <Container>
      <Header />

      <h1>Login</h1>

      <label>Username</label>
      <div>
        <input type="input" />
      </div>

      <label>Password</label>
      <div>
        <input type="input"/>
      </div>

      <div>
        <button>Login</button>
        <button>Register</button>
      </div>

      <Footer />
    </Container>
  );
}

export default LoginPage;
