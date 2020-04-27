import React, { useCallback, useRef } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft, FiMail, FiLock, FiUser} from 'react-icons/fi';
import {FormHandles} from '@unform/core';
import {Form} from '@unform/web';
import * as Yup from 'yup';

import api from '../../services/api';
import {useToast} from '../../hooks/Toast';

import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, Background, AnimationContainer } from './styles';

import Logo from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

interface SignUpFormData {
  name: string;
  password: string;
  email: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const {addToast} = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(async(data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string().email('Digite um e-mail válido').required('E-mail é obrigatório'),
        password: Yup.string().min(6, 'No mínimo 6 digitos')
      });

      await schema.validate(data, {
        abortEarly: false
      });

      await api.post('/users', data);

      history.push('/');

      addToast({
        type: 'success',
        title: 'Cadastro realizado',
        description: 'Você já pode fazer seu login no GoBarber'
      });

    } catch(err) {
      if(err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      addToast({
        type: 'error',
        title: 'Erro na cadastro',
        description: 'Ocorreu um erro ao fazer o cadastro. Tente novamente',
      });
    }
  }, [addToast, history]);

  return (
    <Container>
      <Background />

      <Content>
        <AnimationContainer>
          <img src={Logo} alt="Go Barber"/>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>
            <Input icon={FiUser} type="text" name="name" placeholder="Nome" />
            <Input icon={FiMail} type="email" name="email" placeholder="E-mail" />
            <Input icon={FiLock} type="password" name="password" placeholder="Senha" />
            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft /> Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  )
}

export default SignUp;
