import React, { useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';
import PropTypes from 'prop-types';
import { message } from 'antd';
import { SERVER, saveToken } from '../../Config';
import styled from 'styled-components';
import { StyledApp, LoadingIcon, SocialIcon } from '../../Style_Etc';

const GithubButton = styled.a`
  display: flex;
  margin: 0 auto 0 30px;
  border-radius: 50%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

function GithubBtn({ callback = true, history, location }) {
  const link =
    'https://github.com/login/oauth/authorize?client_id=b1ca53d55037a1da7d82&redirect_uri=https://foodticket.xyz/githubLogin';

  useEffect(() => {
    if (callback) {
      const { code } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });

      axios
        .post(`${SERVER}/api/users/github`, { code })
        .then((response) => {
          if (response.data.success) {
            localStorage.setItem('userId', response.data.userId);
            saveToken(response.data);
            message.success('로그인 성공', 1);
            history.push('/');
          } else {
            console.log(response.data.message);
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
          <SocialIcon src='/images/github.png' />
        </GithubButton>
      )}
    </>
  );
}

GithubBtn.propTypes = {
  callback: PropTypes.bool,
};

export default GithubBtn;
