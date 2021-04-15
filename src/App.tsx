import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Auth from '@common/auth';
import { GlobalStyle } from '@common/Style_Global';
import NavBar from '@components/NavBar';
import githubLogin from '@components/SocialLogin/Github';
import Home from '@containers/Home';
import Login from '@containers/Login';
import Menu from '@containers/Menu';
import MenuUpload from '@containers/MenuUpload';
import QrReader from '@containers/QrReader';
import Register from '@containers/Register';
import Ticket from '@containers/Ticket';
import styled from 'styled-components';

const WrapSpacer = styled.div`
  display: block;
  height: 68px;
  @media (max-width: 767px) {
    height: 50px;
  }
`;

const ContentsWarp = styled.div`
  position: relative;
  box-sizing: border-box;
  min-height: 83vh;
  @media (max-width: 767px) {
    padding: 0;
  }
`;

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <NavBar />
      <WrapSpacer />
      <ContentsWarp>
        <Switch>
          <Route component={Auth(Home, null)} exact path="/" />
          <Route component={Auth(Login, false)} exact path="/login" />
          <Route component={Auth(Register, null)} exact path="/register" />
          <Route component={Auth(Menu, null)} exact path="/section/:section" />
          <Route component={Auth(Ticket, true)} exact path="/ticket" />
          <Route component={Auth(MenuUpload, true, true)} exact path="/menu_uploads" />
          <Route component={Auth(QrReader, true, true)} exact path="/qr_reader" />
          <Route component={githubLogin} exact path="/githubLogin" />
        </Switch>
      </ContentsWarp>
    </BrowserRouter>
  );
}

export default App;
