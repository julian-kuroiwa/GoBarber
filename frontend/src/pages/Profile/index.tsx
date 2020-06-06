import React, { useCallback, useRef, ChangeEvent } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiMail, FiLock, FiUser, FiCamera, FiArrowLeft} from 'react-icons/fi';
import {FormHandles} from '@unform/core';
import {Form} from '@unform/web';
import * as Yup from 'yup';

import api from '../../services/api';
import {useToast} from '../../hooks/Toast';

import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, AvatarInput } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/Auth';

interface SignUpFormData {
  name: string;
  old_password: string;
  password: string;
  password_confirmation: string;
  email: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const {addToast} = useToast();
  const history = useHistory();
  const {user, updateUser} = useAuth();

  const handleSubmit = useCallback(async(data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string().email('Digite um e-mail válido').required('E-mail é obrigatório'),
        old_password: Yup.string(),
        password: Yup.string().when('old_password', {
          is: val => !!val.length,
          then: Yup.string().required(),
          otherwise: Yup.string()
        }),
        password_confirmation: Yup.string().when('old_password', {
          is: val => !!val.length,
          then: Yup.string().required(),
          otherwise: Yup.string()
        }).oneOf([Yup.ref('password'), null], 'Confirmação incorreta')
      });

      await schema.validate(data, {
        abortEarly: false
      });

      const {name, email, old_password, password, password_confirmation} = data;

      const formData = Object.assign({
        name,
        email,
      }, old_password ? {
        old_password,
        password,
        password_confirmation
      } : {});

      await api.put('/profile', formData);

      history.push('/dashboard');

      addToast({
        type: 'success',
        title: 'Perfil atualizado',
        description: 'Suas informações de perfil foram atualizadas com sucesso'
      });

    } catch(err) {
      if(err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      addToast({
        type: 'error',
        title: 'Erro na atualização',
        description: 'Ocorreu um erro ao atualizar o perfil. Tente novamente',
      });
    }
  }, [addToast, history]);

  const handleAvatarChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.files) {
      const data = new FormData();

      data.append('avatar', e.target.files[0]);

      api.patch('/users/avatar', data).then((response) => {
        updateUser(response.data);

        addToast({
          type: 'success',
          title: 'Avatar atualizado'
        })
      });
    }
  }, [addToast, updateUser]);

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard"><FiArrowLeft /></Link>
        </div>
      </header>
      <Content>
        <Form initialData={{name: user.name, email: user.email}} ref={formRef} onSubmit={handleSubmit}>
          <AvatarInput>
            <img src={user.avatar_url} alt={user.name}/>
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarInput>
          <h1>Meu perfil</h1>
          <Input icon={FiUser} type="text" name="name" placeholder="Nome" />
          <Input icon={FiMail} type="email" name="email" placeholder="E-mail" />
          <Input containerStyle={{marginTop: 24}} icon={FiLock} type="password" name="old_password" placeholder="Senha atual" />
          <Input icon={FiLock} type="password" name="password" placeholder="Nova senha" />
          <Input icon={FiLock} type="password" name="password_confirmation" placeholder="Confirmar senha" />
          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Content>
    </Container>
  )
}

export default Profile;
