import React, { useCallback } from 'react';
import {FiArrowLeft, FiMail, FiLock, FiUser} from 'react-icons/fi';
import {Form} from '@unform/web';
import * as Yup from 'yup';

import { Container, Content, Background } from './styles';

import Logo from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => {
  const handleSubmit = useCallback(async(data: object) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string().email('Digite um e-mail válido').required('E-mail é obrigatório'),
        password: Yup.string().min(6, 'No mínimo 6 digitos')
      });

      await schema.validate(data, {
        abortEarly: false
      });
    } catch(err) {
      console.log(err);
    }
  }, []);

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
