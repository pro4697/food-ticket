import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Menu } from 'antd';

function LeftMenu({ mode }) {
  const user = useSelector((state) => state.user);

  return (
    <Menu mode={mode}>
      <Menu.Item key='main'>
        <Link to='/'>Home</Link>
      </Menu.Item>
      {user.userData && user.userData.role && (
        <Menu.Item key='menuUploads'>
          <Link to='/menu_uploads'>Menu Uploads</Link>
        </Menu.Item>
      )}
      {user.userData && user.userData.role && (
        <Menu.Item key='qrReader'>
          <Link to='/qr_reader'>QR Reader</Link>
        </Menu.Item>
      )}
    </Menu>
  );
}

LeftMenu.propTypes = {
  mode: PropTypes.string.isRequired,
};

export default LeftMenu;
