import React, {createContext, useContext, useCallback} from 'react';
import Toastcontainer from '../components/ToastContainer';


interface ToastContextData {
  addToast(): void;
  removeToast(): void;
}

const ToastContext = createContext({} as ToastContextData);

export const ToastProvider: React.FC = ({children}) => {
  const addToast = useCallback(() => {

  }, []);

  const removeToast = useCallback(() => {

  }, []);

  return (
    <ToastContext.Provider value={{}}>
      {children}
      <Toastcontainer />
    </ToastContext.Provider>
  );
};

export function useToast() {
  const context = useContext(ToastContext);

  if(!context) {
    throw new Error('useToast must be used within with ToastProvider');
  }

  return context;
}
