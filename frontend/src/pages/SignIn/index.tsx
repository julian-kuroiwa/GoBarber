import React, { useRef, useCallback } from 'react';
import {FiLogIn, FiMail, FiLock} from 'react-icons/fi';
import {FormHandles} from '@unform/core';
import {Form} from '@unform/web';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, Background } from './styles';

import Logo from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async(data: object) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().email('Digite um e-mail válido').required('E-mail é obrigatório'),
        password: Yup.string().min(6, 'Senha obrigatória')
      });

      await schema.validate(data, {
        abortEarly: false
      });
    } catch(err) {
      const errors = getValidationErrors(err);

      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <Container>
      <Content>
        <img src={Logo} alt="Go Barber"/>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>
          <Input icon={FiMail} type="email" name="email" placeholder="E-mail" />
          <Input icon={FiLock} type="password" name="password" placeholder="Senha" />
          <Button type="submit">Entrar</Button>
          <a href="#">Esqueci minha senha</a>
        </Form>

        <a href="#">
          <FiLogIn /> Criar conta
        </a>
      </Content>
      <Background />
    </Container>
  )
}

export default SignIn;
