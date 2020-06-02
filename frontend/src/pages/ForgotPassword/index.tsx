import React, { useRef, useCallback, useState } from 'react';
import {Link} from 'react-router-dom';
import {FiLogIn, FiMail} from 'react-icons/fi';
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

interface SignInFormData {
  email: string;
  password: string;
}

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  // const history = useHistory();

  const {addToast} = useToast();

  const handleSubmit = useCallback(async(data: SignInFormData) => {
    try {
      setLoading(true);

      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().email('Digite um e-mail válido').required('E-mail é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false
      });

      await api.post('/password/forgot', {email: data.email});

      addToast({
        type: 'success',
        title: 'E-mail de recuperação de senha',
        description: 'Enviamos um e-mail para confirmar a recuperação de senha. Cheque sua caixa de entrada',
      });

      // history.push('/dashboard');
    } catch(err) {
      if(err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      addToast({
        type: 'error',
        title: 'Erro na recuperação de senha',
        description: 'Ocorreu um erro ao tentar realizar a recuperação de senha. Tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={Logo} alt="Go Barber"/>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar senha</h1>
            <Input icon={FiMail} type="email" name="email" placeholder="E-mail" />
            <Button loading={loading} type="submit">Recuperar</Button>
          </Form>

          <Link to="/">
            <FiLogIn /> Voltar ao login
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
}

export default ForgotPassword;
