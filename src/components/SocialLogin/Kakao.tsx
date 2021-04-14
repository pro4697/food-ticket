import _KaKaoLogin from 'react-kakao-login';
import { Props } from 'react-kakao-login/lib/types';

import styled from 'styled-components';

type TKakaoBtnParams = {
  loginAction: (e: any) => void;
};

const KaKaoLogin = styled(_KaKaoLogin)`
  position: relative !important;
  width: 100% !important;
  height: 32px !important;
  border-radius: 2px !important;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  &:hover {
    background-color: rgb(255, 245, 0) !important;
  }
`;

const Icon = styled.i`
  position: absolute;
  top: 0;
  left: 0;
`;

const Line = styled.div`
  position: absolute;
  width: 1px;
  height: 26px;
  top: 2px;
  left: 32px;
  background-color: grey;
  opacity: 0.6;
`;

const Span = styled.div`
  position: absolute;
  line-height: 0px;
  right: 0;
  width: 80%;
  font-size: 12px;
`;

function KakaoBtn({ loginAction }: TKakaoBtnParams) {
  const responseKaKao: Props['onSuccess'] = (res) => {
    const values = {
      email: `k${res?.profile?.id}@kakao.com`,
      password: `Kakao${res?.profile?.id}`,
      name: res?.profile?.properties.nickname,
      image: `uploads/images/no-user.svg`,
    };
    loginAction({ values, isSocial: true, setSubmitting: false });
  };

  const responseFail: Props['onFail'] = (err) => {
    alert(JSON.stringify(err));
  };

  return (
    <KaKaoLogin needProfile onFail={responseFail} onSuccess={responseKaKao} token="5b2bf4d6b26d272e0e11e17d0cac093b">
      <>
        <Icon className="xi-kakaotalk xi-2x" />
        <Line />
        <Span>Login with Kakao</Span>
      </>
    </KaKaoLogin>
  );
}

export default KakaoBtn;
