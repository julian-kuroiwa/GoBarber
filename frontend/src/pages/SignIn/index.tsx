import React, { useRef, useCallback } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiLogIn, FiMail, FiLock} from 'react-icons/fi';
import {FormHandles} from '@unform/core';
import {Form} from '@unform/web';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, Background, AnimationContainer } from './styles';

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
  const history = useHistory();

  const {signIn} = useAuth();
  const {addToast} = useToast();

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

      history.push('/dashboard');
    } catch(err) {
      if(err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      addToast({
        type: 'error',
        title: 'Erro na autenticação',
        description: 'Ocorreu um erro ao fazer login. Cheque as credenciais',
      });
    }
  }, [addToast, signIn, history]);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={Logo} alt="Go Barber"/>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu logon</h1>
            <Input icon={FiMail} type="email" name="email" placeholder="E-mail" />
            <Input icon={FiLock} type="password" name="password" placeholder="Senha" />
            <Button type="submit">Entrar</Button>
            <Link to="/forgot-password">Esqueci minha senha</Link>
          </Form>

          <Link to="/signup">
            <FiLogIn /> Criar conta
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
}

export default SignIn;
