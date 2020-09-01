import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import { Drawer, Button } from 'antd';
import useReactRouter from 'use-react-router';
import { MenuOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { sectionName } from '../LandingPage/LandingPage';
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
  @media (max-width: 767px) {
    box-shadow: 0 0 0 !important;
    border-bottom: 0 !important;
    background-color: #1890ff;
  }
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
    display: ${(props) => (props.visible ? 'block' : 'none')};
    margin-left: -20px;
    a {
      padding: 10px 20px;
      color: white !important;
    }
  }
`;

const BackButton = styled.div`
  display: none;
  width: 30px;
  float: left;
  a {
    display: inline-block;
    font-size: 20px;
    padding: 15px 20px 20px 20px;
  }
  @media (max-width: 767px) {
    display: ${(props) => (props.visible ? 'block' : 'none')};
    margin-left: -20px;
    a {
      padding: 10px 20px;
      color: white !important;
    }
  }
`;

const SectionTitle = styled.div`
  display: none;
  position: absolute;
  color: white;
  font-size: 20px;
  padding: 10px 0;
  left: 0;
  width: 100%;
  z-index: -1;
  text-align: center;
  user-select: none;
  letter-spacing: 2px;
  @media (max-width: 767px) {
    display: ${(props) => (props.visible ? 'block' : 'none')};
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
    float: right;
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
  padding: 0 !important;
  border: 0 !important;
  margin-top: 10px;
  display: none !important;
  background-color: #1890ff !important;
  color: white !important;
  font-size: 20px !important;
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

function NavBar(props) {
  const user = useSelector((state) => state.user.userData);
  const [Visible, setVisible] = useState(false);
  const [BackBtn, setBackBtn] = useState(false);
  const [Section, setSection] = useState('');
  const { location } = useReactRouter();
  const { pathname } = location;

  useEffect(() => {
    if (pathname === '/') {
      setBackBtn(false);
    } else {
      let section = pathname.split('/');
      console.log(section[2]);
      if (section[1] === 'section') {
        setSection(sectionName[section[2] - 1]);
      } else if (section[1] === 'ticket') {
        setSection('식권 보관함');
      }
      setBackBtn(true);
    }
  }, [pathname]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <NavMenu>
      <Logo visible={!BackBtn}>
        <a href='/'>Food Ticket</a>
      </Logo>
      <BackButton visible={BackBtn}>
        <a href='/'>
          <ArrowLeftOutlined />
        </a>
      </BackButton>
      <SectionTitle visible={BackBtn}>{Section}</SectionTitle>
      <Container>
        <LeftContainer>
          <LeftMenu mode='horizontal' pathname={pathname} />
        </LeftContainer>
        <RightContainer>
          <RightMenu mode='horizontal' pathname={pathname} />
        </RightContainer>
        <MobileBtn onClick={showDrawer}>
          <MenuOutlined />
        </MobileBtn>
        <MenuDrawer
          title={user !== undefined ? user.name : null}
          placement='right'
          closable={false}
          onClose={onClose}
          visible={Visible}
        >
          <LeftMenu mode='inline' />
          <RightMenu mode='inline' />
        </MenuDrawer>
      </Container>
    </NavMenu>
  );
}

export default NavBar;
