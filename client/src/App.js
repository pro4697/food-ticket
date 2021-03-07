import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from './common/auth';
import styled from 'styled-components';
// pages for this product

//About Auth
import LandingPage from './Containers/Home';
import LoginPage from './Containers/Login';
import RegisterPage from './Containers/Register';
import MenuPage from './Containers/Menu';
import MenuUploadPage from './Containers/MenuUpload';
import TicketPage from './Containers/Ticket';
import QrReaderPage from './Containers/QrReader';
import NavBar from './components/NavBar';
import githubLogin from './components/SocialLogin/Github';
import { GlobalStyle } from './common/Style_Global';

const WrapSpacer = styled.div`
	display: block;
	height: 68px;
	@media (max-width: 767px) {
		height: 50px;
	}
`;

const ContentsWarp = styled.div`
	position: relative;
	/* max-width: 1400px; */
	/* margin: 0px auto 0px;
  padding: 16px 16px 50px; */
	box-sizing: border-box;
	min-height: 83vh;
	@media (max-width: 767px) {
		padding: 0;
	}
`;

function App() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<GlobalStyle />
			<NavBar />
			<WrapSpacer />
			<ContentsWarp>
				<Switch>
					<Route exact path='/' component={Auth(LandingPage, null)} />
					<Route exact path='/login' component={Auth(LoginPage, false)} />
					<Route exact path='/register' component={Auth(RegisterPage, null)} />
					<Route exact path='/section/:section' component={Auth(MenuPage, null)} />
					<Route exact path='/ticket' component={Auth(TicketPage, true)} />

					<Route exact path='/menu_uploads' component={Auth(MenuUploadPage, true, true)} />
					<Route exact path='/qr_reader' component={Auth(QrReaderPage, true, true)} />
					<Route exact path='/githubLogin' component={githubLogin} />
				</Switch>
			</ContentsWarp>
		</Suspense>
	);
}

export default App;
