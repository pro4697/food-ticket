import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { TReducer } from '@/redux';
import { ArrowLeftOutlined, MenuOutlined } from '@ant-design/icons';
import { sectionName } from '@containers/Home';
import { Button, Drawer } from 'antd';
import { MenuMode } from 'antd/lib/menu';
import styled from 'styled-components';
import useReactRouter from 'use-react-router';

import LeftMenu from './LeftMenu';
import RightMenu from './RightMenu';

import 'antd/dist/antd.css';

type TVisible = {
  visible?: boolean;
};

export type TSideMenuParams = {
  mode: MenuMode;
};

const Div = styled.div``;

const NavMenu = styled.nav`
  position: fixed;
  z-index: 5;
  width: 100%;
  padding: 0 20px;
  border-bottom: solid 1px #e8e8e8;
  overflow: hidden;
  box-shadow: 0 0 30px #f3f1f1;
  background-color: white;
  box-shadow: 0 0 0 !important;
  border-bottom: 0 !important;
  background-color: transparent;
  @media (max-width: 767px) {
    background-color: #1890ff;
  }
`;

const Logo = styled.div<TVisible>`
  width: 150px;
  float: left;
  a {
    display: inline-block;
    font-size: 20px;
    padding: 15px 20px 20px 20px;
  }
  @media (max-width: 767px) {
    display: ${({ visible }) => (visible ? 'block' : 'none')};
    margin-left: -20px;
    a {
      padding: 10px 20px;
      color: white !important;
    }
  }
`;

const BackBtn = styled.div<TVisible>`
  display: none;
  width: 30px;
  float: left;
  a {
    display: inline-block;
    font-size: 20px;
    padding: 15px 20px 20px 20px;
  }
  @media (max-width: 767px) {
    display: ${({ visible }) => (visible ? 'block' : 'none')};
    margin-left: -20px;
    a {
      padding: 10px 20px;
      color: white !important;
    }
  }
`;

const SectionTitle = styled.div<TVisible>`
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
    display: ${({ visible }) => (visible ? 'block' : 'none')};
  }
`;

const Container = styled.div`
  & .ant-menu {
    padding: 0px !important;
    background-color: transparent;
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

function NavBar() {
  const user = useSelector((state: TReducer) => state.user.userData);
  const [Visible, setVisible] = useState(false);
  const [MobileUI, setMobileUI] = useState(false);
  const [Section, setSection] = useState('');
  const { location } = useReactRouter();
  const { pathname } = location;

  useEffect(() => {
    if (pathname === '/') {
      setMobileUI(false);
    } else {
      const section = pathname.split('/');
      if (section[1] === 'section') {
        setSection(sectionName[Number(section[2]) - 1]);
      } else if (section[1] === 'ticket') {
        setSection('식권 보관함');
      }
      setMobileUI(true);
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
      <Logo visible={!MobileUI}>
        {/* 임시 방편 */}
        <Link to="/">Food Ticket</Link>
      </Logo>
      <BackBtn visible={MobileUI}>
        <Link to="/">
          <ArrowLeftOutlined />
        </Link>
      </BackBtn>
      <SectionTitle visible={MobileUI}>{Section}</SectionTitle>
      <Container>
        <LeftContainer>
          <LeftMenu mode="horizontal" />
        </LeftContainer>
        <RightContainer>
          <RightMenu mode="horizontal" />
        </RightContainer>
        <MobileBtn onClick={showDrawer}>
          <MenuOutlined />
        </MobileBtn>
        <MenuDrawer
          closable={false}
          onClose={onClose}
          placement="right"
          title={user !== undefined ? user.name : null}
          visible={Visible}
        >
          <Div onClick={onClose}>
            <LeftMenu mode="inline" />
            <RightMenu mode="inline" />
          </Div>
        </MenuDrawer>
      </Container>
    </NavMenu>
  );
}

export default NavBar;
