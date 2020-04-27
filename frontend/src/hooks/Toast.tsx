import React, {createContext, useContext, useCallback, useState} from 'react';
import {uuid} from 'uuidv4';
import Toastcontainer from '../components/ToastContainer';


interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

export interface ToastMessage {
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
  id: string;
}

const ToastContext = createContext({} as ToastContextData);

export const ToastProvider: React.FC = ({children}) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(({type, title, description}: Omit<ToastMessage, 'id'>) => {
    const id = uuid();

    const toast = {
      id,
      type,
      title,
      description
    }

    setMessages(prevState => [...prevState, toast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setMessages(prevState => prevState.filter(message => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{addToast, removeToast}}>
      {children}
      <Toastcontainer messages={messages} />
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
