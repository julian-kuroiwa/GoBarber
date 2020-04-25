import React from 'react';
import {FiLogIn, FiMail, FiLock} from 'react-icons/fi';

import { Container, Content, Background } from './styles';

import Logo from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={Logo} alt="Go Barber"/>
        <form>
          <h1>Faça seu logon</h1>
          <Input icon={FiMail} type="email" name="E-mail" placeholder="E-mail" />
          <Input icon={FiLock} type="password" name="Password" placeholder="Senha" />
          <Button type="submit">Entrar</Button>
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
