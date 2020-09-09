import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from '../hoc/auth';
import styled, { createGlobalStyle } from 'styled-components';
// pages for this product

//About Auth
import LandingPage from './views/LandingPage/LandingPage.js';
import LoginPage from './views/LoginPage/LoginPage.js';
import RegisterPage from './views/RegisterPage/RegisterPage.js';
import MenuPage from './views/MenuPage/MenuPage.js';
import MenuUploadPage from './views/MenuUploadPage/MenuUploadPage.js';
import TicketPage from './views/TicketPage/TicketPage.js';
import QrReaderPage from './views/QrReaderPage/QrReaderPage.js';
import NavBar from './views/NavBar/NavBar';

const GlobalStyle = createGlobalStyle`
  body{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  /* =================================
               Scroll-y 
  ================================= */
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.589);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgb(54, 56, 58);
  }
`;

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

export const StyledApp = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 700px;
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
        </Switch>
      </ContentsWarp>
    </Suspense>
  );
}

export default App;
