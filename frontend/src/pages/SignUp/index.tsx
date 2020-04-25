import React from 'react';
import {FiArrowLeft, FiMail, FiLock, FiUser} from 'react-icons/fi';
import {Form} from '@unform/web';

import { Container, Content, Background } from './styles';

import Logo from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => {
  function handleSubmit(data: object): void {
    console.log(data);
  }

  return (
    <Container>
      <Background />

      <Content>
        <img src={Logo} alt="Go Barber"/>
        <Form onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>
          <Input icon={FiUser} type="text" name="name" placeholder="Nome" />
          <Input icon={FiMail} type="email" name="email" placeholder="E-mail" />
          <Input icon={FiLock} type="password" name="password" placeholder="Senha" />
          <Button type="submit">Cadastrar</Button>
        </Form>

        <a href="#">
          <FiArrowLeft /> Voltar para logon
        </a>
      </Content>
    </Container>
  )
}

export default SignUp;
