import React from 'react';

import Input from '../../components/Input';
import { render, fireEvent, waitFor } from '@testing-library/react';

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'example',
        defaultValue: '',
        error: '',
        registerField: jest.fn()
      }
    }
  }
})

describe('Input', () => {
  it('should be able to render an input', async() => {
    const {getByPlaceholderText} = render(<Input name="example" placeholder="example" />);

    expect(getByPlaceholderText('example')).toBeTruthy();
  })

  it('should render highlight on input focus', async() => {
    const {getByPlaceholderText, getByTestId} = render(<Input name="example" placeholder="example" />);

    const inputElement = getByPlaceholderText('example');
    const containerElement = getByTestId('input-container');

    fireEvent.focus(inputElement);

    await waitFor(() => {
      expect(containerElement).toHaveStyle('border-color: #cc7300');
    });

    fireEvent.blur(inputElement);

    await waitFor(() => {
      expect(containerElement).not.toHaveStyle('border-color: #cc7300');
      expect(containerElement).not.toHaveStyle('color: #cc7300');
    });
  });

  it('should keep input border highlight when is filled', async() => {
    const {getByPlaceholderText, getByTestId} = render(<Input name="example" placeholder="example" />);

    const inputElement = getByPlaceholderText('example');
    const containerElement = getByTestId('input-container');

    fireEvent.change(inputElement, {target: {value: 'johndoe@example.com'}});

    fireEvent.blur(inputElement);

    await waitFor(() => {
      expect(containerElement).toBeTruthy();
    });
  });
})
