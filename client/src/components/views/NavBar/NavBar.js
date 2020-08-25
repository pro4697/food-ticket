import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import { Drawer, Button } from 'antd';
import useReactRouter from 'use-react-router';
import { BarsOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

const NavMenu = styled.nav`
  position: fixed;
  z-index: 5;
  width: 100%;
  padding: 0 20px;
  border-bottom: solid 1px #e8e8e8;
  overflow: hidden;
  box-shadow: 0 0 30px #f3f1f1;
  background-color: white;
`;

const Logo = styled.div`
  width: 150px;
  float: left;
  a {
    display: inline-block;
    font-size: 20px;
    padding: 15px 20px 20px 20px;
  }
  @media (max-width: 767px) {
    margin-left: -20px;
    a {
      padding: 10px 20px;
    }
  }
`;

const Container = styled.div`
  & .ant-menu {
    padding: 0px !important;
  }
  & .ant-menu-item {
    margin: 9px 0 0 0 !important;
    padding: 0px 5px 8px 5px !important;
  }
  & .ant-menu-submenu-title {
    padding: 10px 20px !important;
  }
  & .ant-menu-item a,
  .ant-menu-submenu-title a {
    padding: 10px 15px !important;
  }
  & .ant-menu-horizontal {
    border-bottom: none;
  }
  @media (max-width: 767px) {
    & .ant-menu-item,
    .ant-menu-submenu-title {
      padding: 1px 20px;
    }
  }
`;

const LeftContainer = styled.div`
  float: left;
  @media (max-width: 767px) {
    display: none;
  }
`;

const RightContainer = styled.div`
  float: right;
  @media (max-width: 767px) {
    display: none;
  }
`;

const MobileBtn = styled(Button)`
  /* use of important to overwrite ant-btn */
  float: right;
  height: 32px;
  padding: 0px 6px !important;
  border-radius: 4px !important;
  margin-top: 8px;
  display: none !important;
  @media (max-width: 767px) {
    display: inline-block !important;
  }
`;

const MenuDrawer = styled(Drawer)`
  & .ant-drawer-body {
    padding: 0 !important;
  }
  & .ant-drawer-header {
    padding: 14px 24px !important;
  }
`;

function NavBar() {
  const user = useSelector((state) => state.user.userData);
  const [visible, setVisible] = useState(false);
  const { location } = useReactRouter();
  const { pathname } = location;

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <NavMenu>
      <Logo>
        <a href='/'>Food Ticket</a>
      </Logo>
      <Container>
        <LeftContainer>
          <LeftMenu mode='horizontal' pathname={pathname} />
        </LeftContainer>
        <RightContainer>
          <RightMenu mode='horizontal' pathname={pathname} />
        </RightContainer>
        <MobileBtn onClick={showDrawer}>
          <BarsOutlined />
        </MobileBtn>
        <MenuDrawer
          title={user !== undefined ? user.name : null}
          placement='right'
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu mode='inline' />
          <RightMenu mode='inline' />
        </MenuDrawer>
      </Container>
    </NavMenu>
  );
}

export default NavBar;
