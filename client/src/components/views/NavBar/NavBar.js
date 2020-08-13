import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import { Drawer, Button } from 'antd';
import useReactRouter from 'use-react-router';
import { BarsOutlined } from '@ant-design/icons';
import './Sections/Navbar.css';

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
    <nav
      className='menu'
      style={{ position: 'fixed', zIndex: 5, width: '100%' }}
    >
      <div className='menu__logo'>
        <a href='/'>Food Ticket</a>
      </div>
      <div className='menu__container'>
        <div className='menu_left'>
          <LeftMenu mode='horizontal' pathname={pathname} />
        </div>
        <div className='menu_rigth'>
          <RightMenu mode='horizontal' pathname={pathname} />
        </div>
        <Button className='menu__mobile-button' onClick={showDrawer}>
          <BarsOutlined />
        </Button>
        <Drawer
          title={user !== undefined ? user.name : null}
          placement='right'
          className='menu_drawer'
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu mode='inline' />
          <RightMenu mode='inline' />
        </Drawer>
      </div>
    </nav>
  );
}

export default NavBar;
