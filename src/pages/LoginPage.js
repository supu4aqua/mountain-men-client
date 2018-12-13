import React from "react";
import LoginForm from "../components/LoginForm";
import styled from 'styled-components';
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const LoginContainer = styled.div`
  position: absolute;
  margin: 0;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(50, 50, 50, 0.8);
`;

const BG = styled.div`
  position: absolute;
  margin: 0;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Login = styled.div`
  #login-form {
    padding: 30px;
    background-color: #364D87;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 425px;
    height: 350px;
  }

  label {
    color: white;
  }
`;

export function LoginPage(props) {
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <LoginContainer>
      <BG as={Link} to='/'></BG>
      <Login id='login-page'>
        <LoginForm id="login-form"></LoginForm>
      </Login>
    </LoginContainer>
  );
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.currentUser !== null,
  };
};

export default connect(mapStateToProps)(LoginPage);
