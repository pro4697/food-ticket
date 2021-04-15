import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { saveToken, SERVER } from '@common/config';
import { LoadingIcon, StyledApp } from '@common/Style_Etc';
import { message } from 'antd';
import axios from 'axios';
import qs from 'qs';
import styled from 'styled-components';

const GithubButton = styled.a`
  position: relative;
  background-color: rgb(38, 41, 46);
  margin-left: 12px;
  color: white;
  width: 100%;
  height: 32px;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  &:hover {
    color: white;
    background-color: rgb(100, 100, 100);
  }
`;

const Icon = styled.i`
  position: absolute;
  top: 2px;
  left: 3px;
`;

const Line = styled.div`
  position: absolute;
  width: 1px;
  height: 26px;
  top: 3px;
  left: 32px;
  background-color: grey;
  opacity: 0.6;
`;

const Span = styled.div`
  position: absolute;
  text-align: center;
  line-height: 32px;
  right: 0;
  height: 100%;
  font-size: 12px;
  width: 80%;
`;

const fallback = 'https://pro4697.github.io/food-ticket/#/githubLogin';

function GithubBtn({ callback = true }) {
  const link = `https://github.com/login/oauth/authorize?client_id=b1ca53d55037a1da7d82&redirect_uri=${fallback}`;
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (callback) {
      const { code } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });

      axios.post(`${SERVER}/api/users/github`, { code }).then((response) => {
        if (response.data.success) {
          localStorage.setItem('userId', response.data.userId);
          saveToken(response.data);
          message.success('로그인 성공', 1);
          history.push('/login');
          history.push('/');
        } else {
          console.log(response);
          console.log(response.data);
          alert('로그인에 실패하였습니다');
          history.push('/login');
        }
      });
    }
  }, [callback, history, location]);

  if (callback) {
    return (
      <StyledApp>
        <LoadingIcon />
      </StyledApp>
    );
  }
  return (
    <GithubButton href={link}>
      <Icon className="xi-github xi-2x" />
      <Line />
      <Span>Login with Github</Span>
    </GithubButton>
  );
}

export default GithubBtn;
