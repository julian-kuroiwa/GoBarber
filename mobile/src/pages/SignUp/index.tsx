import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Title,
  BackToSignInButton,
  BackToSignInButtonText,
} from './styles';

import logo from '../../assets/logo.png';

const SignUp: React.FC = () => {
  const navigation = useNavigation();

  return (
    <>
      <KeyboardAvoidingView
        enabled
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logo} />
            <View>
              <Title>Crie sua conta</Title>
            </View>
            <Input name="name" icon="user" placeholder="Nome" />
            <Input name="email" icon="mail" placeholder="E-mail" />
            <Input name="password" icon="lock" placeholder="Senha" />
            <Button onPress={() => console.log('click')}>Entrar</Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <BackToSignInButton>
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSignInButtonText onPress={() => navigation.goBack()}>
          Voltar para logon
        </BackToSignInButtonText>
      </BackToSignInButton>
    </>
  );
};

export default SignUp;
