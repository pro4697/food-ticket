import { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { message } from 'antd';
import axios from 'axios';
import qs from 'qs';
import styled from 'styled-components';

import { saveToken, SERVER } from '../../common/config';
import { LoadingIcon, SocialIcon, StyledApp } from '../../common/Style_Etc';

type TGithubBtnParams = {
  callback?: boolean;
} & RouteComponentProps;

const GithubButton = styled.a`
  display: flex;
  margin: 0 auto 0 30px;
  border-radius: 50%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const fallback = 'localhost:3000/githubLogin';

function GithubBtn({ callback = true, history, location }: TGithubBtnParams) {
  const link = `https://github.com/login/oauth/authorize?client_id=b1ca53d55037a1da7d82&redirect_uri=${fallback}`;

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
          history.push('/');
        } else {
          console.error(response.data.message);
          alert('로그인에 실패하였습니다');
          history.push('/login');
        }
      });
    }
  }, [callback, history, location]);

  return (
    <>
      {callback && (
        <StyledApp>
          <LoadingIcon />
        </StyledApp>
      )}
      {!callback && (
        <GithubButton href={link}>
          <SocialIcon src="/images/github.png" />
        </GithubButton>
      )}
    </>
  );
}

export default GithubBtn;
