import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean
}

export const Container = styled.div<ContainerProps>`
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

  ${props => props.isErrored && css`
    border-color: #c53030;
  `}

  ${props => props.isFocused && css`
    border-color: #cc7300;

    > svg {
      color: #cc7300;
    }
  `}

  ${props => props.isFilled && css`
    > svg {
      color: #cc7300;
    }
  `}
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
