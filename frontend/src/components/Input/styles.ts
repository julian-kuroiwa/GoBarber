import styled from 'styled-components';

export const Container = styled.div`
  background: #232129;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  & + div {
      margin-top: 8px;
    }

  input {
    width: 100%;
    background: transparent;
    border: 0;
    color: #f4ede8;

    &::placeholder {
      color: #636360;
    }
  }

  > svg {
    color: #636360;
    margin-right: 16px;
  }
`;
