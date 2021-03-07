import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import KaKaoLogin from 'react-kakao-login';
import { SocialIcon } from '../../common/Style_Etc';

const KaKaoButton = styled(KaKaoLogin)`
	display: flex !important;
	padding: 0 !important;
	margin: 0 30px 0 auto;
	background-color: transparent !important;
	border-color: transparent !important;
	border: 0 !important;
	border-radius: 50%;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
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
		alert(JSON.stringify(err));
	};

	return (
		<KaKaoButton
			jsKey='5b2bf4d6b26d272e0e11e17d0cac093b'
			onSuccess={responseKaKao}
			onFailure={responseFail}
			getProfile={true}
		>
			<SocialIcon src='/images/kakao.png' />
		</KaKaoButton>
	);
}

KakaoBtn.propTypes = {
	loginAction: PropTypes.func.isRequired,
};

export default KakaoBtn;
