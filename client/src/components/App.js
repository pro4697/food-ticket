import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from '../hoc/auth';
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

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div className='contentsWrapSpacer' />
      <div className='contentsWrap'>
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
            path='/menuUploads'
            component={Auth(MenuUploadPage, true, true)}
          />
          <Route
            exact
            path='/qr_reader'
            component={Auth(QrReaderPage, true, true)}
          />
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
