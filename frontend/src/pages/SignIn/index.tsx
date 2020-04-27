import React, { useRef, useCallback, useContext } from 'react';
import {FiLogIn, FiMail, FiLock} from 'react-icons/fi';
import {FormHandles} from '@unform/core';
import {Form} from '@unform/web';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, Background } from './styles';

import Logo from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {useAuth} from '../../hooks/Auth';
import {useToast} from '../../hooks/Toast';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const {user, signIn} = useAuth();
  const {addToast, removeToast} = useToast();

  const handleSubmit = useCallback(async(data: SignInFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().email('Digite um e-mail válido').required('E-mail é obrigatório'),
        password: Yup.string().min(6, 'Senha obrigatória')
      });

      await schema.validate(data, {
        abortEarly: false
      });

      await signIn({email: data.email, password: data.password});
    } catch(err) {
      if(err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }

      addToast({
        type: 'error',
        title: 'Erro na autenticação',
        description: 'Ocorreu um erro ao fazer login. Cheque as credenciais',
      });
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
