import styled from 'styled-components';
import { shade } from 'polished';


export const Container = styled.div`
  > header {
    height: 144px;
    background: #28262e;
    display: flex;
    align-items: center;

    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;

      svg {
        color: #999591;
        width: 25px;
        height: 25px;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  width: 100%;
  align-items: center;
  margin: 0 auto;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;
    transform: translateY(-174px);

    h1 {
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
    }
  }
`;

export const AvatarInput = styled.div`
  margin: 0 auto 32px;
  position: relative;
  width: 186px;

  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }

  label {
    position: absolute;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: #ff9000;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.2s;
    cursor: pointer;

    input {
      display: none;
    }

    svg {
      width: 20px;
      height: 20px;
    }

    &:hover {
      background: ${shade(0.2, '#ff9000')}
    }
  }
`;
