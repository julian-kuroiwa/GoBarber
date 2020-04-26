import React from 'react';

import GlobalStyle from './styles/global';

import SignIn from './pages/SignIn';

import Toastcontainer from './components/ToastContainer';

import {AuthProvider} from './hooks/AuthContext';

const App: React.FC = () => {
  return (
    <>
      <AuthProvider>
        <SignIn />
      </AuthProvider>

      <Toastcontainer />

      <GlobalStyle />
    </>
  )
}

export default App;
