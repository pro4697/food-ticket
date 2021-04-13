import _KaKaoLogin from 'react-kakao-login';
import { Props } from 'react-kakao-login/lib/types';

import { SocialIcon } from '@common/Style_Etc';
import styled from 'styled-components';

type TKakaoBtnParams = {
  loginAction: (e: any) => void;
};

const KaKaoLogin = styled(_KaKaoLogin)`
  display: flex !important;
  padding: 0 !important;
  margin: 0 30px 0 auto;
  width: 36px !important;
  background-color: transparent !important;
  border-color: transparent !important;
  border: 0 !important;
  border-radius: 50%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
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
      <SocialIcon src="/images/kakao.png" />
    </KaKaoLogin>
  );
}

export default KakaoBtn;
