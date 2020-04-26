import React, {createContext, useCallback} from 'react';
import api from '../services/api';

interface AuthContextStates {
  name: string;
  signIn(credentials: SignInCredentials): Promise<void>;
}

interface SignInCredentials {
  email: string;
  password: string;
}

export const AuthContext = createContext<AuthContextStates>({} as AuthContextStates);

export const AuthProvider: React.FC = ({children}) => {
  const signIn = useCallback(async({email, password}) => {
    const response = await api.post('/sessions', {
      email,
      password
    });

    console.log(response.data);
  }, []);

  return (
    <AuthContext.Provider value={{name: 'Julian', signIn}}>
      {children}
    </AuthContext.Provider>
  )
}

