import React from 'react';
import {FiLogIn} from 'react-icons/fi';

import { Container, Content, Background } from './styles';

import Logo from '../../assets/logo.svg';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={Logo} alt="Go Barber"/>
        <form>
          <h1>Faça seu logon</h1>
          <input type="email" name="E-mail" placeholder="E-mail" />
          <input type="password" name="Password" placeholder="Senha" />
          <button type="submit">Entrar</button>
          <a href="#">Esqueci minha senha</a>
        </form>

        <a href="#">
          <FiLogIn /> Criar conta
        </a>
      </Content>
      <Background />
    </Container>
  )
}

export default SignIn;
