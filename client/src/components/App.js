import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from '../hoc/auth';
import styled from 'styled-components';
// pages for this product

//About Auth
import LandingPage from './views/LandingPage/LandingPage';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import MenuPage from './views/MenuPage/MenuPage';
import MenuUploadPage from './views/MenuUploadPage/MenuUploadPage';
import TicketPage from './views/TicketPage/TicketPage';
import QrReaderPage from './views/QrReaderPage/QrReaderPage';
import NavBar from './views/NavBar/NavBar';
import githubLogin from './views/SocialLogin/Github';
import { GlobalStyle } from './Style_Global';

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
  margin: 0px auto 0px;
  padding: 16px 16px 50px;
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
          <Route
            exact
            path='/section/:section'
            component={Auth(MenuPage, null)}
          />
          <Route exact path='/ticket' component={Auth(TicketPage, true)} />

          <Route
            exact
            path='/menu_uploads'
            component={Auth(MenuUploadPage, true, true)}
          />
          <Route
            exact
            path='/qr_reader'
            component={Auth(QrReaderPage, true, true)}
          />
          <Route exact path='/githubLogin' component={githubLogin} />
        </Switch>
      </ContentsWarp>
    </Suspense>
  );
}

export default App;
