import React from 'react';
import styled from 'styled-components';
import KaKaoLogin from 'react-kakao-login';

const KaKaoButton = styled(KaKaoLogin)`
  padding: 0;
  width: 100%;
  height: 32px;
  line-height: 32px;
  color: #783c00;
  background-color: #ffeb00;
  border: 1px solid transparent;
  border-radius: 4px;
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
  /* &:hover {
  box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2);
} */
  &:hover {
    background-color: #ffebaa;
  }
`;

function KakaoBtn({ loginAction }) {
  const responseKaKao = (res) => {
    let dataToSubmit = {
      email: `k${res.profile.id}@kakao.com`,
      password: `Kakao${res.profile.id}`,
      name: res.profile.properties.nickname,
      image: `uploads/images/no-user.svg`,
    };
    loginAction(dataToSubmit, true, { setSubmitting: false });
  };

  const responseFail = (err) => {
    alert(err);
  };

  return (
    <KaKaoButton
      jsKey='5b2bf4d6b26d272e0e11e17d0cac093b'
      buttonText='KaKao Login'
      onSuccess={responseKaKao}
      onFailure={responseFail}
      getProfile={true}
    />
  );
}

export default KakaoBtn;