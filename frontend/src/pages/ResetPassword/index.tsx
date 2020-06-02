import React, { useRef, useCallback } from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import {FiLock} from 'react-icons/fi';
import {FormHandles} from '@unform/core';
import {Form} from '@unform/web';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, Background, AnimationContainer } from './styles';

import Logo from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {useToast} from '../../hooks/Toast';
import api from '../../services/api';

interface ResetPasswordFormData {
  password: string;
  passwordConfirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const location = useLocation();

  const {addToast} = useToast();

  const handleSubmit = useCallback(async(data: ResetPasswordFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        password: Yup.string().min(6, 'Senha obrigatória'),
        passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Confirmação incorreta')
      });

      await schema.validate(data, {
        abortEarly: false
      });

      const {password, passwordConfirmation} = data;
      const token = location.search.replace('?token=', '');

      if(!token) {
        throw new Error();
      }

      api.post('/password/reset', {
        password,
        passwordConfirmation,
        token
      });


      history.push('/');
    } catch(err) {
      if(err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      addToast({
        type: 'error',
        title: 'Erro ao resetar a senha',
        description: 'Ocorreu um erro ao resetar a senha. Tente novamente.',
      });
    }
  }, [addToast, history, location]);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={Logo} alt="Go Barber"/>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar senha</h1>
            <Input icon={FiLock} type="password" name="password" placeholder="Senha" />
            <Input icon={FiLock} type="password" name="passwordConfirmation" placeholder="Confirmação da senha" />
            <Button type="submit">Alterar senha</Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
}

export default ResetPassword;
