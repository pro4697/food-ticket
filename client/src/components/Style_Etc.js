import styled, { keyframes } from 'styled-components';
import { DropboxOutlined, LoadingOutlined } from '@ant-design/icons';

export const BgColor = ['#7ac5c5', '#9bb7d6', '#c94476', '#955251', '#f7cac9'];

export const FadeIn = keyframes`
  0% {
    opacity: 0;
    margin-top: 30px;
  }
  100% {
   opacity: 1;
   margin-top: 0px;
 }
`;

export const blink = keyframes`
  from { color: inherit; }
  to { color: #40a9ff; }
`;

export const BoxIcon = styled(DropboxOutlined)`
  font-size: 300px;
  margin-bottom: 20px;
  animation: ${blink} 1s 0.2s infinite alternate;
`;

export const LoadingIcon = styled(LoadingOutlined)`
  font-size: ${(props) => (props.small ? 'inherit' : '55px')};
`;

export const StyledApp = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 700px;
`;
