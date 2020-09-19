import React, { useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';
import PropTypes from 'prop-types';
import { message } from 'antd';
import { SERVER, saveToken } from '../../Config';
import styled from 'styled-components';

const GithubButton = styled.div`
  padding: 0;
  margin-bottom: 10px;
  width: 100%;
  height: 32px;
  line-height: 32px;
  color: #783c00;
  background-color: #eeeeee;
  border: 1px solid transparent;
  border-radius: 2px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  outline: 0;
  &:hover {
    background-color: #dddddd;
  }
`;

function GithubBtn({ callback = true, history, location }) {
  useEffect(() => {
    if (callback) {
      const { code } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });

      axios
        .post(`${SERVER}/api/users/githubLogin`, { code })
        .then((response) => {
          if (response.data.success) {
            localStorage.setItem('userId', response.data.userId);
            saveToken(response.data);
            message.success('로그인 성공', 0.75);
            history.push('/');
          } else {
            console.log(response.data.message);
            alert('로그인에 실패하였습니다');
            history.push('/login');
          }
        });
    }
  }, [callback, history, location]);

  if (callback) {
    return null;
  } else {
    return (
      <a href='https://github.com/login/oauth/authorize?client_id=b1ca53d55037a1da7d82&redirect_uri=https://foodticket.xyz/githubLogin'>
        <GithubButton>Github with login</GithubButton>
      </a>
    );
  }
}

GithubBtn.propTypes = {
  callback: PropTypes.bool,
};

export default GithubBtn;
